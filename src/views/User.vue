<template>
    <app-doc :data="$data" @beforSave="beforSave">
        <v-text-field v-model="email" :disabled="uid !== null" prepend-icon="email" name="login" 
            label="E-mail" type="email" @change="emailChanged"></v-text-field>  
        <v-text-field v-model="password" :disabled="uid !== null" prepend-icon="lock" name="password" 
            label="Пароль" id="password" 
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"></v-text-field>                  
        <v-alert :value="error_msg" type="error" class="" outline>
            {{ error_msg }}
        </v-alert>             
        <v-text-field v-model="name" name="name" 
            label="Имя краткое" type="text" :rules="mustNotBeEmpty"></v-text-field>              
        <v-text-field v-model="fullName" name="fullName" 
            label="Полное имя" type="text" :rules="mustNotBeEmpty"></v-text-field>              
        <v-text-field v-model="company" name="company" 
            label="Компания" type="text" :rules="mustNotBeEmpty"></v-text-field>              
    </app-doc>
</template>

<script>
import  validationMixins from '@/validationMixins'

export default {
    mixins: [validationMixins],
    data() {
        return {
            _name: 'user',
            _title: 'Пользователь',
            _persistent: ['email', 'name', 'fullName', 'uid','company'],

            email: '',
            name: '',
            fullName: '',
            password: '',
            company: '',
            uid: null,

            showPassword: false,
            error_msg: '',
          
        }
    },
    methods: {
        beforSave(params) {
            const vm = this
            if (!vm.uid) {
                params.cancel = true
                vm.$store.dispatch(`signUp`, {login: vm.email, pass: vm.password})
                    .then(credentials => {
                        vm.uid = credentials.user.uid
                        params.continue()
                    })
                    .catch(err => {
                        vm.error_msg = err.message
                    })
            }
        },
        emailChanged(val) {
            // console.log(val);
        }


    }

}
</script>

<style>

</style>
