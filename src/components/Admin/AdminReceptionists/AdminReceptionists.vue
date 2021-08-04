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
                  :to="{name: 'AdminReceptionistsNew'}"
              >
                New Receptionist
              </v-btn>
              <v-card>
                <v-card-title>
                  Receptionists
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
                    :headers="headers"
                    :items="allReceptionists"
                    :search="search"
                    :items-per-page="10"
                ></v-data-table>
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
import {mapActions} from "vuex";
import LoadingEffect from "@/components/Helpers/LoadingEffect";

export default {
  name: "AdminReceptionists",
  components: {
    LoadingEffect,
    Sidepanel,
  },
  data() {
    return {
      isLoading: true,
      allReceptionists: [],
      search: '',
      headers: [
        {
          text: 'Receptionist ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {text: 'Name', value: 'name'},
        {text: 'email', value: 'email'},
        {text: 'Gender', value: 'gender'},
        {text: 'Country', value: 'country'},
        {text: 'Address', value: 'address'},
      ],
    }
  },
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification'
    }),
    getAllReceptionists: function () {
      this.$http.post('usertype', {type: 1})
          .then((response) => {
            this.allReceptionists = response.data
            this.isLoading = false
          })
          .catch((error) => {
            this.addNotification({show: true, text: error.response.data.message})
          })
    },
  },
  mounted() {
    this.getAllReceptionists();
  }
}
</script>
