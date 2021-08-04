<template>
  <v-card
      class="mx-auto"
      height="200"
      width="100%"
  >
    <v-navigation-drawer
        class="deep-purple accent-4"
        dark
        floating
        permanent
        width="100%"
    >
      <v-list>
        <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            :to="{name: item.link }"
        >

          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn :to="{name: 'ChangePassword'}" block>
            Change Password
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  name: 'ProfileNavigationLeft',
  data() {
    return {
      items: [
        {title: 'Profile', icon: 'mdi-account', link: 'Profile'},
        {title: 'Bookings', icon: 'mdi-bed', link: 'Bookings'},
      ],
    }
  },
}
</script>