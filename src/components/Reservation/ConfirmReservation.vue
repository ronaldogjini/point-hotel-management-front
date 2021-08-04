<template>
  <v-container>
    <v-main>
    <div v-if="loading">
      <LoadingEffect></LoadingEffect>
    </div>

    <div v-else>
      <h1 class="py-4">Confirm Reservation</h1>
      <v-row justify="center">
        <v-col cols="12" md="12" lg="12" xl="12">

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
                  <v-col cols="12" md="6" lg="6" xl="6">
                    <v-img
                        class="white--text align-end"
                        width="100%"
                        :aspect-ratio="3/2"
                        :src="`http://localhost:8000/storage/${roomDetails.imageURL}`"
                        dark
                    ></v-img>
                  </v-col>
                  <v-col cols="12" md="6" lg="6" xl="6" class="pt-0">
                    <v-chip
                        class="ma-3"
                        color="cyan lighten-1p"
                        text-color="white"
                        v-for="(amenity, index) in getAmenities(roomDetails.amenities)" :key="index">
                      {{ amenity }}
                    </v-chip>
                    <v-card-title><h2>{{ roomDetails.type_name }}</h2></v-card-title>
                    <div class="ml-3">
                      <p>Check in: <strong> {{ check_in }}</strong> Check out: <strong>{{ check_out }}</strong></p>
                      <p>Nights: <strong>{{ nights }}</strong></p>
                      <p>Adults: <strong>{{ adults }}</strong></p>
                      <p>Kids: <strong>{{ kids }}</strong></p>
                      <h3>Price: <strong>${{ finalPrice }}</strong></h3>
                      <v-btn @click="getRoomID" x-large dark depressed class=" mt-5" color="primary">Confirm
                        Reservation
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    </v-main>
  </v-container>
</template>

<script>
import LoadingEffect from "@/components/Helpers/LoadingEffect";
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'ConfirmReservation',
  components: {
    LoadingEffect
  },
  data() {
    return {
      check_in: this.$route.query.checkin,
      check_out: this.$route.query.checkout,
      adults: this.$route.query.adults,
      kids: this.$route.query.kids,
      type: this.$route.query.type,
      nights: (new Date(this.$route.query.checkout) - new Date(this.$route.query.checkin)) / 86400000,
      roomDetails: [],
      finalPrice: null,
      empty: true,
      loading: true
    }
  },
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification'
    }),
    getRoomType: function () {
      this.$http.get('roomtypes/' + this.type)
          .then((response) => {
            this.roomDetails = response.data
            this.finalPrice = this.adults > 1 ? this.roomDetails.base_price * 1.5 * this.nights : this.roomDetails.base_price * this.nights
          });
      this.loading = false
    },
    getAmenities(data) {
      if (data) {
        return data.split(",");
      }
    },
    getRoomID: function () {

      this.$http.post('first-available-room', {
        check_in: this.check_in,
        check_out: this.check_out,
        adults: this.adults,
        kids: this.kids,
        type: this.type
      })
          .then((response) => {
            this.makeBooking(response.data)
          });
      this.loading = false
    },
    makeBooking: function (room) {

      this.$http.post('bookings', {
        check_in: this.check_in,
        check_out: this.check_out,
        adults: this.adults,
        kids: this.kids,
        price: this.finalPrice,
        room_id: room,
        user_id: this.userData.id,
        nights: this.nights
      })
          .then(() => {
            this.addNotification({
              show: true,
              text: 'You have successfully booked the room!'
            })
            this.$router.push({name: "Bookings"});
          })
          .catch((error) => {
            console.log("this" + error)
            this.addNotification({
              show: true,
              text: 'Booking failed!'
            })
          });
    }
  },
  mounted() {
    this.getRoomType()
  },
  computed: {
    ...mapGetters({
      userData: 'user/userDetails'
    }),
  },
}
</script>