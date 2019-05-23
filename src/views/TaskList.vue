<template>
    <v-content>
        <v-container>
            <v-card>
                <v-data-table :headers="headers" :items="taskList" :loading="loading">
                    <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
                    <template v-slot:items="props">
                    <td>{{ props.item.title }}</td>
                    <td>{{ props.item.createDate }}</td>
                    <td>{{ props.item.dueDate }}</td>
                    <td>{{ props.item.priority }}</td>
                    </template>            

                </v-data-table>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="primary" :to="{name: 'newtask'}">Новая задача</v-btn>
                </v-card-actions>
                    
            </v-card>
        </v-container>
    </v-content>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data(){
        return {
            loading: true,
            headers: [
                {text: 'Заголовок', value: 'title'},
                {text: 'Создана', value: 'createDate'},
                {text: 'Дедлайн', value: 'dueDate'},
                {text: 'Приоритет', value: 'priority'},

            ]
        }

    },
    created() {
        this.$store.dispatch('getTaskList', err => {
            if (err){
                console.error(err)
            }
            this.loading = false
        })
    },
    computed: { 
        taskList() {
            return this.$store.state.Db.taskList
        }

    },
    methods: {

    }

}
</script>

<style>

</style>
