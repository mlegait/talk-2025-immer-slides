---
theme: default
title: Level Up Your State Management with Immer
info: |
  Tired of endless .map, .filter, and deeply nested spread operators?
  In this lightning talk, I’ll show you how Immer makes immutable state management intuitive and easy to read.
---

# Michèle Legait

Senior Frontend Developer

<img src="/images/avatar.jpeg" style="width: 200px; height: 200px;" >

<img src="/images/datadog.png" style="width: 200px;" >

<!--
FR: Je m'appelle Michèle Legait, je suis Développeuse Senior Frontend chez Datadog et j'aimerais vous raconter une histoire.

EN: My name is Michèle Legait, I'm a Senior Frontend Developer at Datadog and I would like to tell you a story.
-->

---
layout: image
image: images/landscape.webp
backgroundSize: cover
transition: fade
---

<!--
FR: Au fil des années passées en tant que développeuse frontend, j'ai arpenté les contrées de React et de Redux.

EN: Over the years as a frontend developer, I have travelled across the lands of React and Redux.
-->

---
layout: image
image: images/landscape_React_Redux.png
backgroundSize: cover
---

---
layout: image-right
image: images/aria.webp
---

# Immutable state

<div v-click>
Change detection easy and predictable.

```ts
if (oldState !== newState) {
  // Something changed
  //   → React: let's re-render!
  //   → Redux: let's notify the listeners
}
```

</div>

<div v-click>
Enables powerful DevTools features:

- Compare before/after
- Undo/Redo
- Time-travel debugging
</div>

<!--
FR: Et lors de mes nombreuses quêtes, je me suis souvent retrouvée face à un ancien et puissant principe : l'immutable state.
[...] Grâce à l'immutable state... débugger devient presque magique.

EN: And throughout my many quests, I have often found myself facing an ancient and powerful principle: immutable state.
[...] Thanks to immutable state... debugging can feel almost like magic.
-->

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

<!--
FR: Pendant longtemps, mon arme principale pour relever le défi de l'immutable state... c'était le spread operator. Une lame qui demandait patience et précision.

EN: For a long time, my main weapon to face the challenge of immutable state... was the spread operator. A blade that required patience and precision.
-->

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

<!--
FR: Mais au fond de moi, je savais que cette fidèle lame était loin d’être l’arme ultime...

EN: But deep down, I knew that this trusty blade was far from being the ultimate weapon...
-->

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

<!--
FR: Et puis, il y a quelques mois, j'ai rejoint une nouvelle guilde : Datadog.
Et là, au détour d'une discussion, ils m'ont fait découvrir une arme incroyable... une relique ancienne... un artefact légendaire : Immer.
Cette arme est légère — à peine 4,7kB.
Elle est maniable — une seule fonction à maîtriser : produce.
Et surtout, elle est robuste — forgée en 2016 et toujours maintenue.

EN: And then, a few months ago, I joined a new guild: Datadog.
And there, in the middle of a conversation, they showed me an incredible weapon... an ancient relic... a legendary artifact: Immer.
This weapon is light — just 4.7kB.
It’s easy to wield — with a single function to master: produce.
And above all, it’s reliable and proven — forged in 2016, still maintained, still sharp.
-->

---
layout: image
image: images/immer-schema.png
backgroundSize: contain
---

<!--
FR: Le principe de base d'Immer est simple : vous appliquez toutes vos modifications sur un brouillon temporaire (draft), qui est un proxy de votre currentState. Une fois toutes les mutations terminées, Immer va produire un nouveau nextState basé sur les modifications apportées au draft. Cela vous permet de manipuler vos données comme si elles étaient mutables, tout en conservant tous les avantages d’un state immuable.

EN: The basic idea is that with Immer you will apply all your changes to a temporary draft, which is a proxy of the currentState. Once all your mutations are completed, Immer will produce the nextState based on the mutations to the draft state. This means that you can interact with your data by simply modifying it while keeping all the benefits of immutable data.
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

<!--
EN: She uses 2 health potions
-->

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

<!--
EN: Her sword loses 10 durability points
-->

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

<!--
EN: She equips a new helmet
-->

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

<!--
EN: She takes 15 damage
-->

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

<!--
EN: Quest 101 is marked as "in progress"
-->

---

If there's enough time left. Not mandatory at all.

use-immer lib

useState + Immer = useImmer

useReducer + Immer = useImmerReducer

Redux + Immer = just use produce

---
layout: image
image: images/final_artifact.webp
backgroundSize: cover
---

<!--
FR: Voilà, vous connaissez mon arme secrète. Maintenant c'est à vous de jouer.

EN: Now you know my secret weapon. It’s your turn to play.
-->
