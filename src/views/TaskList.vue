<template>
  <app-journal :headers="headers" :metadata="metadata" :filters="filters">
    <template v-slot:main="row">
      <td :class="getRowClasses(row.item)">{{ row.item.title }}</td>
      <td>{{ row.item.createDate }}</td>
      <td>{{ row.item.dueDate }}</td>
      <td>{{ row.item.responsible ? row.item.responsible.name : '' }}</td>
    </template>
    <template v-slot:actions>
      <v-checkbox v-model="showClosed" label="Показывать закрытые" color="grey darken-2"></v-checkbox>
      <v-spacer></v-spacer>
      <v-btn
        flat
        class="font-weight-regular secondary black--text"
        :to="{ name: 'task-new' }"
      >Новая задача</v-btn>
    </template>
  </app-journal>
</template>

<script>
export default {
  data() {
    return {
      metadata: {
        name: "task"
      },
      headers: [
        { text: "Заголовок", value: "title" },
        { text: "Создана", value: "createDate" },
        { text: "Дедлайн", value: "dueDate" },
        { text: "Ответственный", value: "responsible" }
      ],
      showClosed: this.$route.query.showClosed === "true"
    };
  },

  computed: {
    filters() {
      let filters = [];
      if (!this.showClosed) {
        filters.push({ field: "completed", eq: "==", value: false });
      }
      return filters;
    }
  },

  watch: {
    showClosed() {
      this.$router.push({
        name: this.metadata.name,
        query: { showClosed: this.showClosed }
      });
    }
  },

  methods: {
    getRowClasses(item, applyCompleted = true) {
      let classes = {
        "row-task": true
      };

      classes[`row-priority-${item.priority}`] = true;

      if (applyCompleted) {
        classes["completed"] = item.completed;
      }

      return classes;
    }
  }
};
</script>

<style>
thead {
  background-color: #f5f5f5;
}

.row-task {
  border-left-style: solid;
  border-left-width: 7px;
  cursor: pointer;
}

.row-not-actual {
  color: lightsteelblue;
}

.completed {
  text-decoration: line-through;
  color: lightsteelblue;
}

.row-priority-1 {
  border-left-color: #2196f3;
}
.row-priority-2 {
  border-left-color: #4caf50;
}
.row-priority-3 {
  border-left-color: #ffc107;
}
.row-priority-4 {
  border-left-color: #ef5350;
}
.row-priority-5 {
  border-left-color: #e040fb;
}
</style>
