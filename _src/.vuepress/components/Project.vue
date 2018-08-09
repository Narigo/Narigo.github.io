<template>
  <div :class="'project' + (showDetails ? ' active' : '')" v-on:click="this.toggleProject">
    <div class="project-image"><a :href="link"><img :src="image" /></a></div>
    <div class="project-text">
      <h2>{{ name }}</h2>
      <div class="description">{{ description }}</div>
      <div class="details"><slot /></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDetails: false
    };
  },
  props: {
    description: {
      type: String,
      required: true
    },
    image: { default: "//placekitten.com/250/300" },
    link: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  methods: {
    toggleProject() {
      this.showDetails = !this.showDetails;
    }
  }
};
</script>

<style scoped>
.project {
  box-shadow: 0px 0px 15px 5px #eee;
  width: 250px;
}

.project.active {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  padding: 25px;
  z-index: 1000;
  background-color: rgba(255, 255, 255, 1);
}

.project-image {
  height: 250px;
  display: flex;
  align-items: center;
	justify-content: center;
	overflow: hidden;
}

.project-text > h2 {
  margin: 0;
  padding: 10px 20px;
}

.project-text > h2,
.project-text > .description {
  padding: 20px;
}

.project.active .description,
.project-text > .details {
  display: none;
}

.project.active .project-text > .details {
  display: block;
}
</style>
