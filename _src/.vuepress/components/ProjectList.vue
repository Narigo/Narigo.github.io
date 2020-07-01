<template>
  <div class="projects">
    <slot />
  </div>
</template>

<style>
.projects {
  display: flex;
  flex-direction: row;
  align-content: space-between;
  flex-wrap: wrap;
  list-style-type: none;
}

.projects > * {
  margin: 25px;
  width: 250px;
}
</style>
