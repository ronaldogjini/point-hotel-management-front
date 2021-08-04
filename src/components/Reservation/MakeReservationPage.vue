<template>
  <v-main>
    <v-container fluid>

      <v-row align="center" class="fill-height">
        <BookingMainPage></BookingMainPage>
        <HotelFeatures class="py-10"></HotelFeatures>
      </v-row>
    </v-container>
  </v-main>
</template>


<script>
import BookingMainPage from '@/components/Homepage/BookingMainPage'
import HotelFeatures from '@/components/Homepage/HotelFeatures'

export default {
  name: 'MakeReservationPage',
  components: {
    BookingMainPage,
    HotelFeatures
  },
}
</script>