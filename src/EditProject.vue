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
                    <img class="img-responsive" v-bind:src="'http://localhost:4941/api/v2/projects/' + this.$route.params.id +'/image'">
                </div>
            </div>

            <div class="col-sm-12 col-md-5">
                <form id="login-form" role="form" style="display: block;" v-on:submit.prevent>
                    <h1>{{ this.projectDetails.title }}</h1>
                    <input name="title" v-model="title" tabindex="1" class="form-control" placeholder="{{ this.projectDetails.title}}">
                    <h3>{{ this.projectDetails.subtitle }}</h3>
                    <p>{{ this.projectDetails.description }}</p>
                    <p>Target: ${{ this.projectDetails.target }}</p>
                    <p>Rewards:</p>
                    <div v-for="reward in this.rewards">
                        <p>$ {{ reward.amount }}</p>
                        <p>{{ reward.description }}</p>
                        <p>----------------------------</p>
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
                    creationDate: 0,
                    open: null,
                    imageUri: "",
                    target: 0
                },
                creators: [],
                rewards: [],
                currentPledged: 0,
                numberOfBackers: 0,
                backers: []
            }
        },

        mounted: function() {
            this.getProject();
        },

        computed: mapGetters({
            getState: 'getState'
        }),

        methods: {
            getProject: function() {
                this.$http.get('http://localhost:4941/api/v2/projects/' + this.$route.params.id)
                    .then(function(response) {
                        this.projectDetails.id = response.body.id;
                        this.projectDetails.title = response.body.title;
                        this.projectDetails.subtitle = response.body.subtitle;
                        this.projectDetails.description = response.body.description;
                        this.projectDetails.creationDate = moment.unix(response.body.creationDate).format('dddd MMMM Do YYYY, h:mm:ss a');
                        this.projectDetails.open = response.body.open;
                        this.projectDetails.imageUri = response.body.imageUri;
                        this.projectDetails.target = response.body.target;
                        this.currentPledged = response.body.progress.currentPledged;
                        this.numberOfBackers = response.body.progress.numberOfBackers;
                        for (var i = 0; i < response.body.creators.length; i++) {
                            this.creators.push(response.body.creators[i]);
                        }
                        for(var j = 0; j < response.body.rewards.length; j++) {
                            this.rewards.push(response.body.rewards[j]);
                        }
                        for(var k = 0; k < response.body.backers.length; k++) {
                            this.backers.push(response.body.backers[k]);
                        }
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },

            turnTextIntoInputField: function(inputId, tagType) {
                console.log(inputId);
                var inputIdWithHash = "#" + inputId;
                var elementValue = $(inputIdWithHash).text();
                $(inputIdWithHash).replaceWith('<input name="test" id="' + inputId + '" type="text" value="' + elementValue + '">');
                $(document).click(function (event) {
                    if (!$(event.target).closest(inputIdWithHash).length) {
                        $(document).unbind('click');
                        var value = $(inputIdWithHash).val();
                        console.log('<' + tagType + ' id="' + inputId + '" v-on:click="turnTextIntoInputField(\'' + inputId + '\', \'' + tagType + '\')">' + value + '<' + tagType + '/>')
                        $(inputIdWithHash).replaceWith('<' + tagType + ' id="' + inputId + '" v-on:click="turnTextIntoInputField(\'' + inputId + '\', \'' + tagType + '\')">' + value + '<' + tagType + '/>');
                    }
                });
            }
        }

    }

</script>

<style>

</style>

