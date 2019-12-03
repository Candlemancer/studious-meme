

/**
 * This class can be used to simulate combat between two groups of Entities.
 */
class Simulator {

    /**
     * Constructor for the Simulator class.
     */
    constructor(panel, party, monsters) {
        this.panel = panel;
        this.party = party;
        this.monsters = monsters;
        this.summary = {};
        this.resetSummaryInfo();
    }

    /**
     * Resets all of the summary statistics.
     */
    resetSummaryInfo() {

        this.summary.numFights = 0;

        this.summary.wins = {
        players: 0,
        monsters: 0,
        }

        this.summary.damageSummary = {
        players: 0,
        monsters: 0,
        }

        this.summary.players = {};
        this.summary.monsters = {};

        for (const p of this.party) {
            this.summary.players[p.name] = {};
            this.summary.players[p.name].name = p.name;
            this.summary.players[p.name].damage = 0;
        }

        for (const m of this.monsters) {
            this.summary.monsters[m.name] = {};
            this.summary.monsters[m.name].name = m.name;
            this.summary.monsters[m.name].damage = 0;
        }

        this.summary.turns = 0;

        this.summary.avgTurns = 0.0;

        this.summary.runtime = "0 ms";

        // console.log(this.summary);
    }

    /**
     * Rolls a d##, where ## is the dieSize parameter.
     */
    rolld(dieSize) {
        return Math.floor(Math.random() * dieSize);
    }

    /**
     * Calculates initiative for a given enemy and assigns them a team.
     */
    rollInitative(entity, team) {

        // console.log("Rolling initiative for ", entity);
        let initiative = this.rolld(20) + entity.attributes.dex;

        return [initiative, entity, team];
    }

    /**
     * Simulate a number of battles, one after the other.
     */
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

    /**
     * Simulate a single battle.
     */
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


        while (combat.goodTeam.length > 0 && combat.badTeam.length > 0) {
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

                let toHit = this.rolld(20) + attackMod + combatant.proficiencyBonus;
                if (toHit < opponent.armorClass) { continue; }

                // Do damage
                let damage = this.rolld(12) + attackMod;
                opponent.currentHP -= damage;

                // console.log(name, "did", damage, "damage!");
                isPlayer ?
                    this.summary.players[combatant.name].damage += damage :
                    this.summary.monsters[combatant.name].damage += damage;

                isPlayer ?
                    this.summary.damageSummary.players += damage :
                    this.summary.damageSummary.monsters += damage;

                if (opponent.currentHP <= 0) {
                    // console.log(opponent.name, "was felled!");
                    opponents.shift();
                    if (opponents.length <= 0) { break; }
                }
            }

            this.summary.turns += 1;
        }

        combat.goodTeam.length > 0 ?
        this.summary.wins.players += 1 :
        this.summary.wins.monsters += 1;
        this.summary.numFights += 1;
    }
}
