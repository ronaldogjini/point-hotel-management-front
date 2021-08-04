<template>
  <v-container>
    <v-row class="mt-3">
      <v-col cols="12" md="12" lg="12" xl="12">
        <v-card>
          <v-card-title>
           Past Bookings
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
              :items="allBookings"
              :search="search"
              :items-per-page="10"
          ></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>


</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "ReceptionistPastBookings",
  components: {
  },
  data() {
    return {
      isLoading: false,
      allBookings: [],
      search: '',
      currentTabComponent: '',
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
      addNotification: 'application/addNotification'
    }),
    getAllBookings: function() {
      this.$http.get('past-bookings')
          .then((response) => {
            this.allBookings = response.data
            for (let i = 0; i < this.allBookings.length; i++) {
              this.allBookings[i].check_in = this.allBookings[i].check_in.slice(0, 10)
              this.allBookings[i].check_out = this.allBookings[i].check_out.slice(0, 10)
              this.allBookings[i].paid = this.allBookings[i].paid ? 'Paid' : 'Not Paid'
              this.allBookings[i].canceled = this.allBookings[i].canceled ? 'Canceled' : 'No'
            }
            this.isLoading = false
          })
          .catch((error) => {
            this.addNotification({ show: true, text: error.response.data.message})
          })
    },
  },
  mounted() {
    this.getAllBookings();
  }
}
</script>
