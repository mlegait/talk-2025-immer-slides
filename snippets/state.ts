interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  rarity?: string;
}

interface RPGState {
  player: {
    name: string;
    level: number;
    inventory: InventoryItem[];
    stats: {
      health: number;
      mana: number;
      equipment: {
        weapon: string,
        armor: {
          head?: string;
          body?: string,
          legs?: string,
        },
      }
    }
  }
}

export const gameState: RPGState = {
  player: {
    name: "Aria",
    level: 5,
    inventory: [
      { id: 1, name: "Health Potion", quantity: 3 },
      { id: 2, name: "Traveler’s Map", quantity: 1 },
    ],
    stats: {
      health: 87,
      mana: 30,
      equipment: {
        weapon: "Iron Sword",
        armor: {
          body: "Iron Armor",
          legs: "Traveler's Pants",
        },
      },
    },
  },
};
