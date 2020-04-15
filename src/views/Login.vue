<template>
  <!-- eslint-disable -->
  <v-content v-if="$store.state.isLoggedIn===false">
    <v-container fill-height>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm8 md4 align-self-center>
          <ValidationObserver ref="observer" v-slot="{ invalid }">
            <v-card class="elevation-12">
              <v-tabs centered grow v-model="activeTab">
                <v-tab :key="1"
                       v-on:click="toggleLogin">
                  Login
                </v-tab>
                <v-tab :key="2"
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
                <div v-if="activeTab===0">
                  <v-card-text>
                    <v-form @keyup.enter="submitLogin">
                      <ValidationProvider name="Username" rules="required" mode="aggressive">
                        <v-text-field slot-scope="{ errors }"
                                      :error-messages="errors"
                                      @keyup.enter="submitLogin"
                                      v-model="username"
                                      prepend-icon="mdi-account-circle"
                                      name="username"
                                      label="Username or email address"
                                      type="text"></v-text-field>
                      </ValidationProvider>
                      <ValidationProvider name="Password" rules="required" mode="aggressive">
                        <v-text-field slot-scope="{ errors }"
                                      :error-messages="errors"
                                      @keyup.enter="submitLogin"
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
                          {{ loginError }}
                        </v-alert>
                      </div>
                    </v-expand-transition>
                    <v-card-actions>
                      <v-btn @click="submitLogin" :disabled="invalid" :loading="isLoading" color="primary">Login</v-btn>
                      <v-flex class="caption text-sm-right">
                        <router-link :to="{ name: 'recoverPassword' }">Forgot your password?</router-link>
                      </v-flex>
                    </v-card-actions>
                  </v-card-text>
                </div>
              </v-expand-transition>
              <v-expand-transition>
                <div v-if="activeTab===1">
                  <v-card-text>
                    <v-form>
                      <ValidationProvider name="First name" rules="required|min:2" mode="eager">
                        <v-text-field slot-scope="{ errors, valid }"
                                      :error-messages="errors"
                                      v-model="firstName"
                                      name="firstName"
                                      type="text"
                                      :success="valid"
                                      autofocus>
                          <template #label>
                            <span class="red--text"><strong>* </strong></span>First name
                          </template>
                        </v-text-field>
                      </ValidationProvider>
                      <v-text-field v-model="lastName"
                                    name="lastName"
                                    label="Last name"
                                    type="text"></v-text-field>
                      <ValidationProvider name="Email" rules="required|email" mode="eager">
                        <v-text-field slot-scope="{ errors, valid }"
                                      :error-messages="errors"
                                      v-model="email"
                                      name="email"
                                      type="text"
                                      :success="valid">
                          <template #label>
                            <span class="red--text"><strong>* </strong></span>Email address
                          </template>
                        </v-text-field>
                      </ValidationProvider>
                      <ValidationProvider name="Username" rules="required|min:6" mode="eager">
                        <v-text-field slot-scope="{ errors, valid }"
                                      :error-messages="errors"
                                      v-model="username"
                                      name="username"
                                      type="text"
                                      :success="valid">
                          <template #label>
                            <span class="red--text"><strong>* </strong></span>Username
                          </template>
                        </v-text-field>
                      </ValidationProvider>
                      <ValidationProvider name="Password" rules="required|min:6" mode="eager" vid="password">
                        <v-text-field slot-scope="{ errors, valid }"
                                      :error-messages="errors"
                                      v-model="password"
                                      name="password"
                                      type="password"
                                      :success="valid">
                          <template #label>
                            <span class="red--text"><strong>* </strong></span>Password
                          </template>
                        </v-text-field>
                      </ValidationProvider>
                      <ValidationProvider name="Confirm password" rules="required|confirmed:password" mode="aggressive">
                        <v-text-field slot-scope="{ errors, valid }"
                                      :error-messages="errors"
                                      v-model="confirmPassword"
                                      name="confirmPassword"
                                      type="password"
                                      :success="valid">
                          <template #label>
                            <span class="red--text"><strong>* </strong></span>Confirm password
                          </template>
                          <template slot="append">
                            <v-icon v-if="confirmPassword && valid" color="success">mdi-check</v-icon>
                            <v-icon v-if="confirmPassword && !valid" color="error">mdi-close</v-icon>
                          </template>
                        </v-text-field>
                      </ValidationProvider>
                    </v-form>
                    <v-card-actions>
                      <v-btn block @click="submitRegister" color="primary" :loading="isLoading">Sign up</v-btn>
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
import { required, email, min, confirmed } from 'vee-validate/dist/rules'
import { dispatchLogIn, dispatchRegister } from '@/store/actions'
import { readLoginError, readUserProfile } from '@/store/getters'
import { commitLoginError } from '@/store/mutations'

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

  username: string = ''
  password: string = ''
  confirmPassword: string = ''
  firstName: string = ''
  lastName: string = ''
  email: string = ''
  toolbarText: string = 'Please enter your credentials'
  isLoading: boolean = false
  activeTab: number = 0

  mounted() {
    extend('required', {
      ...required,
      message: 'Required'
    })

    extend('email', {
      ...email,
      message: 'Invalid email'
    })

    extend('min', {
      ...min,
      message: '{_field_} must be at least {length} characters long'
    })

    extend('confirmed', {
      ...confirmed,
      message: "Passwords don't match"
    })
  }

  get userFirstName() {
    const profile = readUserProfile(this.$store)
    return profile?.first_name
  }

  get loginError() {
    return readLoginError(this.$store)
  }

  set loginError(payload: string | null) {
    commitLoginError(this.$store, payload)
  }

  submitLogin() {
    this.isLoading = true
    this.loginError = null
    this.$refs.observer.validate().then(isValidated => {
      if (isValidated) {
        dispatchLogIn(this.$store, { username: this.username, password: this.password }).then(result => {
          if (!result) {
            this.isLoading = false
          } else {
            this.$toast(`Welcome, ${this.userFirstName}`)
          }
        })
      }
    })
  }

  submitRegister() {
    this.$refs.observer.validate().then(isValidated => {
      if (isValidated) {
        this.isLoading = true
        dispatchRegister(this.$store, {
          username: this.username,
          password: this.password,
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName
        }).then(result => {
          if (result.success) {
            this.$toast(result.message, { color: 'success', icon: 'mdi-check-circle', timeout: 6000 })
            this.toggleLogin()
          } else this.$toast(result.message, { color: 'error', icon: 'mdi-alert', timeout: 3000 })
          this.isLoading = false
        })
      }
    })
  }

  flush() {
    this.username = this.password = this.email = this.firstName = this.lastName = ''
  }

  toggleLogin() {
    if (this.activeTab !== 0) {
      this.flush()
      commitLoginError(this.$store, null)
      this.activeTab = 0
      this.toolbarText = 'Please enter your credentials'
    }
  }

  toggleRegister() {
    if (this.activeTab !== 1) {
      this.flush()
      this.activeTab = 1
      this.toolbarText = 'Create new account'
    }
  }
}

</script>
