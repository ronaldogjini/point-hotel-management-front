<template>
  <v-card
      class="mx-auto"
      outlined
  >

    <v-row class="pl-4 py-4">
      <v-col cols="12" sm="8" md="8" lg="8" xl="8">
        <v-list-item-title class="headline mb-1">
          {{ bookingsArray.type_name }}
        </v-list-item-title>
        <p class="mb-0 text--secondary"><strong>Checkin: </strong> {{ bookingsArray.check_in.slice(0, 10) }}</p>
        <p class="text--secondary"><strong>Checkout: </strong> {{ bookingsArray.check_out.slice(0, 10) }}</p>

        <v-row>
          <v-col cols="12" sm="6" md="6" lg="6" xl="6">
            <v-btn outlined rounded text @click="viewBooking(bookingsArray.id)">
              Details
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="6" lg="6" xl="6">
            <div v-if="!bookingsArray.completed">
              <v-btn dark class="primary" @click="cancelBooking(bookingsArray.id)">Cancel</v-btn>
            </div>
          </v-col>
        </v-row>

      </v-col>
      <v-col cols="12" sm="4" md="4" lg="4" xl="4">
        <v-img
            class="white--text"
            max-width="90%"
            :aspect-ratio="16/9"
            :src="`http://localhost:8000/storage/${bookingsArray.imageURL}`"
            dark
        ></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: 'BookingCard',
  props: ['bookingsArray'],
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification',
    }),
    cancelBooking(bookingID) {
      this.$http.put('bookings/' + bookingID, {canceled: 1, completed: 1})
          .then(() => {
            this.addNotification({
              show: true,
              text: 'You have canceled the booking!'
            })
            this.$router.push('/profile')
          })
          .catch((error) => {
            this.addNotification({
              show: true,
              text: error.response.errors
            })
          })
    },
    viewBooking(id) {
      this.$router.push('/bookings/' + id)
    }
  }
}
</script>