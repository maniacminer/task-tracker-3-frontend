<template>
    <v-content>
        <v-container>
            <v-card>
                <v-data-table :headers="headers" :items="taskList" :loading="loading" 
                    class="elevation-1" 
                    no-data-text="Тут пока нет задач (или они еще не загрузились)"
                    :rows-per-page-items="rowsPerPageItems"
                    :pagination.sync="pagination"
                    rows-per-page-text="Строк на странице">
                <v-progress-linear  v-slot:progress color="blue" indeterminate></v-progress-linear>
                    <template v-slot:items="props">
                        <tr :class="{'row-not-actual': props.item.completed}" @click="editItem(props.item)">
                            <td :class="getRowClasses(props.item)">{{ props.item.title }}</td>
                            <td>{{ props.item.createDate }}</td>
                            <td>{{ props.item.dueDate }}</td>
                            <!-- <td>{{ props.item.priority }}</td> -->
                            <!-- <td :class="{'row-completed':false}">
                                <v-icon small class="mr-2" @click="editItem(props.item)" >
                                edit
                                </v-icon>                            
                            </td> -->
                        </tr>
                    </template>            
                </v-data-table>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat class="font-weight-regular secondary black--text" :to="{name: 'newtask'}">Новая задача</v-btn>
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
                // {text: 'Приоритет', value: 'priority'},
                // {text: 'Действия', value: 'name', sortable: false },

            ],
            rowsPerPageItems: [10, 20, 30, 40],
            pagination: {
                rowsPerPage: 20
            },
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
        editItem(item){
            this.$router.push(`/task/${item.id}`)
        },
        getRowClasses(item, applyCompleted = true) {
            let classes = {
                'row-task': true,
            }

            classes[`row-priority-${item.priority}`] = true

            if (applyCompleted) {
                classes['completed'] = item.completed
            }


            return classes
        }

    }

}
</script>

<style>
    thead {
        background-color: #F5F5F5;
        
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
    }

    .row-priority-1 {
        border-left-color: #2196F3;
    }
    .row-priority-2 {
        border-left-color: #4CAF50;
    }
    .row-priority-3 {
        border-left-color: #FFC107;
    }    
    .row-priority-4 {
        border-left-color: #EF5350;
    }        
    .row-priority-5 {
        border-left-color: #E040FB;
    }        

</style>
