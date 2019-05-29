<template>
  <div>
    <v-tooltip bottom v-if="!!tooltip">
      <template v-slot:activator="{on: mouseOn}">
        <v-btn :disabled="disabled" fab flat v-on="mouseOn" @click="triggerAction">
          <v-icon>{{icon}}</v-icon>
        </v-btn>
      </template>
      <span>{{tooltip}}</span>
    </v-tooltip>
    <v-btn v-if="!tooltip" :disabled="disabled" fab flat @click="triggerAction">
      <v-icon>{{icon}}</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  date() {
    return {
      show: false
    };
  },
  props: {
    icon: null,
    tooltip: null,
    disabled: false
  },
  methods: {
    triggerAction() {
      this.$emit("action");
    }
    // showTooltip(v) {
    //   this.show = v;
    // }
  }
};
</script>

<style>
</style>
