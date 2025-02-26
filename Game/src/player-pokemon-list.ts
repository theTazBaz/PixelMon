import { POKEMON } from "./asset_keys"

export const PLAYER_POKEMON_TEAM = [   
      {
        
        PokemonId: 1,
        name: POKEMON.PIKACHU,
        assetKey: POKEMON.PIKACHU,
        assetFrame: 0,
        currentHp: 25,
        maxHp: 25,
        attackIds: [1,2,3,4],
        baseAttack: 15,
        currentLevel: 9
      },
      {
        
        PokemonId: 2,
        name: POKEMON.SQUIRTLE,
        assetKey: POKEMON.SQUIRTLE,
        assetFrame: 0,
        currentHp: 25,
        maxHp: 25,
        attackIds: [1,5,3],
        baseAttack: 10,
        currentLevel: 5
      },
      {
        
        PokemonId: 3,
        name: POKEMON.PIDGEY,
        assetKey: POKEMON.PIDGEY,
        assetFrame: 0,
        currentHp: 25,
        maxHp: 25,
        attackIds: [5,7],
        baseAttack: 5,
        currentLevel: 4
      }
]