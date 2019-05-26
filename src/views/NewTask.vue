<template>
    <app-doc :data="$data">
        <template v-slot:toolbar>
        </template>
        <template v-slot:main>
            <v-text-field label="Заголовок" :rules="mustNotBeEmpty" v-model="title" name="title" type="text"></v-text-field>                            
            <v-textarea v-model="description" name="description"
                label="Описание задачи" ></v-textarea> 
            <v-layout row wrap justify-space-between>
                <v-flex xs12 sm5 md3 >
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
                    <v-select prepend-icon="person" :items="userList" label="Ответственный" persistent-hint single-line return-object
                            v-model="responsible" :hint="responsible.fullName" item-value="id" item-text="name">
                    </v-select>                                            
            
                </v-flex>                                        
            </v-layout>

            <!-- <v-tooltip top>
                <template v-slot:activator="{ on }">
                    <v-btn flat @click="saveAndClose" v-on="on" class="font-weight-regular secondary black--text">
                        <v-icon left>save</v-icon>
                        <v-icon>clear</v-icon>
                    </v-btn>
                </template>
                <span>Сохранить и вернуться в журнал задач</span>
            </v-tooltip>                                 -->
        </template>
        <template v-slot:actions>
            <v-layout ml-2>
                <v-checkbox color="grey darken-2" v-model="completed" label="Закрыта"/>
            </v-layout>
            <v-spacer></v-spacer>            
        </template>
    </app-doc>
</template>

<script>
// import { required, maxLength, email } from 'vuelidate/lib/validators'
// import { validationMixin } from 'vuelidate'

export default {
    // mixins: [validationMixin],
    data() {
        return {
            _name: 'task',
            _title: 'Задача',
            _persistent: ['title', 'description', 'completed', 'dueDate', 'createDate', 'priority', 'responsible'],
            id: null,
            title: '',
            inProgress: false,
            description: '',
            completed: false,
            dueDate: new Date().toISOString().substr(0, 10),
            createDate: new Date().toISOString().substr(0, 10),
            dueDateMenu: false,
            responsible: { id: null, name: null, fullName: null},
            priority: 2,
            mustNotBeEmpty: [
                v => !!v || 'Поле обязательно для заполнения',
            ],
        }
    },
    created(){

    },
    methods: {

        // saveAndClose() {
        //     if (!this.$refs.form.validate()){
        //         return
        //     }
        //     this.inProgress = true
        //     const vm = this
        //     this.$store.dispatch('saveTask', {task: this.$data, callBack: (docRef, err) => {

        //         if (docRef) {
        //             // vm.id = docRef.id
        //             this.$router.push({name: 'tasks'})
        //         }

        //         this.inProgress = false

        //         if (err) {
        //             console.error(err)
        //         } else {
        //             this.$router.push({name: 'tasks'})
        //         }
        //     }})
        // }
    },
    computed: {
        userList() { return [
            {id:1,name: 'Иванов И.И.', fullName: 'Иванов Иван Иванович'},
            {id:2,name: 'Петров А.М.', fullName: 'Иванов Алексей Макаровчи'},
            {id:3,name: 'Сидоров В.С.', fullName: 'Сидоров Владимир Сергеевич'},
        ]},        
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

    },

}
</script>

<style scoped>


</style>

