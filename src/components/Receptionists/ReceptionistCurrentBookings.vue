<template>
  <v-container>
    <v-row class="mt-3">
      <v-col cols="12" md="12" lg="12" xl="12">
        <v-card>
          <v-card-title>
            Current Bookings
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
              class="elevation-1"
              :sort-desc=true
          >
            <template v-slot:top>
              <v-toolbar
                  flat
              >

                <v-spacer></v-spacer>
                <v-dialog v-model="dialogCancel" max-width="550px">
                  <v-card>
                    <v-card-title class="headline">Are you sure you want to cancel this booking?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeCancel">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="cancelBookingConfirm">OK</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-dialog v-model="dialog" max-width="600px">
                  <v-card>
                    <v-card-title class="headline">Check out this person and complete the booking?</v-card-title>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeCancel">Cancel</v-btn>
                      <v-btn color="blue darken-1" text @click="checkoutUserAPI">Yes</v-btn>
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.cancel="{ item }">
              <v-btn @click="cancelBooking(item)" dark color="red"> Cancel</v-btn>
            </template>

            <template v-slot:item.checkout="{ item }">
              <v-btn @click="checkoutUser(item)" dark color="green"> Checkout</v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import {mapActions} from "vuex";


export default {
  name: "ReceptionistCurrentBookings",
  components: {},
  data() {
    return {
      isLoading: false,
      allBookings: [],
      search: '',
      dialog: false,
      dialogCancel: false,
      editedIndex: -1,
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
        {text: '', value: 'checkout', sortable: false},
        {text: '', value: 'cancel', sortable: false},
      ],
    }
  },
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification'
    }),

    checkoutUser(item) {
      this.editedIndex = this.allBookings.indexOf(item)
      this.dialog = true
    },


    checkoutUserAPI() {
      let bookingID = this.allBookings[this.editedIndex].id

      this.$http.put('bookings/' + bookingID, {completed: 1, paid: 1})
          .then(() => {
            this.addNotification({
              show: true,
              text: 'The user has checked out!'
            })
          })
          .catch((error) => {
            this.addNotification({
              show: true,
              text: error.response.errors
            })
          })

      this.allBookings.splice(this.editedIndex, 1)
      this.dialog = false;
    },

    cancelBooking(item) {
      this.editedIndex = this.allBookings.indexOf(item)
      this.dialogCancel = true
    },

    cancelBookingConfirm() {
      this.cancelBookingAPI(this.allBookings[this.editedIndex].id)
      this.allBookings.splice(this.editedIndex, 1)
      this.closeCancel()
    },
    cancelBookingAPI(bookingID) {
      this.$http.put('bookings/' + bookingID, {canceled: 1, completed: 1})
          .then(() => {
            this.addNotification({show: true, text: 'You have canceled the booking!'})
            this.$router.push('/frontdesk')
          })
          .catch((error) => {
            this.addNotification({show: true, text: error.response.errors})
          })
    },
    closeCancel() {
      this.dialogCancel = false
      this.dialog = false
    },
    getCurrentBookings: function () {
      this.$http.get('current-bookings')
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
            this.addNotification({show: true, text: error.response.data.message})
          })
    },
  },
  mounted() {
    this.getCurrentBookings();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialogCancel(val) {
      val || this.closeCancel()
    },
  },
}
</script>
