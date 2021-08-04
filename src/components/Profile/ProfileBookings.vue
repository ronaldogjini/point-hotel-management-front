<template>
  <v-main>
    <v-container>
      <v-row class="mt-4">
        <v-col cols="12" md="4" lg="3" xl="2" offset-xl="2" offset-lg="1" class="hidden-sm-and-down">
          <div class="text-center">
            <ProfileNavigationLeft></ProfileNavigationLeft>
          </div>
        </v-col>

        <v-col cols="12" md="7" lg="7" xl="4">

        <div v-if="loading">
            <LoadingEffect></LoadingEffect>
          </div>
          <div v-else>
            <v-row>

              <v-row class="ma-6" v-if="allBookings.length === 0 && loading === false" dark>
                <h2>You have no bookings</h2>
              </v-row>
              <v-row v-else dark>
                <h1 class="mt-3 ml-4">Your bookings</h1>
                <v-col v-for="booking in allBookings" :key="booking.id" cols="12" md="12">
                  <BookingCard :bookings-array="booking"></BookingCard>
                </v-col>
              </v-row>
            </v-row>
          </div>
        </v-col>
        <v-col cols="12" class="hidden-md-and-up">
          <div class=" text-center">
            <ProfileNavigationLeft></ProfileNavigationLeft>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

</template>

<script>

import BookingCard from './BookingCard';
import ProfileNavigationLeft from './ProfileNavigationLeft';
import {User} from "../Objects/User";
import {mapActions, mapGetters} from "vuex";
import LoadingEffect from "@/components/Helpers/LoadingEffect";


export default {
  name: "ProfileBookings",

  components: {
    ProfileNavigationLeft,
    BookingCard,
    LoadingEffect
  },
  data() {
    return {
      loading: true,
      user: new User(),
      allBookings: [],
    }
  },
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification',
    }),
    getUserBookings: function () {
      this.$http.get('user-bookings/' + this.userData.id)
          .then((response) => {
            this.allBookings = response.data
            this.loading = false
          })
    },
  },
  mounted() {
    this.getUserBookings();
  },
  computed: {
    ...mapGetters({
      userData: 'user/userDetails'
    }),
  },
}
</script>
