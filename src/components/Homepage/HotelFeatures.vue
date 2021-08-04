<template>
  <v-container>
    <v-row align="center">
      <v-col cols="12" md="12">
        <v-row justify="space-around">
          <v-col v-for="service in services" :key="service.description" cols="12" md="4" lg="4" xl="4">
            <v-card height="250" class="pa-5" elevation="0">
              <v-row align="center">
                <v-col cols="2" md="4" lg="4">
                  <v-img
                      :src="service.url"
                      max-height="75"
                      max-width="75"
                  >
                  </v-img>
                </v-col>
                <v-col cols="8" md="8">
                  <h2>{{ service.name }}</h2>
                </v-col>
                <v-col cols="12" md="12">
                  <p>{{ service.description }}</p>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "home",
  components: {
  },
  data() {
    return {
      services: [
        {
          name: "Luxury Service",
          description: "Enjoy the ultimate luxury service at Point hotel. From the ultra luxorious rooms, to an undisrupted view of the ocean, to a 24/7 hour butler service.",
          url: "http://127.0.0.1:8000/storage/icons/waiter.png"
        },
        {
          name: " Relaxation",
          description: "Point Hotel makes sure you get the most of your stay in our premises. Take advantage of our SPA, sauna to relax. Or book a massage session to release all the negative energy.",
          url: "http://127.0.0.1:8000/storage/icons/flower.webp"

        },
        {
          name: "Dining Service",
          description: "Enjoy the best food cooked by the best chefs in the country. Enjoy a five course meal at our restaurant, cooked with love.",
          url: "http://127.0.0.1:8000/storage/icons/food.png"
        },
      ]
    };
  }
};
</script>
