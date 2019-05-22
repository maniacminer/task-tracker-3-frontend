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
            <v-list-tile-title >Вход</v-list-tile-title>
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

        <v-subheader inset></v-subheader>
        <v-divider inset></v-divider>

        <v-dialog v-model="exitDialog" width="500px" v-if="signIn">
          <template v-slot:activator="{ on }">
            <v-list-tile v-on="on" >
              <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Выход</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>            
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Вы действительно хотите выйти?</span>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary darken-1" flat="flat" @click="signout">Да</v-btn>
              <v-btn color="primary darken-1" flat="flat" @click="exitDialog = false">Нет</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>        

      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      color="secondary"
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

        <v-list  dense>
          <v-list-group value="true" prepend-icon="apps" >
            <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>Навигация</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>          
          </template>

          <v-list-tile v-for="nav in leftMenu" :to="{name: nav.to}" v-bind:key="nav.to" exact>
            <v-list-tile-action>
              <v-icon >{{nav.icon}}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="font-weight-light">{{nav.title}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          </v-list-group>
        </v-list>
 
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
      exitDialog: false,
      drawerUser: false,
      left: false,
      signIn: false,
      displayName: '',
      leftMenu: [
        {
          icon: 'home',
          title: 'На главную',
          to: 'home'
        },
        {
          icon: 'info',
          title: 'Информация',
          to: 'about'
        }

      ],
 
    }),
    props: {
      source: String
    },
    created() {
      const vm = this;

      this.$auth.onAuthStateChanged(function(user) {
        if (user) {
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
        this.exitDialog = false;
        this.$router.push({name: 'signin'})

      }
    }
  }
</script>

