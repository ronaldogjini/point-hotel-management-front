<template>
  <div>
    <nav>
      <v-app-bar app dark class="black hidden-sm-and-down">
        <v-toolbar-title  class="white--text pl-15 display-1">
          <router-link to="/" tag="span" style="cursor: pointer">
            <v-img max-height="100px" max-width="120px" :src="logo"></v-img>
          </router-link>
        </v-toolbar-title>
         <v-spacer></v-spacer>
        <v-btn class="primary" @click="goToReservationPage">
          <span>Book Now</span>
        </v-btn>
        <div class="px-5">
          <router-link to="/rooms" tag="span" style="cursor: pointer">
            Rooms
          </router-link>
        </div>
        <div v-if="!loggedIn" class="px-5">
          <router-link to="/login" tag="span" style="cursor: pointer">
            Login
          </router-link>
        </div>
        <div v-if="loggedIn" class="px-5">
          <router-link :to="{name: 'Profile'}" tag="span" style="cursor: pointer">
            Profile
          </router-link>
        </div>
        <div v-if="$store.getters['user/userDetails'].type === 3" class="px-5">
          <router-link :to="{name: 'AdminBookings'}" tag="span" style="cursor: pointer">
            Admin Panel
          </router-link>
        </div>
        <div v-if="$store.getters['user/userDetails'].type === 2" class="px-5">
          <router-link to="/housekeepers" tag="span" style="cursor: pointer">
            Housekeepers Panel
          </router-link>
        </div>
        <div v-if="$store.getters['user/userDetails'].type === 1" class="px-5">
          <router-link to="/frontdesk" tag="span" style="cursor: pointer">
            Front Desk
          </router-link>
        </div>
        <div v-if="loggedIn" @click="logout" class="px-5">
          <router-link to="/logout" tag="span" style="cursor: pointer">
            Logout
          </router-link>
        </div>
      </v-app-bar>


      <v-app-bar app dark color="black" class="hidden-md-and-up">
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer">
            <v-img max-height="90px" max-width="90px" :src="logo"></v-img>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

        <v-dialog v-model="drawer" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card dark class="black lighten-2">
            <v-toolbar flat color="black">
              <v-toolbar-title>
                <v-img max-height="50px" max-width="50px" :src="logo"></v-img>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn dark icon @click.native="drawer = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-btn  class="primary mt-5 ml-5" @click="goToReservationPage(); drawer = false">
              <span>Book Now</span>
            </v-btn>
            <div @click="drawer = false" class="ma-5">
              <router-link  to="/rooms" tag="span" style="cursor: pointer">
                <p>Rooms</p>
              </router-link>
            </div>
            <div @click="drawer = false" v-if="!loggedIn" class="ma-5">
              <router-link to="/login" tag="span" style="cursor: pointer">
                Login
              </router-link>
            </div>
            <div @click="drawer = false" v-if="loggedIn" class="ma-5">
              <router-link :to="{name: 'Profile'}" tag="span" style="cursor: pointer">
                Profile
              </router-link>
            </div>
            <div @click="drawer = false" v-if="$store.getters['user/userDetails'].type === 3" class="ma-5">
              <router-link :to="{name: 'AdminDashboard'}" tag="span" style="cursor: pointer">
                Admin Panel
              </router-link>
            </div>
            <div @click="drawer = false" v-if="$store.getters['user/userDetails'].type === 2" class="ma-5">
              <router-link to="/housekeepers" tag="span" style="cursor: pointer">
                Housekeepers Panel
              </router-link>
            </div>
            <div @click="drawer = false" v-if="$store.getters['user/userDetails'].type === 1" class="ma-5">
              <router-link to="/frontdesk" tag="span" style="cursor: pointer">
                Front Desk
              </router-link>
            </div>
            <div  v-if="loggedIn" @click="logout(); drawer = false" class="ma-5">
              <router-link to="/logout" tag="span" style="cursor: pointer">
                Logout
              </router-link>
            </div>
          </v-card>
        </v-dialog>
      </v-app-bar>
    </nav>
  </div>
</template>l

<script>
import {mapGetters, mapActions} from 'vuex'
import Logo from '@/assets/logo.png'

export default {
  name: "NavigationBar",
  data () {
    return {
      drawer: false,
      logo: Logo
    }
  },
  methods: {
    ...mapActions({
      logoutUser: 'user/logoutUser',
      addNotification: 'application/addNotification',
      checkUserState: 'user/setLoggedInState',
      addUserInfo: 'user/showUserInfo'
    }),
    goToReservationPage: function () {
      this.$router.push({name: 'Reservation'})
    },
    logout: function () {
      this.logoutUser()
      .then(() => {
        this.addNotification({
          show: true,
          text: 'You have successfully logged out!'
        })
        this.$router.push({name: 'Mainpage'})
      })
      .catch(() => {
        this.addNotification({
          show: true,
          text: 'Error occurred!'
        })
      })
    },
  },
  computed: {
    ...mapGetters({
      loggedIn: 'user/loggedIn'
    }),
  },
}
</script>