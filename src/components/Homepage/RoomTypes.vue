<template>
  <v-card elevation="0">
    <v-row>
      <v-col cols="4"  md="12" lg="12" xl="12">
        <v-img
            class="white--text align-end"
            width="100%"
            :aspect-ratio="3/2"
            :src="`http://localhost:8000/storage/${roomTypesArray.imageURL}`"
            dark
        ></v-img>
      </v-col>
      <v-col cols="8" md="12" lg="12" xl="12" class="pt-0">
        <v-card-title class="pl-0"><h2>{{ roomTypesArray.type_name }}</h2></v-card-title>
        {{ roomTypesArray.description }}
        <br>
        <v-chip
            class="ma-3"
            color="cyan lighten-1"
            text-color="white"
            v-for="(amenity, index) in amenitiesArray" :key="index">
          {{ amenity }}
        </v-chip>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: 'RoomTypes',
  props: ['roomTypesArray'],
  data() {
    return {
      amenitiesArray: null,
    }
  },
  methods: {
    getAmenities() {
      if (this.roomTypesArray.amenities) {
        this.amenitiesArray = this.roomTypesArray.amenities.split(",");
      }
    }
  },
  mounted() {
    this.getAmenities()
  }
}
</script>