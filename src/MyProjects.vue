<template>
    <div id="myProjects">
        <div class="container">
            <h2 style="text-align: center;">Manage your projects</h2>
            <h4 style="text-align: center">Manage, update and delete your current projects</h4>

            <div v-if="empty == true" style="text-align: center">
                <h4>You don't have any projects currently active. Create a new one <a href="#">here</a>!</h4>
            </div>

            <div class="row" v-for="project in userProjects" style="margin-bottom: 20px;">
                    <div class="col-md-4">
                        <div class="img-wrapper" style="max-height:220px; max-width:400px; overflow: hidden;">
                            <img class="img-responsive" v-bind:src="'http://localhost:4941/api/v2/projects/' + project.id +'/image'">
                            <div class="edit">
                                <a href="#"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-8">
                        <h3>{{ project.title }}</h3>
                        <p>{{ project.subtitle }}</p>
                        <router-link :to="{ name: 'edit', params: { id: project.id}}">
                            <a class="btn btn-primary">Edit Project</a>
                        </router-link>
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
                empty: false,
                userProjects: []
            }
        },

        mounted: function() {
            this.getUserProjects();
        },

        computed: mapGetters({
            getState: 'getState'
        }),

        methods: {
            getUserProjects: function() {
                const state = this.getState;
                this.$http.get('http://localhost:4941/api/v2/projects?creator=' + state.id)
                    .then(function(response) {
                        this.empty = response.body.length < 1;
                        this.userProjects = response.data;
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

    .img-wrapper {
        height: 425px;
        width: 100%;
        position: relative;
        overflow:hidden;
    }
    .img-wrapper img{
        position: absolute;
        top:-100%; left:0; right: 0; bottom:-100%;
        margin: auto;

    }
    .img-wrapper:hover .edit {
        display: block;
    }

    .edit {
        padding-top: 7px;
        padding-right: 7px;
        position: absolute;
        right: 0;
        top: 0;
        display: none;
    }

    .edit a {
        color: #fff;
    }

</style>

