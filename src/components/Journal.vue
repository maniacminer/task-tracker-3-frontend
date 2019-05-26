<template>
    <v-content>
        <v-container>
            <v-card>
                <v-data-table :headers="headers" :items="items" :loading="loading" 
                    class="elevation-1" 
                    no-data-text="Тут пока ничего нет (или они еще не загрузилось)"
                    :rows-per-page-items="rowsPerPageItems"
                    :pagination.sync="pagination"
                    rows-per-page-text="Строк на странице">

                    <v-progress-linear  v-slot:progress indeterminate></v-progress-linear>
                    <!-- <tr :class="{'row-not-actual': row.item.completed}" @click="editItem(row.item)"> -->
                    <template v-slot:items="row" >
                        <tr  @click="editItem(row.item)">
                            <slot name="main" v-bind="row"></slot>
                        </tr>
                    </template>            
                </v-data-table>
                <v-card-actions>
                    <slot name="actions"></slot>
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
            items: [],
        }
    },
    props: {
        headers: null,
        metadata: null,
        filters: null,
    },

    created() {
        this.read()
    },    
    methods: {
        editItem(item){
            this.$router.push(`/${this.metadata.name}/${item.id}`)
        },        
        read() {
            console.log(this.filters);
            const vm = this
            this.$store.dispatch('getCollection', {name: this.metadata.name, filters: this.filters})
                .then(querySnapshot => {
                    vm.items = []
                    querySnapshot.forEach(function(doc) {
                        let row = {id: doc.id}
                        row = Object.assign(row, doc.data())
                        vm.items.push(row)
                    })
                    this.loading = false
                })
                .catch(err => {
                    console.error(err)
                    this.loading = false
                })
        }
    },
    watch: {
        filters() {
            this.read()
        }
    }

}
</script>

<style scoped>
</style>
