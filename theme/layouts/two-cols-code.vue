<!--
  Usage:

```md
---
layout: two-cols-code
---

# Left

This shows on the left

::right::

# Right

This shows on the right
```

-->

<template>
  <div class="slidev-layout two-cols-code two-columns grid grid-cols-2 gap-10">
    <div class="col-left">
      <slot />
    </div>
    <div class="col-right">
      <slot name="right" />
    </div>
  </div>
</template>
