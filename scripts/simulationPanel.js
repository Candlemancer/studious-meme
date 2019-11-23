
/**
 * Class used to manage the panel showing simulation information.
 */
class SimulationPanel {

    /**
     * Constructor for the SimulationPanel class
     */
    constructor() {
        this.leftPanel = d3.select("#simLeft");
        this.midPanel = d3.select("#simMid");
        this.rightPanel = d3.select("#simRight");

        this.chartWidth = 400;
        this.chartHeight = 300;

        this.leftPanel.append("div")
            .attr("class", "roster");

        this.rightPanel.append("div")
            .attr("class", "roster");

        this.addStatChart(this.leftPanel, "hpChart", "Maximum HP");
        this.addStatChart(this.rightPanel, "hpChart", "Maximum HP");

        this.addStatChart(this.leftPanel, "acChart", "Armor Class");
        this.addStatChart(this.rightPanel, "acChart", "Armor Class");

        this.addStatChart(this.leftPanel, "strChart", "STR Modifier");
        this.addStatChart(this.rightPanel, "strChart", "STR Modifier");

        this.addStatChart(this.leftPanel, "dexChart", "DEX Modifier");
        this.addStatChart(this.rightPanel, "dexChart", "DEX Modifier");

        this.addStatChart(this.leftPanel, "conChart", "CON Modifier");
        this.addStatChart(this.rightPanel, "conChart", "CON Modifier");

        this.addStatChart(this.leftPanel, "intChart", "INT Modifier");
        this.addStatChart(this.rightPanel, "intChart", "INT Modifier");

        this.addStatChart(this.leftPanel, "wisChart", "WIS Modifier");
        this.addStatChart(this.rightPanel, "wisChart", "WIS Modifier");

        this.addStatChart(this.leftPanel, "chaChart", "CHA Modifier");
        this.addStatChart(this.rightPanel, "chaChart", "CHA Modifier");
    }

    /**
     * Adds an svg element to the panel that can be later filled with info.
     */
    addStatChart(selection, className, title)
    {
        selection.append("svg")
            .attr("width", this.chartWidth)
            .attr("height", this.chartHeight)
            .attr("class", className)
            .append("g")
            .attr("transform", "translate(0, 300) scale(1, -1)")

        selection.append("p")
            .text(title);
    }

    /**
     * Updates the data on the left representing the players.
     */
    updatePlayerData(playerData) {
        // console.log("Updating player info...");
        this.updateTeamData(this.leftPanel, playerData);
    }

    /**
     * Updates the data on the right representing the monsters.
     */
    updateMonsterData(monsterData) {
        // console.log("Updating monster info...");
        this.updateTeamData(this.rightPanel, monsterData);
    }

    /**
     * Updates the data in the center representing overall simulation results.
     */
    updateSimulationData(simData) {
        // console.log("Updating simulation info...");

        this.midPanel.selectAll('p')
            .remove();

        this.midPanel
          .append("p")
          .text("Player Wins: " + simData.wins.players);

        this.midPanel
          .append("p")
          .text("Monster Wins: " + simData.wins.monsters);

        this.midPanel
          .append("p")
          .text("Damage Dealt by Players: " + simData.damage.players);

        this.midPanel
          .append("p")
          .text("Damage Dealt by Monsters: " + simData.damage.monsters);

        this.midPanel
          .append("p")
          .text("Total Turns: " + simData.turns);

        this.midPanel
          .append("p")
          .text("Average Turns Per Battle: " + simData.avgTurns);

        this.midPanel
          .append("p")
          .text("Simulation Runtime: " + simData.runtime);


        // .text("Wins: " + simData.wins.players);
    }

    /**
     * Generic function that updates data for players or monsters based on the
     * data passed in as arguments.
     */
    updateTeamData(selection, entityData) {

        // console.log(entityData);

        // Fill out the Team Roster
        selection.select(".roster")
            .selectAll('p')
            .data(entityData)
            .join("p")
            .text(d => d.name);

        // Fill out the Charts
        this.drawBarAttribute(selection, entityData, 300, "hpChart", "maxHP");
        this.drawBarAttribute(selection, entityData, 30, "acChart", "armorClass");

        // TODO: Many of these are negative
        this.drawBarAttribute(selection, entityData, 10, "strChart", "str", true);
        this.drawBarAttribute(selection, entityData, 10, "dexChart", "dex", true);
        this.drawBarAttribute(selection, entityData, 10, "conChart", "con", true);
        this.drawBarAttribute(selection, entityData, 10, "intChart", "int", true);
        this.drawBarAttribute(selection, entityData, 10, "wisChart", "wis", true);
        this.drawBarAttribute(selection, entityData, 10, "chaChart", "cha", true);


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
    drawBarAttribute(selection, data, maxValue, className, attributeName, isAttr = false) {
        let names = data.map(e => e.name);

        let xScale = d3.scaleBand()
            .domain(names)
            .range([0, this.chartWidth])
            .paddingInner(0.05);

        let yScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([0, this.chartHeight]);

        selection.select("." + className)
            .select("g")
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", d => xScale(d.name))
            .attr("y", 0)
            .attr("width", xScale.bandwidth())
            .attr("height", d => {
                return isAttr ?
                yScale(d.attributes[attributeName]) :
                yScale(d[attributeName]);
            });
    }
}
