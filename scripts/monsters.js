
/**
 * Class used to manage and visualize the monster panel data.
 */
class Monsters {
    /**
     * Constructor for monsters panel
     */
    constructor(monsterData) {
        // read in data from file
        this.monsters = monsterData;
        this.selectedMonsters = [];

        this.axisOptions = [
            { json: "armor-class", "option-text": "AC" },
            { json: "hit-points", "option-text": "HP" },
            { json: "str-score", "option-text": "STR" },
            { json: "dex-score", "option-text": "DEX" },
            { json: "con-score", "option-text": "CON" },
            { json: "int-score", "option-text": "INT" },
            { json: "wis-score", "option-text": "WIS" },
            { json: "cha-score", "option-text": "CHA" },
            // { json: "challenge-rating", "option-text": "Challenge Rating" } it's not in attributes, makes things a bit trickier
        ];
        this.partitionOptions = [
            { json: "monster-type", "option-text": "Monster Type" },
            { json: "monster-size", "option-text": "Monster Size" },
            { json: "alignment", "option-text": "Alignment" },
        ];
        this.tableAttributes = [
            { json: 'monster-name', 'option-text': 'Monster Name' },
            ...this.partitionOptions,
            ...this.axisOptions
        ];

        this.margin = {top: 30, right: 20, bottom: 30, left: 20}

        this.monsterGraphsDiv = d3.select('#monsters')
            .append('div')
            .attr('id', 'monstersGraphsDiv')
        ;
        this.monstersSelectDiv = d3.select('#monsters')
            .append('div')
            .attr('id', 'monstersSelectDiv')
            .style('width', '100%')
        ;

        let svgBounds = d3.select('.collapsible').node().getBoundingClientRect();
        this.screenWidth = svgBounds.width

        this.createMonsterGraphs();

        this.createMonsterSelect();
    }

    /**
     * Draws the big and small graphs on the Monster Panel.
     */
    createMonsterGraphs() {
        let bigGraphColumn = this.monsterGraphsDiv
            .append('div')
            .attr('class', 'left-col')
            .attr('id', 'bigMonsterGraph')
        ;
        let smallMultiplesColumn = this.monsterGraphsDiv
            .append('div')
            .attr('class', 'right-col')
            .attr('id', 'smallMonsterGraphsDiv')
        ;

        // append svg to bigGraphColumn
        bigGraphColumn.append('svg')
            .attr('width', this.screenWidth / 2)
            .attr('height', this.screenWidth / 2)
            .attr('id', 'bigGraphSVG')
        ;
        // append selects with appropriate options for x-axis and y-axis
        bigGraphColumn.append('label')
            .attr('for', 'xaxis')
            .text('X-Axis: ')
        ;
        let xSelect = bigGraphColumn.append('select')
            .attr('name', 'xaxis')
            .attr('id', 'xAxisSelect')
            .on('change', v => this.updateCharts())
        ;
        xSelect.selectAll('option')
            .data(this.axisOptions)
            .enter()
            .append('option')
            .attr('value', o => o.json)
            .text(o => o["option-text"])
        ;
        bigGraphColumn.append('label')
            .attr('for', 'yaxis')
            .text('Y-Axis: ')
        ;
        let ySelect = bigGraphColumn.append('select')
            .attr('name', 'yaxis')
            .attr('id', 'yAxisSelect')
            .on('change', v => this.updateCharts())
        ;
        ySelect.selectAll('option')
            .data(this.axisOptions)
            .enter()
            .append('option')
            .attr('value', o => o.json)
            .text(o => o["option-text"])
        ;

        // append a div in which to put many svgs to smallMultiplesColumn
        smallMultiplesColumn.append('div')
            .attr('id', 'smallMultiplesDivForSVGs')
        ;
        // append selects with appropriate options for partitions
        smallMultiplesColumn.append('label')
            .attr('for', 'partition')
            .text('Partition on: ')
        ;
        let pSelect = smallMultiplesColumn.append('select')
            .attr('name', 'partition')
            .attr('id', 'pAxisSelect')
            .on('change', v => this.updateCharts())
        ;
        pSelect.selectAll('option')
            .data(this.partitionOptions)
            .enter()
            .append('option')
            .attr('value', o => o.json)
            .text(o => o["option-text"])
        ;
        document.getElementById('pAxisSelect').value = 'monster-size';

        // trigger updateCharts
        this.updateCharts();
    }

    /**
     * Visualizes the currently selected monsters in a table.
     * TODO.
     */
    createMonsterSelect() {
        // I think we'll display the selected monsters in a table
        // name | stat | stat | stat | etc...
    }

    /**
     * Redraw the charts when the data changes.
     */
    updateCharts() {
        if (d3.event) {
            let changedValue = d3.event.target.value;
            if (this.axisOptions.map(v => v.json).includes(changedValue)){
                this.updateBigChart();
            }
            this.updateSmallMultiples();
        } else {
            this.updateBigChart();
            this.updateSmallMultiples();
        }
    }

    /**
     * Redraw the big chart when the data changes.
     */
    updateBigChart() {
        let xAxisValue = document.getElementById('xAxisSelect').value;
        let yAxisValue = document.getElementById('yAxisSelect').value;
        let xAxisHeight = 22;
        let yAxisWidth = 20;

        let bigGraphSVG = d3.select('#bigGraphSVG');
        // remove what's there so we can make the new chart
        document.getElementById('bigGraphSVG').innerHTML = '';

        let xScale = d3.scaleLinear()
            .range([yAxisWidth, (this.screenWidth / 2) - this.margin.left - this.margin.right])
            .domain([d3.min(
                this.monsters.map(m => m.attributes[xAxisValue])
            )-1, d3.max(
                this.monsters.map(m => m.attributes[xAxisValue])
            )+1])
        ;
        let yScale = d3.scaleLinear()
            .range([0, (this.screenWidth / 2) - this.margin.top - this.margin.bottom])
            .domain([d3.min(
                this.monsters.map(m => m.attributes[yAxisValue])
            )-1, d3.max(
                this.monsters.map(m => m.attributes[yAxisValue])
            )+1])
        ;
        // add x-axis
        let xAxis = d3.axisBottom(xScale)
            .tickFormat((d,i) => d)
        ;
        bigGraphSVG.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${(this.screenWidth / 2)-xAxisHeight})`)
            .call(xAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-65)');
        ;
        // add y-axis
        let yAxis = d3.axisLeft(yScale)
            .tickFormat((d,i) => d)
        ;
        bigGraphSVG.append('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${yAxisWidth}, ${(this.screenWidth / 2)-xAxisHeight}) scale(1,-1)`)
            .call(yAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '0em')
            .attr('dy', '.5em')
            .attr('transform', 'scale(1,-1)')
        ;
        // add the dots
        bigGraphSVG.selectAll('circle')
            .data(this.monsters)
            .enter()
            .append('circle')
            .attr('class', 'bigGraphCircle')
            .attr('r', '4')
            .attr('cx', m => xScale(m.attributes[xAxisValue]))
            .attr('cy', m => (this.screenWidth / 2) - (yScale(m.attributes[yAxisValue])+xAxisHeight))
            .on('click', d => this.selectMonster())
            .style('fill', m => {
                if (this.selectedMonsters.includes(m)){
                    return 'red';
                }
                return 'black';
            })
        ;
    }

    /**
     * Redraw the small charts when the data changes.
     */
    updateSmallMultiples() {
        let xAxisValue = document.getElementById('xAxisSelect').value;
        let yAxisValue = document.getElementById('yAxisSelect').value;
        let svgWidth = (this.screenWidth / 6)-10;
        let partitionValue = document.getElementById('pAxisSelect').value;
        let wiggleRoom = {
            bottom: 25,
            top: 8,
            side: 2
        }
        let nestedData = d3.nest()
            .key(k => k[partitionValue])
            .entries(this.monsters)
        ;
        // always update the small multiples
        document.getElementById('smallMultiplesDivForSVGs').innerHTML = '';
        // make the scales and axes
        let xScale = d3.scaleLinear()
            .range([0, svgWidth - (2 * wiggleRoom.side)])
            .domain([d3.min(
                this.monsters.map(m => m.attributes[xAxisValue])
            )-1, d3.max(
                this.monsters.map(m => m.attributes[xAxisValue])
            )+1])
        ;
        let yScale = d3.scaleLinear()
            .range([0, svgWidth - wiggleRoom.bottom - wiggleRoom.top ])
            .domain([d3.min(
                this.monsters.map(m => m.attributes[yAxisValue])
            )-1, d3.max(
                this.monsters.map(m => m.attributes[yAxisValue])
            )+1])
        ;
        let xAxis = d3.axisBottom(xScale)
            .tickFormat('')
        ;
        let yAxis = d3.axisLeft(yScale)
            .tickFormat('')
        ;
        // append the correct number of charts
        for (let data of nestedData) {
            let svg = d3.select('#smallMultiplesDivForSVGs')
                .append('svg')
                .attr('width', svgWidth)
                .attr('height', svgWidth)
            ;
            svg.append('g')
                .attr('class', 'x-axis')
                .attr('transform', `translate(${wiggleRoom.side}, ${svgWidth-wiggleRoom.bottom})`)
                .call(xAxis)
            ;
            svg.append('g')
                .attr('class', 'y-axis')
                .attr('transform', `translate(${wiggleRoom.side}, ${wiggleRoom.top})`)
                .call(yAxis)
            ;
            svg.append('text')
                .text(`${data.key}`)
                .attr('x', `35`)
                .attr('y', `${svgWidth - 5}`)
            ;
            svg.selectAll('circle')
                .data(data.values)
                .enter()
                .append('circle')
                .attr('r', '3')
                .attr('cx', m => xScale(m.attributes[xAxisValue]))
                .attr('cy', m => svgWidth - yScale(m.attributes[yAxisValue])-wiggleRoom.bottom)
                .on('click', d => selectMonster())
                .style('fill', m => {
                    if (this.selectedMonsters.includes(m)) {
                        return 'red';
                    }
                    return 'black';
                })
            ;
        }
    }

    /**
     * Handler for selecting monsters on the charts.
     */
    selectMonster() {
        let selectedCircle = d3.event.target;
        selectedCircle.style.fill = 'red';
        // gotta figure out how to link it in the other view without having to rebuild the whole other view...
        let selectedMonster = d3.event.target.__data__;
        this.selectedMonsters.push(selectedMonster);
        this.displaySelectedMonsters()
    }

    /**
     * Build up the table for showing selected monsters.
     */
    displaySelectedMonsters() {
        document.getElementById('monstersSelectDiv').innerHTML = '';
        if (this.selectedMonsters) {
            let table = document.createElement('table');
            document.getElementById('monstersSelectDiv').appendChild(table);
            this.generateTable(table, this.selectedMonsters);
            this.generateTableHead(table, this.tableAttributes.map(v => v['option-text']));
        }
    }

    /**
     * Generate header for selected monsters table.
     */
    generateTableHead(table, data) {
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of data) {
            let th = document.createElement('th');
            let text = document.createTextNode(key)
            th.appendChild(text);
            row.appendChild(th);
        }
    }

    /**
     * Generate the table that holds selected monsters.
     */
    generateTable(table, data) {
        for (let monster of data) {
            console.log(monster);
            let row = table.insertRow();
            for (let attr in monster) {
                if (this.tableAttributes.map(v => v.json).includes(attr)){
                    let cell = row.insertCell();
                    let text = document.createTextNode(monster[attr]);
                    cell.appendChild(text);
                } else if (attr === 'attributes') {
                    for (let score in monster[attr]) {
                        if (this.tableAttributes.map(v => v.json).includes(score)) {
                            let cell = row.insertCell();
                            let text = document.createTextNode(monster.attributes[score]);
                            cell.appendChild(text);
                        }
                    }
                }
            }
        }
    }

    // didn't consider what to do about all the overlapping data...
    // especially considering how you click the table for a selection...
    // maybe work that out on tuesday, if Jonathan is still around
}
