---
theme: ./theme
title: Level Up Your State Management with Immer
info: |
  Tired of endless .map, .filter, and deeply nested spread operators?
  In this lightning talk, I’ll show you how Immer makes immutable state management intuitive and easy to read.
download: true
layout: two-cols
---

<div flex flex-col flex-items-center mt-12 gap-3>

# Michèle Legait

Senior Frontend Developer

  <img src="/images/avatar.jpeg" rd-md style="width: 200px; height: 200px;" >

  <img src="/images/datadog.png" style="width: 200px;" >
</div>

::right::

<div flex flex-col flex-items-center flex-justify-center w-full h-full gap-8 mt-10>
  <div v-click><img src="/images/rivieradev.png" style="height: 150px;" ></div>
  <div v-click><img src="/images/jssophia.png" rounded-full style="height: 150px;" ></div>
</div>

<!--
FR: J'aimerais vous raconter une histoire.

EN: I would like to tell you a story.
-->

---
layout: image
image: /images/landscape.webp
backgroundSize: cover
transition: fade
---

<!--
FR: Au fil des années passées en tant que développeuse frontend, j'ai arpenté les contrées de React et de Redux.

EN: Over the years as a frontend developer, I have travelled across the lands of React and Redux.
-->

---
layout: image
image: /images/landscape_React_Redux.png
backgroundSize: cover
---

<!--
FR: Et lors de mes nombreuses quêtes, je me suis souvent retrouvée face à un ancien et puissant concept ...

EN: And throughout my many quests, I have often found myself facing an ancient and powerful concept ...
-->

---
layout: image-right
image: /images/aria.webp
---

# Immutable state

"Never update an object, always create a new version"

<div mt-8 v-click>
Change detection easy and predictable.

```ts
if (oldState !== newState) {
  // Something changed
  //   → React: let's re-render!
  //   → Redux: let's notify the listeners
}
```

</div>

<div mt-8 v-click>
Enables powerful DevTools features:

- Compare before/after
- Undo/Redo
- Time-travel debugging
</div>

<!--
FR: ... l'immutable state.

EN: ... immutable state.
-->

---
layout: image-right
image: /images/aria.webp
---

<div mt-14>

### Aria

```ts
const gameState = {
  player: {
    name: "Aria",
    level: 5,
    inventory: [
      { id: 1, name: "Health Potion", quantity: 3 },
      { id: 2, name: "Traveler’s Map" },
      { id: 3, name: "Old boots" },
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
```

</div>

<!--
FR: Pendant longtemps, mon arme principale pour gérer les immutable states était ...

EN: For a long time, my main weapon to manage immutable states was ...
-->

---
layout: image-right
image: /images/standard_weapon.webp
---

<div flex flex-col flex-items-center flex-justify-center mt-14>

# Spread operator

<div text-size-7xl font-mono>
  ...
</div>
</div>

<!--
FR: ... le spread operator.

EN: ... the spread operator.
-->

---
layout: image-right
image: /images/standard_weapon.webp
---

<div mt-14>

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

</div>

<!--
FR: ... Dégainons le spread operator ...

EN: ... Let's draw the spread operator ...
-->

---
layout: image-right
image: /images/used_weapon.webp
---

<div mt-14>

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

</div>

<!--
FR: Mais au fond de moi, je savais que cette lame était loin d’être l’arme ultime...

EN: But deep down, I knew that this blade was far from being the ultimate weapon...
-->

---
layout: image-right
image: /images/awesome_weapon.webp
---

<div flex flex-col flex-items-center flex-justify-center>
  <div v-click w-full>
    <img src="/images/immer.svg">
  </div>
<div>
  <div v-click mt-4>
  4.7kB (minified + gzipped)
  </div>

  <div v-click mt-4><code>produce</code></div>

  <div v-click mt-4>2016</div>
  </div>
</div>

<!--
FR: Et puis, il y a quelques mois, j'ai rejoint une nouvelle guilde : Datadog.
Et là, ils m'ont fait découvrir une arme incroyable... une relique ancienne... un artefact légendaire : Immer.
Cette arme est légère — à peine 4,7kB.
Elle est maniable — une seule fonction à maîtriser : produce.
Et surtout, elle est robuste — forgée en 2016, elle est toujours maintenue.

EN: And then, a few months ago, I joined a new guild: Datadog.
And there, they showed me an incredible weapon: Immer.
light — easy to wield (with a single function to master: produce) — reliable and proven (forged in 2016, it's still maintained).
-->

---
layout: image
image: /images/immer-schema.png
backgroundSize: contain
---

<!--
FR: Le principe de base d'Immer est simple : vous appliquez toutes vos modifications sur un brouillon temporaire (draft), qui est un proxy de votre currentState. Une fois toutes les mutations terminées, Immer va produire un nouveau nextState basé sur les modifications apportées au draft. Cela vous permet de manipuler vos données comme si elles étaient mutables, tout en conservant tous les avantages d’un state immuable.

EN: The basic idea is that with Immer you will apply all your changes to a temporary draft, which is a proxy of the currentState. Once all your mutations are completed, Immer will produce the nextState based on the mutations to the draft state. This means that you can simply modify your data while keeping all the benefits of immutable data.
-->

---
layout: two-cols-code
---

<div style="position: absolute; z-index: 1; top: 5px; left: 23%;">
<img src="/images/JS.png" style="height: 50px;" >
</div>

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

<div style="position: absolute; z-index: 1; top: 5px; left: 71%;">
<img src="/images/immer_logo.png" style="height: 46px;" >
</div>

```ts
const newState = produce(gameState, (draft) => {
  draft.player.stats.equipment.weapon = "Flaming Sword";
});
```
</div>

---
layout: image-right
image: /images/aria-battle.webp
---

<div mt-14>

### Aria gets ready for battle

<div mt-6>

- She uses a health potion
- She equips a new helmet
- She drops her old boots
- She finds a rare item that increases her mana

</div>

</div>

---
layout: two-cols-code
---

<div style="position: absolute; z-index: 1; top: 5px; left: 23%;">
<img src="/images/JS.png" style="height: 50px;" >
</div>

<div style="position: absolute; z-index: 1; top: 5px; left: 71%;">
<img src="/images/immer_logo.png" style="height: 46px;" >
</div>

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
  const potion = draft.player.inventory.find(
    (i) => i.name === "Health Potion"
  );
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
layout: two-cols-code
---

<div style="position: absolute; z-index: 1; top: 5px; left: 23%;">
<img src="/images/JS.png" style="height: 50px;" >
</div>

<div style="position: absolute; z-index: 1; top: 5px; left: 71%;">
<img src="/images/immer_logo.png" style="height: 46px;" >
</div>

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

```ts{2-7}
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find(
    (i) => i.name === "Health Potion"
  );
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
layout: two-cols-code
---

<div style="position: absolute; z-index: 1; top: 5px; left: 23%;">
<img src="/images/JS.png" style="height: 50px;" >
</div>

<div style="position: absolute; z-index: 1; top: 5px; left: 71%;">
<img src="/images/immer_logo.png" style="height: 46px;" >
</div>

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

```ts{8}
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find(
    (i) => i.name === "Health Potion"
  );
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
layout: two-cols-code
---

<div style="position: absolute; z-index: 1; top: 5px; left: 23%;">
<img src="/images/JS.png" style="height: 50px;" >
</div>

<div style="position: absolute; z-index: 1; top: 5px; left: 71%;">
<img src="/images/immer_logo.png" style="height: 46px;" >
</div>

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

```ts{9-11}
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find(
    (i) => i.name === "Health Potion"
  );
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
layout: two-cols-code
---

<div style="position: absolute; z-index: 1; top: 5px; left: 23%;">
<img src="/images/JS.png" style="height: 50px;" >
</div>

<div style="position: absolute; z-index: 1; top: 5px; left: 71%;">
<img src="/images/immer_logo.png" style="height: 46px;" >
</div>

```ts{2-6,13-18,30}
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

```ts{12-16}
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find(
      (i) => i.name === "Health Potion"
  );
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
She finds a rare item ...
-->


---
layout: two-cols-code
---

<div style="position: absolute; z-index: 1; top: 5px; left: 23%;">
<img src="/images/JS.png" style="height: 50px;" >
</div>

<div style="position: absolute; z-index: 1; top: 5px; left: 71%;">
<img src="/images/immer_logo.png" style="height: 46px;" >
</div>

```ts{2-4,19-21,29-30}
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

```ts{17}
const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find(
      (i) => i.name === "Health Potion"
  );
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
... that increases her mana
-->

---
layout: two-cols
---

<div style="position: absolute; z-index: 1; top: 5px; left: 23%;">
<img src="/images/immer_logo.png" style="height: 46px;" >
</div>

```ts {monaco}
import { produce } from "immer";
import { gameState } from './state';

const newState = produce(gameState, (draft) => {
  const potion = draft.player.inventory.find(
      (i) => i.name === "Health Potion"
  );
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
    quantity: 1
  });
  draft.player.stats.mana += 10;
});
```

::right::

<div flex flex-justify-center w-full mt-30>
  <img src="/images/typescript.png" style="width: 150px; height: 150px;" >
</div>

---
layout: image-right
image: /images/final_artifact.webp
---

<div w-full mt-10>
  <img src="/images/immer.svg">
</div>
<div text-align-center text-size-2xl mt-10><a href="https://immerjs.github.io/immer/">https://immerjs.github.io/immer/</a></div>

<!--
FR: Voilà, maintenant que vous connaissez cette arme, c'est à vous de jouer !

EN: Now you know this weapon. It’s your turn to play!
-->
