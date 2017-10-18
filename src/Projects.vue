<template>
    <div>
        <div v-if="errorFlag" style="color: red;">
            {{ error }}
        </div>

        <div id="projects">
            <div class="photo-gallery">
                <div class="container">
                    <div class="intro">
                        <h2 class="text-center">Projects</h2>
                        <p>Little description here about projects and exploring....</p>
                    </div>

                    <div class="row">
                        <div class="col-sm-4">
                            <div class="dropdown" v-if="loggedIn">
                                <button class="btn btn-primary dropdown-toggle" id="menu1" type="button" data-toggle="dropdown">Filter by
                                    <span class="caret"></span></button>
                                <ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
                                    <li role="presentation"><a role="menuitem" tabindex="-1" v-on:click="getProjectsByBacker">Projects I'm Backing</a></li>
                                    <li role="presentation"><a role="menuitem" tabindex="-1" v-on:click="getProjectsByCreator">Projects I've Created</a></li>
                                    <li role="presentation"><a role="menuitem" tabindex="-1" v-on:click="getProjects">All</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-4 col-sm-offset-8">
                            <div id="imaginary_container">
                                <div class="input-group stylish-input-group">
                                    <input type="text" class="form-control" v-model="input" placeholder="Search" >
                                    <span class="input-group-addon">
                                    <button type="submit">
                                        <span class="glyphicon glyphicon-search"></span>
                                    </button>
                                </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row photos">
                        <div class="container">
                            <paginate name="projects" :list="filteredProjects" :per="6" class="paginate-list">
                                <div v-for="project in paginated('projects')" class="col-lg-6 col-md-6 col-sm-6 item center">
                                    <div style="max-height: 70%; overflow: hidden">
                                        <router-link :to="{ name: 'project', params: { id: project.id}}" data-lightbox="photos">
                                            <img class="img-responsive" v-bind:src="'http://csse-s365.canterbury.ac.nz:4817/api/v2/projects/' + project.id +'/image'">
                                        </router-link>
                                    </div>
                                    <h4>{{ project.title }}</h4>
                                    <p>{{ project.subtitle }}</p>
                                    <div v-if="creatorFlag === true">
                                        <p v-if="project.open === true" style="color: #029f5b">Open</p>
                                        <p v-else style="color: indianred">Closed</p>
                                    </div>
                                </div>
                            </paginate>
                        </div>
                        <div class="row" style="text-align: center; cursor: pointer">
                            <paginate-links for="projects" :limit="5" :show-step-links="true"></paginate-links>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>

    import { mapGetters } from 'vuex';

    export default {
        data (){
            return {
                error: "",
                errorFlag: false,
                creatorFlag: false,
                projects: [],
                input: "",
                loggedIn: false,
                paginate: ['projects']
            }
        },
        mounted: function() {
            this.getProjects();
            this.isLoggedIn();
        },
        computed: {
            filteredProjects: function() {
                var self = this;
                return this.projects.filter(function(project){
                    return (project.title.toLowerCase().indexOf(self.input.toLowerCase()) >= 0 || project.subtitle.toLowerCase().indexOf(self.input.toLowerCase()) >= 0 );
                });
            },
        },

        methods: {
            getProjects: function() {
                    this.$http.get('http://csse-s365.canterbury.ac.nz:4817/api/v2/projects?open=true')
                        .then(function(response) {
                            this.projects = response.data;
                            this.creatorFlag = false;
                        }, function(error) {
                            this.error = error;
                            this.errorFlag = true;
                        });


            },
            isLoggedIn: function() {
                this.loggedIn = this.$store.getters.getLoggedIn;
            },
            getProjectsByBacker: function() {
                const state = this.$store.getters.getState;
                this.$http.get('http://csse-s365.canterbury.ac.nz:4817/api/v2/projects?backer=' + state.id)
                    .then(function(response) {
                        this.projects = response.data;
                        this.creatorFlag = false;
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            getProjectsByCreator: function() {
                const state = this.$store.getters.getState;
                this.$http.get('http://csse-s365.canterbury.ac.nz:4817/api/v2/projects?creator=' + state.id)
                    .then(function(response) {
                        this.projects = response.data;
                        this.creatorFlag = true;
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            }

        }
    }
</script>

<style>
    p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .intro p {
        text-align: center;
    }

    h4 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        min-height: 40px;
        max-height: 40px;
    }

    .photo-gallery {
        color:#313437;
        background-color:#fff;
    }

    .photo-gallery .intro {
        font-size:16px;
        max-width:500px;
        margin:0 auto 40px;
    }

    .photo-gallery .photos {
        padding-bottom:20px;
        margin: 0px auto;
    }

    .photo-gallery .item {
        margin: 13px 5%;
        width: 90%;
        height: 305px;
        padding: 0px 0px 30px;
        background-color: #fefbfb;
    }

    @media (min-width: 576px) {
        .photo-gallery .item {
            margin: 13px 20%;
            width: 60%;
            height: 405px;
            padding: 0px 0px 30px;
            background-color: #fefbfb;
        }
    }

    @media (min-width: 768px) {
        .photo-gallery .item {
            margin:13px;
            width:45%;
            height:305px;
            padding: 0px 0px 30px;
            background-color:#fefbfb;
        }
    }

    @media (min-width: 992px) {
        .photo-gallery .item {
            margin:13px;
            width:30%;
            height:305px;
            padding: 0px 0px 30px;
            background-color:#fefbfb;
        }
    }

    .stylish-input-group .input-group-addon{
        background: white !important;
    }
    .stylish-input-group .form-control{
        border-right:0;
        box-shadow:0 0 0;
        border-color:#ccc;
    }
    .stylish-input-group button{
        border:0;
        background:transparent;
    }
    .dropdown {
        cursor: pointer
    }

</style>



















