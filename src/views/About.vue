<template>
  <v-content>
    <v-container>
      <v-card>
        <div>
          <button id="button" @click="click">click me</button>
          <!-- <button>another button</button> -->
          <v-card id="dropdown" v-if="show" class="fixed">asdfasdf</v-card>
        </div>
        <span>some text</span>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      show: false
    };
  },

  created() {
    const vm = this;
    window.addEventListener("mouseup", e => {
      const btn = document.querySelector("#button");
      if (e.target === btn) {
        return;
      }

      const box = document.querySelector("#dropdown");
      if (box && e.target != box) {
        vm.show = false;
      }
    });
  },

  methods: {
    right() {
      return true;
    },

    left() {
      return true;
    },

    click(e) {
      // console.log(e);
      this.show = !this.show;
      // const Object1 = function(initVal) {
      //   this.initVal = initVal;
      // };

      // var obj1 = new Object1("new value111");

      // console.log(obj1);
      // // console.log(typeof obj1);
      // console.log(obj1.constructor.name);

      // const f = function() {
      //   console.log("function:", arguments);
      //   console.log(Array.isArray(arguments));
      //   console.log(Array.isArray([1, 2, 3]));
      // };

      // f("arg1", 1, { name: "arg2" });

      // console.log({}.__proto__);
      // console.log({}.prototype);

      // const cat = { breed: "serval" };
      // const vasya = Object.create(cat);

      // vasya.name = "Vasya";

      // console.log(vasya);
    }
  }
};
</script>

<style scoped>
.fixed {
  position: absolute;
  height: 460px;
  width: 233px;
  display: block;
  box-shadow: 1 0 41px rgba(0, 0, 0, 0.5); /* Параметры тени */
  /* left: 339; */
  /* top: 94; */
  z-index: 4;
}
/* @import "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"; */
/* @import "node_modules/path/to/your/cssfileName"; */
/* @import "../../node_modules/materialize-css/dist/css/materialize.css"; */
</style>
