<template>
    <v-content>
        <v-container>
            <v-layout>
                <v-flex>
                    <v-card>
                        <v-form ref="form">
                            <v-toolbar height="60px" class="elevation-1">
                                        <v-toolbar-title>Новая задача {{id}} </v-toolbar-title>
                                        <v-spacer></v-spacer>
                                        <v-btn fab flat @click="save"> <v-icon>save</v-icon></v-btn>
                                        <v-btn fab flat> <v-icon>bookmark</v-icon></v-btn>
                                        <v-btn fab flat @click="close"> <v-icon>clear</v-icon></v-btn>
                            </v-toolbar>
                            <v-progress-linear v-slot:progress color="blue" indeterminate v-show="inProgress"></v-progress-linear>
                            <v-card-text>
                                <v-text-field label="Заголовок" :rules="mustNotBeEmpty" v-model="title" name="title" type="text"></v-text-field>                            
                                <v-textarea v-model="description" name="description"
                                    label="Описание задачи" ></v-textarea> 
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
                                    <v-checkbox v-model="completed" label="Выполнена"/>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn flat @click="saveAndClose" class="font-weight-regular secondary black--text"> <v-icon left>save</v-icon> Сохранить и закрыть </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
// import { required, maxLength, email } from 'vuelidate/lib/validators'
// import { validationMixin } from 'vuelidate'

export default {
    // mixins: [validationMixin],
    data() {
        return {
            id: '',
            title: '',
            inProgress: false,
            description: '',
            completed: false,
            dueDate: new Date().toISOString().substr(0, 10),
            createDate: new Date().toISOString().substr(0, 10),
            dueDateMenu: false,
            userList: [
                {id:1,name: 'Иванов И.И.'},
                {id:2,name: 'Петров А.М.'},
                {id:3,name: 'Сидоров В.С.'},
            ],
            responsible: null,
            priority: 2,
            mustNotBeEmpty: [
                v => !!v || 'Поле обязательно для заполнения',
            ],            
        }
    },
    created(){
        const id = this.$route.params.id

        if (id) {
            this.inProgress = true
            this.$store.dispatch('getTask', {id: id, callBack: (payload, err) => {
                console.log(payload);
                if (!err){
                    this.id = id
                    this.description = payload.description
                    this.dueDate = payload.dueDate
                    this.title = payload.title
                    this.createDate = payload.createDate
                    this.priority = payload.priority
                    this.completed = payload.completed
                }

                this.inProgress = false
            }})
            
        }
    },
    methods: {
        close() {
            this.$router.push({name: 'tasks'})
        },
        save() {
            if (!this.$refs.form.validate()){
                return
            }
            this.inProgress = true
            const vm = this;
            this.$store.dispatch('saveTask', {task: this.$data, callBack: (docRef, err) => {
                if (err) {
                    console.error(err)
                }

                if (docRef) {
                    vm.id = docRef.id
                }
                this.inProgress = false
            }})
        },
        saveAndClose() {
            if (!this.$refs.form.validate()){
                return
            }
            this.inProgress = true
            const vm = this;
            this.$store.dispatch('saveTask', {task: this.$data, callBack: (docRef, err) => {

                if (docRef) {
                    // vm.id = docRef.id
                    this.$router.push({name: 'tasks'})
                }

                this.inProgress = false

                if (err) {
                    console.error(err)
                } else {
                    this.$router.push({name: 'tasks'})
                }
            }})
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


</style>

