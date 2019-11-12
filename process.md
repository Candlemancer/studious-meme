# Basic Info
D&D 5e Monster Mashup (Embrace the Bar Chart)
[The repo](https://github.com/Candlemancer/studious-meme)

Suzanne Rhodes LaBarge
A01853855
suzie.rhodes@aggiemail.usu.edu

# Background and Motivation
Dungeons and Dragons is a tabletop role-play game originally published in the 1970s, becoming popular in the 1980s and beyond. There are many other popular tabletop role-play games, but Dungeons and Dragons, affectionately known as D&D, is by far one of the most popular, often the only one known to people unfamiliar with tabletop role-play games.

A brief summary, for those unfamiliar with the concept, is that players create characters and follow the story told by the "Dungeon Master" (DM), rolling dice and referring to character statistics to determine how well they accomplish objectives that progress them along the story. One important aspect of this is combat, fighting any monsters that the players may encounter in the story. For the DM, who places these monsters along the path of the players, it's important to have monsters that can challenge the players and give them a sense of risk, but not have monsters that will simply kill the players' characters.

This aspect of D&D lead us to develop the idea for our project, as both group members enjoy playing D&D.

# Project Objectives
This is a tool developed to assist Dungeon Masters to create appropriately challenging encounters for their party.

# Data

# Data Processing

# Visualization Design
![Did I get the url right?](https://github.com/Candlemancer/studious-meme/blob/master/images/proposalSketch1.pdf)
![Once more](https://github.com/Candlemancer/studious-meme/blob/master/images/proposalSketch2.pdf)
![And the last I made](https://github.com/Candlemancer/studious-meme/blob/master/images/proposalSketch3.pdf)

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
