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

          <v-card>
            <v-card-title>
              Bookings
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
                :items="allBookings"
                :search="search"
                :items-per-page="10"
            >
              <template v-slot:item.paid="{ item }">
                <v-icon :color="getPaidColor(item.paid)">
                  {{ item.paid ? "mdi-currency-usd" : "mdi-checkbox-blank-outline" }}
                </v-icon>
              </template>

              <template v-slot:item.canceled="{ item }">
                <v-icon :color="getCanceledColor(item.canceled)">
                  {{ item.canceled ? "mdi-close-box" : "mdi-checkbox-blank-outline" }}
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
import {mapActions} from "vuex";
import LoadingEffect from "@/components/Helpers/LoadingEffect";

export default {
  name: "AdminBookings",
  components: {
    LoadingEffect,
    Sidepanel
  },
  data() {
    return {
      isLoading: true,
      search: '',
      allBookings: [],
      headers: [
        {
          text: 'Booking ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        {text: 'Room', value: 'room_id'},
        {text: 'Client', value: 'name'},
        {text: 'Price ($)', value: 'price'},
        {text: 'Adults', value: 'adults'},
        {text: 'Kids', value: 'kids'},
        {text: 'Check In', value: 'check_in'},
        {text: 'Check Out', value: 'check_out'},
        {text: 'Paid', value: 'paid'},
        {text: 'Canceled', value: 'canceled'},
      ],
    }
  },
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification'}),
    getAllBookings: function() {
      this.$http.get('admin/bookings')
          .then((response) => {
            this.allBookings = response.data
            for (let i = 0; i < this.allBookings.length; i++) {
              this.allBookings[i].check_in = this.allBookings[i].check_in.slice(0, 10)
              this.allBookings[i].check_out = this.allBookings[i].check_out.slice(0, 10)
            }
            this.isLoading = false
          })
          .catch((error) => {
            this.addNotification({ show: true, text: error.response.data.message})
          })

    },
    getCanceledColor (canceled) {
      if (canceled) return 'red'
      else return 'disabled'
    },
    getPaidColor (paid) {
      if (paid) return 'green'
      else return 'disabled'
    },
  },
  mounted() {
    this.getAllBookings();
  }
}
</script>