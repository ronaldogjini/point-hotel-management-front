<template>
  <v-main>
  <v-container fluid fill-height>
    <v-row class="align-center" justify="center">
      <v-col cols="12" sm="8" md="4">

        <div v-if="isLoading">
          <LoadingEffect></LoadingEffect>
        </div>

        <div v-else>


        <v-card class="elevation-0">
         <v-row justify="center">
           <h1>Sign In</h1>
         </v-row>
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                  prepend-icon="mdi-email-outline"
                  v-model="user.email"
                  name="login"
                  label="Email"
                  type="email"
                  :rules="emailRules"
                  outlined
              ></v-text-field>
              <v-text-field
                  prepend-icon="mdi-lock"
                  v-model="user.password"
                  name="register"
                  label="Password"
                  type="password"
                  :rules="passwordRules"
                  outlined
              ></v-text-field>
              <v-row justify="center">
                <v-btn x-large  width="250px" color="primary" @click="loginUser">Login</v-btn>
              </v-row>
              <v-row justify="center">
                <div class="pt-10">Don't have an account? <router-link to="/register">Register Now</router-link> </div>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
  </v-main>
</template>

<script>

import {mapActions} from 'vuex'
import { User } from "../Objects/User";
import LoadingEffect from "@/components/Helpers/LoadingEffect";


export default {
  name: 'Login',
  components: {
    LoadingEffect
  },
  data: () => ({
    isLoading: false,
    user: new User(),
    emailRules: [
      v => !!v || 'Email is required',
      v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'

    ],
    passwordRules: [
      v => !!v || 'Password is required',
    ],
  }),

  methods: {
    ...mapActions({
      login: 'user/loginUser',
      addNotification: 'application/addNotification'
    }),
    loginUser() {
      if(this.$refs.form.validate()) {
        this.isLoading = true;
        this.login( this.user)
        .then(() => {
          this.addNotification({
            show: true,
            text: 'You have successfully logged in!'
          })
          this.$router.push({name: 'Mainpage'})
          this.$store.dispatch('user/showUserInfo')
          })
          .catch((error) => {
            this.isLoading = false;
            this.addNotification({
              show: true,
              text: error.response.data.message
            })
          })
      }
    }
  },
}
</script>