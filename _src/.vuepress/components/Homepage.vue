<template>
  <div class="page">
    <Navbar />
    <div class="header">
      <img class="image" :src="$withBase('/jb.jpg')" />
      <div class="texts">
        <div class="big">{{ this.$page.frontmatter.hi }}</div>
        <div class="slogan">{{ this.$page.frontmatter.slogan }}</div>
      </div>
    </div>
    <Content />
  </div>
</template>

<script>
import Navbar from "@theme/components/Navbar.vue";

export default {
  components: {
    Navbar,
  },
};
</script>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.header img {
  clip-path: circle(100px at center);
  height: 300px;
  width: 200px;
}

.header .texts {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header .big {
  font-size: 9rem;
}

.header .slogan {
  font-size: 2rem;
}
</style>
