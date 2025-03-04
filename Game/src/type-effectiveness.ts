export type PokemonType = keyof typeof TYPE_EFFECTIVENESS;

export const TYPE_EFFECTIVENESS = {
    ELECTRIC: {
        WATER: 2,    // Electric is super effective vs Water
        ROCK: 0.5,   // Electric is not very effective vs Rock
        GROUND: 0.5,   // Electric has no effect on Ground
        GRASS: 1,
        FIRE: 1
    },
    WATER: {
        FIRE: 2,     // Water is super effective vs Fire
        GROUND: 2,   // Water is super effective vs Ground
        GRASS: 1,
        ROCK: 2,
        ELECTRIC: 1
    },
    FIRE: {
        GRASS: 2,    // Fire is super effective vs Grass
        WATER: 0.5,  // Fire is not very effective vs Water
        ROCK: 0.5,   // Fire is not very effective vs Rock
    },
    GRASS: {
        WATER: 2,    // Grass is super effective vs Water
        FIRE: 0.5,   // Grass is not very effective vs Fire
        GROUND: 2,   // Grass is super effective vs Ground
    },
    ROCK: {
        FIRE: 2,     // Rock is super effective vs Fire
        WATER: 0.5,  // Rock is not very effective vs Water
        ELECTRIC: 0.5, // Rock is not very effective vs Electric
    },
    GROUND: {
        ELECTRIC: 2, // Ground is super effective vs Electric
        FIRE: 2,     // Ground is super effective vs Fire
        ROCK: 2,     // Ground is super effective vs Rock
    },
    // Add more types as needed
};