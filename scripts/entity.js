// Final Project
// CS 5890 - Data Visualization
// Suzie Rhodes, Jonathan Petersen

/**
 * The Entity Class is the main data representation used by the simulator.
 * It contains all attributes needed to simulate combat between two groups, and
 * can be used to represent either a Player Character or a monster.
 */
class Entity {

  /**
   * Fills out the entity data based on input gathered from the user or from the
   * monster.json. Performs any conversions needed to standardize the data.
   */
  constructor(entityData) {

    this.name = entityData.name || entityData["Name"];
    this.type = entityData.Class ? "player" : "monster";

    this.maxHP = entityData.attributes ?
      entityData.attributes['hit-points'] :
      this.calculateHitPointsForPlayer(entityData);
    this.currentHP = this.maxHP;

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

    this.armorClass = entityData.attributes ?
      entityData.attributes['armor-class'] :
      10 + this.attributes.dex;

    this.attackDice = {
      d4: 0,
      d6: 0,
      d8: 0,
      d10: 0,
      d12: 0,
      mod: 0,
    };

    this.attackDice.d6 += 2;

    this.proficiencyBonus = 4; // TODO
  }

  calculateHitPointsForPlayer(playerData) {

    // Figure out how many dice we've got
    let numDice = playerData.level;

    // And what type they are
    let dieType = 0;
    switch(playerData['Class']) {
      case 'Sorcerer':
      case 'Wizard':
        dieType = 6;
        break;

      case 'Bard':
      case 'Cleric':
      case 'Druid':
      case 'Monk':
      case 'Rogue':
      case 'Warlock':
        dieType = 8;
        break;

      case 'Fighter':
      case 'Paladin':
      case 'Ranger':
        dieType = 10;
        break;

      case 'Barbarian':
        dieType = 12;
    }

    // Roll all them dice.
    var total = dieType; // First level gets max HP.
    for (var i = 1; i < numDice; ++i) {
      total += Math.floor(Math.random() * dieType) + 1;
      total += Math.floor((playerData['CON'] - 10) / 2);
    }

    return total;
  }

  /*
  calculateAttacksForPlayer(playerData) {

    let attackDice = {
      d4: 0,
      d6: 0,
      d8: 0,
      d10: 0,
      d12: 0,
      mod: 0,
      num: 1,
      hit: 0,
    };

    let level = playerData['Level'];

    switch (playerData['Class']) {
      case 'Barbarian':
        attackDice.d12 = 1;
        attackDice.mod = this.attributes.str;

        // Rage Damage
        if (level < 9) { attackDice.mod += 2; }
        else if (level < 16) { attackDice.mod += 3; }
        else {attackDice.mod += 4; }

        // Extra Attacks
        if (level >= 5) {
          attackDice.num = 2;
        }

        attackDice.hit = attackDice.mod;
        break;

      case 'Bard':
        attackDice.d10 = 1;
        attackDice.mod = 0;
        attackDice.hit = this.attributes.cha;

        // Cantrip Scaling (Fire Bolt)
        if (level < 5) {}
        else if (level < 11) { attackDice.d10 *= 2; }
        else if (level < 17) { attackDice.d10 *= 3; }
        else { attackDice.d10 *= 4; }

        break;

      case 'Cleric':
        attackDice.d8 = 0.5;
        attackDice.mod = 0;
        attackDice.hit = this.attributes.wis;

        // Cantrip Scaling (Sacred Flame)
        if (level < 5) {}
        else if (level < 11) { attackDice.d8 *= 2; }
        else if (level < 17) { attackDice.d8 *= 3; }
        else { attackDice.d8 *= 4; }

        // Spiritual Weapon
        if (level < 3) {}
        else if (level < 7) {
          attackDice.d8 += 1;
          attackDice.mod += this.attributes.wis;
        }
        else if (level < 11) {
          attackDice.d8 += 2;
          attackDice.mod += this.attributes.wis;
        }
        else {
          attackDice.d8 += 3;
          attackDice.mod += this.attributes.wis;
        }

        break;

      case 'Druid':
        attackDice.d10 = 1;
        attackDice.mod = 5; // Wild Shape
        attackDice.hit = 5; // Wild Shape

        // Cantrip Scaling (Fire Bolt)
        if (level < 5) { }
        else if (level < 11) { attackDice.d10 *= 2; }
        else if (level < 17) { attackDice.d10 *= 3; }
        else { attackDice.d10 *= 4; }

        break;

      case 'Fighter':
        let m = Math.max([this.attributes.str, this.attributes.dex]);

        attackDice.d10 = 1;
        attackDice.mod = m;
        attackDice.hit = m;

        // Extra Attacks
        if (level < 5) { }
        else if (level < 11) { attackDice.num = 2; }
        else if (level < 20) { attackDice.num = 3; }
        else { attackDice.num = 4; }

        break;

      case 'Monk':
        attackDice.mod = this.attributes.dex;
        attackDice.hit = this.attributes.dex;
        attackDice.num = 3;

        // Monk Weapons
        if (level < 5) { attackDice.d4 = 1; }
        else if (level < 11) { attackDice.d6 = 1; }
        else if (level < 17) { attackDice.d8 = 1; }
        else { attackDice.d10 = 1; }

        break;

      case 'Paladin':
        let m = Math.max([this.attributes.str, this.attributes.dex]);

        attackDice.d10 = 1;
        attackDice.mod = m;
        attackDice.hit = m;

        // Extra Attack
        if (level > 5) { attackDice.num = 2; }

        // Divine Smite
        if (level < 2) {}
        else if (level < 5) { attackDice.d8 = 2; }
        else if (level < 9) { attackDice.d8 = 3; }
        else if (level < 13) { attackDice.d8 = 4; }
        else { attackDice.d8 = 5; }

        break;

      case 'Ranger':
        attackDice.d10 = 1;
        attackDice.mod = 0;
        attackDice.hit = this.attributes.wis;

        // Cantrip Scaling (Fire Bolt)
        if (level < 5) { }
        else if (level < 11) { attackDice.d10 *= 2; }
        else if (level < 17) { attackDice.d10 *= 3; }
        else { attackDice.d10 *= 4; }

        break;

      case 'Rogue':
      case 'Sorcerer':
      case 'Warlock':
      case 'Wizard':
        attackDice.d10 = 1;
        attackDice.mod = 0;

        // Cantrip Scaling (Fire Bolt)
        if (level < 5) { }
        else if (level < 11) { attackDice.d10 *= 2; }
        else if (level < 17) { attackDice.d10 *= 3; }
        else { attackDice.d10 *= 4; }
    }
  }
  */
}
