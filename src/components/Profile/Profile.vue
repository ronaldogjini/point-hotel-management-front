<template>
  <v-main>
  <v-container>
    <v-row class="mt-4 fill-height">
      <v-col cols="12" md="4" lg="3" xl="2" offset-xl="2" offset-lg="1" class="hidden-sm-and-down">
       <div class=" text-center">
         <ProfileNavigationLeft></ProfileNavigationLeft>
       </div>
      </v-col>

      <v-col cols="12" md="4" lg="5" xl="4">

        <div v-if="isLoading">
          <LoadingEffect></LoadingEffect>
        </div>

        <div v-else class="pl-5">
        <v-row class="pb-5">
          <h1 class="pl-2">Your profile</h1>
          <v-spacer></v-spacer>
          <v-chip
              class="ma-2"
              color="primary"
              outlined
              pill
              :to="{name: 'EditProfile'}"
          >
            Edit Account
            <v-icon right>
              mdi-account-outline
            </v-icon>
          </v-chip>
        </v-row>

          <v-text-field
              dense
              id="name"
              v-model="user.name"
              name="name"
              label="Full Name"
              type="text"
              outlined
              readonly
          >
          </v-text-field>
          <v-text-field
              dense
              id="email"
              v-model="user.email"
              name="email"
              label="Email"
              type="text"
              outlined
              readonly
          >
            {{user.email}}
          </v-text-field>
          <v-text-field
              dense
              id="gender"
              v-model="user.gender"
              name="gender"
              label="Gender"
              type="text"
              outlined
              readonly
          >
            {{user.gender}}
          </v-text-field>
          <v-text-field
              dense
              id="country"
              v-model="user.country"
              name="country"
              label="Country"
              type="text"
              outlined
              readonly
          >
            {{user.country}}
          </v-text-field>
          <v-text-field
              dense
              id="address"
              v-model="user.address"
              name="address"
              label="Address"
              type="text"
              outlined
              readonly
          >
          </v-text-field>

          <v-col cols="12" class="hidden-md-and-up">
            <div class=" text-center">
              <ProfileNavigationLeft></ProfileNavigationLeft>
            </div>
          </v-col>
        </div>
      </v-col>
    </v-row>

  </v-container>
  </v-main>
</template>

<script>

import ProfileNavigationLeft from './ProfileNavigationLeft';
import { User } from "../Objects/User";
import {mapGetters} from "vuex";
import LoadingEffect from "@/components/Helpers/LoadingEffect";


export default {
  name: "Profile",
  components: {
    ProfileNavigationLeft,
    LoadingEffect
  },
  data() {
    return {
      user: new User(),
      isLoading: false,
    }
  },
  watch: {
    userData() {
      this.user = this.userData
    }
  },
  methods: {
  getUserInformation: function() {
    this.user = this.userData
  },
  },
  computed: {
    ...mapGetters({
      userData: 'user/userDetails'
    }),
  },
  mounted() {
    this.getUserInformation();
  }
}
</script>
