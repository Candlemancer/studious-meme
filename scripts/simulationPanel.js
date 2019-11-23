

class SimulationPanel {

  constructor() {
    this.leftPanel = d3.select("#simLeft");
    this.midPanel = d3.select("#simMid");
    this.rightPanel = d3.select("#simRight");

    // d3.select("#simulation")
    //   .append("button")
    //   .text("Fight!")
    //   .attr("onclick", "simulateBattle()");
  }

  updatePlayerData(playerData) {
    console.log("Updating player info...");
    this.updateTeamData(this.leftPanel, playerData);
  }

  updateSimulationData(simData) {
    console.log("Updating simulation info...");

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
      .text("Simulation Runtime: " + simData.runtime);


      // .text("Wins: " + simData.wins.players);
  }

  updateMonsterData(monsterData) {
    console.log("Updating monster info...");
    this.updateTeamData(this.rightPanel, monsterData);
  }

  updateTeamData(selection, entityData) {
    selection.selectAll('p')
    .data(entityData)
    .join("p")
    .text(d => d.name);
  }

}