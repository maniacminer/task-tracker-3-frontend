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

                                <v-dialog v-model="deleteDialog" width="500px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn fab flat  v-on="on" :disabled="isDeletable"> <v-icon >delete</v-icon></v-btn>
                                    </template>
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

                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn fab flat @click="save" v-on="on"> <v-icon>save</v-icon></v-btn>
                                    </template>
                                    <span>Сохранить</span>
                                </v-tooltip>     

                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn disabled fab flat v-on="on"> <v-icon>bookmark_border</v-icon></v-btn>
                                    </template>
                                    <span>Добавить закладку</span>
                                </v-tooltip>        


                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn fab flat @click="close" v-on="on"> <v-icon>clear</v-icon></v-btn>
                                    </template>
                                    <span>Вернуться в журнал</span>
                                </v-tooltip>                                     
                            </v-toolbar>     
                            <v-progress-linear v-show="inProgress" v-slot:progress color="grey" indeterminate />
                            <v-card-text>
                                <slot v-if="!isOpening" name="main"></slot>
                            </v-card-text>
                            <v-card-actions>
                                <slot v-if="!isOpening" name="actions"></slot>
                            </v-card-actions>
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
            inProgress: false,
            isOpening: true,
            deleteDialog: false,
            id: null,
        }
    }, 
    props: {
        data: null
    },
    methods: {
        close() {
            // console.log(this.$router.history);
            // this.$router.go(-1)

            this.$router.push({name: this.lcName})
            this.$emit('close')
        },

        save() {
            if (!this.$refs.form.validate()){
                return
            }

            this.inProgress = true
            const vm = this;
            this.$store.dispatch('saveDoc', {payload: this.data, callBack: (docRef, err) => {
                if (err) {
                    console.error(err)
                }

                if (docRef) {
                    vm.id = docRef.id
                    this.$router.push(`/${this.lcName}/${docRef.id}`)
                }
                this.inProgress = false
            }})            

            this.$emit('save')
        },
        deleteDoc() {
            this.inProgress = true

            const vm = this
            this.$store.dispatch(`deleteDoc`, {id: this.id, name: this.lcName, callBack: err => {
                if (err) {
                    console.error(err)
                } else {
                    // this.$router.go(-1)

                    this.$router.push({name: this.lcName})
                }
                this.inProgress = false
            }})

            this.$emit('delete')
        },          
    },
    created() {
        const id = this.$route.params.id

        if (id) {
            this.inProgress = true
            this.$store.dispatch(`getDoc`, {id: id, name: this.lcName, callBack: (payload, err) => {
                if (!err){
                    this.data = Object.assign(this.data, payload)
                    this.id = id
                }

                this.inProgress = false
                this.isOpening = false
            }})
            
        } else {
            this.isOpening = false
        }

        this.$emit('loaded')
    },
  
    computed: {
        mdName() {
            const str = this.data._name
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        },
        lcName() {
            return this.data._name.toLowerCase()
        },
        isNew() {
            return !!this.id
        },
        isDeletable(){
            return !this.isNew
        }        
    }

}
</script>

<style>

</style>
