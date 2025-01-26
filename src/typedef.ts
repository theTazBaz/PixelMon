

interface Pokemon {
    name: string;
    assetKey: string;
    assetFrame?: number;
    maxHp: number;
    currentHp: number;
    baseAttack: number;
    attackIds: string[];
 }
 
 interface BattlePokemonConfig {
    scene: Phaser.Scene;
    _pokemonDetails: Pokemon;
 }
 
 interface Coordinate {
    x: number;
    y: number;
 }

 interface Attack {
   id: number;
   name : string;
   animationName: string;
}
