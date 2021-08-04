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
              <h1 class="pb-5 pl-2">Change Password</h1>
            </v-row>
            <v-form ref="form">
              <v-text-field
                  id="Current password"
                  v-model="current_password"
                  label="Current password"
                  type="password"
                  :rules="[rules.required]"
                  outlined
              >
              </v-text-field>
              <v-text-field
                  id="New Password"
                  v-model="new_password"
                  label="New Password"
                  type="password"
                  :rules="[rules.required]"
                  outlined
              >
              </v-text-field>
              <v-text-field
                  id="New Password Confirmation"
                  v-model="new_password_confirmation"
                  label="Confirm new password"
                  type="password"
                  :rules="[rules.required, passwordConfirmationRule]"
                  outlined
              >
              </v-text-field>

              <v-row justify="space-around">
                <v-btn
                    width="300px"
                    @click="changePassword"
                    dark large depressed
                    class="primary ma-2">
                  Change Password
                </v-btn>
                <v-btn
                    width="300px"
                    @click="$router.back()"
                    dark large depressed
                    class="primary ma-2">
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
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ChangePassword",
  components: {
    ProfileNavigationLeft,
  },
  data() {
    return {
      current_password: '',
      new_password: '',
      new_password_confirmation: '',
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
    changePassword: function () {
      if (this.$refs.form.validate()) {
        this.$http.post('reset-password', {
          current_password: this.current_password,
          new_password: this.new_password,
          new_password_confirmation: this.new_password_confirmation,
        })
            .then((response) => {
              this.addNotification({
                show: true,
                text: response.data.message
              })
              this.$router.push({name: 'Profile'})
            })
            .catch((errors) => {
              this.addNotification({
                show: true,
                text: errors
              })
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
    passwordConfirmationRule() {
      return () => (this.new_password === this.new_password_confirmation) || 'Password must match'
    }
  }
}
</script>
