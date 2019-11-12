# Basic Info
D&D 5e Monster Mashup (Embrace the Bar Chart)\
[Repository Link](https://github.com/Candlemancer/studious-meme)

Suzanne Rhodes LaBarge\
A01853855\
suzie.rhodes@aggiemail.usu.edu

<<<<<<< Updated upstream
# Background and Motivation
Dungeons and Dragons is a tabletop role-play game originally published in the 1970s, becoming popular in the 1980s and beyond. There are many other popular tabletop role-play games, but Dungeons and Dragons, affectionately known as D&D, is by far one of the most popular, often the only one known to people unfamiliar with tabletop role-play games.

A brief summary, for those unfamiliar with the concept, is that players create characters and follow the story told by the "Dungeon Master" (DM), rolling dice and referring to character statistics to determine how well they accomplish objectives that progress them along the story. One important aspect of this is combat, fighting any monsters that the players may encounter in the story. For the DM, who places these monsters along the path of the players, it's important to have monsters that can challenge the players and give them a sense of risk, but not have monsters that will simply kill the players' characters.

This aspect of D&D lead us to develop the idea for our project, as both group members enjoy playing D&D.

# Project Objectives
This is a tool developed to assist Dungeon Masters to create appropriately challenging encounters for their party.

# Data
=======
Jonathan Petersen\
A01236750\
Candlemancer@gmail.com

#Background and Motivation

# Project Objectives
This project is designed to help Dungeon Masters playing Fifth Edition Dungeons and Dragons (D&D 5e, D&D) build encounters and analyze their parties' fighting capabilities. Players of the game may also find it interesting to compare themselves against various foes, and we hope that it will give those without a D&D background digestable insights into the complexity of D&D combat. 

The major questions we hope to answer are as follows:
1. As a Dungeon Master, how well would my party fare against these monsters?
    - Will one group almost always beat the other?
    - What will it cost the victors to win?
    - How long is this fight going to take?

1. How does a particular monster compare to its peers?
    - Are there any outliers in a monster's attributes?
    - Is it much stronger or weaker than other similar monsters?
    - Are there groups or patterns in the monster data?

1. From a given starting party, what changes need to be made to win more fights?
    - Which party member dies first (i.e. is the weakest link)?
    - Which party member is most effective in combat?
    - Are there linchpin members of the party (i.e. if they die, the fight is over)?

# Data
Data will be sourced from official Wizards of the Coast Dungeons and Dragons Fifth Edition sourcebooks and the Systems Reference Document (SRD) found [here](https://dnd.wizards.com/articles/features/systems-reference-document-srd). Digitizations of this data will be sourced from the official digital toolset for DnD 5e, [D&D Beyond](https://www.dndbeyond.com/monsters). Additional digitizations of the data may be taken from the [Dungeons and Dragons Reddit community](https://www.reddit.com/r/DnD/), though much of that data is also sourced from D&D Beyond.

Some data on player characters will also be provided directly from the user for comparison against monster data. This data will have the same shape as the processed monster data, and appropriate defaults will be provided for users who are unfamiliar with building D&D 5e characters.

# Data Processing
This project will require some data cleanup. Digitization of the source material has already been done, but no single source lists every monster attribute in an appropriate format for display, so we'll either need to aggregate multiple tables of community data or scrape the web for the data ourselves. Depending on whether or not we decide to list monster variants as separate items, there's somewhere between 800 - 1400 items in the dataset, so some attributes will be easier for us to collect or digitize ourselves. Overall, I would not expect more than 15% of this project to be spent on data processing.

A complete listing of the monster attributes and their collection status is shown here (note that this set does not include monster variants):

| Attribute              | Attribute Type      | Status                           | 
|------------------------|---------------------|----------------------------------|
| Monster Name           | Categorical         | Collected                        |
| Size                   | Categorical         | Collected                        |
| Monster Type           | Categorical         | Collected                        |
| Alignment              | Categorical         | Collected                        |
| Ability Scores         | Quantitative        | Collected                        |
| Armor Class            | Quantitative        | Collected                        |
| Hit Points             | Quantitative        | Averages Only                    |
| Hit Dice               | Dual Categorical    | Unused                           |
| Damage Vulnerabilities | Categorical Series  | Unused                           |
| Damage Resistances     | Categorical Series  | Unused                           |
| Damage Immunities      | Categorical Series  | Unused                           |
| Effective Hit Points   | Quantitative        | Not Collected, Based on VRI      |
| Attack Bonus           | Quantitative        | Not Collected                    |
| Expected Damage        | Quantitative        | Not Collected                    |
| Save DCs               | Quantitative        | Not Collected                    |
| Abilities              | Multiple            | Not Collected                    |
| Actions                | Multiple            | Not Collected                    |
| Speed                  | Quantitative Series | Needs to be split into multiples |
| Saving Throws          | Quantitative Series | Needs to be split into multiples |
| Challenge Rating       | Quantitative        | Not Collected                    |
| Skills                 | Quantitative Series | Needs to be split into multiples, Needs numerical assignment |
| Condition Immunities   | Categorical Series  | Unused                           |
| Senses                 | Quantitative Series | Unused                           |
| Languages              | Categorical Series  | Unused                           |


#Visualization Design
asdf
>>>>>>> Stashed changes

# Data Processing

# Visualization Design
![Did I get the url right?](https://github.com/Candlemancer/studious-meme/blob/master/images/proposalSketch1.pdf)
![Once more](https://github.com/Candlemancer/studious-meme/blob/master/images/proposalSketch2.pdf)
![And the last I made](https://github.com/Candlemancer/studious-meme/blob/master/images/proposalSketch3.pdf)

<<<<<<< Updated upstream
# Must-Have Features
As the project is broken up into two primary parts, I'll mimic that in the features.

For the monster group selection, it is important that we have:
* a large scatterplot
  - display a point for every monster
  - axes are chosen by the user from the numeric attributes of the data
  - brushing and linking in coordination with the other monster charts
* small multiples scatterplots
  - same x and y axes as the large scatterplot
  - data is partitioned by a user-selected qualitative attribute
  - brushing and linking in coordination with the other monster charts
* a list of selected monsters
  - user selects monsters from drop-down list
* multiform bar charts
  - a bar chart for each quantitative attribute
  - shows selected monsters along x-axis
  - brushes and links across all charts, including scatterplots

For the simulations, it is important that we have:
* user input of party
  - can add between 0 and 8 players
  - each player has 6 base stats, class, and weapon
* party sidebar
  - displays a stacked bar chart of group statistics (x is each quantitative attribute, the sections of the bar are each member of the party)
  - displays a bar chart for each individual party member, same statistics as stacked bar chart
* monster sidebar
  - same layout as party sidebar
* summary statistics of simulations displayed in own column
  - Number of times players won and number of times players lost
  - Average number of party members that died
    + expands to show following charts when selected:
    + a bar chart where the x axis displays the number of players that died, the y axis displays the number of simulations that occurred in.
    + a bar chart where the x axis displays each monster, the y axis displays the average number of characters that monster killed
    + a bar chart where the x axis displays each player, the y axis displays the number of monsters that character killed
  - Average damage done by the party and average damage done by the monsters
    + damage dealt by party bar chart, x axis displays player, y axis displays damage
    + damage dealt by monsters bar chart, x axis displays monster, y axis displays damage
    + survivors hitpoint ratio stacked bar chart, x axis lists both monsters and players, y axis displays hp, the bar itself displays both damage taken and health left
  - the average amount of rounds it took until monsters or party is killed
    + 4 grouped bar charts, the groups are each individual member of the group, the x axis displays rounds and the y axis displays health points left
    + the 4 charts are, groups of players displaying the games they won, groups of players displaying the games they lost, groups of monsters displaying the games they won, groups of monsters displaying the games they lost

# Optional Features
We could add a lot of levels of sophistication to the simulation part, but we're going to start with a very basic simulation. Ideas we've floated for the simulation include weighting how we decide which member(s) of the group are targetted for an attack and displaying a chart of those.

We may add additional attributes besides those that came from the original spreadsheet, such as challenge level and environment.

May add a box and whisker chart of our summary statistics.

May add a pie chart of wins and losses.

Have some default groups of monsters and/or players that you could use to run simulations with. (Should make grading and testing easier, anyhow.)

Get pictures for the monsters and allow the user to have pictures for their players, we can use the pictures on their group sidebar.

# Project Schedule
To be finished by Nov 16:
* Get a good start on how to implement simulation and store the resulting data
* Get user input of party
* Get user input of monsters
* Display monster/player sidebars

To be finished by Nov 23:
* Have fully functioning simulation
* Display summary statistics
* This week has a little less stuff because it's Thanksgiving

To be finished by Nov 30:
* Monster comparison charts with brushing and linking
* Summary statistic charts

To be finished by Dec 6:
* Polish layout of website (shrinking/expanding)
* Wiggle room if we got behind
=======
#Project Schedule
>>>>>>> Stashed changes
