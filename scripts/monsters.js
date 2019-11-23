class Monsters {
    /**
     * Constructor for monsters panel
     */
    constructor(monsterData) {
        // read in data from file
        this.monsters = monsterData;
        // console.log(this.monsters);
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
            { json: "alignment", "option-text": "Alignment" }
        ];
        this.margin = {top: 30, right: 20, bottom: 30, left: 20}

        this.monsterGraphsDiv = d3.select('#monsters')
            .append('div')
            .attr('id', 'monstersGraphsDiv')
        ;
        this.monstersSelectDiv = d3.select('#monsters')
            .append('div')
            .attr('id', 'monstersSelectDiv')
        ;

        this.svgBounds = d3.select('.collapsible').node().getBoundingClientRect();
        this.svgBounds.height = 500

        this.createMonsterGraphs();

        this.createMonsterSelect();
    }

    createMonsterGraphs() {
        let bigGraphColumn = this.monsterGraphsDiv
            .append('div')
            .attr('class', 'left-col')
            .attr('id', 'bigMonsterGraph')
        ;
        let smallMultiplesColumn = this.monsterGraphsDiv
            .append('div')
            .attr('class', 'right-col')
            .attr('id', 'smallMonsterGraphs')
        ;

        // append svg to bigGraphColumn
        bigGraphColumn.append('svg')
            .attr('width', this.svgBounds.width / 2)
            .attr('height', this.svgBounds.height)
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

        // append svg to smallMultiplesColumn
        // I might actually want a different svg for each chart?
        // idk, I'll figure that out later
        smallMultiplesColumn.append('svg')
            .attr('width', this.svgBounds.width / 2)
            .attr('height', this.svgBounds.height)
            .attr('id', 'smallMultiplesSVG')
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
    }

    createMonsterSelect() {
        // I think we'll display the selected monsters in a table
        // name | stat | stat | stat | etc...
    }

    updateCharts() {
        let changedValue = d3.event.target.value;
        let xAxisValue = document.getElementById('xAxisSelect').value;
        let yAxisValue = document.getElementById('yAxisSelect').value;
        let partitionValue = document.getElementById('pAxisSelect').value;
        if (this.axisOptions.map(v => v.json).includes(changedValue)) {
            // not changing partition, big chart needs updated as well
            let bigGraphSVG = d3.select('#bigGraphSVG');
            let bigXAxis = d3.scaleLinear()
                .range([0, (this.svgBounds / 2) - this.margin.left - this.margin.right])
                .domain([d3.min(
                    this.monsters.map(m => m.attributes[xAxisValue])
                )-1, d3.max(
                    this.monsters.map(m => m.attributes[xAxisValue])
                )+1])
            ;
            let bigYAxis = d3.scaleLinear()
                .range([0, (this.svgBounds.height) - this.margin.top - this.margin.bottom])
                .domain([d3.min(
                    this.monsters.map(m => m.attributes[yAxisValue])
                )-1, d3.max(
                    this.monsters.map(m => m.attributes[yAxisValue])
                )+1])
            ;
            // add x-axis
            bigGraphSVG.append('g')
                .attr('class', 'x-axis')
                .attr('transform', 'translate')
        }
        // always update the small multiples
    }

    addDefaultMonsters() {

    }
}