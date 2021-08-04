<template>
  <v-main>
    <v-container>
      <v-row wrap class="mt-4">
        <v-col cols="12" md="4" lg="3" xl="2" offset-xl="2" offset-lg="1" class="hidden-sm-and-down">
          <div class="text-center align-center">
            <ProfileNavigationLeft></ProfileNavigationLeft>
          </div>
        </v-col>

        <v-col cols="12" md="4" lg="5" xl="4">
          <div class="pl-5">
            <v-row>
              <h1 class="pb-5 pl-2">Edit profile</h1>
            </v-row>
            <v-form ref="form">
              <v-text-field
                  id="name"
                  v-model="user.name"
                  name="name"
                  label="Full Name"
                  type="text"
                  :rules="[rules.required]"
                  outlined
              >
              </v-text-field>
              <v-text-field
                  id="email"
                  v-model="user.email"
                  name="email"
                  label="Email"
                  type="text"
                  outlined
                  readonly
              >
              </v-text-field>
              <v-select
                  :items="genders"
                  v-model="user.gender"
                  label="Gender"
                  :rules="[rules.required]"
                  outlined
              ></v-select>
              <v-text-field
                  id="country"
                  v-model="user.country"
                  name="country"
                  label="Country"
                  type="text"
                  :rules="[rules.required]"
                  outlined
              >
              </v-text-field>
              <v-text-field
                  id="address"
                  v-model="user.address"
                  name="address"
                  label="Address"
                  type="text"
                  :rules="[rules.required]"
                  outlined
              >
              </v-text-field>
              <v-row justify="space-around">
                <v-btn
                    width="300px"
                    @click="updateInfo"
                    dark large depressed
                    class="deep-purple accent-4 ma-2">
                  Save
                </v-btn>
                <v-btn
                    width="300px"
                    @click="$router.back()"
                    dark large depressed
                    class="deep-purple accent-4 ma-2">
                  Cancel
                </v-btn>
              </v-row>
            </v-form>
          </div>
        </v-col>
        <v-col cols="12" class="hidden-md-and-up">
          <div class=" text-center">
            <ProfileNavigationLeft></ProfileNavigationLeft>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>

import ProfileNavigationLeft from './ProfileNavigationLeft';
import {User} from "../Objects/User";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "EditProfile",
  components: {
    ProfileNavigationLeft,
  },
  data() {
    return {
      user: new User(),
      genders: ["Male", "Female"],
      rules: {
        required: value => !!value || 'Required.',
      },
    }
  },
  methods: {
    ...mapActions({
      update: 'user/updateUser',
      addNotification: 'application/addNotification',

    }),
    getUserInformation: function () {
      this.user = this.userData
    },
    updateInfo: function () {
      if (this.$refs.form.validate()) {
        this.update(this.user)
            .then((response) => {
              this.addNotification({
                show: true,
                text: response.data.message
              })
              this.$router.push({name: 'Profile'})
            })
      }
    }
  },
  watch: {
    userData() {
      this.user = this.userData
    }
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
