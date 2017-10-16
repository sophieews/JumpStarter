<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <router-link :to="{path: '/'}" class="navbar-brand">JumpStarter</router-link>
        </div>
        <ul class="nav navbar-nav">
          <li><router-link :to="{path: '/projects'}">Explore</router-link></li>
          <li v-if="$store.state.loggedIn === true"><router-link :to="{path: '/create'}">Create</router-link></li>
          <li v-if="$store.state.loggedIn === true"><router-link :to="{path: '/manage'}">My Projects</router-link></li>
          <li v-if="$store.state.loggedIn === false"><router-link :to="{path: '/signIn'}">Login</router-link></li>
          <li v-if="$store.state.loggedIn === true" v-on:click="logout"><router-link :to="{path: '/signIn'}">Logout</router-link></li>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {

    name: 'app',
    data () {
      return {
          error: "",
          errorFlag: false
      }
    },

    computed: mapGetters({
        getHeaders: 'getHeaders'
    }),

    methods: {
        logout: function() {
            const options = this.getHeaders;
            this.$http.post('http://localhost:4941/api/v2/users/logout', {}, options)
                .then(function(response) {
                    this.$store.commit('logout', response.body);
                    console.log(response);
                }, function(error) {
                    this.error = error;
                    this.errorFlag = true;
                });
        }
    }


  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
