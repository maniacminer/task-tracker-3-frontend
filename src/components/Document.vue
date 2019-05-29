<template>
  <v-content>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card>
            <v-form ref="form">
              <v-toolbar height="60px" class="elevation-1">
                <!-- <v-progress-circular indeterminate color="primary" v-show="inProgress"/> -->
                <v-icon>assignment</v-icon>
                <v-toolbar-title>{{data._title}}</v-toolbar-title>

                <v-spacer></v-spacer>
                <slot name="toolbar"></slot>

                <app-action icon="delete" @action="deleteDialog = true"/>
                <v-dialog v-model="deleteDialog" width="500px">
                  <v-card>
                    <v-card-title>
                      <span class="headline">Удалить документ?</span>
                    </v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary darken-1" flat="flat" @click="deleteDoc">Да</v-btn>
                      <v-btn color="primary darken-1" flat="flat" @click="deleteDialog = false">Нет</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <app-action icon="save" tooltip="Сохранить" @action="save(false)"/>
                <app-action icon="save_alt" tooltip="Сохранить и выйти" @action="save(true)"/>
                <app-action disabled icon="bookmark_border" tooltip="Добавить закладку"/>
                <app-action icon="clear" tooltip="Вернуться в журнал" @action="close"/>
              </v-toolbar>

              <v-progress-linear v-show="inProgress" v-slot:progress color="grey" indeterminate/>
              <v-card-text>
                <slot v-if="!isOpening" name="default"></slot>
              </v-card-text>
              <v-card-actions>
                <slot v-if="!isOpening" name="actions"></slot>
              </v-card-actions>
              <v-alert
                :value="error_msg"
                type="error"
                class
                outline
              >{{ error_msg ? error_msg.message : '' }}</v-alert>
            </v-form>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { Promise } from "q";
import Action from "@/components/Action.vue";

export default {
  components: {
    "app-action": Action
  },
  data() {
    return {
      inProgress: false,
      isOpening: true,
      deleteDialog: false,
      id: null,
      error_msg: null
    };
  },
  props: {
    // данные из реализаций
    data: null,
    // делегаты из реализаций:
    beforeSave: null
  },

  methods: {
    close() {
      this.$router.push({ name: this.lcName });
      this.$emit("close");
    },

    save(exit) {
      const vm = this;

      Promise.resolve()
        .then(_ => {
          // валидируем форму
          if (!vm.$refs.form.validate()) {
            console.log("!");
            return Promise.reject(new Error("Неверно заполнены поля"));
          }

          // установка прогрессбара в активное состояние
          vm.inProgress = true;
        })
        .then(_ => {
          // выполнение действий перед сохранением потомка
          return vm.beforeSaveChild;
        })
        .then(_ => {
          return vm.$store.dispatch("saveDoc", {
            payload: vm.data,
            id: vm.id
          });
        })
        .then(docRef => {
          if (docRef) {
            vm.id = docRef.id;
            vm.data.id = docRef.id;
            // TODO: возможно обновить без перехода?
            vm.$router.push(`/${vm.lcName}/${vm.id}`);
          }
          vm.$emit("saveCompleted");
          vm.error_msg = null;
          if (exit) vm.$router.push(`/${vm.lcName}`);
        })
        .catch(err => {
          vm.error_msg = err;
          console.error(err);
        })
        .finally(_ => {
          vm.inProgress = false;
        });
    },

    deleteDoc() {
      const vm = this;

      Promise.resolve()
        .then(_ => {
          // установка прогрессбара в активное состояние
          vm.inProgress = true;
        })
        .then(_ => {
          return vm.$store.dispatch("deleteDoc", {
            id: vm.id,
            name: vm.lcName
          });
        })
        .then(_ => {
          vm.$router.push({ name: vm.lcName });
          vm.$emit("deleteCompleted");
        })
        .catch(err => {
          vm.error_msg = err;
          console.error(err);
        })
        .finally(_ => {
          vm.inProgress = false;
        });
    }
  },
  created() {
    const vm = this;
    const id = vm.$route.params.id;

    if (!id) {
      vm.isOpening = false;
      return;
    }

    Promise.resolve()
      .then(_ => {
        // установка прогрессбара в активное состояние
        vm.inProgress = true;
      })
      .then(_ => {
        return vm.$store.dispatch("getDoc", {
          name: vm.lcName,
          id: id
        });
      })
      .then(doc => {
        if (!doc.exists)
          return Promise.reject(
            `no document of type "${vm.lcName}" with id "${id}"`
          );

        vm.data = Object.assign(vm.data, doc.data());
        vm.id = id;
        vm.data.id = id;

        vm.isOpening = false;

        vm.$emit("dataLoadCompleted", vm.data);
      })
      .catch(err => {
        vm.error_msg = err;
        console.error(err);
      })
      .finally(_ => {
        vm.inProgress = false;
      });
  },

  computed: {
    beforeSaveChild() {
      if (!this.beforeSave) {
        // не подключен обработчик
        return Promise.resolve();
      } else {
        // распаковка промиса
        return this.beforeSave();
      }
    },

    mdName() {
      const str = this.data._name;
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    },
    lcName() {
      return this.data._name.toLowerCase();
    },
    isNew() {
      return !!this.id;
    },
    isDeletable() {
      return !this.isNew;
    }
  }
};
</script>

<style>
</style>
