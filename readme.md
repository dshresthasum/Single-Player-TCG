# About the Game

This is a customized version of Pokemon Trading Card Game. Instead of a regular 2 player mode, we are going to create a single player version with a goal to defeat a randomly generated boss.

## 1. Board

- Board is where you place the boss and the players card
- The players' side of the board should be categorized into multiple sections as shown in the layout image
  ![pokemon game project layout](assets/game_layout.png)

## 2. Boss

- A boss is randomly generated with high HP and low ATK value
- The player has first turn. After every players' turn, the boss counter attacks dealing some damage to the player.
- The logic for players play is similar to Pokemon TCG game

## 3. Player

- A player is the person who will be playing the game with a target to defeat the boss.
- Player has the flexibility of creating a deck or choose a randomly generated deck
- First turn of the game is always the player.
- In the first turn the player should place a basic pokemon card in the "Active Spot" section. Whatever the attack value is in the card, the boss will be dealt with equal damage in the first round

## 4. Deck

- A Deck is a collection of exactly 60 cards.
- There are 3 categries of cards in the deck - Pokemon Cards, Trainer Cards and Energy Cards
- Each category has 20 cards
- Deck can either be randomly generated or the player can create by selecting cards

### 4.1. Creating a Deck by the User

- The interface to choose the cards must show all cards
- All the cards must be basic type
- It should also have the option to filter the cards based on "set" and "type".
- A deck must have exactly 60 cards. The player can choose only 20 pokemon cards
- The upper limit of any card with the same name is 4.
  ![interface to allow uses to choose cards](assets/create_deck.png)

### 4.2. Creating a Deck Programmatically

- Choose 5 characters with basic type randomly
- Select 4 cards of each characters
- Add 20 of trainer cards and energy cards

## 5. Gameplay

- After a deck is created, the player is assigned 7 cards from the top of the deck
- 4 prize card are randomly picked from the deck. Prize cards are either trainer cards or energy cards
- Once the cards are distributed, the player will choose a basic card and place it in "Active Spot" section of the board.
- If the player does not have a basic card in the first 7 assigned card, a random basic card is withdrawn from the deck and placed in the "Active Spot" Section
- Player deals damage to the boss that is equal to the damage attribute in the card
- Reduce the HP of the boss by the amount of damage dealt
- Next turn is for the boss. The boss deals a random damage to the player.
- Mark the damage dealt and reduce the HP of the player by the damage amount.
- After the first round, each turn for the player will be marked by following set of rules
  1. Draw a card.
  2. Do any of the following actions in any order:
     1. Put Basic Pokémon cards from your hand onto your Bench (as many as you want).
     2. Evolve your Pokémon (as many as you want).
     3. Attach an Energy card from your hand to one of your Pokémon (once per turn).
     4. Play Trainer cards (as many as you want, but only one Supporter card and one Stadium card per turn).
     5. Retreat your Active Pokémon (only once per turn).
     6. Use Abilities (as many as you want).
  3. Attack. Then, end your turn.
- Visit the link for detailed rules [Pokemon Card Game Rule Book](https://www.pokemon.com/static-assets/content-assets/cms2/pdf/trading-card-game/rulebook/par_rulebook_en.pdf)

# Make a Game

We will be using Pokemon TCG API for this project. Click on [this link](https://docs.pokemontcg.io/) for API documentation.

## Requirements

| Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Marks |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----: |
| 1. Generate a random pokemon boss with high HP (around 600) and low attack (randomize between 5 and 10 damage) value                                                                                                                                                                                                                                                                                                                                                                                                                                   |     2 |
| 2. Allow player to create a deck by selecting Pokemon Cards. Refer to "Deck" section in "About the Game"                                                                                                                                                                                                                                                                                                                                                                                                                                               |     2 |
| 3. Initiate the game by distributing cards in following way:<ul><li>Shuffle the card deck</li><li>Place the deck in the **Deck** section</li><li>Distribute 7 Cards from top of the deck to the player</li><li>Add 6 random **Trainer Cards** cards from the deck to the **Prize Cards** section</li><li>If the player has a **Basic Pokemon Card**, let the user place the card in the **Active Spot** section</li><li>If the player does not possess a **Basic Pokemon Card**, place a random card from the deck into the **Active Spot** </li></ul> |     5 |
| 4. Implement the **Gameplay**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |    15 |
| 5. Win Condition: Lower the HP of the boss to 8                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |     2 |
| 6. Lose Condition: <ul><li>Player runs out of cards in the deck</li><li>All of the players' **Pokemon Cards** HP is reduced to 0</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                             |     4 |
