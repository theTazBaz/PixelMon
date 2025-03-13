import { POKEMON } from "./asset_keys";

export const POKEMON_DATA = {
    // Ground Type Pokemon
    SANDSHREW: {
      PokemonId: 1,
      name: "sandshrew",
      assetKey: POKEMON.SANDSHREW,
      assetFrame: 0,
      type: "GROUND",
      baseAttack: 15,
      maxHp: 50,
      currentHp: 50, // Added currentHp
      attackIds: [5, 7, 14, 11],
      currentLevel: 5
    },
    // DIGLETT: {
    //   PokemonId: 2,
    //   name: "diglett",
    //   assetKey: POKEMON.DIGLETT,
    //   assetFrame: 0,
    //   type: "GROUND",
    //   baseAttack: 13,
    //   maxHp: 35,
    //   currentHp: 35, // Added currentHp
    //   attackIds: [7, 14, 5, 3],
    //   currentLevel: 5
    // },
    GEODUDE: {
      PokemonId: 3,
      name: "geodude",
      assetKey: POKEMON.GEODUDE,
      assetFrame: 0,
      type: "ROCK",
      baseAttack: 16,
      maxHp: 40,
      currentHp: 40, // Added currentHp
      attackIds: [10, 17, 5, 1],
      currentLevel: 5
    },
    CUBONE: {
      PokemonId: 4,
      name: "cubone",
      assetKey: POKEMON.CUBONE,
      assetFrame: 0,
      type: "GROUND",
      baseAttack: 14,
      maxHp: 50,
      currentHp: 50, // Added currentHp
      attackIds: [5, 7, 14, 3],
      currentLevel: 5
    },
    // Water Type Pokemon
    // MAGIKARP: {
    //   PokemonId: 5,
    //   name: "magikarp",
    //   assetKey: POKEMON.MAGIKARP,
    //   assetFrame: 0,
    //   type: "WATER",
    //   baseAttack: 10,
    //   maxHp: 35,
    //   currentHp: 35, // Added currentHp
    //   attackIds: [5, 8, 15, 3],
    //   currentLevel: 5
    // },
    SQUIRTLE: {
      PokemonId: 6,
      name: "squirtle",
      assetKey: POKEMON.SQUIRTLE,
      assetFrame: 0,
      type: "WATER",
      baseAttack: 13,
      maxHp: 44,
      currentHp: 44, // Added currentHp
      attackIds: [8, 15, 5, 11],
      currentLevel: 5
    },
    PSYDUCK: {
      PokemonId: 7,
      name: "psyduck",
      assetKey: "POKEMON.PSYDUCK",
      assetFrame: 0,
      type: "WATER",
      baseAttack: 13,
      maxHp: 50,
      currentHp: 50, // Added currentHp
      attackIds: [8, 15, 5, 1],
      currentLevel: 5
    },
    // POLIWAG: {
    //   PokemonId: 8,
    //   name: "poliwag",
    //   assetKey: POKEMON.POLIWAG,
    //   assetFrame: 0,
    //   type: "WATER",
    //   baseAttack: 12,
    //   maxHp: 40,
    //   currentHp: 40, // Added currentHp
    //   attackIds: [15, 8, 5, 3],
    //   currentLevel: 5
    // },
    // Fire Type Pokemon
    CHARMANDER: {
      PokemonId: 9,
      name: "charmander",
      assetKey: POKEMON.CHARMANDER,
      assetFrame: 0,
      type: "FIRE",
      baseAttack: 14,
      maxHp: 39,
      currentHp: 39, // Added currentHp
      attackIds: [9, 16, 5, 11],
      currentLevel: 5
    },
    VULPIX: {
      PokemonId: 10,
      name: "vulpix",
      assetKey: POKEMON.VULPIX,
      assetFrame: 0,
      type: "FIRE",
      baseAttack: 13,
      maxHp: 38,
      currentHp: 38, // Added currentHp
      attackIds: [9, 16, 5, 1],
      currentLevel: 5
    },
    GROWLITHE: {
      PokemonId: 11,
      name: "growlithe",
      assetKey: POKEMON.GROWLITHE,
      assetFrame: 0,
      type: "FIRE",
      baseAttack: 15,
      maxHp: 55,
      currentHp: 55, // Added currentHp
      attackIds: [9, 16, 11, 1],
      currentLevel: 5
    },
    // MAGMAR: {
    //   PokemonId: 12,
    //   name: "magmar",
    //   assetKey: POKEMON.MAGMAR,
    //   assetFrame: 0,
    //   type: "FIRE",
    //   baseAttack: 16,
    //   maxHp: 45,
    //   currentHp: 45, // Added currentHp
    //   attackIds: [16, 9, 5, 11],
    //   currentLevel: 5
    // },
    // Grass Type Pokemon
    BULBASAUR: {
      PokemonId: 13,
      name: "bulbasaur",
      assetKey: POKEMON.BULBASAUR,
      assetFrame: 0,
      type: "GRASS",
      baseAttack: 12,
      maxHp: 45,
      currentHp: 45, // Added currentHp
      attackIds: [6, 13, 5, 1],
      currentLevel: 5
    },
    ODDISH: {
      PokemonId: 14,
      name: "oddish",
      assetKey: POKEMON.ODDISH,
      assetFrame: 0,
      type: "GRASS",
      baseAttack: 11,
      maxHp: 45,
      currentHp: 45, // Added currentHp
      attackIds: [13, 6, 5, 3],
      currentLevel: 5
    },
    // TROPIUS: {
    //   PokemonId: 15,
    //   name: "tropius",
    //   assetKey: POKEMON.TROPIUS,
    //   assetFrame: 0,
    //   type: "GRASS",
    //   baseAttack: 14,
    //   maxHp: 55,
    //   currentHp: 55, // Added currentHp
    //   attackIds: [6, 13, 11, 1],
    //   currentLevel: 5
    // },
    CHIKORITA: {
      PokemonId: 16,
      name: "chikorita",
      assetKey: POKEMON.CHIKORITA,
      assetFrame: 0,
      type: "GRASS",
      baseAttack: 11,
      maxHp: 45,
      currentHp: 45, // Added currentHp
      attackIds: [13, 6, 5, 3],
      currentLevel: 5
    },
    // Electric Type Pokemon
    PIKACHU: {
      PokemonId: 17,
      name: "pikachu",
      assetKey: POKEMON.PIKACHU,
      assetFrame: 0,
      type: "ELECTRIC",
      baseAttack: 15,
      maxHp: 35,
      currentHp: 35, // Added currentHp
      attackIds: [2, 12, 11, 3],
      currentLevel: 5
    },
    MAGNEMITE: {
      PokemonId: 18,
      name: "magnemite",
      assetKey: POKEMON.MAGNEMITE,
      assetFrame: 0,
      type: "ELECTRIC",
      baseAttack: 12,
      maxHp: 25,
      currentHp: 25, // Added currentHp
      attackIds: [2, 4, 12, 5],
      currentLevel: 5
    },
    ELECTRIKE: {
      PokemonId: 19,
      name: "electrike",
      assetKey: POKEMON.ELECTRIKE,
      assetFrame: 0,
      type: "ELECTRIC",
      baseAttack: 13,
      maxHp: 40,
      currentHp: 40, // Added currentHp
      attackIds: [2, 12, 11, 1],
      currentLevel: 5
    },
    // SHINX: {
    //   PokemonId: 20,
    //   name: "shinx",
    //   assetKey: POKEMON.SHINX,
    //   assetFrame: 0,
    //   type: "ELECTRIC",
    //   baseAttack: 14,
    //   maxHp: 38,
    //   currentHp: 38, // Added currentHp
    //   attackIds: [2, 4, 5, 11],
    //   currentLevel: 5
    // },
    // Normal Type Pokemon
    RATTATA: {
      PokemonId: 21,
      name: "rattata",
      assetKey: POKEMON.RATTATA,
      assetFrame: 0,
      type: "NORMAL",
      baseAttack: 12,
      maxHp: 30,
      currentHp: 30, // Added currentHp
      attackIds: [5, 11, 1, 3],
      currentLevel: 5
    },
    PIDGEY: {
      PokemonId: 22,
      name: "pidgey",
      assetKey: POKEMON.PIDGEY,
      assetFrame: 0,
      type: "NORMAL",
      baseAttack: 11,
      maxHp: 40,
      currentHp: 40, // Added currentHp
      attackIds: [11, 5, 1, 3],
      currentLevel: 5
    },
    MEOWTH: {
      PokemonId: 23,
      name: "meowth",
      assetKey: POKEMON.MEOWTH,
      assetFrame: 0,
      type: "NORMAL",
      baseAttack: 12,
      maxHp: 40,
      currentHp: 40, // Added currentHp
      attackIds: [11, 5, 3, 1],
      currentLevel: 5
    },
    // SENTRET: {
    //   PokemonId: 24,
    //   name: "sentret",
    //   assetKey: POKEMON.SENTRET,
    //   assetFrame: 0,
    //   type: "NORMAL",
    //   baseAttack: 11,
    //   maxHp: 35,
    //   currentHp: 35, // Added currentHp
    //   attackIds: [5, 11, 1, 3],
    //   currentLevel: 5
    // }
  };
  
