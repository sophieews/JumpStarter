import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';
import Home from './Home.vue';
import Projects from './Projects.vue';
import ProjectDetails from './ProjectDetails.vue';
import SignIn from './SignIn.vue';
import Pledge from './Pledge.vue';
import MyProjects from './MyProjects.vue';
import EditProject from './EditProject.vue';
import Create from './Create.vue';
import { store } from './store/store'
import VuePaginate from 'vue-paginate';



Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VuePaginate);

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
        path: "/myProjects",
        name: "myProjects",
        component: MyProjects
    },
    {
        path: "/myProjects/edit",
        name: "edit",
        component: EditProject
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
