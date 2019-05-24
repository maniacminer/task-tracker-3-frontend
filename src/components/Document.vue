<template>
    <v-content>
        <v-container>
            <v-layout>
                <v-flex>
                    <v-card>
                        <v-form ref="form">
                            <v-toolbar height="60px" class="elevation-1">
                                <v-progress-circular indeterminate color="primary" v-show="inProgress"/>
                                <v-icon v-show="!inProgress">assignment</v-icon>
                                <v-toolbar-title>Документ {{data.id}}</v-toolbar-title>
                                <v-spacer></v-spacer>

                                <v-dialog v-model="deleteDialog" width="500px">
                                    <template v-slot:activator="{ on }">
                                        <v-btn fab flat  v-on="on" :disabled="isDeletable"> <v-icon >delete</v-icon></v-btn>
                                    </template>
                                    <v-card>
                                        <v-card-title>
                                            <span class="headline">Удалить !документ!?</span>
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




                                <slot name="toolbar"></slot>

                                <v-tooltip bottom>
                                    <template v-slot:activator="{ on }">
                                        <v-btn fab flat @click="close" v-on="on"> <v-icon>clear</v-icon></v-btn>
                                    </template>
                                    <span>Вернуться в журнал</span>
                                </v-tooltip>                                     
                            </v-toolbar>           
                            <slot v-if="!isOpening" name="main"></slot>
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
        }
    }, 
    props: {
        data: null
    },
    methods: {
        close() {
            this.$router.push({name: this.lcName})
            this.$emit('close')
        },

        save() {
            if (!this.$refs.form.validate()){
                return
            }

            this.inProgress = true
            const vm = this;
            this.$store.dispatch(`save${this.mdName}`, {payload: this.data, callBack: (docRef, err) => {
                if (err) {
                    console.error(err)
                }

                if (docRef) {
                    vm.data.id = docRef.id
                    this.$router.push(`/${this.lcName}/${docRef.id}`)
                }
                this.inProgress = false
            }})            

            this.$emit('save')
        },
        deleteDoc() {
            this.inProgress = true

            const vm = this
            this.$store.dispatch(`delete${this.mdName}`, {id: this.data.id, callBack: err => {
                if (err) {
                    console.error(err)
                } else {
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
            this.$store.dispatch(`get${this.mdName}`, {id: id, callBack: (payload, err) => {
                if (!err){
                    this.data = Object.assign(this.data, payload)
                    this.data.id = id
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
            const str = this.data.name
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        },
        lcName() {
            return this.data.name.toLowerCase()
        },
        isNew() {
            return !!this.data.id
        },
        isDeletable(){
            return !this.isNew
        }        
    }

}
</script>

<style>

</style>
