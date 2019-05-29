<template>
  <app-journal :headers="headers" :metadata="{name: 'project'}"></app-journal>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Идентификатор", value: "pid" },
        { text: "Проект", value: "title" },
        { text: "Репозиторий", value: "gitrepo" }
      ]
    };
  }
};
</script>

<style>
</style>
