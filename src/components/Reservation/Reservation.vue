<template>
  <v-container class="fill-height">
    <v-main>
      <div v-if="loading">
        <LoadingEffect></LoadingEffect>
      </div>

      <div v-else>

        <div v-if="empty">

          <v-row>
            <v-col class="text-center" cols="12" md="6" lg="6" xl="6" offset="3">
              <h1 class="mt-15">No available rooms</h1>
            </v-col>
            <v-col class="text-center" cols="12" md="6" lg="6" xl="6" offset="3">
              <v-btn dark class="primary" to="reservation">Go back</v-btn>
            </v-col>

          </v-row>
        </div>

        <div v-else>
          <v-row>
            <v-col cols="12" md="10" lg="10" xl="10" offset="1" v-for="(roomtype, index) in availableRoomTypes"
                   :key="index">
              <v-row>
                <v-card
                    elevation="3"
                    width="100%"
                    class="mt-5"
                    outlined
                >
                  <v-row>
                    <v-col cols="4" md="4" lg="4" xl="4">
                      <v-img
                          class="white--text align-end"
                          height="100%"
                          :aspect-ratio="16/9"
                          :src="`http://localhost:8000/storage/${roomtype.imageURL}`"
                          dark
                      ></v-img>
                    </v-col>
                    <v-col cols="12" md="6" lg="6" xl="6" class="pt-0">

                      <v-card-title class="pl-0 mt-5"><h2>{{ roomtype.type_name }}</h2></v-card-title>
                      {{ roomtype.description }}

                      <h3 class="mt-3">
                        {{ nights }} night(s) for
                        ${{ adults > 1 ? roomtype.base_price * 1.5 * nights : roomtype.base_price * nights }}</h3>
                      <v-chip
                          class="my-3 mr-2"
                          color="cyan lighten-1p"
                          text-color="white"
                          v-for="(amenity, index) in getAmenities(roomtype.amenities)" :key="index">
                        {{ amenity }}
                      </v-chip>
                    </v-col>
                    <v-col cols="12" md="2" lg="1" xl="1" class="mt-5 ml-5">
                      <v-btn class="primary dark" @click="confirmReservation(roomtype.id)">Reserve</v-btn>
                    </v-col>
                  </v-row>
                </v-card>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-main>
  </v-container>

</template>

<script>
import LoadingEffect from "@/components/Helpers/LoadingEffect";

export default {
  name: 'Reservation',
  components: {
    LoadingEffect
  },
  data() {
    return {
      check_in: this.$route.query.checkin,
      check_out: this.$route.query.checkout,
      adults: this.$route.query.adults,
      nights: (new Date(this.$route.query.checkout) - new Date(this.$route.query.checkin)) / 86400000,
      kids: this.$route.query.kids,
      availableRooms: [],
      availableRoomTypes: [],
      price: null,
      empty: true,
      loading: true
    }
  },
  methods: {
    findAvailableRooms: function () {
      this.$http.post('available-rooms', {
        check_in: this.$route.query.checkin,
        check_out: this.$route.query.checkout,
        adults: this.$route.query.adults,
        kids: this.$route.query.kids
      })
          .then((response) => {
            this.availableRooms = response.data
            this.findAvailableTypes();
          });
    },
    findAvailableTypes: function () {
      let i;
      for (i = 0; i < this.availableRooms.length; i++) {

        this.$http.get('roomtypes/' + this.availableRooms[i].type)
            .then((response) => {
              this.availableRoomTypes.push(response.data)
            })
      }

      this.availableRoomTypes.sort((a, b) => (a.base_price < b.base_price) ? 1 : -1)

      this.loading = false

      if (this.availableRooms.length !== 0) {
        this.empty = false
      }

    },
    confirmReservation(roomtype) {
      this.$router.push({
        path: 'confirmreservation', query: {
          checkin: this.check_in,
          checkout: this.check_out,
          adults: this.adults,
          kids: this.kids,
          type: roomtype
        }
      })
    },
    getAmenities(data) {
      if (data) {
        return data.split(",");
      }
    },
  },
  mounted() {
    this.findAvailableRooms()
  }
}
</script>