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
                            <div v-for="project in filteredProjects" class="col-lg-6 col-md-6 col-sm-6 item center">
                                <div style="max-height: 70%; overflow: hidden">
                                    <router-link :to="{ name: 'project', params: { id: project.id}}" data-lightbox="photos">
                                        <img class="img-responsive" v-bind:src="'http://localhost:4941/api/v2/projects/' + project.id +'/image'">
                                    </router-link>
                                </div>
                                <h4>{{ project.title }}</h4>
                                <p>{{ project.subtitle }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data (){
            return {
                error: "",
                errorFlag: false,
                projects: [],
                input: ""
            }
        },
        mounted: function() {
            this.getProjects();
        },
        computed: {
            filteredProjects: function() {
                var self = this;
                return this.projects.filter(function(project){
                    return (project.title.toLowerCase().indexOf(self.input.toLowerCase()) >= 0 || project.subtitle.toLowerCase().indexOf(self.input.toLowerCase()) >= 0 );
                });
            }
        },
        methods: {
            getProjects: function() {
                this.$http.get('http://localhost:4941/api/v2/projects')
                    .then(function(response) {
                        this.projects = response.data;
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
        margin:13px;
        width:30%;
        height:305px;
        padding: 0px 0px 30px;
        background-color:#fefbfb;
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

</style>



















