let party = new Party();
let monsterList;

d3.json('data/monsters.json').then(function(data){
    monsterList = new Monsters(data);
});

party.addDefaultParty();

function simulateBattle() {

    let playerRoster = party.getPartyMembers().map(p => new Entity(p))

    const NUM_MONSTERS = 10;
    var randomMonsters = [];
    for (var i = 0; i < NUM_MONSTERS; ++i)
    {
        let index = Math.floor(Math.random() * 799);
        let m = monsterList.monsters[index];

        // TODO: Figure out why sometimes this happens.
        if (m == undefined) {
            --i;
            continue;
        }

        randomMonsters.push(m);
        // console.log("added monster", index, ":", m);
    }
    monsterRoster = randomMonsters.map(m => new Entity(m));

    // console.log("Preparing fight between ", playerRoster, " and ", monsterRoster);

    var sim = new simulator(simPanel, playerRoster, monsterRoster);
    sim.simulate(500);

    simPanel.updatePlayerData(playerRoster);
    simPanel.updateMonsterData(monsterRoster);

}

let simPanel = new SimulationPanel();
