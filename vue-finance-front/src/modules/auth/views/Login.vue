<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm6 md4 lg3>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>{{ texts.toolBar }}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-if="!isLogin"
                prepend-icon="person"
                name="name"
                type="Nome"
                label="Nome"
                :error-messages="nameErrors"
                :success="!$v.user.name.$invalid"
                v-model.trim="$v.user.name.$model"
              ></v-text-field>
              <v-text-field
                prepend-icon="email"
                name="email"
                type="email"
                label="E-mail"
                :error-messages="emailErrors"
                :success="!$v.user.email.$invalid"
                v-model.trim="$v.user.email.$model"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="
                password"
                type="password"
                label="Password"
                :error-messages="passwordErrors"
                :success="!$v.user.password.$invalid"
                v-model.trim="$v.user.password.$model"
              ></v-text-field>
              <v-btn
                block
                depressed
                color="secondary"
                @click="isLogin = !isLogin"
              >{{ texts.button }}</v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" :disabled="$v.$invalid" large>{{ texts.toolBar }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
export default {
  name: "login",
  data: () => ({
    isLogin: true,
    user: {
      name: "",
      email: "",
      password: ""
    }
  }),
  validations() {
    const validations = {
      user: {
        email: {
          required,
          email
        },
        password: {
          required,
          minLength: minLength(6)
        }
      }
    };

    if (this.isLogin) {
      return validations;
    }

    return {
      user: {
        ...validations.user,
        name: {
          required,
          minLength: minLength(3)
        }
      }
    };
  },
  computed: {
    texts() {
      return this.isLogin
        ? { toolBar: "Entrar", button: "Criar Conta" }
        : { toolBar: "Criar Conta", button: "Já tenho uma conta" };
    },
    nameErrors() {
      const errors = [];
      const name = this.$v.user.name;
      if (!name.$dirty) {
        return errors;
      }
      !name.required && errors.push("name is mandatory!");
      !name.minLength && errors.push("name is invalid!");

      return errors;
    },
    emailErrors() {
      const errors = [];
      const email = this.$v.user.email;
      if (!email.$dirty) {
        return errors;
      }
      !email.required && errors.push("Email is mandatory!");
      !email.email && errors.push("Email is invalid!");

      return errors;
    },
    passwordErrors() {
      const errors = [];
      const password = this.$v.user.password;
      if (!password.$dirty) {
        return errors;
      }
      !password.required && errors.push("Password is mandatory!");
      !password.minLength && errors.push("Password is invalid!");

      return errors;
    }
  },
  methods: {
    log() {
      console.log(this.$v);
    }
  }
};
</script>

<style></style>
