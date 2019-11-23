
class Entity {
  // name;
  // currentHP;
  // maxHP;
  // armorClass;
  // attributes;
  // attackDice = {
  //   d4: 0,
  //   d6: 0,
  //   d8: 0,
  //   d10: 0,
  //   d12: 0,
  // };
  // proficiencyBonus;

  constructor(entityData) {
    this.name = entityData.name || entityData["Name"];
    this.maxHP = entityData.attributes ? entityData.attributes['hit-points'] : 25;
    this.currentHP = this.maxHP;

    this.armorClass = entityData.attributes ?
        entityData.attributes['armor-class'] :
        10 + entityData['DEX'];

    this.attributes = entityData.attributes ?
      {
        str: entityData.attributes['str-modifier'],
        dex: entityData.attributes['dex-modifier'],
        con: entityData.attributes['con-modifier'],
        int: entityData.attributes['int-modifier'],
        wis: entityData.attributes['wis-modifier'],
        cha: entityData.attributes['cha-modifier'],
      } :
      {
        str: Math.floor((entityData['STR'] - 10) / 2),
        dex: Math.floor((entityData['DEX'] - 10) / 2),
        con: Math.floor((entityData['CON'] - 10) / 2),
        int: Math.floor((entityData['INT'] - 10) / 2),
        wis: Math.floor((entityData['WIS'] - 10) / 2),
        cha: Math.floor((entityData['CHA'] - 10) / 2),
      };
    this.attackDice = {
      d4: 0,
      d6: 0,
      d8: 0,
      d10: 0,
      d12: 0,
    };
    this.attackDice.d6 += 2;

    this.proficiencyBonus = 4; // TODO
  }
}