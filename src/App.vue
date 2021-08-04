<template>
    <div id="app">
      <v-app>
        <NavigationBar></NavigationBar>
          <router-view></router-view>
        <Footer  class="mt-16"></Footer>

        <v-snackbar
            @input="updateNotification($event, index)"
            v-for="(snackbar, index) in allNotifications"
            :key="index"
            v-model="snackbar.show"
        >
          {{snackbar.text}}
          <template v-slot:action="{ attrs }">
            <v-btn
                small
                color="white"
                text
                v-bind="attrs"
                @click="removeNotification(index)"
            >
              X
            </v-btn>
          </template>
        </v-snackbar>
      </v-app>
    </div>
</template>

<script>

import NavigationBar from './components/NavigationBar'
import Footer from './components/Footer/Footer'
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'App',
  components: {
    NavigationBar,
    Footer
  },
  data: () => ({
    menuItems: [
      { title: 'Home', path: '/home', icon: 'mdi-home' },
      { title: 'Sign Up', path: '/signup', icon: 'mdi-face' },
      { title: 'Sign In', path: '/signin', icon: 'mdi-lock_open' }
    ],
  }),
  methods: {
    ...mapActions({
      removeNotification: 'application/removeNotification',
      logoutUser: 'user/logoutUser',
      addNotification: 'application/addNotification',
      checkUserState: 'user/setLoggedInState',
      addUserInfo: 'user/showUserInfo'
    }),
    updateNotification(show, index) {
      if(!show) {
        this.removeNotification(index)
      }
    }
  },
  computed: {
    ...mapGetters({
      allNotifications: 'application/notifications',
      loggedIn: 'user/loggedIn'
    })
  },
  mounted() {
    this.checkUserState()
    if(this.loggedIn) {
      this.addUserInfo()
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
}
</style>
