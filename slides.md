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
FR: J'aimerais vous raconter une histoire.

EN: I would like to tell you a story.
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

<!--
FR: Et lors de mes nombreuses quêtes, je me suis souvent retrouvée face à un ancien et puissant concept ...

EN: And throughout my many quests, I have often found myself facing an ancient and powerful concept ...
-->

---
layout: image-right
image: images/aria.webp
---

# Immutable state

"Never update an object, always create a new version"

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
FR: ... l'immutable state.
[...] Grâce à l'immutable state... débugger devient presque magique.

EN: ... immutable state.
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

<!--
FR: Pendant longtemps, mon arme principale pour gérer les immutable states était ...

EN: For a long time, my main weapon to manage immutable states was ...
-->

---
layout: image-right
image: images/standard_weapon.webp
---

# Spread operator

...

<!--
FR: ... le spread operator. Une lame qui demandait patience et précision.

EN: ... the spread operator. A blade that required patience and precision.
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

<!--
FR: ... Dégainons le spread operator ...

EN: ... Let's draw the spread operator ...
-->

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
Et là, ils m'ont fait découvrir une arme incroyable... une relique ancienne... un artefact légendaire : Immer.
Cette arme est légère — à peine 4,7kB.
Elle est maniable — une seule fonction à maîtriser : produce.
Et surtout, elle est robuste — forgée en 2016, elle est toujours maintenue.

EN: And then, a few months ago, I joined a new guild: Datadog.
And there, they showed me an incredible weapon... an ancient relic... a legendary artifact: Immer.
This weapon is light — just 4.7kB.
It’s easy to wield — with a single function to master: produce.
And above all, it’s reliable and proven — forged in 2016, it's still maintained.
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

### Aria gets ready for battle

- She uses a health potion
- She equips a new helmet
- She drops her old boots
- She finds a rare item that increases her mana

---
layout: two-cols
---

```ts
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    inventory: [
      ...gameState.player.inventory
        .map((item) =>
          item.name === "Health Potion"
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.name !== "Old Boots"),
      {
        id: 3,
        name: "Phoenix Feather",
        rarity: "legendary",
      },
    ],
    stats: {
      ...gameState.player.stats,
      mana: gameState.player.stats.mana + 10
      equipment: {
        ...gameState.player.stats.equipment,
        armor: {
          ...gameState.player.stats.equipment.armor,
          head: "Steel Helmet",
        },
      },
    },
  },
};
```

::right::

```ts
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find((i) => i.name === "Health Potion");
  if (potion) {
    potion.quantity -= 1;
  }
  draft.player.stats.equipment.armor.head = "Steel Helmet";
  draft.player.inventory = draft.player.inventory.filter(
    (i) => i.name !== "Old Boots",
  );
  draft.player.inventory.push({
    id: 3,
    name: "Phoenix Feather",
    rarity: "legendary",
  });
  draft.player.stats.mana += 10;
});
```

---
layout: two-cols
---

```ts{2-11,18,30}
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    inventory: [
      ...gameState.player.inventory
        .map((item) =>
          item.name === "Health Potion"
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.name !== "Old Boots"),
      {
        id: 3,
        name: "Phoenix Feather",
        rarity: "legendary",
      },
    ],
    stats: {
      ...gameState.player.stats,
      mana: gameState.player.stats.mana + 10
      equipment: {
        ...gameState.player.stats.equipment,
        armor: {
          ...gameState.player.stats.equipment.armor,
          head: "Steel Helmet",
        },
      },
    },
  },
};
```

::right::

```ts{2-5}
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find((i) => i.name === "Health Potion");
  if (potion) {
    potion.quantity -= 1;
  }
  draft.player.stats.equipment.armor.head = "Steel Helmet";
  draft.player.inventory = draft.player.inventory.filter(
    (i) => i.name !== "Old Boots",
  );
  draft.player.inventory.push({
    id: 3,
    name: "Phoenix Feather",
    rarity: "legendary",
  });
  draft.player.stats.mana += 10;
});
```

<!--
She uses a health potion
-->

---
layout: two-cols
---

```ts{2-4,19-20,22-30}
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    inventory: [
      ...gameState.player.inventory
        .map((item) =>
          item.name === "Health Potion"
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.name !== "Old Boots"),
      {
        id: 3,
        name: "Phoenix Feather",
        rarity: "legendary",
      },
    ],
    stats: {
      ...gameState.player.stats,
      mana: gameState.player.stats.mana + 10
      equipment: {
        ...gameState.player.stats.equipment,
        armor: {
          ...gameState.player.stats.equipment.armor,
          head: "Steel Helmet",
        },
      },
    },
  },
};
```

::right::

```ts{6}
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find((i) => i.name === "Health Potion");
  if (potion) {
    potion.quantity -= 1;
  }
  draft.player.stats.equipment.armor.head = "Steel Helmet";
  draft.player.inventory = draft.player.inventory.filter(
    (i) => i.name !== "Old Boots",
  );
  draft.player.inventory.push({
    id: 3,
    name: "Phoenix Feather",
    rarity: "legendary",
  });
  draft.player.stats.mana += 10;
});
```

<!--
She equips a new helmet
-->

---
layout: two-cols
---

```ts{2-6,12,18,30}
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    inventory: [
      ...gameState.player.inventory
        .map((item) =>
          item.name === "Health Potion"
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.name !== "Old Boots"),
      {
        id: 3,
        name: "Phoenix Feather",
        rarity: "legendary",
      },
    ],
    stats: {
      ...gameState.player.stats,
      mana: gameState.player.stats.mana + 10
      equipment: {
        ...gameState.player.stats.equipment,
        armor: {
          ...gameState.player.stats.equipment.armor,
          head: "Steel Helmet",
        },
      },
    },
  },
};
```

::right::

```ts{7-9}
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find((i) => i.name === "Health Potion");
  if (potion) {
    potion.quantity -= 1;
  }
  draft.player.stats.equipment.armor.head = "Steel Helmet";
  draft.player.inventory = draft.player.inventory.filter(
    (i) => i.name !== "Old Boots",
  );
  draft.player.inventory.push({
    id: 3,
    name: "Phoenix Feather",
    rarity: "legendary",
  });
  draft.player.stats.mana += 10;
});
```

<!--
She drops her old boots
-->

---
layout: two-cols
---

```ts{2-6,13-21,29-30}
const newState = {
  ...gameState,
  player: {
    ...gameState.player,
    inventory: [
      ...gameState.player.inventory
        .map((item) =>
          item.name === "Health Potion"
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.name !== "Old Boots"),
      {
        id: 3,
        name: "Phoenix Feather",
        rarity: "legendary",
      },
    ],
    stats: {
      ...gameState.player.stats,
      mana: gameState.player.stats.mana + 10
      equipment: {
        ...gameState.player.stats.equipment,
        armor: {
          ...gameState.player.stats.equipment.armor,
          head: "Steel Helmet",
        },
      },
    },
  },
};
```

::right::

```ts{10-15}
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find((i) => i.name === "Health Potion");
  if (potion) {
    potion.quantity -= 1;
  }
  draft.player.stats.equipment.armor.head = "Steel Helmet";
  draft.player.inventory = draft.player.inventory.filter(
    (i) => i.name !== "Old Boots",
  );
  draft.player.inventory.push({
    id: 3,
    name: "Phoenix Feather",
    rarity: "legendary",
  });
  draft.player.stats.mana += 10;
});
```

<!--
She finds a rare item that increases her mana
-->

---
layout: image
image: images/final_artifact.webp
backgroundSize: cover
---

<!--
FR: Voilà, maintenant que vous connaissez cette arme, c'est à vous de jouer !

EN: Now you know this weapon. It’s your turn to play!
-->
