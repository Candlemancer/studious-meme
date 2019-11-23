# Basic Info
D&D 5e Monster Mashup (Embrace the Bar Chart)\
[Repository Link](https://github.com/Candlemancer/studious-meme)\
[Website Link](https://candlemancer.github.io/studious-meme)

Suzanne Rhodes LaBarge\
A01853855\
suzie.rhodes@aggiemail.usu.edu

Jonathan Petersen\
A01236750\
Candlemancer@gmail.com

# Background and Motivation
Dungeons and Dragons is a tabletop role-play game originally published in the 1970s, becoming popular in the 1980s and beyond. There are many other popular tabletop role-play games, but Dungeons and Dragons, affectionately known as D&D, is by far one of the most popular, often the only one known to people unfamiliar with tabletop role-play games.

A brief summary, for those unfamiliar with the concept, is that players create characters and follow the story told by the "Dungeon Master" (DM), rolling dice and referring to character statistics to determine how well they accomplish objectives that progress them along the story. One important aspect of this is combat, fighting any monsters that the players may encounter in the story. For the DM, who places these monsters along the path of the players, it's important to have monsters that can challenge the players and give them a sense of risk, but not have monsters that will simply kill the players' characters.

This aspect of D&D lead us to develop the idea for our project, as both group members enjoy playing D&D.

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
Data will be sourced from official Wizards of the Coast Dungeons and Dragons Fifth Edition sourcebooks and the Systems Reference Document (SRD) found [here](https://dnd.wizards.com/articles/features/systems-reference-document-srd). Digitizations of this data will be sourced from the official digital toolset for D&D 5e, [D&D Beyond](https://www.dndbeyond.com/monsters).

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
| Hit Points             | Quantitative        | Collected                        |
| Hit Dice               | Dual Categorical    | Collected                        |
| Damage Vulnerabilities | Categorical Series  | Collected                        |
| Damage Resistances     | Categorical Series  | Collected                        |
| Damage Immunities      | Categorical Series  | Collected                        |
| Effective Hit Points   | Quantitative        | Calculated                       |
| Attack Bonus           | Quantitative        | Calculated                       |
| Expected Damage        | Quantitative        | Calculated                       |
| Save DCs               | Quantitative        | Unused For Now                   |
| Abilities              | Multiple            | Unused For Now                   |
| Actions                | Multiple            | Unused For Now                   |
| Speed                  | Quantitative Series | Collected                        |
| Saving Throws          | Quantitative Series | Collected                        |
| Challenge Rating       | Quantitative        | Collected                        |
| Skills                 | Quantitative Series | Unused                           |
| Condition Immunities   | Categorical Series  | Unused                           |
| Senses                 | Quantitative Series | Unused                           |
| Languages              | Categorical Series  | Unused                           |
| Environment            | Categorical Series  | Collected                        |

# Visualization Design
## Option 1 - The Bar Chart-enning
At first blush, it seems like most of the attributes we need to answer our core questions are both discrete and split into a small number of groups. A normal fight has roughly 10 combatants, and a bar chart could easily show one categorical attribute for each combatant. Bar charts are great for comparing similar attributes, and that's the core of this analysis. Answering the questions of which group is stronger, and by how much stronger, is as simple as comparing the position on an aligned scale of a small number of charts. The major categorical question users will have when interacting with our visualization is "Which combatants are players and which are monsters?", so we can use a distinctive hue coloration for monsters vs players.

Bar charts are also great for comparing one item to all other items in an ordered set, assuming one can reduce the chart junk enough that a user can use spatial position to judge where one bar is in the ordering. Most of the questions about how a monster stacks up to its peers are relative judgements, so exact spatial reasoning isn't required. 

The core layout of this design would be a grid with two columns and _n_ rows, where _n_ is the number of meaningful comparisons we can make between the group. For example, the first row would show Player Effective HP vs Monster Effective Damage, the second row Player Effective Damage vs Monster Effective HP, then Player Ability Scores vs Monster Save DCs, so on and so forth. In the end, you'd end up with two columns of bar charts, and each row of the grid could be compared to understand one aspect of the combat, from most important down to least important. 

See [Sketch 3](./images/ProposalSketch3.pdf) for an idea of how this layout would look. Note that the sketch actually shows elements of this option that we've decided to use in the final product, but it gives you an idea. 

## Option 2 - Big Chart Small Chart
Another way to perform this analysis is via correlation. A DM can decide if a new group of monsters will be appropriate for their party by comparing those new monsters to a group of other monsters that the group has fought before, learn insights about how the new monsters might perform by identifying any significant deviations from the norm in both groups. We might accomplish this by showing various scatterplots of monster attributes, as spatial reasoning skills can then be used to identify trends and outliers. 

This option is also killer for comparing monsters to their peers. If a monster has more than twice the hit points of other similar monsters, it is likely to take longer to fight. If a monster has a much lower expected damage than its peers, it likely won't be very effective. If both of those facts are true about one monster, then an emergent property of the monster indicates the monster will work best as a damage sponge, taking a defensive role and absorbing hits from the players while the monster's allies do the damage. By using brushing and linking to show how a monster stacks up to its peers in multiple categories, we encourage the identification of this type of emergent behavior.

Because we don't want to ignore categorical attributes, but comparing two categorical attributes isn't necesary to answer the core questions we've identified, this layout allows users to split the dataset and show small multiples of the scatterplot data based on the categorical attribute selected. However, we also maintain a large scatterplot ordered on challenge rating, because that ordering will have the highest correlation (it's derived from the correlation of other attributes), and because the overall view will help give the user context as to the meaning of the small multiples. 

See [Sketch 2](./images/ProposalSketch2.pdf) for an idea of how this layout would look. Note that the sketch actually shows elements of this option that we've decided to use in the final product, but it gives you an idea. 

## Option 3 - The Too Complicated
We dropped this idea pretty quick, but for a while we were talking about focusing more on simulation results than statistical analysis. The core idea here would be to show the result of _every_ simulation run (est. 500) in some sparklines / small multiples fashion and rely on the user's pattern recognition skills to identify interesting results. The neat thing about this arrangement is that appropriate brushing and linking could lead to the answers of very complex questions like, "Of all the games played where character A died, how many were victories for the players but only had one death?" Basically, we would treat the simulated results as a large dataset and allow the users to filter out and search for a small subset of games, and then display those games in detail. This feels more interesting to players, but less useful to DMs, and visualizing hundreds of results that are inherently randomized seemed like a waste of everyone's time. 

See [Sketch 1](./images/ProposalSketch1.pdf) for some ideas that we tossed around while discussing this option.

## Final Design
Our visualization will have three sections: One for inputting player information, one for selecting monsters and viewing how a monster compares to its peers, and one for showing simulation results of the players vs the selected monsters. Of these three sections, only sections two and three are considered important for visualization, we don't anticipate showing any meaningful information on the player data section. Details of each section are as follows:

### Player Data Section
Allow the user to input anywhere from 1 - 10 player characters to be used in the simulation. The user will be expected to input values for every attribute captured in the monster database, but sensible defaults will be provided. No meaningful visualizations are planned for this section.

### Monster Data Section
Following the Big Chart Small Chart design, we'll offer controls for the user to:

1. Build a list of monsters
2. Select two quantitative attributes, with challenge rating selected as the default X axis
3. Select one categorical attribute

The monsters added to the list of monsters will be highlighted across all charts in this section. A large scatterplot will be shown in the middle of the screen plotting the selected quantitative attributes for all monsters. Information for each monster will be shown when the user hovers their mouse over a point on the scatterplot, and changing the selected quantitative attributes will tastefully transition the scatterplot to show the new attributes.

On the right, a set of small multiples will be shown, partitioning the set of monsters based on the selected categorical attribute. For example, a user might select "Alignment" as their categorical attribute, in which case a small multiple for each alignment type would be shown here. This allows the user to ask questions like, "Is this monster stronger than other Evil monsters", or, "Of all the woodland creatures, which monsters have the highest hit points?" Linking will be used to tie the small multiples charts to both the selected monsters and to the large scatterplot.

This set of visualizations uses spatial position to compare monsters to their peers and hue to identify which monsters belong to the currently selected set. Spatial position is useful when trying to determine grouping, and the choice of using points in a scatterplot means that we can potentially show all 800 or so of our monsters on one big chart. The use of small multiples in addition to the big chart allows us to ask more meaningful questions without losing too much in context, especially with the linking and highlighting.

### Simulation Results Section
After inputting player information and selecting monsters, the user will be given the option to run a number of simulation rounds and see the results of how well those players performed against the selected monsters. This section will list player data on the left, monster data on the right, and data agnostic to party in the middle. Summary statistics will be shown for the wins / losses of each group, the total damange dealt by each group, any deaths sustained by the group, the number of rounds the combat lasted, and how much health the survivors of the fight had left. 

For each of those summary statistics, a visualization will be provided. Most visualizations will be shown as stacked or grouped bar charts, depending on whehter showing the summation of the value is more important than any individual entry. Clicking on summary statistic visualizations will expand a section showing more detailed information where appropriate, such as showing the damage dealt by each individual in the combat when the damage dealt by party section is expanded. The goal is to show the information to the user in a hierarchical format, allowing them to drill down and show only pertinent information on the screen. 

As mentioned in the Bar Chart-enning section, bar charts are great for showing qualitative data for a small number of groups, and we thing that we can use the screen space we have to show bar charts with 30 groups without sacrificing readability. Some of those bar charts may be rather imprecise, and there's some concern that if we put too much on any chart it will imply continuity to a discrete value, but we're confident that we can address those issues during production. Finally, some of the statistics are simple enough that we've decided the most appropriate visualization for them is just to print the text numbers. Things like number of wins / losses make the most sense as a single number the user can just read.

![Sketch 1](https://github.com/Candlemancer/studious-meme/blob/master/images/proposalSketch1.pdf)

![Sketch 2](https://github.com/Candlemancer/studious-meme/blob/master/images/proposalSketch2.pdf)

![Sketch 3](https://github.com/Candlemancer/studious-meme/blob/master/images/proposalSketch3.pdf)

_Grading Note:_ They say a picture is worth a thousand words, and we're a couple thousand words over budget. I've decided to cut some of the sketching work to keep this a reasonable size. The images I decided to cut would just be depictions of the alternative prototypes, and it seems silly to mock those up after we've already decided on a final design.

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
  - can add between 0 and 10 players
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
To be finished by Nov 17:
* Get a good start on how to implement simulation and store the resulting data (Done!)
* Get user input of party (90% Complete)
* Get user input of monsters (85% Complete)
* Display monster/player sidebars (80% Complete)

To be finished by Nov 24:
* Have fully functioning simulation (Done!)
* Display summary statistics (Done!)
* This week has a little less stuff because it's Thanksgiving

To be finished by Nov 31:
* Monster comparison charts with brushing and linking (60% Complete)
* Summary statistic charts (20% Complete)

To be finished by Dec 6:
* Polish layout of website (shrinking/expanding) (15% Complete)
* Wiggle room if we got behind

## Schedule Update at Prototype 1
As of now we're on track to finish the project on schedule! There are some categories that we hoped to have done by now that aren't, but there's also a lot of work we didn't anticipate starting yet that's already done. Progress to date has mostly been in gathering and sanitizing the data, getting basic player input, building the simulation component, and setting up the tools we need to visualize our data. From here on out, the work should mostly be focused on making sure we chart the right things and in the right way, improving the design of the site, and working on stretch goals such as specific monster attacks or whatnot.