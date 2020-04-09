<template>
  <v-content>
    <v-container fill-height>
      <v-layout row wrap justify-center>
        <v-flex xs12 sm8 md4 align-self-center>
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
                    <v-text-field @keyup.enter="submit" v-model="username" prepend-icon="mdi-account-circle"
                                  name="login"
                                  label="Username/email"
                                  type="text"></v-text-field>
                    <v-text-field @keyup.enter="submit" v-model="password" prepend-icon="mdi-lock" name="password"
                                  label="Password" id="password" type="password"></v-text-field>
                  </v-form>
                  <div v-if="loginError">
                    <v-alert :value="loginError" transition="fade-transition" type="error">
                      Incorrect credentials
                    </v-alert>
                  </div>
                  <v-card-actions>
                    <v-btn @click.prevent="submit" large color="primary">Login</v-btn>
                    <v-flex class="caption text-sm-right">
                      <router-link to="/recover-password">Forgot your password?</router-link>
                    </v-flex>
                  </v-card-actions>
                </v-card-text>
              </div>
            </v-expand-transition>
            <v-expand-transition>
              <div v-if="registerButtonClicked">
                <v-card-text>
                    <v-form>
                      <ValidationProvider name="First name">
                      <v-text-field v-model="firstName"
                                    name="firstName"
                                    label="First name"
                                    type="text"></v-text-field>
                      </ValidationProvider>
                      <v-text-field v-model="lastName" name="lastName"
                                    label="Last name"
                                    type="text"></v-text-field>
                      <v-text-field @keyup.enter="submit" v-model="email" prepend-icon="mdi-email" name="email"
                                    label="Email"
                                    type="text"></v-text-field>
                      <v-text-field @keyup.enter="submit" v-model="username" prepend-icon="mdi-account-circle"
                                    name="login"
                                    label="Username"
                                    type="text"></v-text-field>
                      <v-text-field @keyup.enter="submit" v-model="password" prepend-icon="mdi-lock" name="password"
                                    label="Password" id="password" type="password"></v-text-field>
                    </v-form>
                    <v-btn @click.prevent="submit" large color="primary">Submit</v-btn>
                </v-card-text>
              </div>
            </v-expand-transition>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script lang="ts">

import { Component, Prop, Vue } from 'vue-property-decorator'
import { ValidationProvider, ValidationObserver, setInteractionMode } from 'vee-validate'

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

  @Prop(String) username!: string
  @Prop(String) password!: string
  @Prop(String) firstName!: string
  @Prop(String) lastName!: string
  @Prop(String) email!: string
  loginButtonClicked: boolean
  registerButtonClicked: boolean
  toolbarText = 'Please enter your credentials'

  constructor() {
    super()
    setInteractionMode('eager')
    this.loginButtonClicked = true
    this.registerButtonClicked = false
  }

  get loginError(): boolean {
    return false
  }

  async submit() {
    const result = await this.$refs.observer.validate()
    if (result) await this.$router.push('/')
  }

  toggleLogin() {
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
