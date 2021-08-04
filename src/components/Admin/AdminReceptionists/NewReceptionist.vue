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
                  <h1 class="py-5 pl-2">New Receptionist</h1>
                </v-row>
                <v-form ref="form">
                  <v-text-field
                      dense
                      id="name"
                      v-model="newReceptionist.name"
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
                      v-model="newReceptionist.email"
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
                      v-model="newReceptionist.gender"
                      label="Gender"
                      :rules="[rules.required]"
                      outlined
                  ></v-select>
                  <v-text-field
                      dense
                      id="country"
                      v-model="newReceptionist.country"
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
                      v-model="newReceptionist.address"
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
                      v-model="newReceptionist.password"
                      name="password"
                      label="Password"
                      type="password"
                      prepend-icon="mdi-lock"
                      :rules="[rules.required, rules.min]"
                      outlined
                  ></v-text-field>
                  <v-text-field
                      dense
                      id="password_confirmation"
                      v-model="newReceptionist.password_confirmation"
                      name="password_confirmation"
                      label="Confirm password"
                      type="password"
                      prepend-icon="mdi-lock-alert"
                      :rules="[rules.required, passwordConfirmationRule]"
                      outlined
                  ></v-text-field>
                  <v-row justify="space-around">
                    <v-btn
                        width="300px"
                        @click="addReceptionist"
                        dark large depressed
                        class="primary ma-2">
                      Add Receptionist
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
import {Receptionist} from '@/components/Objects/Receptionist'
import LoadingEffect from "@/components/Helpers/LoadingEffect";

export default {
  name: "NewReceptionist",
  components: {
    LoadingEffect,
    Sidepanel,
  },
  data() {
    return {
      isLoading: false,
      newReceptionist: new Receptionist(),
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
        this.$http.post('register', this.newReceptionist)
            .then(() => {
              this.addNotification({show: true, text: "Receptionist has been successfully added!"})
              this.$router.push({name: 'AdminReceptionists'})
            })
            .catch(() => {
              this.addNotification({show: true, text: "The room number is taken"})
            })
      }
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () => (this.newReceptionist.password === this.newReceptionist.password_confirmation) || 'Password must match'
    }
  }
}
</script>