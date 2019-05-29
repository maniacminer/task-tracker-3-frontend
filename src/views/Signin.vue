
<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card min-width="450px" class="elevation-3">
            <v-toolbar height="50px">
              <v-toolbar-title class="font-weight-light">Вход</v-toolbar-title>
              <!-- <v-spacer></v-spacer> -->
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="email"
                  prepend-icon="email"
                  name="login"
                  label="E-mail"
                  type="email"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  prepend-icon="lock"
                  name="password"
                  label="Пароль"
                  id="password"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-alert :value="error" type="error" class outline>{{ error_msg }}</v-alert>
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
      email: "",
      password: "",
      error_msg: "",
      error: false,

      showPassword: false
    };
  },
  methods: {
    login() {
      const vm = this;

      vm.$store
        .dispatch("signIn", {
          login: vm.email,
          pass: vm.password
        })
        .then(_ => {
          vm.$router.push({ name: "home" });
        })
        .catch(err => {
          vm.error_msg = err.message;
          vm.error = true;
        });
    }
  }
};
</script>

<style>
</style>

