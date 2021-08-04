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
                  <h1 class="py-5 pl-2">Edit Room Type</h1>
                </v-row>
                <v-form ref="form">
                  <v-text-field
                      prepend-icon="mdi-form-textbox"
                      dense
                      id="type"
                      v-model="roomType.type_name"
                      name="Room Type Name"
                      label="Room Type Name"
                      type="text"
                      :rules="[rules.required]"
                      outlined
                  >
                  </v-text-field>
                  <v-text-field
                      prepend-icon="mdi-currency-usd"
                      dense
                      id="price"
                      v-model="roomType.base_price"
                      name="Base Price"
                      label="price"
                      type="double"
                      :rules="[rules.required]"
                      outlined
                  >
                  </v-text-field>
                  <v-text-field
                      prepend-icon="mdi-message-text-outline"
                      dense
                      id="description"
                      v-model="roomType.description"
                      name="description"
                      label="Description"
                      type="text"
                      :rules="[rules.required]"
                      outlined
                  >
                  </v-text-field>
                  <v-text-field
                      prepend-icon="mdi-message-text-outline"
                      dense
                      id="amenities"
                      v-model="roomType.amenities"
                      name="amenities"
                      label="Amenities (separate with semicolon)"
                      type="text"
                      :rules="[rules.required]"
                      outlined
                  >
                  </v-text-field>
                  <v-file-input
                      prepend-icon="mdi-image-edit-outline"
                      v-model="files"
                      accept="image/*"
                      label="Choose image"
                      outlined
                      dense
                  ></v-file-input>
                  <v-row justify="space-around">
                    <v-btn
                        width="300px"
                        @click="uploadImage"
                        dark large depressed
                        class="primary ma-2">
                      Save changes
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
import {RoomType} from "../../Objects/RoomType";
import {mapActions} from "vuex";
import LoadingEffect from "@/components/Helpers/LoadingEffect";
import FormData from "form-data";

export default {
  name: "ViewRoomType",
  components: {
    LoadingEffect,
    Sidepanel,
  },
  data() {
    return {
      isLoading: true,
      roomType: new RoomType(),
      files: null,
      rules: {
        required: value => !!value || 'Required.',
      },
    }
  },
  methods: {
    ...mapActions({
      addNotification: 'application/addNotification'
    }),
    getRoomType: function () {
      this.$http.get('roomtypes/' + this.$route.params.id)
          .then((response) => {
            this.roomType = response.data
            this.isLoading = false
          })
          .catch((error) => {
            this.addNotification({show: true, text: error.response.data.message})
          })
    },
    uploadImage: function () {
      if (this.$refs.form.validate()) {

        let formData = new FormData();

        if (this.files) {
          formData.append("image", this.files, this.files.name);
          this.$http.post('upload-image', formData, {
            headers: {
              'Content-Type': `multipart/form-data`,
            }
          })
              .then((response) => {
                this.updateRoomType(response.data)
              })
              .catch((error) => {
                console.log(error)
              })
        } else {
          this.updateRoomType(this.roomType.imageURL)
        }
      }
    },
    updateRoomType: function (imageURL) {
      this.roomType.imageURL = imageURL
      this.$http.put('roomtypes/' + this.$route.params.id, this.roomType)
          .then(() => {
            this.addNotification({show: true, text: 'Room has been updated!'})
            this.$router.push('/admin-roomtypes')
          })
          .catch((error) => {
            this.addNotification({show: true, text: error.response.data.message})
          })
    }
  },
  mounted() {
    this.getRoomType();
  }
}
</script>