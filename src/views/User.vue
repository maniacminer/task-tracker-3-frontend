<template>
  <app-doc :data="$data" :beforeSave="beforeSave">
    <v-text-field
      v-model="email"
      :disabled="uid !== null"
      prepend-icon="email"
      name="login"
      label="E-mail"
      type="email"
      @change="emailChanged"
    ></v-text-field>
    <v-text-field
      v-model="password"
      :disabled="uid !== null"
      prepend-icon="lock"
      name="password"
      label="Пароль"
      id="password"
      :append-icon="showPassword ? 'visibility' : 'visibility_off'"
      :type="showPassword ? 'text' : 'password'"
      @click:append="showPassword = !showPassword"
    ></v-text-field>
    <v-text-field
      v-model="name"
      name="name"
      label="Имя краткое"
      type="text"
      :rules="mustNotBeEmpty"
    ></v-text-field>
    <v-text-field
      v-model="fullName"
      name="fullName"
      label="Полное имя"
      type="text"
      :rules="mustNotBeEmpty"
    ></v-text-field>
    <v-text-field
      v-model="company"
      name="company"
      label="Компания"
      type="text"
      :rules="mustNotBeEmpty"
    ></v-text-field>
  </app-doc>
</template>

<script>
import validationMixins from "@/validationMixins";
import { Promise } from "q";

export default {
  mixins: [validationMixins],
  data() {
    return {
      _name: "user",
      _title: "Пользователь",
      _persistent: ["email", "name", "fullName", "uid", "company"],

      email: "",
      name: "",
      fullName: "",
      password: "",
      company: "",
      uid: null,

      showPassword: false
    };
  },
  methods: {
    beforeSave() {
      const vm = this;

      // пользователь есть
      if (vm.uid) return Promise.resolve();

      // пользователя еше не существует
      return vm.$store
        .dispatch(`signUp`, {
          login: vm.email,
          pass: vm.password
        })
        .then(credentials => {
          vm.uid = credentials.user.uid;
        });
    },

    emailChanged(val) {
      // console.log(val);
    }
  }
};
</script>

<style>
</style>
