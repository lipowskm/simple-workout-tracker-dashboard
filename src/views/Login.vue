<template>
  <!-- eslint-disable -->
  <v-content v-if="$store.state.isLoggedIn===false">
    <v-container fill-height>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm8 md4 align-self-center>
          <ValidationObserver ref="observer" @submit.prevent="submit()" v-slot="{ invalid }">
            <v-card class="elevation-12">
              <v-tabs centered>
                <v-tab
                  v-model="loginButtonClicked"
                  v-on:click="toggleLogin">
                  Login
                </v-tab>
                <v-tab
                  v-model="registerButtonClicked"
                  v-on:click="toggleRegister">
                  Register
                </v-tab>
              </v-tabs>
              <v-toolbar>
                <v-spacer></v-spacer>
                <v-toolbar-title class="font-weight-thin">{{ toolbarText }}</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-expand-transition>
                <div v-if="loginButtonClicked">
                  <v-card-text>
                    <v-form @keyup.enter="submit">
                      <ValidationProvider name="Username" rules="required" mode="aggressive">
                        <v-text-field slot-scope="{ errors }"
                                      :error-messages="errors"
                                      @keyup.enter="submit"
                                      v-model="username"
                                      prepend-icon="mdi-account-circle"
                                      name="username"
                                      label="Username/email"
                                      type="text"></v-text-field>
                      </ValidationProvider>
                      <ValidationProvider name="Password" rules="required" mode="aggressive">
                        <v-text-field slot-scope="{ errors }"
                                      :error-messages="errors"
                                      @keyup.enter="submit"
                                      v-model="password"
                                      prepend-icon="mdi-lock"
                                      name="password"
                                      label="Password"
                                      id="password"
                                      type="password"></v-text-field>
                      </ValidationProvider>
                    </v-form>
                    <v-expand-transition>
                      <div v-if="loginError">
                        <v-alert :value="loginError" transition="fade-transition" type="error">
                          Incorrect credentials
                        </v-alert>
                      </div>
                    </v-expand-transition>
                    <v-card-actions>
                      <v-btn @click="submitLogin" :disabled="invalid" :loading="isLoading" color="primary">Login</v-btn>
                      <v-flex class="caption text-sm-right">
                        <router-link :to="{ name: 'dashboard' }" target="_blank">Forgot your password?</router-link>
                      </v-flex>
                    </v-card-actions>
                  </v-card-text>
                </div>
              </v-expand-transition>
              <v-expand-transition>
                <div v-if="registerButtonClicked">
                  <v-card-text>
                    <v-form>
                      <ValidationProvider name="First name" rules="required|min:3" mode="eager">
                        <v-text-field slot-scope="{ errors }"
                                      :error-messages="errors"
                                      v-model="firstName"
                                      name="firstName"
                                      label="First name"
                                      type="text"></v-text-field>
                      </ValidationProvider>
                      <v-text-field v-model="lastName"
                                    name="lastName"
                                    label="Last name"
                                    type="text"></v-text-field>
                      <ValidationProvider name="Email" rules="required|email" mode="eager">
                        <v-text-field slot-scope="{ errors }"
                                      :error-messages="errors"
                                      v-model="email"
                                      prepend-icon="mdi-email"
                                      name="email"
                                      label="Email"
                                      type="text"></v-text-field>
                      </ValidationProvider>
                      <ValidationProvider name="Username" rules="required|min:3" mode="eager">
                        <v-text-field slot-scope="{ errors }"
                                      :error-messages="errors"
                                      v-model="username"
                                      prepend-icon="mdi-account-circle"
                                      name="username"
                                      label="Username"
                                      type="text"></v-text-field>
                      </ValidationProvider>
                      <ValidationProvider name="Password" rules="required|min:6" mode="eager">
                        <v-text-field slot-scope="{ errors }"
                                      :error-messages="errors"
                                      v-model="password"
                                      prepend-icon="mdi-lock"
                                      name="password"
                                      label="Password"
                                      id="password"
                                      type="password"></v-text-field>
                      </ValidationProvider>
                    </v-form>
                    <v-card-actions>
                      <v-btn color="primary" :loading="isLoading">Sign up</v-btn>
                    </v-card-actions>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </ValidationObserver>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
  <!-- eslint-enable -->
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, email, min } from 'vee-validate/dist/rules'
import { dispatchLogIn } from '@/store/actions'
import { readUserProfile } from '@/store/getters'

@Component({
  components: {
    ValidationProvider,
    ValidationObserver
  }
})
export default class Login extends Vue {
  $refs!: {
    observer: InstanceType<typeof ValidationObserver>;
  }

  username: string
  password: string
  firstName: string
  lastName: string
  email: string
  loginButtonClicked: boolean
  registerButtonClicked: boolean
  toolbarText = 'Please enter your credentials'
  loginError = false
  isLoading = false

  constructor() {
    super()
    this.username = this.password = this.firstName = this.lastName = this.email = ''
    this.loginButtonClicked = true
    this.registerButtonClicked = false

    extend('required', {
      ...required,
      message: '{_field_} is required'
    })

    extend('email', {
      ...email,
      message: 'This is not a valid email address'
    })

    extend('min', {
      ...min,
      message: '{_field_} must be at least {length} characters long'
    })
  }

  get userFirstName() {
    const profile = readUserProfile(this.$store)
    return profile?.first_name
  }

  submitLogin() {
    this.loginError = false
    this.isLoading = true
    this.$refs.observer.validate().then(isValidated => {
      if (isValidated) {
        dispatchLogIn(this.$store, { username: this.username, password: this.password }).then(result => {
          if (!result) {
            this.isLoading = false
            this.loginError = true
          } else this.$toast(`Welcome, ${this.userFirstName}`)
        })
      }
    })
  }

  toggleLogin() {
    this.loginError = false
    this.loginButtonClicked = true
    this.registerButtonClicked = false
    this.toolbarText = 'Please enter your credentials'
  }

  toggleRegister() {
    this.loginButtonClicked = false
    this.registerButtonClicked = true
    this.toolbarText = 'Create new account'
  }
}

</script>
