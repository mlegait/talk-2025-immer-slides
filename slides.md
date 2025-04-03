---
theme: default
title: Level Up Your State Management with Immer
info: |
  Tired of endless .map, .filter, and deeply nested spread operators?
  In this lightning talk, I’ll show you how Immer makes immutable state management intuitive and easy to read.
background: images/landscape.webp
# apply unocss classes to the current slide
class: text-center
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: fade
---

# React and Redux

<!--
Presenter notes (needs to be at the end)
-->

---
layout: image-right
image: images/orc.webp
---

# Immutable state

```ts
const gameState = {
  player: {
    name: "Aria",
    level: 5,
    inventory: [
      { id: 1, name: "Health Potion", quantity: 3 },
      { id: 2, name: "Sword", durability: 75 },
    ],
    stats: {
      health: 87,
      mana: 30,
      equipment: {
        weapon: "Iron Sword",
        armor: {
          head: "Leather Cap",
          body: "Iron Armor",
          legs: "Traveler's Pants",
        },
      },
    },
  },
  quests: [
    { id: 101, name: "Defeat the Goblin King", completed: false },
    { id: 102, name: "Collect 10 Herbs", completed: true },
  ],
};
```

---
layout: image-right
image: images/standard_weapon.webp
---

# Spread operator

...

---
layout: image-right
image: images/standard_weapon.webp
---

```ts
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    level: gameState.player.level + 1,
  },
};
```

---
layout: image-right
image: images/used_weapon.webp
---

```ts
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    stats: {
      ...gameState.player.stats,
      equipment: {
        ...gameState.player.stats.equipment,
        weapon: "Flaming Sword",
      },
    },
  },
};
```

---
layout: image-right
image: images/awesome_weapon.webp
---

# Immer

<div v-click>
4.7kB (minified + gzipped)
</div>
<div v-click><code>produce</code></div>

---
layout: two-cols
---

```ts
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    stats: {
      ...gameState.player.stats,
      equipment: {
        ...gameState.player.stats.equipment,
        weapon: "Flaming Sword",
      },
    },
  },
};
```

::right::

```ts
const newState = produce(gameState, (draft) => {
  draft.player.stats.equipment.weapon = "Flaming Sword";
});
```

---
layout: two-cols
---

```ts {3,5,7,9}
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    stats: {
      ...gameState.player.stats,
      equipment: {
        ...gameState.player.stats.equipment,
        weapon: "Flaming Sword",
      },
    },
  },
};
```

::right::

```ts {2}
const newState = produce(gameState, (draft) => {
  draft.player.stats.equipment.weapon = "Flaming Sword";
});
```

---
layout: two-cols
---

```ts
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    level: gameState.player.level + 1,
    inventory: [
      ...gameState.player.inventory,
      {
        id: 4,
        name: "Mystic Amulet",
        effect: "+10 mana",
      },
    ],
    stats: {
      ...gameState.player.stats,
      health: Math.min(gameState.player.stats.health + 20, 100),
      equipment: {
        ...gameState.player.stats.equipment,
      },
    },
  },
  quests: gameState.quests.map((quest) =>
    quest.id === 101 ? { ...quest, completed: true } : quest,
  ),
};
```

::right::

```ts
const newState = produce(gameState, (draft) => {
  const quest = draft.quests.find((q) => q.id === 101);
  if (quest && !quest.completed) {
    quest.completed = true;

    draft.player.level += 1;

    draft.player.inventory.push({
      id: 4,
      name: "Mystic Amulet",
      effect: "+10 mana",
    });

    draft.player.stats.health = Math.min(draft.player.stats.health + 20, 100);
  }
});
```

---
layout: image
image: images/final_artifact.webp
---
