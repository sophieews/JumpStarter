<template>
    <div id="edit">
        <div class="container">
            <h2 style="text-align: center;">Edit Project</h2>
            <div class="col-sm-12">
                <router-link :to="{ name: 'myProjects'}">
                    <a class="btn btn-primary">Back</a>
                </router-link>
            </div>

            <div class="col-sm-12 col-md-7">
                <div style="max-height: 70%; overflow: hidden">
                    <img class="img-responsive" v-bind:src="'http://csse-s365.canterbury.ac.nz:4817/api/v2/projects/' + this.$route.params.id +'/image'">
                </div>
            </div>

            <div class="col-sm-12 col-md-5">
                <form id="login-form" role="form" style="display: block;" v-on:submit.prevent>
                    <h1>{{ this.projectDetails.title }}</h1>
                    <h3>{{ this.projectDetails.subtitle }}</h3>
                    <p>{{ this.projectDetails.description }}</p>
                    <p v-if="this.projectDetails.open === true" style="color: #029f5b">Open</p>
                    <p v-if="this.projectDetails.open === false" style="color: indianred">Closed</p>
                    <div class="form-group">
                        <h5>Upload an image:</h5>
                        <input type="file" @change="setImage" accept="image/png, image/jpeg">
                    </div>
                    <div v-if="this.projectDetails.open === true">
                        <input type="checkbox" id="close" name="close" value="close"> Close project <br>
                    </div>
                    <div class="col-xs-6 form-group pull-right">
                        <input type="submit" tabindex="6" v-on:click="updateProject" class="form-control btn btn-login">
                    </div>
                </form>
            </div>

        </div>
    </div>
</template>


<script>

    import { mapGetters } from 'vuex';
    import * as moment from "moment";

    export default {

        data (){
            return {
                error: "",
                errorFlag: false,
                projectDetails: {
                    id: "",
                    title: "",
                    subtitle: "",
                    description: "",
                    imageUri: "",
                    open: ""
                },
                open: false,
                image: null
            }
        },

        mounted: function() {
            this.getProject(this.$route.params.id)
                .then(success => {
                    if(success) {
                        this.projectDetails.imageUri = this.getImage(this.projectDetails.id)
                    }
                })
        },


        computed: mapGetters({
            getState: 'getState'
        }),

        methods: {
            getProject: function() {
                this.$http.get('http://csse-s365.canterbury.ac.nz:4817/api/v2/projects/' + this.$route.params.id)
                    .then(function(response) {
                        this.projectDetails.id = response.body.id;
                        this.projectDetails.title = response.body.title;
                        this.projectDetails.subtitle = response.body.subtitle;
                        this.projectDetails.open = response.body.open;
                        this.projectDetails.imageUri = response.body.imageUri;
                        this.projectDetails.open = response.body.open;
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },

            updateStatus: function() {
                const body = {
                    "open": !document.getElementById("close").checked
                };
                this.$http.put('http://csse-s365.canterbury.ac.nz:4817/api/v2/projects/' + this.$route.params.id, body, this.$store.getters.getHeaders)
                    .then(function(response) {
                        console.log(response)
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },

            updateImage: function() {
                const imageOptions = {
                    headers: {
                        'X-Authorization': this.$store.getters.getState.token,
                        'Content-Type': this.image.type
                    }
                };
                this.$http.put('http://csse-s365.canterbury.ac.nz:4817/api/v2/projects/' + this.$route.params.id + '/image', this.image, imageOptions)
                    .then(function(response) {
                        console.log(response)
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },

            updateProject: function() {

                if(document.getElementById("close") !== null) {
                    this.updateStatus();
                }
                this.updateImage();

                this.$router.push({name: 'myProjects'})

            },

            setImage: function(event) {
                this.image = event.target.files[0]
                this.updateImage()
            },

            getImage: function (id) {
                return 'http://csse-s365.canterbury.ac.nz:4817/api/v2/projects/' + id + `/image?time=${Date.now()}`
            },
        }

    }

</script>

<style>

</style>

