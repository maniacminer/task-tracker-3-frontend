<template>
  <v-content>
    <v-container>
      <v-card>
        <v-data-table
          :headers="headers"
          :items="items"
          :loading="loading"
          class="elevation-1"
          no-data-text="Тут пока ничего нет (или у вас нет прав)"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          rows-per-page-text="Строк на странице"
        >
          <v-progress-linear v-slot:progress indeterminate></v-progress-linear>
          <template v-slot:items="row">
            <tr @click="editItem(row.item)">
              <slot name="main" v-bind="row"></slot>
              <!-- <slot>
              </slot>-->
              <template v-if="!isTemplateForRowProvided">
                <td v-for="c in headers" v-bind:key="c.value">{{ row.item[c.value] }}</td>
              </template>
            </tr>
          </template>
        </v-data-table>
        <v-card-actions>
          <slot name="actions"></slot>
          <template v-if="!isTemplateForActionsProvided">
            <v-spacer></v-spacer>
            <v-btn
              flat
              class="font-weight-regular secondary black--text"
              :to="{name: `${metadata.name}-new`}"
            >Новый</v-btn>
          </template>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      rowsPerPageItems: [10, 20, 30, 40],
      pagination: {
        rowsPerPage: 20
      },
      items: []
    };
  },
  props: {
    headers: null,
    metadata: null,
    filters: null,
    rowProcessor: null
  },

  created() {
    this.read();
  },
  mounted() {},

  methods: {
    editItem(item) {
      this.$router.push(`/${this.metadata.name}/${item.id}`);
    },
    read() {
      const vm = this;
      vm.$store
        .dispatch("getCollection", {
          name: vm.metadata.name,
          filters: vm.filters
        })
        .then(querySnapshot => {
          vm.items = [];
          querySnapshot.forEach(doc => {
            let row = { id: doc.id };
            if (!vm.rowProcessor) {
              row = Object.assign(row, doc.data());
            } else {
              vm.rowProcessor(row, doc.data());
            }

            vm.items.push(row);
          });
          vm.loading = false;
        })
        .catch(err => {
          console.error(err);
          vm.loading = false;
        });
    }
  },
  watch: {
    filters() {
      this.read();
    }
  },
  computed: {
    isTemplateForRowProvided() {
      return this.$scopedSlots["main"] !== undefined;
    },
    isTemplateForActionsProvided() {
      return this.$scopedSlots["actions"] !== undefined;
    }
  }
};
</script>