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
            { json: "alignment",
              "option-text": "Alignment",
              "options": [
                  "Lawful Good",
                  "Neutral Good",
                  "Chaotic Good",
                  "Lawful Neutral",
                  "Neutral",
                  "Chaotic Neutral",
                  "Lawful Evil",
                  "Neutral Evil",
                  "Chaotic Evil",
                  "Any Evil Alignment",
                  "Any Non-Good Alignment",
                  "Any Non-Lawful Alignment",
                  "Any Chaotic Alignment",
                  "Unaligned",
                  "Any Alignment"
              ]
            },
            { json: "monster-size",
              "option-text": "Monster Size",
              "options": [
                  "Tiny",
                  "Small",
                  "Medium",
                  "Large",
                  "Huge",
                  "Gargantuan"
              ]
            },
            { json: "monster-type", 
              "option-text": "Monster Type",
              "options": [
                  "Humanoid",
                  "Aberration",
                  "Monstrosity",
                  "Fiend",
                  "Dragon",
                  "Undead",
                  "Ooze",
                  "Elemental",
                  "Beast",
                  "Construct",
                  "Fey",
                  "Plant",
                  "Giant",
                  "Celestial"
              ]
            }
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
            .attr('id', 'smallMonsterGraphsDiv')
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

        // trigger updateCharts
        this.updateCharts();
    }

    createMonsterSelect() {
        // I think we'll display the selected monsters in a table
        // name | stat | stat | stat | etc...
    }

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

    updateBigChart() {
        let xAxisValue = document.getElementById('xAxisSelect').value;
        let yAxisValue = document.getElementById('yAxisSelect').value;
        let xAxisHeight = 20;
        let yAxisWidth = 20;

        let bigGraphSVG = d3.select('#bigGraphSVG');
        // remove what's there so we can make the new chart
        document.getElementById('bigGraphSVG').innerHTML = '';

        let bigXScale = d3.scaleLinear()
            .range([yAxisWidth, (this.svgBounds.width / 2) - this.margin.left - this.margin.right])
            .domain([d3.min(
                this.monsters.map(m => m.attributes[xAxisValue])
            )-1, d3.max(
                this.monsters.map(m => m.attributes[xAxisValue])
            )+1])
        ;
        let bigYScale = d3.scaleLinear()
            .range([0, (this.svgBounds.height) - this.margin.top - this.margin.bottom])
            .domain([d3.min(
                this.monsters.map(m => m.attributes[yAxisValue])
            )-1, d3.max(
                this.monsters.map(m => m.attributes[yAxisValue])
            )+1])
        ;
        // add x-axis
        let bigXAxis = d3.axisBottom(bigXScale)
            .tickFormat((d,i) => d)
        ;
        bigGraphSVG.append('g')
            .attr('class', 'x-axis')
            .attr('transform', `translate(0, ${this.svgBounds.height-xAxisHeight})`)
            .call(bigXAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-65)');
        ;
        // add y-axis
        let bigYAxis = d3.axisLeft(bigYScale)
            .tickFormat((d,i) => d)
        ;
        bigGraphSVG.append('g')
            .attr('class', 'y-axis')
            .attr('transform', `translate(${yAxisWidth}, ${this.svgBounds.height-xAxisHeight}) scale(1,-1)`)
            .call(bigYAxis)
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
            .attr('r', '3')
            .attr('cx', m => bigXScale(m.attributes[xAxisValue]))
            .attr('cy', m => this.svgBounds.height - (bigYScale(m.attributes[yAxisValue])+xAxisHeight))
            .on('click', d => this.selectMonster())
        ;
    }

    updateSmallMultiples() {
        let xAxisValue = document.getElementById('xAxisSelect').value;
        let yAxisValue = document.getElementById('yAxisSelect').value;
        let svgWidth = (this.svgBounds.width / 6)-10;
        let partitionValue = document.getElementById('pAxisSelect').value;
        let partitions = this.partitionOptions.find(opt => opt.json === partitionValue).options;
        // always update the small multiples
        document.getElementById('smallMultiplesDivForSVGs').innerHTML = '';
        // append the correct number of charts
        d3.select('#smallMultiplesDivForSVGs')
            .selectAll('svg')
            .data(partitions)
            .enter()
            .append('svg')
            .attr('width', svgWidth)
            .attr('height', svgWidth)
            .attr('class', v => `${v} multiple`)
        ;
    }

    selectMonster() {
        let selectedCircle = d3.event.target;
        let selectedMonster = d3.event.target.__data__;
        this.selectedMonsters.push(selectedMonster);
        console.log(this.selectedMonsters);
    }
}