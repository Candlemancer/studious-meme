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

        // create button to add a party member
        this.partyDiv.append('button')
            .attr('type', 'button')
            .attr('class', 'button')
            .attr('id', 'addPartyMember')
            .text('Add Party Member')
            .on('click', a => this.displayAnotherMemberForm())
        ;
    }

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

    takeInput() {
        // take the stuff from the input elements, create an object with them
        let character = {};
        character['Name'] = document.getElementById('name').value;
        character['Class'] = document.getElementById('classSelect').value;
        character['CON'] = document.getElementById('CON').value;
        character['STR'] = document.getElementById('STR').value;
        character['DEX'] = document.getElementById('DEX').value;
        character['WIS'] = document.getElementById('WIS').value;
        character['INT'] = document.getElementById('INT').value;
        character['CHA'] = document.getElementById('CHA').value;
        console.log(character);
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
    }
}