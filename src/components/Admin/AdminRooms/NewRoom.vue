<template>
  <div class="fill-height">
    <Sidepanel></Sidepanel>
    <v-main>
      <v-container fluid class="fill-height py-0">
        <v-row class="fill-height">
          <v-col class="" cols="12" md="6" lg="6" xl="6" offset="3">
            <div class="pl-5">
              <v-row>
                <h1 class="py-5 pl-2">New Room</h1>
              </v-row>
              <v-form ref="form">
                <v-text-field
                    dense
                    id="number"
                    v-model="newRoom.id"
                    name="number"
                    label="Room Number"
                    type="number"
                    prepend-icon="mdi-format-list-numbered"
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
                    prepend-icon="mdi-help-rhombus-outline"
                    item-text="type_name"
                    item-value="id"
                    outlined
                ></v-select>
                <v-text-field
                    dense
                    id="country"
                    v-model="newRoom.floor_number"
                    name="country"
                    label="Floor Number"
                    type="number"
                    :rules="[rules.required]"
                    prepend-icon="mdi-numeric-0-box-multiple-outline"
                    outlined
                >
                </v-text-field>
                <v-text-field
                    dense
                    id="address"
                    v-model="newRoom.max_occupants"
                    name="address"
                    label="Max occupants"
                    type="text"
                    :rules="[rules.required]"
                    prepend-icon="mdi-account-group-outline"
                    outlined
                >
                </v-text-field>
                <v-text-field
                    dense
                    id="features"
                    v-model="newRoom.features"
                    name="features"
                    label="Features"
                    type="text"
                    :rules="[rules.required]"
                    prepend-icon="mdi-information-variant"
                    outlined
                >
                </v-text-field>
                <v-row justify="space-around">
                  <v-btn
                      width="300px"
                      @click="addRoom"
                      dark large depressed
                      class="primary ma-2">
                    Add Room
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
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>

import Sidepanel from '../Sidepanel';
import {mapActions} from "vuex";
import {Room} from '@/components/Objects/Room'

export default {
  name: "NewRoom",
  components: {
    Sidepanel,
  },
  data() {
    return {
      allRoomTypes: [],
      selectedType: '',
      newRoom: new Room(),
      rules: {
        required: value => !!value || 'Required.',
      },
    }
  },
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification'
    }),
    getAllRoomTypes: function () {
      this.$http.get('roomtypes')
          .then((response) => {
            this.allRoomTypes = response.data
          })
          .catch((error) => {
            this.addNotification({show: true, text: error.response.data.message})
          })
    },
    addRoom: function () {
      if (this.$refs.form.validate()) {
        this.newRoom.type = this.selectedType;
        this.$http.post('rooms', this.newRoom)
            .then(() => {
              this.addNotification({show: true, text: "Room has been successfully added!"})
              this.$router.push({name: 'AdminRooms'})
            })
            .catch((error) => {
              this.addNotification({show: true, text: "The room number is taken"})
              console.log(error.response)
            })
      }
    },
  },
  mounted() {
    this.getAllRoomTypes();
  }
}
</script>