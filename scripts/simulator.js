

class simulator {

  constructor(panel, party, monsters) {
    this.panel = panel;
    this.party = party;
    this.monsters = monsters;
    this.summary = {};
    this.resetSummaryInfo();
  }

  resetSummaryInfo() {
    this.summary.wins = {
      players: 0,
      monsters: 0,
    }

    this.summary.damage = {
      players: 0,
      monsters: 0,
    }

    this.summary.turns = 0;

    this.summary.avgTurns = 0.0;

    this.summary.runtime = "0 ms";
  }

  rolld(dieSize) {
    return Math.floor(Math.random() * dieSize);
  }

  rollInitative(entity, team) {

    // console.log("Rolling initiative for ", entity);
    let initiative = this.rolld(20) + entity.attributes.dex;

    return [initiative, entity, team];
  }

  simulate(runs) {

    this.resetSummaryInfo();

    var startTime = Date.now();
    for (var i = 0; i < runs; ++i) {
      this.fight();
    }
    var endTime = Date.now();

    this.summary.avgTurns = this.summary.turns / runs;

    this.summary.runtime = endTime - startTime + " ms";
    this.panel.updateSimulationData(this.summary);

    // console.log(this.summary);
  }

  fight() {

    var combat = {
      goodTeam: this.party.slice(),
      badTeam: this.monsters.slice(),
      turnOrder: [],
    };

    // Add party members and monsters to combat
    combat.goodTeam.map(p => combat.turnOrder.push(this.rollInitative(p, "good")));
    combat.badTeam.map(p => combat.turnOrder.push(this.rollInitative(p, "bad")));

    // Sort combat from highest initiative to lowest
    combat.turnOrder.sort((a, b) => b[0] - a[0])
    // console.log("Initiative Order: ", combat);

    while (combat.goodTeam.length > 0 && combat.badTeam.length > 0)
    {
      for (var turn of combat.turnOrder) {
        let combatant = turn[1];

        // Choose target
        let isPlayer = turn[2] == "good";
        let opponents = isPlayer ? combat.badTeam : combat.goodTeam;
        let opponent = opponents[0];

        // console.log(combatant.name, "is fighting", opponent.name, "!");

        // Check for miss
        let attackMod = Math.max(
          combatant.attributes.str,
          combatant.attributes.dex);

        let toHit = this.rolld(20) + attackMod + combatant.proficiencyBonus; // TODO: Prof bonus?
        if (toHit < opponent.armorClass) {
          // console.log(toHit, "missed AC", combatant.armorClass);

          continue;
        }

        // Do damage
        let damage = this.rolld(12) + attackMod;
        opponent.currentHP -= damage;

        // console.log(name, "did", damage, "damage!");
        isPlayer ?
          this.summary.damage.players += damage :
          this.summary.damage.monsters += damage;

        if (opponent.currentHP <= 0) {
          // console.log(opponent.name, "was felled!");
          opponents.shift();

          if (opponents.length <= 0) {
            break;
          }
        }

        // break;
      }

      this.summary.turns += 1;
      // break;
    }

    combat.goodTeam.length > 0 ?
      this.summary.wins.players += 1 :
      this.summary.wins.monsters += 1;
  }











}