
<template>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 >
            <v-card min-width="450px" class="elevation-3">
              <v-toolbar color="secondary">
                <v-toolbar-title class="font-weight-light">Вход</v-toolbar-title>
                <!-- <v-spacer></v-spacer> -->
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="email" prepend-icon="email" name="login" label="E-mail" type="email"></v-text-field>
                  <v-text-field v-model="password" prepend-icon="lock" name="password" label="Пароль" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="login">Войти</v-btn>
              </v-card-actions>
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
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            const vm = this;
            const promise = this.$auth.signInWithEmailAndPassword(this.email, this.password)
            
            promise
                .then((user) => {
                    vm.$router.push({name: 'home'})
                })
                .catch(err => {
                    console.log(err)
                    // console.error(err)
                });            
        }
    }

}
</script>

<style>
</style>

