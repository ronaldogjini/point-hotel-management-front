<template>
    <v-navigation-drawer
        class="blue-grey darken-2"
        dark
        app
        permanent

    >
      <v-list>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="item.link"
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
</template>

<script>
export default {
  name: 'Sidepanel',
  data () {
    return {
      items: [
        { title: 'Bookings', icon: 'mdi-notebook-multiple', link: {name: 'AdminBookings'} },
        { title: 'Housekeepers', icon: 'mdi-broom', link: {name: 'AdminHousekeepers'} },
        { title: 'Receptionists', icon: 'mdi-room-service', link: {name: 'AdminReceptionists'}},
        { title: 'Rooms', icon: 'mdi-bed', link: {name: 'AdminRooms'} },
        { title: 'Room Types', icon: 'mdi-account-question', link: {name: 'AdminRoomTypes'} },
      ],
    }
  },
}
</script>