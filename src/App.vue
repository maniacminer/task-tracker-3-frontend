<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerUser"
      fixed
      right
      clipped
      app >
      <v-list dense>
        <!-- <v-list-tile @click.stop=""> -->
        <v-list-tile :to="{name: 'signin'}" v-if="!signIn">
          <v-list-tile-action>
            <v-icon>email</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >Вход по e-mail и паролю</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile :to="{name: 'signup'}" v-if="!signIn">
          <v-list-tile-action>
            <v-icon>how_to_reg</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >Регистрация</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>


        <v-list-tile :to="{name: 'profile'}" v-if="signIn">
          <v-list-tile-action>
            <v-icon>person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Мой профиль</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile @click.stop="signout" v-if="signIn">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Выход</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="grey lighten-3"
      fixed
      app
      clipped-right >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase headline"><span>Трекер</span><span class="font-weight-light">задач</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn  flat @click.stop="drawerUser = !drawerUser">
        <v-icon left >account_circle</v-icon>
        <span v-if="!signIn" class="grey--text text--darken-2">Вход / Регистрация</span>
        <span v-if="signIn" class="grey--text text--darken-2"> {{ displayName }}</span>
        </v-btn>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app >
      <v-list dense class="font-weight-light">

        <!-- <v-list-tile @click.stop="left = !left">
          <v-list-tile-action>
            <v-icon color="orange lighten-2">eject</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="orange--text text--lighten-2 font-weight-light">Панель задач</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile> -->


        <!-- <v-divider inset></v-divider> -->
        <v-subheader inset>Навигация</v-subheader>
        <!-- <v-list-group> -->

        <v-list-tile to="/">
          <v-list-tile-action>
            <v-icon >home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>На главную</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile to="/about">
          <v-list-tile-action>
            <v-icon>info</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="font-weight-regular">Информация</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      <!-- </v-list-group> -->

      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="left"
      temporary
      fixed >

    </v-navigation-drawer>
    
    <router-view></router-view>

    <v-footer color="grey" class="white--text" app>
      <v-spacer/>
      <span>Ilya Panin</span>
      <span>&copy; 2019</span>
      <v-spacer/>
    </v-footer>
  </v-app>  
</template>

<script>
  export default {
    data: () => ({
      drawer: true,
      drawerUser: false,
      left: false,
      signIn: false,
      displayName: ''
    }),
    props: {
      source: String
    },
    created() {
      const vm = this;

      this.$auth.onAuthStateChanged(function(user) {
        if (user) {
          console.log(user);
          vm.signIn = true;
          vm.displayName = user.email;
        } else {
            vm.signIn = false;
            vm.displayName = '';

        }
      });    
    },
    methods: {
      signout() {
        this.$auth.signOut()

      }
    }
  }
</script>