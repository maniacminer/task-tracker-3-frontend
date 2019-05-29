<template>
  <v-content>
    <v-container>
      <v-card>
        <div>
          <v-btn @click="click">click me</v-btn>
          <button id="new">another button</button>
        </div>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    right() {
      console.log("right");
      return true;
    },

    left() {
      console.log("left");
      return true;
    },

    click(e) {
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

      const cat = { breed: "serval" };
      const vasya = Object.create(cat);

      vasya.name = "Vasya";

      console.log(vasya);
    }
  }
};
</script>

<style></style>
