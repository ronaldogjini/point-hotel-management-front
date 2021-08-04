<template>
  <div class="fill-height">
    <Sidepanel></Sidepanel>
    <v-main>
      <v-container fluid class="fill-height py-0">
        <v-row class="fill-height">
          <v-col class="" cols="12" md="6" lg="6" xl="6" offset="3">

            <div v-if="isLoading">
              <LoadingEffect></LoadingEffect>
            </div>

            <div v-else>
              <div class="pl-5">
                <v-row>
                  <h1 class="py-5 pl-2">Edit Room</h1>
                </v-row>

                <v-form ref="form">
                  <v-text-field
                      dense
                      id="number"
                      v-model="room.id"
                      name="number"
                      label="Room Number"
                      type="number"
                      :rules="[rules.required]"
                      outlined
                  >
                  </v-text-field>
                  <v-select
                      dense
                      :items="allRoomTypes"
                      v-model="selectedType"
                      :rules="[rules.required]"
                      label="Room Type"
                      single-line
                      item-text="type_name"
                      item-value="id"
                      outlined
                  ></v-select>
                  <v-text-field
                      dense
                      id="country"
                      v-model="room.floor_number"
                      name="country"
                      label="Floor Number"
                      type="number"
                      :rules="[rules.required]"
                      outlined
                  >
                  </v-text-field>
                  <v-text-field
                      dense
                      id="address"
                      v-model="room.max_occupants"
                      name="address"
                      label="Max occupants"
                      type="text"
                      :rules="[rules.required]"
                      outlined
                  >
                  </v-text-field>
                  <v-text-field
                      dense
                      id="features"
                      v-model="room.features"
                      name="features"
                      label="Features"
                      type="text"
                      :rules="[rules.required]"
                      outlined
                  >
                  </v-text-field>
                  <v-row justify="space-around">
                    <v-btn
                        width="300px"
                        @click="updateRoom"
                        dark large depressed
                        class="primary ma-2">
                      Save edit
                    </v-btn>
                    <v-btn
                        width="300px"
                        @click="$router.back()"
                        dark large depressed
                        class="primary ma-2">
                      Cancel
                    </v-btn>
                  </v-row>
                </v-form>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>

import Sidepanel from '../Sidepanel';
import {Room} from "../../Objects/Room";
import {mapActions} from "vuex";
import LoadingEffect from "@/components/Helpers/LoadingEffect";

export default {
  name: "ViewRoom",
  components: {
    LoadingEffect,
    Sidepanel,
  },
  data() {
    return {
      isLoading: true,
      room: new Room(),
      allRoomTypes: [],
      selectedType: '',
      rules: {
        required: value => !!value || 'Required.',
      },
    }
  },
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification'
    }),
    getRoom: function () {
      this.$http.get('rooms/' + this.$route.params.id)
          .then((response) => {
            this.room = response.data
            this.isLoading = false
          })
          .catch((error) => {
            this.addNotification({show: true, text: error.response.data.message})
          })
    },
    updateRoom: function () {
      if (this.$refs.form.validate()) {
        this.$http.put('rooms/' + this.room.id, this.room)
            .then(() => {
              this.addNotification({show: true, text: 'Room has been updated!'})
              this.$router.back()
            })
            .catch((error) => {
              this.addNotification({show: true, text: error.response.data.message})
            })
      }
    },
    getAllRoomTypes: function () {
      this.$http.get('roomtypes')
          .then((response) => {
            this.allRoomTypes = response.data
          })
          .catch((error) => {
            this.addNotification({show: true, text: error.response.data.message})
          })
    },
  },
  mounted() {
    this.getRoom();
    this.getAllRoomTypes();
  }
}
</script>
