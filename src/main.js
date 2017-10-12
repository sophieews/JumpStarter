import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import moment from "moment";
import VueMomentJS from "vue-momentjs";
import App from './App.vue';
import Home from './Home.vue';
import Projects from './Projects.vue';
import ProjectDetails from './ProjectDetails.vue';
import SignIn from './SignIn.vue';
import Pledge from './Pledge.vue';
import Manage from './Manage.vue';
import Create from './Create.vue';
import { store } from './store/store'



Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueMomentJS, moment);

const routes = [
    {
      path: '/',
        component: Home
    },
    {
      path: "/projects/:id",
        name: "project",
        component: ProjectDetails
    },
    {
      path: '/projects',
        name: "projects",
        component: Projects
    },
    {
        path: "/signIn",
        name: "signIn",
        component: SignIn
    },
    {
        path: "/projects/:id/pledge",
        name: "pledge",
        component: Pledge
    },
    {
        path: "/manage",
        name: "manage",
        component: Manage
    },
    {
        path: "/create",
        name: "create",
        component: Create
    }
];

const router = new VueRouter({
    routes: routes,
    mode: 'history'
});

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
});