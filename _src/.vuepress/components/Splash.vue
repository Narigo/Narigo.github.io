<template>
  <div class="page">
    <div class="header">
      <img class="image" :src="$withBase('/jb.jpg')" />
      <div class="texts">
        <div class="big">{{ this.$props.hi }}</div>
        <div class="slogan">{{ this.$props.slogan }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hi: {
      type: String,
      required: true,
    },
    slogan: {
      type: String,
      required: true,
    },
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
