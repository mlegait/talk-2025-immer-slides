---
theme: default
title: Level Up Your State Management with Immer
info: |
  Tired of endless .map, .filter, and deeply nested spread operators?
  In this lightning talk, I’ll show you how Immer makes immutable state management intuitive and easy to read.
layout: image
image: images/landscape.webp
backgroundSize: cover
# apply unocss classes to the current slide
class: text-center
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: fade
---

---
layout: image
image: images/landscape_React_Redux.png
backgroundSize: cover
---

<!--
Presenter notes (needs to be at the end)
-->

---
layout: image-right
image: images/orc.webp
---

# Immutable state

<div v-click>
Change detection easy, predictable, and powerful.

```ts
if (oldState !== newState) {
  // Something changed → let's re-render!
}
```

</div>

<div v-click>
Enables powerful features:

- Undo/Redo
- Time-travel debugging
- DevTools magic
</div>

---
layout: image-right
image: images/aria.webp
---

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
          body: "Iron Armor",
          legs: "Traveler's Pants",
        },
      },
    },
  },
  quests: [
    { id: 100, name: "Collect 10 Herbs", status: "completed" },
    { id: 101, name: "Defeat the Goblin King", status: "not-started" },
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

### Aria levels up

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

### Aria changes weapon

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

<div v-click>
  <img src="/images/immer.svg">
</div>

<div v-click>
4.7kB (minified + gzipped)
</div>

<div v-click><code>produce</code></div>

<div v-click>2016</div>

---
layout: image
image: images/immer-schema.png
backgroundSize: contain
---

<!--
The basic idea is that with Immer you will apply all your changes to a temporary draft, which is a proxy of the currentState. Once all your mutations are completed, Immer will produce the nextState based on the mutations to the draft state. This means that you can interact with your data by simply modifying it while keeping all the benefits of immutable data.

Immer uses a Proxy to let you write mutable code... while producing an immutable result.
-->

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

<div v-click>
```ts
const newState = produce(gameState, (draft) => {
  draft.player.stats.equipment.weapon = "Flaming Sword";
});
```
</div>

---
layout: image-right
image: images/aria-battle.webp
---

### Aria goes into battle

- She uses 2 health potions
- She equips a new helmet
- Her sword loses 10 durability points
- She takes 15 damage
- Quest 101 is marked as "in progress"

---
layout: two-cols
---

```ts
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    inventory: gameState.player.inventory.map((item) => {
      if (item.name === "Health Potion") {
        return { ...item, quantity: item.quantity - 2 };
      } else if (item.name === "Sword") {
        return { ...item, durability: item.durability - 10 };
      } else {
        return item;
      }
    }),
    stats: {
      ...gameState.player.stats,
      health: gameState.player.stats.health - 15,
      equipment: {
        ...gameState.player.stats.equipment,
        armor: {
          ...gameState.player.stats.equipment.armor,
          head: "Steel Helmet",
        },
      },
    },
  },
  quests: gameState.quests.map((q) =>
    q.id === 101 ? { ...q, status: "in-progress" } : q,
  ),
};
```

::right::

```ts
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find((i) => i.name === "Health Potion");
  if (potion) {
    potion.quantity -= 2;
  }
  const sword = draft.player.inventory.find((i) => i.name === "Sword");
  if (sword) {
    sword.durability -= 10;
  }
  draft.player.stats.health -= 15;
  draft.player.stats.equipment.armor.head = "Steel Helmet";
  const quest = draft.quests.find((q) => q.id === 101);
  if (quest) {
    quest.status = "in-progress";
  }
});
```

---
layout: two-cols
---

```ts{5-7,10-13}
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    inventory: gameState.player.inventory.map((item) => {
      if (item.name === "Health Potion") {
        return { ...item, quantity: item.quantity - 2 };
      } else if (item.name === "Sword") {
        return { ...item, durability: item.durability - 10 };
      } else {
        return item;
      }
    }),
    stats: {
      ...gameState.player.stats,
      health: gameState.player.stats.health - 15,
      equipment: {
        ...gameState.player.stats.equipment,
        armor: {
          ...gameState.player.stats.equipment.armor,
          head: "Steel Helmet",
        },
      },
    },
  },
  quests: gameState.quests.map((q) =>
    q.id === 101 ? { ...q, status: "in-progress" } : q,
  ),
};
```

::right::

```ts{2-5}
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find((i) => i.name === "Health Potion");
  if (potion) {
    potion.quantity -= 2;
  }
  const sword = draft.player.inventory.find((i) => i.name === "Sword");
  if (sword) {
    sword.durability -= 10;
  }
  draft.player.stats.health -= 15;
  draft.player.stats.equipment.armor.head = "Steel Helmet";
  const quest = draft.quests.find((q) => q.id === 101);
  if (quest) {
    quest.status = "in-progress";
  }
});
```

---
layout: two-cols
---

```ts{5,8-13}
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    inventory: gameState.player.inventory.map((item) => {
      if (item.name === "Health Potion") {
        return { ...item, quantity: item.quantity - 2 };
      } else if (item.name === "Sword") {
        return { ...item, durability: item.durability - 10 };
      } else {
        return item;
      }
    }),
    stats: {
      ...gameState.player.stats,
      health: gameState.player.stats.health - 15,
      equipment: {
        ...gameState.player.stats.equipment,
        armor: {
          ...gameState.player.stats.equipment.armor,
          head: "Steel Helmet",
        },
      },
    },
  },
  quests: gameState.quests.map((q) =>
    q.id === 101 ? { ...q, status: "in-progress" } : q,
  ),
};
```

::right::

```ts{6-9}
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find((i) => i.name === "Health Potion");
  if (potion) {
    potion.quantity -= 2;
  }
  const sword = draft.player.inventory.find((i) => i.name === "Sword");
  if (sword) {
    sword.durability -= 10;
  }
  draft.player.stats.health -= 15;
  draft.player.stats.equipment.armor.head = "Steel Helmet";
  const quest = draft.quests.find((q) => q.id === 101);
  if (quest) {
    quest.status = "in-progress";
  }
});
```

---
layout: two-cols
---

```ts{14-15,17-24}
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    inventory: gameState.player.inventory.map((item) => {
      if (item.name === "Health Potion") {
        return { ...item, quantity: item.quantity - 2 };
      } else if (item.name === "Sword") {
        return { ...item, durability: item.durability - 10 };
      } else {
        return item;
      }
    }),
    stats: {
      ...gameState.player.stats,
      health: gameState.player.stats.health - 15,
      equipment: {
        ...gameState.player.stats.equipment,
        armor: {
          ...gameState.player.stats.equipment.armor,
          head: "Steel Helmet",
        },
      },
    },
  },
  quests: gameState.quests.map((q) =>
    q.id === 101 ? { ...q, status: "in-progress" } : q,
  ),
};
```

::right::

```ts{11}
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find((i) => i.name === "Health Potion");
  if (potion) {
    potion.quantity -= 2;
  }
  const sword = draft.player.inventory.find((i) => i.name === "Sword");
  if (sword) {
    sword.durability -= 10;
  }
  draft.player.stats.health -= 15;
  draft.player.stats.equipment.armor.head = "Steel Helmet";
  const quest = draft.quests.find((q) => q.id === 101);
  if (quest) {
    quest.status = "in-progress";
  }
});
```

---
layout: two-cols
---

```ts{14-16,24}
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    inventory: gameState.player.inventory.map((item) => {
      if (item.name === "Health Potion") {
        return { ...item, quantity: item.quantity - 2 };
      } else if (item.name === "Sword") {
        return { ...item, durability: item.durability - 10 };
      } else {
        return item;
      }
    }),
    stats: {
      ...gameState.player.stats,
      health: gameState.player.stats.health - 15,
      equipment: {
        ...gameState.player.stats.equipment,
        armor: {
          ...gameState.player.stats.equipment.armor,
          head: "Steel Helmet",
        },
      },
    },
  },
  quests: gameState.quests.map((q) =>
    q.id === 101 ? { ...q, status: "in-progress" } : q,
  ),
};
```

::right::

```ts{10}
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find((i) => i.name === "Health Potion");
  if (potion) {
    potion.quantity -= 2;
  }
  const sword = draft.player.inventory.find((i) => i.name === "Sword");
  if (sword) {
    sword.durability -= 10;
  }
  draft.player.stats.health -= 15;
  draft.player.stats.equipment.armor.head = "Steel Helmet";
  const quest = draft.quests.find((q) => q.id === 101);
  if (quest) {
    quest.status = "in-progress";
  }
});
```

---
layout: two-cols
---

```ts{26-28}
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    inventory: gameState.player.inventory.map((item) => {
      if (item.name === "Health Potion") {
        return { ...item, quantity: item.quantity - 2 };
      } else if (item.name === "Sword") {
        return { ...item, durability: item.durability - 10 };
      } else {
        return item;
      }
    }),
    stats: {
      ...gameState.player.stats,
      health: gameState.player.stats.health - 15,
      equipment: {
        ...gameState.player.stats.equipment,
        armor: {
          ...gameState.player.stats.equipment.armor,
          head: "Steel Helmet",
        },
      },
    },
  },
  quests: gameState.quests.map((q) =>
    q.id === 101 ? { ...q, status: "in-progress" } : q,
  ),
};
```

::right::

```ts{12-15}
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find((i) => i.name === "Health Potion");
  if (potion) {
    potion.quantity -= 2;
  }
  const sword = draft.player.inventory.find((i) => i.name === "Sword");
  if (sword) {
    sword.durability -= 10;
  }
  draft.player.stats.health -= 15;
  draft.player.stats.equipment.armor.head = "Steel Helmet";
  const quest = draft.quests.find((q) => q.id === 101);
  if (quest) {
    quest.status = "in-progress";
  }
});
```

---
layout: image
image: images/final_artifact.webp
backgroundSize: cover
---
