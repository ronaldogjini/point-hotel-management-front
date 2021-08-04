<template>
  <v-main>
    <v-container fluid class="fill-height py-0">
      <v-row class="fill-height">
        <v-col cols="12" md="4" lg="2" xl="2" class=" pa-0 hidden-xs-only">
        </v-col>
        <v-col class="" cols="12" md="8" lg="8" xl="8">

          <div v-if="isLoading">
            <LoadingEffect></LoadingEffect>
          </div>

          <div v-else>
            <v-row class="pt-10">
              <v-col
                  cols="12"
                  md="6"
                  lg="6"
                  xl="4"
                  v-for="room in allRooms" :key="room.id"
                  class="mb-1"
              >
                <v-card
                    class="pa-3"
                    outlined
                >
                  <v-row class="blue-grey lighten-5">
                    <v-col cols="12" md="6" lg="6" xl="6" class="pt-0">
                      <v-card-title class="pl-0 mt-2"><h2>Room {{ room.id }}</h2></v-card-title>
                    </v-col>
                    <v-col cols="12" md="3" lg="3" xl="3" class="py-0">
                      <p class="mt-7">Floor {{ room.floor_number }}</p>
                    </v-col>
                    <v-col cols="12" md="3" lg="3" xl="3" class="pt-0 mt-2">
                      <v-checkbox
                          v-model="room.cleaned"
                          :label="room.cleaned ? 'Clean' : 'Dirty'"
                          @change="updateRoomStatus(room.id, room.cleaned)"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>


<script>


import {mapActions} from 'vuex'
import LoadingEffect from "@/components/Helpers/LoadingEffect";

export default {
  name: "HousekeeperPanel",
  components: {
    LoadingEffect,
  },
  data() {
    return {
      isLoading: true,
      allRooms: [],
      search: '',
      checkbox: 'true',
    }
  },
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification'
    }),
    getAllRooms: function () {
      this.$http.get('rooms')
          .then((response) => {
            this.allRooms = response.data
            this.isLoading = false
          })
          .catch((error) => {
            this.addNotification({show: true, text: error.response.data.message})
          })

    },
    updateRoomStatus: function (roomID, cleaned) {
      this.$http.put('rooms/' + roomID, {cleaned})
          .then(() => {
            this.addNotification({show: true, text: "Rooms clean status successfully changed!"})
          })
          .catch((error) => {
            this.addNotification({show: true, text: error.response.data.message})
          })

    },
  },
  mounted() {
    this.getAllRooms();
  }
}
</script>
