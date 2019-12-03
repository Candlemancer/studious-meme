
/**
 * Class used to manage the panel showing simulation information.
 */
class SimulationPanel {

    /**
     * Constructor for the SimulationPanel class
     */
    constructor() {
        this.contentRows = d3.select("#simulation");
        this.controls = this.contentRows.append("div")
            .attr("class", "controls");

        this.controls.append("button")
            .text("Fight!")
            .on("click", simulateBattle);

        this.resultDisplay = this.contentRows.append("div")
            .attr("class", "simSummary");

        let rosters = this.addInfoRow(this.contentRows, "rosterRow", "Rosters");
        rosters.select(".simLeft")
            .classed("roster", true)
            .append("h2")
            .text("Player Characters");

        rosters.select(".simRight")
            .classed("roster", true)
            .append("h2")
            .text("Selected Monsters");

        this.chartWidth = 400;
        this.chartHeight = 300;

        this.axisWidth = 30;
        this.axisHeight = 150;

        this.svgPadding = 10;

        this.addStatRow(this.contentRows, "hpRow", "Hit Points");
        this.addStatRow(this.contentRows, "acRow", "Armor Class");
        this.addStatRow(this.contentRows, "damageRow", "Damage Dealt");
        this.addStatRow(this.contentRows, "strRow", "STR Modifier");
        this.addStatRow(this.contentRows, "dexRow", "DEX Modifier");
        this.addStatRow(this.contentRows, "conRow", "CON Modifier");
        this.addStatRow(this.contentRows, "intRow", "INT Modifier");
        this.addStatRow(this.contentRows, "wisRow", "WIS Modifier");
        this.addStatRow(this.contentRows, "chaRow", "CHA Modifier");


        // this.addStatChart(this.leftPanel, "strChart", "STR Modifier");
        // this.addStatChart(this.rightPanel, "strChart", "STR Modifier");

        // this.addStatChart(this.leftPanel, "dexChart", "DEX Modifier");
        // this.addStatChart(this.rightPanel, "dexChart", "DEX Modifier");

        // this.addStatChart(this.leftPanel, "conChart", "CON Modifier");
        // this.addStatChart(this.rightPanel, "conChart", "CON Modifier");

        // this.addStatChart(this.leftPanel, "intChart", "INT Modifier");
        // this.addStatChart(this.rightPanel, "intChart", "INT Modifier");

        // this.addStatChart(this.leftPanel, "wisChart", "WIS Modifier");
        // this.addStatChart(this.rightPanel, "wisChart", "WIS Modifier");

        // this.addStatChart(this.leftPanel, "chaChart", "CHA Modifier");
        // this.addStatChart(this.rightPanel, "chaChart", "CHA Modifier");

        visitCollapsible(updateCollapsibles);
    }

    addInfoRow(selection, className, title) {
        let header = selection.append("button")
            .attr("class", "collapsible")
            .style("width", "80%")
            .text(title);

        assignHandler(header.node(), "flex");

        let row = selection.append("div")
            .classed(className, true)
            .classed("simRow", true);

        row.append("div")
            .classed("simLeft", true)
            .classed("simCol", true);

        row.append("div")
            .classed("simRight", true)
            .classed("simCol", true);

        return row
    }

    /**
     * Adds an svg element to the panel that can be later filled with info.
     */
    addStatRow(selection, className, title)
    {
        let row = this.addInfoRow(selection, className, title)

        let addSvg = (selection) => {
            selection.append("svg")
                .attr("width", this.chartWidth + this.axisWidth + 2 * this.svgPadding)
                .attr("height", this.chartHeight + this.axisHeight + 2 * this.svgPadding)
                .attr("class", className)
                .append("g")
                .attr("transform",
                    `translate(${this.svgPadding}, ${this.chartHeight + this.axisHeight + this.svgPadding}) scale(1, -1)`)
        }

        let left = row.select(".simLeft")
            .classed(className, true);

        addSvg(left);


        let right = row.select(".simRight")
            .classed(className, true);

        addSvg(right);
    }

    /**
     * Updates the data on the left representing the players.
     */
    updatePlayerData(playerData) {
        console.log("Updating player info...");
        this.updateTeamData(this.contentRows, ".simLeft", playerData);
    }

    /**
     * Updates the data on the right representing the monsters.
     */
    updateMonsterData(monsterData) {
        console.log("Updating monster info...");
        this.updateTeamData(this.contentRows, ".simRight", monsterData);
    }

    /**
     * Updates the data in the center representing overall simulation results.
     */
    updateSimulationData(simData) {
        // console.log("Updating simulation info...");

        this.resultDisplay.selectAll('p')
            .remove();

        this.resultDisplay
            .append("p")
            .text("Total Combats: " + simData.numFights.toLocaleString());

        this.resultDisplay
            .append("p")
            .text("Player Wins: " + simData.wins.players.toLocaleString() +
                " (" +
                Math.floor((simData.wins.players / simData.numFights) * 100) +
                "%)");

        this.resultDisplay
            .append("p")
            .text("Monster Wins: " + simData.wins.monsters.toLocaleString() +
                " (" +
                Math.floor((simData.wins.monsters / simData.numFights) * 100) +
                "%)");

        this.resultDisplay
            .append("p")
            .text("Total Damage Dealt by All Players: " +
                simData.damageSummary.players.toLocaleString());

        this.resultDisplay
            .append("p")
            .text("Total Damage Dealt by All Monsters: " +
                simData.damageSummary.monsters.toLocaleString());

        this.resultDisplay
            .append("p")
            .text("Total Turns: " + simData.turns.toLocaleString());

        this.resultDisplay
            .append("p")
            .text("Average Turns Per Battle: " +
                simData.avgTurns.toLocaleString());

        this.resultDisplay
            .append("p")
            .text("Simulation Runtime: " + simData.runtime);

        this.drawBarAttribute(
            this.contentRows.select(".damageRow.simLeft"),
            Object.values(simData.players),
            [0, 15000],
            "damage");

        this.drawBarAttribute(
            this.contentRows.select(".damageRow.simRight"),
            Object.values(simData.monsters),
            [0, 15000],
            "damage");

    }

    /**
     * Generic function that updates data for players or monsters based on the
     * data passed in as arguments.
     */
    updateTeamData(selection, columnClass, entityData) {

        // Fill out the Team Roster
        selection.select(".roster" + columnClass)
            .selectAll('p')
            .data(entityData)
            .join("p")
            .text(d => d.name);

        // Fill out the Charts
        this.drawBarAttribute(selection.select(".hpRow" + columnClass), entityData, [0, 400], "maxHP");
        this.drawBarAttribute(selection.select(".acRow" + columnClass), entityData, [0, 30], "armorClass");

        // TODO: Many of these are negative
        const MAX_ATTR_MOD = 10;
        const ATTR_DOMAIN = [-MAX_ATTR_MOD, MAX_ATTR_MOD];
        this.drawBarAttribute(selection.select(".strRow" + columnClass), entityData, ATTR_DOMAIN, "str", true);
        this.drawBarAttribute(selection.select(".dexRow" + columnClass), entityData, ATTR_DOMAIN, "dex", true);
        this.drawBarAttribute(selection.select(".conRow" + columnClass), entityData, ATTR_DOMAIN, "con", true);
        this.drawBarAttribute(selection.select(".intRow" + columnClass), entityData, ATTR_DOMAIN, "int", true);
        this.drawBarAttribute(selection.select(".wisRow" + columnClass), entityData, ATTR_DOMAIN, "wis", true);
        this.drawBarAttribute(selection.select(".chaRow" + columnClass), entityData, ATTR_DOMAIN, "cha", true);

        // selection.select(".hpChart")
        //     .select("g")
        //     .selectAll("rect")
        //     .data(entityData)
        //     .join("rect")
        //     .attr("x", d => xScale(d.name))
        //     .attr("y", 0)
        //     .attr("width", xScale.bandwidth())
        //     .attr("height", d => d.maxHP);
    }

    /**
     * Draws a (very) basic bar chart based on the data provided.
     */
    drawBarAttribute(selection, data, domain, attributeName, isAttr = false) {
        let names = data.map(e => e.name);

        // Setup Scales
        let xScale = d3.scaleBand()
            .domain(names)
            .range([this.axisWidth, this.chartWidth + this.axisWidth])
            .paddingInner(0.05);

        let xAxisScale = d3.scaleBand()
            .domain(names)
            .range([0, this.chartWidth]);

        let yScale = d3.scaleLinear()
            .domain(domain)
            .range([this.axisHeight, this.chartHeight + this.axisHeight]);

        let yAxisScale = d3.scaleLinear()
            .domain(domain)
            .range([this.chartHeight, 0]);

        // Setup Axes
        let xAxis = d3.axisBottom(xAxisScale)
            .tickFormat((d, i) => d);

        let yAxis = d3.axisLeft(yAxisScale)
            .tickFormat((d, i) => d);

        // Handle negatives
        let attrGetter = (d) => {
            return isAttr ?
                (d.attributes[attributeName]) :
                (d[attributeName]);
        }

        let barBottom = d => Math.min(yScale(attrGetter(d)), yScale(0));
        let barHeight = d => yScale(Math.abs(attrGetter(d))) - yScale(0);

        // Draw the dang thing
        selection.selectAll(".simAxis").remove();

        selection.select("svg")
            .append("g")
            .attr("class", "simAxis")
            .attr("transform", `translate(${this.axisWidth - 1 + this.svgPadding}, ${this.svgPadding})`)
            .call(yAxis);

        selection.select("g")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", d => xScale(d.name))
            .attr("y", d => barBottom(d))
            // .attr("y", d => {
            //     console.log("---------------------")
            //     console.log("value:" + attrGetter(d));
            //     console.log("bottom:" + barBottom(d));
            //     console.log("zero:" + yScale(0));
            //     console.log("height:" + barHeight(d));

            //     return barBottom(d);
            // })
            .attr("width", xScale.bandwidth())
            .attr("height", d => barHeight(d));

        selection.select("svg")
            .append("g")
            .attr("class", "simAxis")
            .attr("transform",
                `translate(${this.axisWidth - 1 + this.svgPadding}, ${this.chartHeight + 1 + this.svgPadding})`)
            .call(xAxis)
            .selectAll('text')
            .style('text-anchor', 'end')
            .attr('dx', '-.8em')
            .attr('dy', '.15em')
            .attr('transform', 'rotate(-65)');
    }

}
