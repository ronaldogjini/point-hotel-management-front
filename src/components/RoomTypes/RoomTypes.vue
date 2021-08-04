<template>
  <v-main class="fill-height">
    <v-container >

      <div v-if="errored">
        <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
      </div>

      <div v-else>
        <div v-if="loading">
          <LoadingEffect></LoadingEffect>
        </div>

        <div v-else>
          <v-row justify="center">
            <h1 class="py-4">Our Rooms</h1>
            <v-col cols="12" md="12">

              <v-row>
                <v-col cols="12" sm="6" md="6" lg="6" xl="6"

                       v-for="roomtype in roomTypes" :key="roomtype.id"
                       class="mb-7"
                >
                  <v-card
                      elevation="0"
                  >
                    <v-row>
                      <v-col cols="12" md="12">
                        <v-img
                            class="white--text align-end"
                            width="100%"
                            :aspect-ratio="16/9"
                            :src="`http://localhost:8000/storage/${roomtype.imageURL}`"
                            dark
                        ></v-img>
                        <v-row class="pt-5">
                          <v-chip
                              class="ma-3"
                              color="cyan lighten-1p"
                              text-color="white"
                              v-for="(amenity, index) in getAmenities(roomtype.amenities)" :key="index">
                            {{ amenity }}
                          </v-chip>
                        </v-row>
                      </v-col>

                      <v-col cols="12" md="12" lg="12" class="pt-0">
                        <v-card-title class="pl-0"><h2>{{ roomtype.type_name }}</h2></v-card-title>
                        {{ roomtype.description }}
                      </v-col>
                    </v-row>
                  </v-card>

                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import LoadingEffect from "@/components/Helpers/LoadingEffect";

export default {
  name: 'RoomTypes',
  components: {
    LoadingEffect
  },
  data() {
    return {
      roomTypes: '',
      info: null,
      amenitiesArray: '',
      loading: true,
      errored: false
    }
  },
  mounted() {
    this.getRoomTypes()
    this.getAmenities()

  },

  methods: {
    getRoomTypes() {
      this.$http.get('roomtypes/')
          .then(response => this.roomTypes = response.data)
          .catch(error => {
            console.log(error)
            this.errored = true
          })
          .finally(() => this.loading = false)
    },
    getAmenities(data) {
      if (data) {
        return data.split(",");
      }
    }
  },

}
</script>