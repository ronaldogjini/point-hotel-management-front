<template>
  <div class="fill-height">
    <Sidepanel></Sidepanel>
    <v-main>
      <v-container fluid class="fill-height py-0">
        <v-row class="fill-height">
          <v-col class="" cols="12" md="10" lg="10" xl="10" offset="1">
            <div v-if="isLoading">
              <LoadingEffect></LoadingEffect>
            </div>

            <div v-else>

              <v-btn
                  dark class="blue my-4"
                  :to="{name: 'AdminRoomsNew'}"
              >
                New Room
              </v-btn>

              <v-card>
                <v-card-title>
                  Rooms
                  <v-spacer></v-spacer>
                  <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Search"
                      single-line
                      hide-details
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                    sort-by="id"
                    :headers="headers"
                    :items="allRooms"
                    :search="search"
                    class="elevation-1"
                >
                  <template v-slot:top>

                      <v-dialog v-model="dialogCancel" max-width="550px">
                        <v-card>
                          <v-card-title class="headline">Are you sure you want to delete this room?</v-card-title>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="closeCancel">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="deleteRoomConfirm">Yes</v-btn>
                            <v-spacer></v-spacer>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                  </template>
                  <template v-slot:item.cancel="{ item }">
                    <v-btn @click="deleteRoom(item)" dark color="red"> Delete</v-btn>
                  </template>

                  <template v-slot:item.checkout="{ item }">
                    <v-btn @click="editRoom(item)" dark color="green">
                      <v-icon left>
                        mdi-pencil
                      </v-icon>
                      Edit</v-btn>
                  </template>

                  <template v-slot:item.cleaned="{ item }">
                    <v-icon :color="getCleanedColor(item.cleaned)">
                      {{ item.cleaned ? "mdi-checkbox-marked" : "mdi-checkbox-blank-outline" }}
                    </v-icon>
                  </template>
                </v-data-table>
              </v-card>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>

import Sidepanel from '../Sidepanel';
import {User} from "../../Objects/User";
import {mapActions} from "vuex";
import LoadingEffect from "@/components/Helpers/LoadingEffect";

export default {
  name: "AdminRooms",
  components: {
    LoadingEffect,
    Sidepanel,
  },
  data() {
    return {
      user: new User(),
      isLoading: true,
      allRooms: [],
      search: '',
      dialog: false,
      dialogCancel: false,
      headers: [
        {
          text: 'Room Number',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {text: 'Floor', value: 'floor_number'},
        {text: 'Max occupants', value: 'max_occupants'},
        {text: 'Cleaned', value: 'cleaned'},
        {text: '', value: 'checkout', sortable: false},
        {text: '', value: 'cancel', sortable: false},
      ],
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
    deleteRoomAPI: function (id) {
      this.$http.delete('rooms/' + id)
          .then(() => {
            this.addNotification({show: true, text: 'Room deleted successfully'})
            this.getAllRooms()
          })
          .catch((error) => {
            this.addNotification({show: true, text: error.response.data.message})
          })

    },

    deleteRoom(item) {
      this.editedIndex = this.allRooms.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogCancel = true
    },

    deleteRoomConfirm() {
      this.deleteRoomAPI(this.allRooms[this.editedIndex].id)
      this.allRooms.splice(this.editedIndex, 1)
      this.dialogCancel = false;
      this.closeCancel()
    },
    editRoom(item) {
      this.editedIndex = this.allRooms.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.$router.push("rooms/" + this.allRooms[this.editedIndex].id)
      this.closeCancel()
    },
    closeCancel() {
      this.dialogCancel = false
      this.dialog = false
    },
    getCleanedColor(cleaned) {
      if (cleaned) return 'green'
      else return 'disabled'
    },
  },
  mounted() {
    this.getAllRooms();
  }
}
</script>
