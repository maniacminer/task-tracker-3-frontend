<template>
  <app-journal :metadata="metadata" :headers="headers"></app-journal>
</template>

<script>
export default {
  data() {
    return {
      metadata: {
        name: "user"
      },
      headers: [
        { text: "e-mail", value: "email" },
        { text: "Имя", value: "name" },
        { text: "Польное имя", value: "fullName" }
      ]
    };
  }
};
</script>

<style>
</style>
