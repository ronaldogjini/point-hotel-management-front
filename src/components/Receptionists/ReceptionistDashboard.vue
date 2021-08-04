<template>
  <v-main>
    <v-container>
      <v-row class="mt-3" justify="center">
        <v-col cols="12" md="2" lg="2" xl="2" class="hidden-xs-only">
          <div class=" text-center">
            <ReceptionistNavigationLeft @child-tab="getCurrentTab"></ReceptionistNavigationLeft>
          </div>
        </v-col>
        <v-col cols="12" md="10" lg="10" xl="10">
          <div v-if="isLoading">
            <LoadingEffect></LoadingEffect>
          </div>

          <keep-alive>
            <component v-bind:is="currentTabComponent"></component>
          </keep-alive>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

import LoadingEffect from "@/components/Helpers/LoadingEffect";
import ReceptionistNavigationLeft from "@/components/Receptionists/ReceptionistNavigationLeft";
import ReceptionistCurrentBookings from "@/components/Receptionists/ReceptionistCurrentBookings";
import ReceptionistPastBookings from "@/components/Receptionists/ReceptionistPastBookings";
import ReceptionistCanceledBookings from "@/components/Receptionists/ReceptionistCanceledBookings";
import ReceptionistAllBookings from "@/components/Receptionists/ReceptionistAllBookings";
import {mapActions} from "vuex";


export default {
  name: "ReceptionistDashboard",
  components: {
    ReceptionistNavigationLeft,
    LoadingEffect,
    ReceptionistCurrentBookings,
    ReceptionistAllBookings,
    ReceptionistPastBookings,
    ReceptionistCanceledBookings
  },
  data() {
    return {
      isLoading: false,
      allBookings: [],
      search: '',
      currentTabComponent: 'ReceptionistAllBookings',
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
    getAllBookings: function () {
      this.$http.get('admin/bookings')
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
    getCurrentTab(params) {
      this.currentTabComponent = params;
    }
  },
  mounted() {
    this.getAllBookings();
  }
}
</script>
