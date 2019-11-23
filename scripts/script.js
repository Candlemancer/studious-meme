let party = new Party();
let monsters;

d3.json('data/monsters.json').then(function(data){
    monsters = new Monsters(data);
});

party.addDefaultParty();

function simulateBattle() {

    let playerRoster = party.getPartyMembers().map(p => new Entity(p))

    var monsterRoster = [];
    for (var i = 0; i < 5; ++i)
    {
        let index = Math.floor(Math.random() * 799);
        monsterRoster.push(monsters.monsters[index]);
        console.log("added monster", index, ":", monsters.selectedMonsters[index]);
    }
    monsterRoster = monsterRoster.map(m => new Entity(m));

    console.log("Preparing fight between ", playerRoster, " and ", monsterRoster);

    var sim = new simulator(simPanel, playerRoster, monsterRoster);
    sim.simulate(500);

    simPanel.updatePlayerData(playerRoster);
    simPanel.updateMonsterData(monsterRoster);

}

let simPanel = new SimulationPanel();
