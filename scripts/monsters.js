
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
        this.userSelectedMonsters = [];
        this.monstersToDisplay = [];

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
            { json: 'name', 'option-text': 'Monster Name' },
            ...this.partitionOptions,
            ...this.axisOptions
        ];

        this.margin = {top: 30, right: 20, bottom: 30, left: 20}

        this.explanationDiv = d3.select('#monsters')
            .append('div')
            .attr('id', 'monstersLegendDiv')
        ;

        this.monsterGraphsDiv = d3.select('#monsters')
            .append('div')
            .attr('id', 'monstersGraphsDiv')
        ;

        this.monstersChosenDiv = d3.select('#monsters')
            .append('div')
            .attr('id', 'monstersChosenDiv')
            .style('width', '100%')
        ;

        this.monstersChosenDiv.append('h2')
            .text('Selected Monsters')
        ;

        this.monstersSelectDiv = d3.select('#monsters')
            .append('div')
            .attr('id', 'monstersSelectDiv')
            .style('width', '100%')
        ;

        this.monstersSelectDiv.append('h2')
            .text('Monsters in the Selected Region')

        let svgBounds = d3.select('.collapsible').node().getBoundingClientRect();
        this.screenWidth = svgBounds.width

        this.createMonsterGraphs();
    }

    /**
     * Draws the big and small graphs on the Monster Panel.
     */
    createMonsterGraphs() {
        this.explanationDiv
            .append('p')
            .text('The monsters contained in the selected area will be displayed below the charts and each monster will have a button that adds them to the monster roster.')
        ;
        this.explanationDiv
            .append('p')
            .text('AC=Armor Class; HP=Hit Points; STR=Strength; DEX=Dexterity; CON=Constitution; INT=Intelligence; WIS=Wisdom; CHA=Charisma')
        ;

        let bigGraphColumn = this.monsterGraphsDiv
            .append('div')
            .attr('class', 'left-col')
            .attr('id', 'bigMonsterGraph')
        ;

        let bigGraphControls = bigGraphColumn.append('div')
            .attr('class', 'controls')
        ;

        let smallMultiplesColumn = this.monsterGraphsDiv
            .append('div')
            .attr('class', 'right-col')
            .attr('id', 'smallMonsterGraphsDiv')
        ;

        let smallMultiplesControls = smallMultiplesColumn.append('div')
            .attr('class', 'controls')
        ;

        bigGraphControls.append('h2')
            .text("All Monsters")
        ;

        // append selects with appropriate options for x-axis and y-axis
        let xAxisControls = bigGraphControls.append('div')
            .attr('class', 'scatterControls')
            .attr('id', 'domainControls')
        ;

        xAxisControls.append('label')
            .attr('for', 'xaxis')
            .text('X-Axis: ')
        ;

        let xSelect = xAxisControls.append('select')
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

        let yAxisControls = bigGraphControls.append('div')
            .attr('class', 'scatterControls')
            .attr('id', 'rangeControls')
        ;

        yAxisControls.append('label')
            .attr('for', 'yaxis')
            .text('Y-Axis: ')
        ;

        let ySelect = yAxisControls.append('select')
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

        // append svg to bigGraphColumn
        bigGraphColumn.append('svg')
            .attr('width', (this.screenWidth / 2) - this.margin.left - this.margin.right)
            .attr('height', this.screenWidth / 2)
            .attr('id', 'bigGraphSVG')
        ;

        smallMultiplesControls.append('h2')
            .text('Monster Subgroups')
        ;

        let partitionControls = smallMultiplesControls.append('div')
            .attr('class', 'scatterControls')
        ;

        // append selects with appropriate options for partitions
        partitionControls.append('label')
            .attr('for', 'partition')
            .text('Partition on: ')
            ;

        let pSelect = partitionControls.append('select')
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

        // append a div in which to put many svgs to smallMultiplesColumn
        smallMultiplesColumn.append('div')
            .attr('id', 'smallMultiplesDivForSVGs')
        ;

        // trigger updateCharts
        this.updateCharts();
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
        let labelSpace = 24;

        let bigGraphSVG = d3.select('#bigGraphSVG');
        // remove what's there so we can make the new chart
        document.getElementById('bigGraphSVG').innerHTML = '';

        let xScale = d3.scaleLinear()
            .range([yAxisWidth+labelSpace, (this.screenWidth / 2) - this.margin.left - this.margin.right])
            .domain([d3.min(
                this.monsters.map(m => m.attributes[xAxisValue])
            )-1, d3.max(
                this.monsters.map(m => m.attributes[xAxisValue])
            )+1])
        ;
        let yScale = d3.scaleLinear()
            .range([0, (this.screenWidth / 2) - this.margin.top - this.margin.bottom - labelSpace])
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
            .attr('transform', `translate(0, ${(this.screenWidth / 2)-xAxisHeight - labelSpace})`)
            .call(xAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-65)');
        ;
        bigGraphSVG.append('text')
            .attr('class', 'axis-label')
            .attr('x', (this.screenWidth / 4))
            .attr('y', (this.screenWidth / 2) - (labelSpace / 2))
            .style('text-anchor', 'middle')
            .text(this.axisOptions.find(o => o.json === xAxisValue)['option-text'])
        ;
        // add y-axis
        let yAxis = d3.axisLeft(yScale)
            .tickFormat((d,i) => d)
        ;
        bigGraphSVG.append('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${yAxisWidth+labelSpace}, ${(this.screenWidth / 2)-xAxisHeight - labelSpace}) scale(1,-1)`)
            .call(yAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '0em')
            .attr('dy', '.5em')
            .attr('transform', 'scale(1,-1)')
        ;
        bigGraphSVG.append('text')
            .attr('class', 'axis-label')
            .attr('x', labelSpace / 2)
            .attr('y', this.screenWidth / 4)
            .style('text-anchor', 'middle')
            .attr('transform', `rotate(270, ${labelSpace/2}, ${this.screenWidth/4})`)
            .text(this.axisOptions.find(o => o.json === yAxisValue)['option-text'])
        ;

        // add the dots
        bigGraphSVG.selectAll('circle')
            .data(this.monsters)
            .enter()
            .append('circle')
            .attr('class', 'bigGraphCircle')
            .attr('r', '4')
            .attr('cx', m => xScale(m.attributes[xAxisValue]))
            .attr('cy', m => (this.screenWidth / 2) - (yScale(m.attributes[yAxisValue])+xAxisHeight+labelSpace))
            .style('fill', d => this.getColorForMonster(d))
        ;

        // add the brush
        let brush = d3.brush().extent([[yAxisWidth+labelSpace, this.margin.top],[(this.screenWidth/2)-this.margin.left-this.margin.right, (this.screenWidth/2)-xAxisHeight - labelSpace]]).on("end", d => {
            let range = d3.event.selection;
            this.monstersToDisplay = [];
            let svgForY = document.getElementById('bigGraphSVG').getBoundingClientRect();
            bigGraphSVG.selectAll('circle')._groups[0].forEach(dot => {
                let dotX = xScale(dot.__data__.attributes[xAxisValue]);
                let dotY = ((this.screenWidth / 2) - yScale(dot.__data__.attributes[yAxisValue]) - xAxisHeight - labelSpace);
                if (dotX >= range[0][0] && dotX <= range[1][0]) {
                    if (dotY >= range[0][1] && dotY <= range[1][1]) {
                        this.monstersToDisplay.push(dot.__data__);
                    }
                }
            });
            this.displaySelectedMonsters();
        });
        bigGraphSVG.append("g").attr("class", "brush").call(brush);

        // Redraw any selected monsters
        let selected = bigGraphSVG.selectAll('circle')
            .filter(d => this.userSelectedMonsters.includes(d))
        ;

        selected.classed('selected-monster', true)
            .each((_, i, nodes) => nodes[i].parentNode.appendChild(nodes[i]))
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
        nestedData = this.sortData(nestedData, partitionValue);
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
                .attr('r', '2')
                .attr('cx', m => xScale(m.attributes[xAxisValue]))
                .attr('cy', m => svgWidth - yScale(m.attributes[yAxisValue])-wiggleRoom.bottom)
                .style('fill', m => this.getColorForMonster(m))
            ;
            // add the brush,
            let brush = d3.brush().extent([[wiggleRoom.side, 0],[svgWidth, (svgWidth-wiggleRoom.bottom)]]).on("end", d => {
                let range = d3.event.selection;
                this.monstersToDisplay = [];
                // go through each dot in that svg
                // see if it is in the range
                svg.selectAll('circle')._groups[0].forEach(dot => {
                    let dotX = dot.cx.baseVal.value;
                    let dotY = dot.cy.baseVal.value;
                    if (dotX >= range[0][0] && dotX <= range[1][0]) {
                        if (dotY >= range[0][1] && dotY <= range[1][1]) {
                            this.monstersToDisplay.push(dot.__data__);
                        }
                    }
                });
                this.displaySelectedMonsters();
            });
            svg.append("g").attr("class", "brush").call(brush);
        }

        // Redraw any selected monsters
        let selected = d3.select('#smallMultiplesDivForSVGs')
            .selectAll('circle')
            .filter(d => this.userSelectedMonsters.includes(d))
        ;

        selected.classed('selected-monster', true)
            .each((_, i, nodes) => nodes[i].parentNode.appendChild(nodes[i]))
        ;
    }

    /**
     * Display a table of monsters selected from the chart
     */
    displaySelectedMonsters() {

        console.log('make a table for', this.monstersToDisplay);

        // Remove any old selections
        d3.select('#monstersSelectDiv')
            .selectAll('table')
            .remove()
        ;

        // Add new selections
        if (this.monstersToDisplay) {
            let table = document.createElement('table');
            document.getElementById('monstersSelectDiv').appendChild(table);
            this.generateSelectTable(table, this.monstersToDisplay);
            this.generateTableHead(table, this.tableAttributes.map(v => v['option-text']));
        }
    }

    sortData(nestedData, partitionValue) {
        if (partitionValue === 'alignment') {
            let orderedAlignments = [
                'Lawful Good',
                'Neutral Good',
                'Chaotic Good',
                'Lawful Neutral',
                'Neutral',
                'Chaotic Neutral',
                'Lawful Evil',
                'Neutral Evil',
                'Chaotic Evil',
                'Any Alignment',
                'Unaligned',
                'Any Non-Good Alignment',
                'Any Evil Alignment',
                'Any Non-Lawful Alignment',
                'Any Chaotic Alignment'
            ];
            let newOrder = [];
            orderedAlignments.forEach(a => {
                nestedData.forEach(g => {
                    if(g.key === a) {
                        newOrder.push(g);
                    }
                });
            });
            return newOrder;
        }
        if (partitionValue === 'monster-size') {
            let orderedSize = [
                'Tiny',
                'Small',
                'Medium',
                'Large',
                'Huge',
                'Gargantuan'
            ];
            let newOrder = [];
            orderedSize.forEach(s => {
                nestedData.forEach(g => {
                    if(g.key === s) {
                        newOrder.push(g);
                    }
                });
            });
            return newOrder;
        }
        return nestedData;
    }

    /**
     * Handler for selecting monsters from the table
     */
    selectMonster() {
        // let selectedCircle = d3.event.target;
        // gotta figure out how to highlight the monsters that are selected
        let selectedMonster = d3.event.target;
        selectedMonster.classed("selected-monster", true);

        console.log(selectedMonster);

        this.userSelectedMonsters.push(selectedMonster.data());
        this.displayChosenMonsters();
        this.updateBigChart();
        this.updateSmallMultiples();
    }

    /**
     * Build up the table for showing selected monsters.
     */
    displayChosenMonsters() {

        // Remove Old Choices
        d3.select('#monstersChosenDiv')
            .selectAll('table')
            .remove()
        ;

        // Add new Choices
        if (this.userSelectedMonsters) {
            let table = document.createElement('table');
            document.getElementById('monstersChosenDiv').appendChild(table);
            this.generateChosenTable(table, this.userSelectedMonsters);
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
        // and an emty row for the remove button
        let th = document.createElement('th');
        let text = document.createTextNode('');
        th.appendChild(text);
        row.appendChild(th);
    }

    /**
     * Generate the table that holds selected monsters.
     */
    generateSelectTable(table, data) {
        for (let monster of data) {
            // console.log(monster);
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
            this.addSelectButton(row);
        }
    }

    /**
     * Generate the table that holds selected monsters.
     */
    generateChosenTable(table, data) {
        for (let monster of data) {
            // console.log(monster);
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
            this.addDeleteButton(row);
        }
    }

    addDeleteButton(row) {
        let cell = row.insertCell();
        let delBtn = document.createElement('input');
        delBtn.type = 'button';
        delBtn.className = 'delete';
        delBtn.value = 'Delete';
        delBtn.onclick = (d => {
            if (this.userSelectedMonsters.length === 1) {
                this.userSelectedMonsters = [];
                let selects = document.getElementsByClassName('selectBtn');
                for (let i = 0; i < selects.length; i++) {
                    selects[i].disabled = false;
                }
            } else {
                let toDeleteName = d.target.parentElement.parentElement.cells[0].childNodes[0].nodeValue;
                let selects = document.getElementsByClassName('selectBtn');
                for (let i = 0; i < selects.length; i++) {
                    if (selects[i].parentElement.parentElement.cells[0].childNodes[0].nodeValue == toDeleteName) {
                        selects[i].disabled = false;
                    }
                }
                this.userSelectedMonsters = this.userSelectedMonsters.filter(m => m.name !== toDeleteName);
            }
            this.displayChosenMonsters();
        });
        cell.appendChild(delBtn);
    }

    addSelectButton(row) {
        let cell = row.insertCell();
        let selectBtn = document.createElement('input');
        selectBtn.type = 'button';
        selectBtn.className = 'selectBtn';
        selectBtn.value = 'Select';
        selectBtn.onclick = (s => {
            s.target.disabled = true;
            let toSelectName = s.target.parentElement.parentElement.cells[0].childNodes[0].nodeValue;
            this.userSelectedMonsters = [...this.userSelectedMonsters, this.monstersToDisplay.find(m => m.name === toSelectName)];
            this.displayChosenMonsters();
            this.updateBigChart();
            this.updateSmallMultiples();
        });
        cell.appendChild(selectBtn);
    }

    getSelectedMonsters() {
        return this.userSelectedMonsters;
    }

    getColorForMonster(monster) {

        // return "black";

        // Prep the colors
        const MAX_CR = 30;

        // KLUDGE: Don't @ me for the eval
        let cr = eval(monster['challenge-rating']);

        // Need to squish the colors in half to make them show up on a white background.
        let ratio = (cr / MAX_CR) * 0.6;

        return d3.interpolateViridis(ratio);
    }
}
