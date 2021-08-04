<template>
  <v-main>
    <v-container fluid fill-height class="my-5">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="4">
          <v-card class="elevation-0">
            <v-row justify="center">
              <h1 class="pb-5">New account</h1>
            </v-row>
            <div v-if="isLoading">
              <LoadingEffect></LoadingEffect>
            </div>

            <div v-else>
              <v-card-text>
                <v-form ref="form">
                  <v-text-field
                      prepend-icon="mdi-account"
                      v-model="user.name"
                      name="register"
                      label="Full Name"
                      type="text"
                      :rules="[rules.required]"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      prepend-icon="mdi-email-outline"
                      v-model="user.email"
                      name="register"
                      label="Email"
                      type="email"
                      :rules="[rules.required, rules.email]"
                      outlined
                  ></v-text-field>
                  <v-select
                      prepend-icon="mdi-gender-male-female"
                      :items="genders"
                      v-model="user.gender"
                      label="Gender"
                      :rules="[rules.required]"
                      outlined
                  >{{ user.gender }}
                  </v-select>
                  <v-text-field
                      prepend-icon="mdi-lock"
                      v-model="user.password"
                      name="register"
                      label="Password"
                      type="password"
                      :rules="[rules.required, rules.min]"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      id="password"
                      prepend-icon="mdi-lock"
                      v-model="user.password_confirmation"
                      name="description"
                      label="Confirm password"
                      type="password"
                      :rules="[rules.required, passwordConfirmationRule]"
                      outlined
                  ></v-text-field>
                  <v-row justify="center">
                    <v-btn large color="primary" @click="registerUser">Register</v-btn>
                  </v-row>
                  <v-row justify="center">
                    <div class="pt-5 align-center">Already have an account?
                      <router-link to="/login">Log in</router-link>
                    </div>
                  </v-row>
                </v-form>
              </v-card-text>
            </div>
          </v-card>
        </v-col>
      </v-row>

    </v-container>
  </v-main>
</template>

<script>

import {User} from "../Objects/User";
import LoadingEffect from "@/components/Helpers/LoadingEffect";

import {mapActions} from 'vuex'

export default {
  name: 'Register',
  components: {
    LoadingEffect
  },
  data: () => ({
    isLoading: false,
    user: new User(),
    genders: ["Male", "Female"],
    rules: {
      required: value => !!value || 'Required.',
      min: v => v.length >= 6 || 'Must contain 6 characters',
      email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
    },
  }),
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification',
      register: 'user/registerUser',
    }),
    registerUser: function () {
      if (this.$refs.form.validate()) {
        this.isLoading = true;
        this.register(this.user)
            .then((response) => {
              this.addNotification({
                show: true,
                text: 'You have successfully been registered!'
              })
              this.$router.push({name: 'Login'})
              this.email = '',
                  this.password = '',
                  this.password_confirmation = ''
              console.log(response.data);
              console.log("The user has been registered succesfully");

            })
            .catch(error => {
              this.isLoading = false;
              this.addNotification({
                show: true,
                text: error.response.data.errors[0]
              })
              console.log(error.response.data.errors);
              console.log('The status is' + error.status);
            })
        console.log("the button has been pushed");
      }
    },
  },
  computed: {
    passwordConfirmationRule() {
      return () => (this.user.password === this.user.password_confirmation) || 'Password must match'
    }
  }
}
</script>