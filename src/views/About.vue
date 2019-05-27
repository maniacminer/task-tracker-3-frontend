<template>
  <div>
    <v-bt @click="click"></v-bt>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    click(e) {
      console.log(e);
    }
  }
};
</script>

<style></style>
