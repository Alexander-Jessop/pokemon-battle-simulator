<h1 align="center">Pokemon Battle Simulator</h1>

<p align="right">
  <img src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" alt="Version Badge">
</p>

<h2 align="center"> 🚧 Under Construction! Please Excuse the Dust! 🚧 </h2>

## Table of Contents

---

- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
  - [Users](#users)
    - [Sign Up](#sign-up)
    - [Log In](#log-in)
    - [Log Out](#log-out)
    - [User Data](#user-data)
  - [Pokemon](#pokemon)
    - [Pokemon List](#pokemon-list)
    - [Pokemon Details](#pokemon-details)
  - [Battle](#battle)
    - [Game State](#game-state)
    - [Attack](#attack)
    - [Switch](#switch)
- [Developer](#developer)

---

---

## Advertisement

**PLAY NOW**: https://pokemon-battle-simulator-lake.vercel.app <br>
Unleash your inner Pokemon Master with the most thrilling online battle simulator! Engage in exhilarating showdowns against the mighty AI or challenge your friends to determine who truly reigns supreme. Prepare for non-stop excitement, heart-pounding strategies, and electrifying encounters in the world of Pokemon!

Pick your dream team from a vast collection of Pokemon that reflects your strategic brilliance. With so many options, the possibilities are endless! <br>
[Back to Table of Contents](#table-of-contents)

---

---

## Description

The project is a Full-Stack applicaiton that combines TypeScript with Express and integrates the pokeapi.co API to create a Battling Pokémon platform. TypeScript ensures reliable code while Express simplifies API development. By leveraging pokeapi.co, we access vast Pokémon-related data, offering a direct and efficient experience. Additionally, our Express server enables personalized profiles for tracking battle stats and saving favorite Pokémon. <br>
[Back to Table of Contents](#table-of-contents)

---

---

## Installation

Clone repository to your local machine.

```sh
git clone https://github.com/Alexander-Jessop/pokemon-battle-simulator
```

To install the required dependencies, go to the Client and Server directories at the location you saved the repository:

`cd <path_to_repo_directory>/Client` <br>
&& <br>
`cd <path_to_repo_directory>/Server`

Run the following command to install the dependencies within the Client and Server directories:

```sh
npm install
```

[Back to Table of Contents](#table-of-contents)

---

---

## Usage

To start the application, go to the Client and Server directories at the location you saved the repository: <br>
`cd <path_to_repo_directory>/Client`

```sh
npm run dev
```

&& <br>
`cd <path_to_repo_directory>/Server`

```sh
npm run dev
```

Testing Account: <br>
Email:

```sh
testing@test.com
```

Password:

```sh
test1234
```

[Back to Table of Contents](#table-of-contents)

---

---

## Endpoints

**Note:** All endpoints are prefixed with:

```sh
https://pokemon-battle-simulator-lake.vercel.app
```

### Users

---

#### Sign Up

Creates a new user.

- **URL** :

```sh
/api/users/signup
```

- **Method** : `POST`

**Data constraints**

The request body must contain the following body parameters:

| Parameter  | Type   | Description                    |
| ---------- | ------ | ------------------------------ |
| `username` | string | The username of the user.      |
| `email`    | string | The email address of the user. |
| `password` | string | The password for the user.     |

#### Example

```json
{
  "username": "[valid username]",
  "email": "[valid email]",
  "password": "[valid password]"
}
```

#### Responses

Success Response:
Will return a 201 status code and the created user object on success.

Error Responses:
Exisiting user will return a 409 status code and an error message that the user already exists.

On Failure, will return a 500 status code and an error message that it failed to create the user.

#### Log In

Create a session for the user.

- **URL** :

```sh
/api/users/login
```

- **Method** : `POST`

**Data constraints**

The request body must contain the following body parameters:

| Parameter  | Type   | Description                    |
| ---------- | ------ | ------------------------------ |
| `email`    | string | The email address of the user. |
| `password` | string | The password for the user.     |

#### Example

```json
{
  "email": "valid email",
  "password": "valid password"
}
```

Try it yourself:

```json
{
  "email": "testing@test.com",
  "password": "test1234"
}
```

#### Responses

Success Response:
Returns a 200 status code an object contain message and user object.

#### Example

```json
{
  "message": "String",
  "user": {
    "_id": "MongoDB ID",
    "username": "string",
    "email": "string",
    "visits": "number",
    "battlesPlayed": "number",
    "movesUsed": "number",
    "gamesWon": "number",
    "gamesLost": "number"
  }
}
```

Error Responses:
User not found will return a 404 status code and an error message that the user does not exist.

If the password is incorrect, will return a 401 status code and an error message that the password is incorrect.

On Failure, will return a 500 status code and an error message that it failed to fetch the user.

#### Log Out

Destorys a session for the user and clears cookies.

- **URL** :

```sh
/api/users/logout
```

- **Method** : `POST`

#### Responses

Success Response:
Returns a 200 status code an object containing a message.

Error Responses:
On Failure, will return a 500 status code and an error message that it failed to log out.

#### User Data

Manipulates user data.

- **URL** :

```sh
api/users/user-data/:id
```

- **Method** : `DELETE` | `GET` | `PUT`
  Try it yourself: :id =

```sh
649f9a08698389ded274f5df
```

**Data constraints**

`GET`: <br>
:id is the MongoDB ID of the user.

Success Response:
Returns a 200 status code and a user object.

#### Example

```json
{
  "message": "String",
  "user": {
    "_id": "MongoDB ID",
    "name": "string",
    "email": "string",
    "visits": "number",
    "battlesPlayed": "number",
    "movesUsed": "number",
    "gamesWon": "number",
    "gamesLost": "number"
  }
}
```

Error Responses:
If user not found, will return a 404 status code and an error message that the user does not exist.

On Failure, will return a 500 status code and an error message that it failed to fetch the user.

`PUT`: <br>
:id is the MongoDB ID of the user.

**Data constraints** <br>
_Note:_ Only one field is required to update the user. Put all fields are replaced.

| Parameter       | Type   | Description                            |
| --------------- | ------ | -------------------------------------- |
| `_id`           | string | The Mongo ID of the user.              |
| `name`          | string | The name of the user.                  |
| `email`         | string | The email of the user.                 |
| `visits`        | number | Number of times user signed in.        |
| `battlesPlayed` | number | Number of battles user played.         |
| `battlesPlayed` | number | Number of battles user played.         |
| `movesUsed`     | number | Number of moves user used over career. |
| `gamesWon`      | number | Number of games user won.              |
| `gamesLost`     | number | Number of games user lost.             |

```json
{
  {
    "_id": "MongoDB ID",
    "name": "string",
    "email": "string",
    "visits": "number",
    "battlesPlayed": "number",
    "movesUsed": "number",
    "gamesWon": "number",
    "gamesLost": "number"
  }
}
```

`DELETE`: <br>
:id is the MongoDB ID of the user.

Success Response:
Returns a 200 status code and a message confirming user deleted.

Error Responses:
If user not found, will return a 404 status code and an error message that the user does not exist.

On Failure, will return a 500 status code and an error message that it failed to fetch the user. <br>
[Back to Table of Contents](#table-of-contents)

### Pokemon

---

#### Pokemon List

Displays the pokemon for selection.

- **URL** :

```sh
/api/pokemon/selection-screen<query>
```

- **Method** : `GET`

**Data constraints**

The request query must contain the following body parameters:

| Parameter    | Type   | Description                  |
| ------------ | ------ | ---------------------------- |
| `page`       | number | The page you want.           |
| `pageSize`   | number | How many items per page.     |
| `generation` | number | The Pokemon season you want. |

##### Example

```sh
/api/pokemon/selection-screen?page=1&pageSize=10&generation=1
```

#### Responses

Success Response:
Will return a 200 status code and an object containing data: an array of pokemon objects, and pagination: an object containing the current page, total pages, and total items.

#### Example

```json
{
  "data": [
    {
      "id": "number",
      "name": "string",
      "generation": "number",
      "types": ["string"],
      "sprites": ["object"],
      "stats": ["object"],
      "moves": ["object"]
    }
  ],
  "pagination": {
    "currentPage": "number",
    "totalPages": "number",
    "totalItems": "number"
  }
}
```

Error Responses:
On Failure, will return a 500 status code and an error message.

#### Pokemon Details

Returns details of the Pokemon.

- **URL** :

```sh
/api/pokemon/pokemon-data
```

- **Method** : `POST`

**Data constraints**

The request body must contain the following body parameters:

| Parameter      | Type     | Description               |
| -------------- | -------- | ------------------------- |
| `indentifires` | string[] | The id of the pokemon.    |
| `indentifires` | number[] | The names of the pokemon. |

#### Example

```json
{
  "indentifires": ["charmander", "squirtle", "bulbasaur"]
}
```

or

```json
{
  "indentifires": [1, 2, 3]
}
```

#### Responses

Success Response:
Will return a 200 status code and the Pokemon details.

#### Example

```json
{
 [
    {
      "id": "number",
      "name": "string",
      "types": ["object"],
      "stats": ["object"],
      "sprites": ["object"],
      "moves": ["object"]
    }
  ]
}
```

Error Responses:
On Failure, will return a 500 status code and an error message that it failed. <br>
[Back to Table of Contents](#table-of-contents)

### Battle

---

#### Game State

All current information about the battle.

- **URL** :

```sh
/api/battle/game-state/:battleId
```

- **Method** : `GET` | `POST`

**Data constraints**

`GET`: <br>
:battleId is the MongoDB ID of the current battle.

| Parameter   | Type       | Description          |
| ----------- | ---------- | -------------------- |
| `:battleId` | MongoDB ID | The battle you want. |

#### Responses

Success Response:
Will return a 200 status code and the battle state.

#### Example

```json
{
  {
    "_id": "MongoDB ID",
    "id": "string",
    "playerPokemon": ["object"],
    "computerPokemon": ["object"],
    "currentPlayer": "number",
    "turn": "number",
    "status": "string",
    "log": ["object"]
  }
}
```

Error Responses:
If battle not found, will return a 404 status code and an error message that the battle does not exist.

On Failure, will return a 500 status code and an error message that it failed to fetch the battle.

`POST`: <br>
Create the battle data.

- **URL** :
  `POST`: <br>

```sh
/api/battle/game-state
```

The request body must contain the following body parameters:

| Parameter       | Type     | Description                |
| --------------- | -------- | -------------------------- |
| `playerPokemon` | object[] | The players selected team. |
| `playerPokemon` | number[] | The players selected team. |

#### Example

```json
{
  "playerPokemon": [
    {
      "id": 4,
      "name": "charmander",
      "url": "https://pokeapi.co/api/v2/pokemon/charmander"
    }
  ]
}
```

or

```json
{
  "playerPokemon": [1, 2, 3]
}
```

#### Responses

On Success, will return a 200 status code and the battle state.

#### Example

```json
{
  {
    "_id": "MongoDB ID",
    "id": "string",
    "playerPokemon": ["object"],
    "computerPokemon": ["object"],
    "currentPlayer": "number",
    "turn": "number",
    "status": "string",
    "winner": "string",
    "log": ["object"]
  }
}
```

#### Attack

- **URL** :

```sh
/api/battle/attack
```

- **Method** : `PATCH`

**Data constraints**
The request query must contain the following body parameters:

| Parameter  | Type   | Description                             |
| ---------- | ------ | --------------------------------------- |
| `moveUrl`  | string | The move the pokemon used.              |
| `battleId` | string | ID of the battle.                       |
| `isPlayer` | number | 0 or 1 to represent the current player. |

#### Example

```json
{
  "moveUrl": "https://pokeapi.co/api/v2/move/7",
  "battleId": "4C5B375BC6824153ABE68B8D39D24A73",
  "isPlayer": 0
}
```

#### Responses

On Success, will return a 200 status code and that the attack was successful.

Error Responses:
If battle not found, will return a 404 status code and an error message that the battle does not exist.

If Pokemon not found, will return a 404 status code and an error message that the Pokemon does not exist.

On Failure, will return a 500 status code and an error message that it failed to fetch the battle.

#### Switch

Changes current battle Pokemon.

- **URL** :

```sh
/api/battle/switch-player-pokemon
```

or

```sh
/api/battle/switch-computer-pokemon
```

- **Method** : `PATCH`

**Data constraints**

The request query must contain the following body parameters:

| Parameter   | Type   | Description                            |
| ----------- | ------ | -------------------------------------- |
| `battleId`  | number | The current battle.                    |
| `pokemonId` | number | The Pokemon ID you wish to switch too. |

or

| Parameter  | Type   | Description         |
| ---------- | ------ | ------------------- |
| `battleId` | number | The current battle. |

#### Example

```json
{
  "battleId": "4C5B375BC6824153ABE68B8D39D24A73",
  "pokemonId": 4
}
```

or

```json
{
  "battleId": "4C5B375BC6824153ABE68B8D39D24A73"
}
```

#### Responses

Success Response:
On Success, will return a 200 status code and the current battle state.

Error Responses:
If battle not found, will return a 404 status code and an error message that the battle does not exist.

If Pokemon not found, will return a 404 status code and an error message that the Pokemon does not exist.

On Failure, will return a 500 status code and an error message. <br>
[Back to Table of Contents](#table-of-contents)

---

---

## Developer

👤 [**Alexander Jessop**](https://github.com/Alexander-Jessop)

[Back to Table of Contents](#table-of-contents)
