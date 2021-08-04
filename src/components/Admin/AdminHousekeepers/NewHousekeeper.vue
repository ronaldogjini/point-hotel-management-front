<template>
  <div class="fill-height">
  <Sidepanel></Sidepanel>
    <v-main>
      <v-container fluid class="fill-height py-0">
        <v-row class="fill-height">
          <v-col class="" cols="12" md="6" lg="6" xl="6" offset="3">

            <div v-if="isLoading">
              <LoadingEffect></LoadingEffect>
            </div>

            <div v-else>
              <div class="pl-5">
                <v-row>
                  <h1 class="py-5 pl-2">New Housekeeper</h1>
                </v-row>
                <v-form ref="form">
                  <v-text-field
                      dense
                      id="name"
                      v-model="newHousekeeper.name"
                      name="name"
                      label="Name"
                      type="text"
                      prepend-icon="mdi-account"
                      :rules="[rules.required]"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      dense
                      id="email"
                      v-model="newHousekeeper.email"
                      name="email"
                      label="Email"
                      type="email"
                      prepend-icon="mdi-email"
                      :rules="[rules.required, rules.email]"
                      outlined
                  ></v-text-field>
                  <v-select
                      dense
                      prepend-icon="mdi-gender-male-female"
                      :items="genders"
                      v-model="newHousekeeper.gender"
                      label="Gender"
                      :rules="[rules.required]"
                      outlined
                  ></v-select>
                  <v-text-field
                      dense
                      id="country"
                      v-model="newHousekeeper.country"
                      name="country"
                      label="Country"
                      type="text"
                      prepend-icon="mdi-map-marker-outline"
                      :rules="[rules.required]"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      dense
                      id="address"
                      v-model="newHousekeeper.address"
                      name="address"
                      label="Address"
                      type="text"
                      prepend-icon="mdi-map-marker"
                      :rules="[rules.required]"
                      outlined
                  >
                  </v-text-field>
                  <v-text-field
                      dense
                      id="password"
                      v-model="newHousekeeper.password"
                      name="password"
                      label="Password"
                      type="password"
                      :rules="[rules.required, rules.min]"
                      prepend-icon="mdi-lock"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      dense
                      id="password_confirmation"
                      v-model="newHousekeeper.password_confirmation"
                      name="password_confirmation"
                      label="Confirm password"
                      type="password"
                      :rules="[rules.required, passwordConfirmationRule]"
                      prepend-icon="mdi-lock-alert"
                      outlined
                  ></v-text-field>
                  <v-row justify="space-around">
                    <v-btn
                        width="300px"
                        @click="addReceptionist"
                        dark large depressed
                        class="primary ma-2">
                      Add Housekeeper
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
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>

import Sidepanel from '../Sidepanel';
import {mapActions} from "vuex";
import {Housekeeper} from '@/components/Objects/Housekeeper'
import LoadingEffect from "@/components/Helpers/LoadingEffect";

export default {
  name: "Newhousekeeper",
  components: {
    LoadingEffect,
    Sidepanel,
  },
  data() {
    return {
      isLoading: false,
      newHousekeeper: new Housekeeper(),
      genders: ["Male", "Female"],
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 6 || 'Must contain 6 characters',
        email: v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      },
    }
  },
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification'
    }),
    addReceptionist: function () {
      if (this.$refs.form.validate()) {
        this.$http.post('register', this.newHousekeeper)
            .then(() => {
              this.addNotification({show: true, text: "Housekeeper has been successfully added!"})
              this.$router.push({name: 'AdminHousekeepers'})
            })
            .catch((error) => {
              this.addNotification({show: true, text: error.response.errors})
            })
      }
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () => (this.newHousekeeper.password === this.newHousekeeper.password_confirmation) || 'Password must match'
    }
  }
}
</script>