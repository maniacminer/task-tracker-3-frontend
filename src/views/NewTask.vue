<template>
  <app-doc :data="$data" @dataLoaded="dataLoaded">
    <v-text-field
      label="Заголовок"
      :rules="mustNotBeEmpty"
      v-model="title"
      name="title"
      type="text"
    ></v-text-field>
    <v-textarea v-model="description" name="description" label="Описание задачи"></v-textarea>
    <v-layout row wrap justify-space-between>
      <v-flex xs12 sm5 md3>
        <v-menu v-model="dueDateMenu" :close-on-content-click="true" offset-y>
          <template v-slot:activator="{ on }">
            <!-- <label class="grey--text text--darken-1"  for="">Дата дедлайна</label> -->
            <v-text-field v-model="dueDate" label="Дедлайн" prepend-icon="event" readonly v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="dueDate" @input="dueDateMenu = false"></v-date-picker>
        </v-menu>
      </v-flex>
      <v-flex xs12 sm6 md4>
        <v-layout>
          <v-flex>
            <label class="grey--text text--darken-1 caption" for>Приоритет: {{priorityDescr}}</label>
            <v-rating
              :background-color="priorityColor"
              id="priority"
              :color="priorityColor"
              full-icon="whatshot"
              empty-icon="minimize"
              v-model="priority"
            ></v-rating>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm12 md4>
        <v-select
          prepend-icon="person"
          :items="responsibleList"
          label="Ответственный"
          persistent-hint
          single-line
          return-object
          v-model="responsible"
          :hint="responsible.fullName"
          item-value="id"
          item-text="name"
          @click.native="loadList"
        ></v-select>
      </v-flex>
    </v-layout>

    <template v-slot:actions>
      <v-layout ml-2>
        <v-checkbox color="grey darken-2" v-model="completed" label="Закрыта"/>
      </v-layout>
      <v-spacer></v-spacer>
    </template>
  </app-doc>
</template>

<script>
import validationMixins from "@/validationMixins";

export default {
  mixins: [validationMixins],
  data() {
    return {
      _name: "task",
      _title: "Задача",
      _persistent: [
        "title",
        "description",
        "completed",
        "dueDate",
        "createDate",
        "priority",
        "responsible"
      ],
      title: "",
      inProgress: false,
      description: "",
      completed: false,
      dueDate: new Date().toISOString().substr(0, 10),
      createDate: new Date().toISOString().substr(0, 10),
      dueDateMenu: false,
      responsible: { id: null, name: null, fullName: null },
      priority: 2,
      responsibleList: []
    };
  },

  methods: {
    loadList() {
      const vm = this;
      this.$store
        .dispatch(`getCollection`, { name: "user" })
        .then(querySnapshot => {
          vm.responsibleList = [];
          querySnapshot.forEach(doc => {
            let row = { id: doc.id };
            const data = doc.data();

            row.name = data.name;
            row.fullName = data.fullName;

            vm.responsibleList.push(row);
          });
        })
        .catch(err => {});
    },

    dataLoaded(data) {
      // если нет в списке выбора v-select не отображает
      if (data.responsible && data.responsible.id) {
        this.responsibleList = [data.responsible];
      }
    }
  },
  computed: {
    getUserList() {
      return this.responsibleList;
    },
    priorityColor() {
      if (this.priority == 1) {
        return "blue";
      } else if (this.priority == 2) {
        return "green";
      } else if (this.priority == 3) {
        return "amber ";
      } else if (this.priority == 4) {
        return "red lighten-1";
      } else if (this.priority == 5) {
        return "purple accent-2";
      }
    },
    priorityDescr() {
      if (this.priority == 1) {
        return "Низкий";
      } else if (this.priority == 2) {
        return "Нормальный";
      } else if (this.priority == 3) {
        return "Повышенный";
      } else if (this.priority == 4) {
        return "Высокий";
      } else if (this.priority == 5) {
        return "Критический";
      }
    }
  }
};
</script>

<style scoped>
</style>

