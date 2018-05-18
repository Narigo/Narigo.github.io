<template>
  <div class="project">
    <a :href="link">
      <img class="project-image" :src="image" />
      <div class="project-text">
        <h2>{{ name }}</h2>
        <div class="description"><slot /></div>
      </div>
    </a>
  </div>
</template>

<script>
import defaultImage from "../assets/jb.jpg";

export default {
  props: {
    description: {},
    image: { default: defaultImage },
    link: {},
    name: {}
  }
};
</script>

<style scoped>
.project {
  box-shadow: 0px 0px 15px 5px #eee;
  width: 250px;
}

.project-text > h2 {
  margin: 0;
  padding: 10px 20px;
}
.project-text > * {
  padding: 20px;
}
</style>
