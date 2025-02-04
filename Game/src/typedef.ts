export interface Pokemon {
   name: string;
   assetKey: string;
   assetFrame?: number;
   maxHp: number;
   currentHp: number;
   baseAttack: number;
   attackIds: number[];
}

export interface BattlePokemonConfig {
   scene: Phaser.Scene;
   _pokemonDetails: Pokemon;
}

export interface Coordinate {
   x: number;
   y: number;
}

export interface Attack {
   id: number;
   name : string;
   animationName: string;
}
