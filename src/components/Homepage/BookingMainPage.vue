<template>
  <v-container fluid>

    <v-row class="grey lighten-4 justify-center">
      <v-col
          cols="12"
          md="10"

      >
        <v-row class="py-5">
          <v-col cols="12" md="12">
            <h2>Book a room</h2>
          </v-col>

          <!--Check in -->
          <v-col
              align="center"
              cols="12"
              sm="6"
              md="3"
          >
            <v-menu
                v-model="menu1"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="checkindate"
                    label="Check in"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  :min="today"
                  v-model="checkindate"
                  @input="menu1 = false,
                  checkoutdate = checkindate > checkoutdate ? checkindate : checkoutdate"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <!---------------------Check out -->

          <v-col
              cols="12"
              sm="6"
              md="3"
          >
            <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="checkoutdate"
                    label="Check out"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                  v-model="checkoutdate"
                  :min="checkindate"
                  @input="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col
              class="d-flex"
              cols="12"
              sm="6"
              md="2"
          >
            <v-select
                v-model="adults"
                :items="adultNo"
                label="Adults"
                prepend-icon="mdi-account"
                hint="Adults"
                solo
            ></v-select>
          </v-col>

          <v-col

              class="d-flex"
              cols="12"
              sm="6"
              md="2"
          >
            <v-select
                :items="kidsNo"
                v-model="kids"
                label="Kids"
                hint="Kids"
                prepend-icon="mdi-human-male-boy"
                solo
            ></v-select>
          </v-col>

          <v-col cols="12" md="2" class="text-center">
            <v-btn text dark large class="blue" @click="searchRooms">
              <span>Book Now</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>

import {mapActions} from "vuex";

export default {
  data: () => ({
    adults: '1',
    kids: '0',
    today: new Date().toISOString().slice(0, 10),
    checkindate: new Date().toISOString().substr(0, 10),
    checkoutdate: new Date().toISOString().substr(0, 10),
    menu1: false,
    modal: false,
    menu2: false,
    adultNo: [1, 2, 3],
    kidsNo: [0, 1, 2, 3],
  }),
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification'
    }),
    searchRooms: function () {
      if (this.checkindate === this.checkoutdate) {
        this.addNotification({
          show: true,
          text: "Checkin cannot be the same as checkout"
        })
      } else {
        this.$router.push({
          path: 'reserve', query: {
            checkin: this.checkindate,
            checkout: this.checkoutdate,
            adults: this.adults,
            kids: this.kids
          }
        })
      }
    },
  }
}
</script>