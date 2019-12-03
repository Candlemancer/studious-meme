
/**
 * The Party class represents the group of player characters to be used for
 * combat simulations.
 */
class Party {
    /**
     * Constructor for Party creation section
     */
    constructor() {
        this.partyMemberList = [];
        this.partyDiv = d3.select('#party');

        // list of possible classes for party members
        this.classes = [
            'Barbarian',
            'Bard',
            'Cleric',
            'Druid',
            'Fighter',
            'Monk',
            'Paladin',
            'Ranger',
            'Rogue',
            'Sorcerer',
            'Warlock',
            'Wizard'
        ];

        // create a div at the top where party members will be displayed
        this.membersDiv = this.partyDiv
            .append('div')
            .attr('id', 'displayMembers')
        ;

        // create button to add a party member
        this.partyDiv.append('button')
            .attr('type', 'button')
            .attr('class', 'button')
            .attr('id', 'addPartyMember')
            .text('Add Party Member')
            .on('click', a => this.displayAnotherMemberForm())
        ;
    }

    /**
     * Add another set of input fields for adding party members
     */
    displayAnotherMemberForm() {
        if (this.partyMemberList.length <= 8) {
            // remove the 'add party member' button
            let addButton = document.getElementById('addPartyMember');
            addButton.parentNode.removeChild(addButton);

            // display the form to get info on the character
            let memberDiv = this.partyDiv
                .append('div')
                .attr('id', 'personInput')
            ;
            memberDiv.append('label')
                .attr('for', 'name')
                .text('Name: ')
            ;
            memberDiv.append('input')
                .attr('type', 'text')
                .attr('id', 'name')
            ;
            memberDiv.append('label')
                .attr('for', 'level')
                .text('Level: ')
            ;
            memberDiv.append('input')
                .attr('type', 'text')
                .attr('id', 'level')
            ;
            memberDiv.append('label')
                .attr('for', 'class')
                .text('Class: ')
            ;
            let classSelect = memberDiv.append('select')
                .attr('name', 'class')
                .attr('id', 'classSelect')
            ;
            classSelect.selectAll('option')
                .data(this.classes)
                .enter()
                .append('option')
                .attr('value', o => o)
                .text(o => o)
            ;
            memberDiv.append('label')
                .attr('for', 'CON')
                .text('CON: ')
            ;
            memberDiv.append('input')
                .attr('type', 'text')
                .attr('id', 'CON')
            ;
            memberDiv.append('label')
                .attr('for', 'STR')
                .text('STR: ')
            ;
            memberDiv.append('input')
                .attr('type', 'text')
                .attr('id', 'STR')
            ;
            memberDiv.append('label')
                .attr('for', 'DEX')
                .text('DEX: ')
            ;
            memberDiv.append('input')
                .attr('type', 'text')
                .attr('id', 'DEX')
            ;
            memberDiv.append('label')
                .attr('for', 'WIS')
                .text('WIS: ')
            ;
            memberDiv.append('input')
                .attr('type', 'text')
                .attr('id', 'WIS')
            ;
            memberDiv.append('label')
                .attr('for', 'INT')
                .text('INT: ')
            ;
            memberDiv.append('input')
                .attr('type', 'text')
                .attr('id', 'INT')
            ;
            memberDiv.append('label')
                .attr('for', 'CHA')
                .text('CHA: ')
            ;
            memberDiv.append('input')
                .attr('type', 'text')
                .attr('id', 'CHA')
            ;
            memberDiv.append('button')
                .attr('class', 'button')
                .text('Submit')
                .on('click', a => this.takeInput())
            ;
        }
    }

    /**
     * Gather the input from the website and store it in our data structures.
     */
    takeInput() {
        // take the stuff from the input elements, create an object with them
        let character = {};
        character['Name'] = document.getElementById('name').value;
        character['Level'] = document.getElementById('level').value;
        character['Class'] = document.getElementById('classSelect').value;
        character['CON'] = document.getElementById('CON').value;
        character['STR'] = document.getElementById('STR').value;
        character['DEX'] = document.getElementById('DEX').value;
        character['WIS'] = document.getElementById('WIS').value;
        character['INT'] = document.getElementById('INT').value;
        character['CHA'] = document.getElementById('CHA').value;
        // save that object in this.partyMemberList
        this.partyMemberList.push(character);
        // remove the form elements, add in addPartyMember button
        let personInput = document.getElementById('personInput');
        personInput.parentNode.removeChild(personInput);
        this.partyDiv.append('button')
            .attr('type', 'button')
            .attr('class', 'button')
            .attr('id', 'addPartyMember')
            .text('Add Party Member')
            .on('click', a => this.displayAnotherMemberForm())
        ;
        // display all the members of the group
        this.updatePartyMembersDisplay();
    }

    /**
     * Update the party member panel when the data changes.
     */
    updatePartyMembersDisplay() {
        // add current party composition
        let divWithData = this.membersDiv.selectAll('div .member')
            .data(this.partyMemberList)
        ;
        // remove anyone who was deleted
        divWithData.exit().remove();
        // add anyone who needs added
        let groups = divWithData.enter()
            .append('div')
            .attr('class', 'member')
        ;
        groups.append('h3')
            .text(m => `${m.Name} the ${m.Class}`)
        ;
        groups.append('p')
            .text(m => `Level: ${m.Level}`)
            .style('font-weight', 'bold')
        ;
        groups.append('p')
            .text(m => `CON: ${m.CON},  STR: ${m.STR},  DEX: ${m.DEX},  WIS: ${m.WIS},  INT: ${m.INT},  CHA: ${m.CHA}`)
        ;
        groups.append('button')
            .text('Remove')
            .attr('class', 'removeButton')
            .on('click', m => {
                let sectionToRemove = d3.event.target.parentNode;
                let memberToRemove = sectionToRemove.childNodes[0].__data__;
                this.partyMemberList = this.partyMemberList.filter(m => m.Name !== memberToRemove.Name && m.Class != memberToRemove.Class);
                sectionToRemove.parentNode.removeChild(sectionToRemove);
            })
        ;
    }

    /**
     * Return a list of the current party members.
     */
    getPartyMembers() {
      return this.partyMemberList;
    }

    /**
     * Add a party member to the list from a data source. Used for default
     * character sets.
     */
    addPartyMember(member) {
      // console.log("adding", member)
      this.partyMemberList.push(member);
    }

    /**
     * Adds a default party to the roster.
     */
    addDefaultParty() {

        this.addPartyMember({
            Name: "Barbara",
            Level: 7,
            Class: "Barbarian",
            STR: 20,
            DEX: 11,
            CON: 18,
            INT: 8,
            WIS: 14,
            CHA: 10
        });

        this.addPartyMember({
            Name: "Claire",
            Level: 7,
            Class: "Cleric",
            STR: 14,
            DEX: 14,
            CON: 10,
            INT: 11,
            WIS: 16,
            CHA: 8
        });

        this.addPartyMember({
            Name: "Locke",
            Level: 6,
            Class: "Warlock",
            STR: 8,
            DEX: 16,
            CON: 10,
            INT: 14,
            WIS: 14,
            CHA: 18
        });

        this.addPartyMember({
            Name: "Wiz",
            Level: 7,
            Class: "Wizard",
            STR: 8,
            DEX: 8,
            CON: 14,
            INT: 20,
            WIS: 16,
            CHA: 12
        });

        this.addPartyMember({
            Name: "Rogue",
            Level: 6,
            Class: "Rogue",
            STR: 12,
            DEX: 18,
            CON: 14,
            INT: 16,
            WIS: 12,
            CHA: 18
        });

        this.updatePartyMembersDisplay();
    }

}
