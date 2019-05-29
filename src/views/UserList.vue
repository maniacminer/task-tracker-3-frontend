<template>
  <app-journal :metadata="{name: 'user'}" :headers="headers"></app-journal>
</template>

<script>
export default {
  data() {
    return {
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
