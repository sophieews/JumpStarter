import Vuex from 'vuex';
import Vue from 'vue';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        loggedIn: false,
        token: '',
        id: ''
    },

    getters: {
        getHeaders: function(state) {
            return  {
                headers: {
                    "X-Authorization" : state.token,
                }
            }
        },
        getState: function(state) {
            return {
                "id": state.id,
                "token": state.token
            }
        }
    },

    mutations: {
        login(state, options) {
            if(state.loggedIn === false) {
                state.token = options.token;
                state.id = options.id;
                state.loggedIn = true;
            } else {
                console.log("already logged in");
            }
        },

        logout(state, options) {
            state.token = '';
            state.id = '';
            state.loggedIn = false;
        },

    }
});