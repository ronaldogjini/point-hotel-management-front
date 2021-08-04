<template>
  <v-card
      class="mx-auto"
      height="250"
      width="256"
  >
    <v-navigation-drawer
        class="deep-purple accent-4"
        dark
        permanent
    >
      <v-list>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click="currentTabComponent = item.component"
        >

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: 'ReceptionistNavigationLeft',
  data() {
    return {
      currentTabComponent: 'ReceptionistAllBookings',
      items: [
        {title: 'All', icon: 'mdi-ballot', component: 'ReceptionistAllBookings'},
        {title: 'Current', icon: 'mdi-bed', component: 'ReceptionistCurrentBookings'},
        {title: 'Past', icon: 'mdi-clock-check-outline', component: 'ReceptionistPastBookings'},
        {title: 'Canceled', icon: 'mdi-cancel', component: 'ReceptionistCanceledBookings'},
      ],
    }
  },
  watch: {
    currentTabComponent: function() {
      this.$emit("child-tab", this.currentTabComponent);
    }
  }
}
</script>