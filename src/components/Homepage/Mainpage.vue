<template >
      <v-main>
      <v-parallax
          class="pa-0"
          dark
          src="http://127.0.0.1:8000/storage/rooms/banner.jpg"
      >
        <v-row
            style='background: rgba(0, 0, 0, .5)'
            align="center"
            justify="center"
        >
          <v-col
              class="text-center"
              cols="12"
          >
            <h1 class="display-4 thin mb-4 ">
              Point. Luxury
            </h1>
            <h4 class="display-1">
              The luxury you deserve
            </h4>
          </v-col>
        </v-row>
      </v-parallax>


      <HotelFeatures class="py-10"></HotelFeatures>
      <BookingMainPage></BookingMainPage>

      <v-row justify="center">
        <v-col cols="12" md="11" lg="11" xl="11">
          <v-row class="pt-10" dark justify="center">
            <v-col v-for="room in rooms" :key="room.name" cols="12" md="4" lg="4" xl="4">
              <RoomTypes :room-types-array="room"></RoomTypes>
            </v-col>
            <v-btn color="black" x-large dark to="/rooms">View All Rooms</v-btn>
          </v-row>
        </v-col>
      </v-row>
      </v-main>
</template>

<script>
import HotelFeatures from '@/components/Homepage/HotelFeatures'
import BookingMainPage from '@/components/Homepage/BookingMainPage'
import RoomTypes from '@/components/Homepage/RoomTypes'
import {User} from '../Objects/User'

export default {
  name: 'Mainpage',
  components: {
    HotelFeatures,
    BookingMainPage,
    RoomTypes
  },
  data: () => ({
    user: new User(),
    rooms: null,
    responseStatus: '',
    roomVuex: '',
    menuItems: [
      {title: 'Home', path: '/home', icon: 'mdi-home'},
      {title: 'Sign Up', path: '/signup', icon: 'mdi-face'},
      {title: 'Sign In', path: '/signin', icon: 'mdi-lock_open'}
    ],
  }),
  mounted:
      function () {
        this.$http.get('roomtypes')
            .then(response => {
              this.rooms = response.data
              this.rooms = this.rooms.slice(0, 3)
            })
      },
  methods: {
    addUserInfo: function () {
      this.user = localStorage.getItem('userInfo');
    },
  },
  created() {
    this.addUserInfo()
  },

}
</script>
