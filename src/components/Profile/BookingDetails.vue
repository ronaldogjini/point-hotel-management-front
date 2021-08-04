<template>
  <v-main>
    <v-container>
      <v-row class="mt-4 justify-center">
        <v-col cols="12" md="4" lg="3" xl="2" class="hidden-sm-and-down">
          <div class=" text-center">
            <ProfileNavigationLeft></ProfileNavigationLeft>
          </div>
        </v-col>

        <v-col cols="12" md="8" lg="9" xl="8">

          <div v-if="isLoading">
            <LoadingEffect></LoadingEffect>
          </div>

          <div v-else class="pl-5">
            <v-row class="pb-5">
              <h1 class="pl-2">Booking details</h1>
              <v-spacer></v-spacer>
            </v-row>
            <v-row>
              <v-col
                  cols="12"
                  md="12"
                  lg="12"
                  xl="12"
                  class="mb-7"
              >
                <v-card
                    elevation="0"
                >
                  <v-row>
                    <v-col cols="12" md="8" lg="8" xl="8">
                      <v-img
                          class="white--text align-end"
                          width="100%"
                          :aspect-ratio="3/2"
                          :src="`http://localhost:8000/storage/${bookingDetails.imageURL}`"
                          dark
                      ></v-img>
                    </v-col>
                    <v-col cols="12" md="4" lg="4" xl="4" class="pt-0">
                      <v-card-title><h2>{{ bookingDetails.type_name }}</h2></v-card-title>
                      <div class="ml-3">
                        <p>
                          <v-icon color="grey">mdi-account-arrow-right-outline</v-icon>
                          :
                          {{ bookingDetails.check_in.substr(0, 10) }}</p>
                        <p>
                          <v-icon color="grey">mdi-account-arrow-left-outline</v-icon>
                          :
                          {{ bookingDetails.check_out.substr(0, 10) }}</p>
                        <p>
                          <v-icon color="grey">mdi-weather-night</v-icon>
                          :
                         {{ bookingDetails.nights }} nights</p>
                        <p>
                          <v-icon color="grey">mdi-account</v-icon>
                         : {{ bookingDetails.adults }} adult(s)</p>
                        <p>
                          <v-icon color="grey">mdi-human-male-boy</v-icon>
                         {{ bookingDetails.kids }} kid(s)</p>
                        <h3>Price: <strong>${{ bookingDetails.price }}</strong></h3>
                        <v-btn class="primary mt-5"  width="150px" @click="$router.back()">
                          Go back
                        </v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
              <v-col cols="12" class="hidden-md-and-up">
                <div class=" text-center">
                  <ProfileNavigationLeft></ProfileNavigationLeft>
                </div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

import ProfileNavigationLeft from './ProfileNavigationLeft';
// import { Booking } from "../Objects/BookingObject";
import LoadingEffect from "@/components/Helpers/LoadingEffect";


export default {
  name: "BookingDetails",
  components: {
    ProfileNavigationLeft,
    LoadingEffect
  },
  data() {
    return {
      bookingDetails: [],
      isLoading: true,
    }
  },
  methods: {
    getBooking: function () {
      this.$http.get('booking-details/' + this.$route.params.id)
          .then((response) => {
            this.bookingDetails = response.data[0]
            this.isLoading = false
          })
          .catch((error) => {
            this.addNotification({show: true, text: error.response.data.message})
          })
    }
  },
  mounted() {
    this.getBooking();
  }
}
</script>
