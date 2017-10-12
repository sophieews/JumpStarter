<template>
        <div id="project">
            <div class="container">
                <div class="col-sm-12 col-md-7">
                    <div style="max-height: 70%; overflow: hidden">
                        <img class="img-responsive" v-bind:src="'http://localhost:4941/api/v2/projects/' + this.$route.params.id +'/image'">
                    </div>
                </div>
                <div class="col-sm-12 col-md-5">
                    <h1>{{ this.projectDetails.title }}</h1>
                    <h3>{{ this.projectDetails.subtitle }}</h3>
                    <p>{{ this.projectDetails.description }}</p>
                    <p>Target: ${{ this.projectDetails.target }}</p>
                    <p>Creators:</p>
                    <div v-for="creator in this.creators">
                        <h4>{{ creator.username }}</h4>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" role="progressbar" v-bind:style="{width: calculatePercentage + '%'}" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        </div>
                    </div>
                    <p> Current Pledged: {{ this.currentPledged }}</p>
                    <p> Number of Backers: {{ this.numberOfBackers }}</p>
                    <router-link :to="{ name: 'pledge', params: { id: this.$route.params.id }}" data-lightbox="photos">
                        <button>Pledge</button>
                    </router-link>
                    <p>Rewards:</p>
                    <div v-for="reward in this.rewards">
                        <p>$ {{ reward.amount }}</p>
                        <p>{{ reward.description }}</p>
                        <p>----------------------------</p>
                    </div>
                    <p>Backers:</p>
                    <div v-for="backer in this.backers">
                        <p>$ {{ backer.username }}</p>
                        <p>{{ backer.amount }}</p>
                        <p>----------------------------</p>
                    </div>
                    <p>{{ this.projectDetails.creationDate }}</p>
                    <router-link :to="{ name: 'projects'}">Back to Projects</router-link>
                </div>
            </div>
        </div>
</template>


<script>
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
            this.getProject()
        },
        computed: {
            calculatePercentage: function() {
                var percent = (this.currentPledged/this.projectDetails.target) * 100;
                return percent;
            }
        },
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
        }
    }
</script>