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
                  dark class="blue mb-4"
                  :to="{name: 'AdminRoomtypesNew'}"
              >
                New Room Type
              </v-btn>
              <v-expansion-panels>
                <v-expansion-panel
                    v-for="roomtype in allRoomTypes"
                    :key="roomtype.id"
                >
                  <v-expansion-panel-header>
                    Room {{ roomtype.type_name }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <strong>Description:</strong> {{ roomtype.description }}
                    <br>
                    <v-chip
                        class="mt-3"
                        color="primary"
                        outlined
                        pill
                        :to="{path: '/admin/roomtypes/' + roomtype.id}"
                    >
                      Edit Room Type
                    </v-chip>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
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
import LoadingEffect from "@/components/Helpers/LoadingEffect";
import {mapActions} from "vuex";


export default {
  name: "AdminRoomTypes",
  components: {
    Sidepanel,
    LoadingEffect
  },
  data() {
    return {
      user: new User(),
      isLoading: true,
      allRoomTypes: []
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
            this.isLoading = false
          })
          .catch((error) => {
            this.addNotification({show: true, text: error.response.data.message})
          })
    }
  },
  mounted() {
    this.getAllRoomTypes();
  }
}
</script>
