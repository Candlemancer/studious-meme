let party = new Party();
d3.json('data/monsters.json').then(function(data){
    let monsters = new Monsters(data);
});