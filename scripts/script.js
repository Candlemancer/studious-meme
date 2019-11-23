
// setup the party panel
let party = new Party();
party.addDefaultParty();

// Setup the monster panel
let monsterPanel;

d3.json('data/monsters.json').then(function(data){
    monsterPanel = new Monsters(data);
});

// Setup the simulation panel
let simPanel = new SimulationPanel();


/**
 * Callback for simulation button
 */
function simulateBattle() {

    let playerRoster = party.getPartyMembers().map(p => new Entity(p))
    let monsterRoster = getRandomMonsters().map(m => new Entity(m));

    // console.log("Preparing fight between ", playerRoster, " and ", monsterRoster);

    var sim = new Simulator(simPanel, playerRoster, monsterRoster);
    sim.simulate(500);

    simPanel.updatePlayerData(playerRoster);
    simPanel.updateMonsterData(monsterRoster);
}

/**
 * Function used to get a selection of random monsters.
 */
function getRandomMonsters()
{
    const NUM_MONSTERS = 10;
    var randomMonsters = [];
    for (var i = 0; i < NUM_MONSTERS; ++i) {
        let index = Math.floor(Math.random() * 799);
        let m = monsterPanel.monsters[index]

        // TODO: Figure out why sometimes this happens.
        if (m == undefined) {
            --i;
            continue;
        }

        randomMonsters.push(m);
        // console.log("added monster", index, ":", monsters.selectedMonsters[index]);
    }

    return randomMonsters;
}
