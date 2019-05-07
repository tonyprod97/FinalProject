<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarToggler">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                    <router-link class="nav-link" v-if="isUserLogged" to="/home">Home <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item active">
                    <router-link class="nav-link" v-if="isUserLogged" to="/table">Table <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item active">
                    <router-link class="nav-link" v-if="isUserLogged" to="/chart">Chart <span class="sr-only">(current)</span></router-link>
                </li>
            </ul>
            <ul class="navbar-nav ">
                <li class="nav-item" v-if="!isUserLogged">
                    <router-link class="nav-link" to="/login">Login <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item" v-if="!isUserLogged">
                    <router-link class="nav-link" to="/register">Register <span class="sr-only">(current)</span></router-link>
                </li>
                <li class="nav-item" v-if="isUserLogged">
                    <div class="nav-link" v-on:click="logout">Logout <span class="sr-only">(current)</span></div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import authService from '../../services/AuthService';
import {authEmitter} from '../../main';

export default {
  name: 'app-header',
  data() {
      return ({
          isUserLogged: authService.isUserLoggedIn()
      })
  },
  created() {
      authEmitter.$on('auth_changed', val => this.isUserLogged = val)
  },
  methods: {
      logout: function() {
          authService.logout();
          this.isUserLogged = false;
          this.$router.replace('/login');
      }
  }
}
</script>

<style>
div .nav-link {
    cursor: pointer;
}
</style>
