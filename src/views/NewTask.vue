<template>
    <v-content>
        <v-container>
            <v-layout>
                <v-flex>
                    <v-card>
                        <v-form>
                            <v-toolbar height="60px">
                                <!-- <v-layout mt-4> -->
                                <v-toolbar-title>Новая задача: </v-toolbar-title>
                                <v-flex pl-3>
                                    <v-text-field  v-model="title" name="title" type="text"></v-text-field>                            
                                </v-flex>
                                    <v-btn flat @click="save"> <v-icon left>save</v-icon> Сохранить </v-btn>
                                <!-- </v-layout> -->
                            </v-toolbar>
                            <v-card-text>
                                <v-textarea v-model="description" name="description"
                                    label="Описание задачи"></v-textarea> 
                                      <v-layout row wrap justify-space-between>
                                        
                                        <v-flex xs12 sm5 md3 >
                                            <!-- <v-responsive max-width="150px"> -->
                                                <v-menu v-model="dueDateMenu" :close-on-content-click="true"
                                                offset-y>
                                                    <template v-slot:activator="{ on }">
                                                    <!-- <label class="grey--text text--darken-1"  for="">Дата дедлайна</label> -->
                                                    <v-text-field v-model="dueDate" label="Дедлайн"
                                                        prepend-icon="event" readonly v-on="on" >
                                                    </v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="dueDate" @input="dueDateMenu = false"></v-date-picker>
                                                </v-menu>
                                            <!-- </v-responsive> -->
                                        </v-flex>
                                        <v-flex xs12 sm6 md4>
                                            <v-layout>
                                                <v-flex>
                                                    <label class="grey--text text--darken-1 caption"  for="">Приоритет: {{priorityDescr}}</label>
                                                    <v-rating :background-color="priorityColor" id="priority" :color="priorityColor" full-icon="whatshot" empty-icon="minimize" v-model="priority"></v-rating>
                                                </v-flex>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs12 sm12 md4>
                                            <v-select :items="userList" label="Ответственный" 
                                                v-model="responsible" item-value="id" item-text="name">
                                            </v-select>                                            
                                  
                                        </v-flex>                                        
                                    </v-layout>
                            </v-card-text>
                        </v-form>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
export default {
    data() {
        return {
            title: '',
            description: '',
            dueDate: new Date().toISOString().substr(0, 10),
            currentDate: new Date().toISOString().substr(0, 10),
            dueDateMenu: false,
            userList: [
                {id:1,name: 'Иванов И.И.'},
                {id:2,name: 'Петров А.М.'},
                {id:3,name: 'Сидоров В.С.'},
            ],
            responsible: null,
            priority: 2,
            valid: false,
        }
    },
    methods: {
        save() {
            this.$store.dispatch('saveTask', this.$data)
        }
    },
    computed: {
        priorityColor() {
            if (this.priority==1){
                return 'blue'
            } else if (this.priority==2){
                return 'green'
            } else if (this.priority==3){
                return 'amber '
            } else if (this.priority==4){
                return 'red lighten-1'
            } else if (this.priority==5){
                return 'purple accent-2'
            }
        },
        priorityDescr() {
            if (this.priority==1){
                return 'Низкий'
            } else if (this.priority==2){
                return 'Нормальный'
            } else if (this.priority==3){
                return 'Повышенный'
            } else if (this.priority==4){
                return 'Высокий'
            } else if (this.priority==5){
                return 'Критический'
            }            
        }

    }

}
</script>

<style scoped>
    .red {
        background-color: red;
        justify-content: flex-end;
    }
    .blue {
        background-color: blue
    }
    .green {
        background-color: green
    }

</style>

