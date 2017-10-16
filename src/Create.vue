<template>
    <div id="create">
        <div class="container">
            <div class="row">
                <div class="center">
                    <div class="panel panel-login col-sm-12">
                        <div class="panel-body">
                            <div class="col-lg-12">
                                <form id="login-form" role="form" style="display: block;" v-on:submit.prevent>
                                    <h2>Create a new project</h2>
                                    <div class="form-group">
                                        <input name="username" v-model="username" tabindex="1" class="form-control" placeholder="Title">
                                    </div>
                                    <div class="form-group">
                                        <input name="subtitle" v-model="subtitle" tabindex="2" class="form-control" placeholder="Subtitle">
                                    </div>
                                    <div class="form-group">
                                        <input name="description" v-model="description" tabindex="3" class="form-control" placeholder="Description">
                                    </div>
                                    <div class="form-group">
                                        <input name="rewards" v-model="rewards" tabindex="4" class="form-control" placeholder="Rewards">
                                    </div>
                                    <div class="form-group">
                                        <input name="target" v-model="target" tabindex="5" class="form-control" placeholder="Funding target">
                                    </div>
                                    <div class="form-group">
                                        <input type="file" name="filename" v-model="image" tabindex="6" class="form-control" accept="image/jpeg, image/png">
                                    </div>
                                    <div class="col-xs-6 form-group pull-right">
                                        <input type="submit" tabindex="3" class="form-control btn btn-login">
                                    </div>
                                </form>
                            </div>
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
                title: "",
                subtitle: "",
                description: "",
                rewards: "",
                target: ""
            }
        },

        mounted: function() {
        },

        computed: mapGetters({
        }),

        methods: {
            createProject: function() {
                const options = {
                    headers: {
                        'X-Authorization': 'dfc94c3f5d5a0ec74db962c261023d75',
                        'Content-Type': 'application/json'
                    }
                };
                const body = {
                    "title": "project a",
                    "subtitle": "project subtitle",
                    "description": "project description",
                    "target": 10000,
                    "creators": [
                        {
                            "id": 3
                        }
                    ],
                    "rewards": [
                        {
                            "amount": 10,
                            "description": "reward description and stuff"
                        }
                    ]
                }

                this.$http.post('http://localhost:4941/api/v2/projects', body, options)
                    .then(function(response) {
                        console.log("Success")
                        console.log(response)
                    }, function(error) {
//                        if(error.status === 401) {
//                            this.unauthorisedFlag = true;
//                            this.forbiddenFlag = false;
//                        }
//                        if(error.status === 403) {
//                            this.forbiddenFlag = true;
//                            this.unauthorisedFlag = false;
//                        }
                        this.error = error;
                    });
            }
        }

    }

</script>

<style>
    .panel-login {
        border-color: #fff;
        -webkit-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
        -moz-box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
        box-shadow: 0px 2px 3px 0px rgba(0,0,0,0.2);
    }
    .panel-login .panel-heading {
        color: #00415d;
        background-color: #fff;
        border-color: #fff;
        text-align:center;
    }
    .panel-login .panel-heading a{
        text-decoration: none;
        color: #666;
        font-weight: bold;
        margin-bottom: 20px;
        font-size: 15px;
        -webkit-transition: all 0.1s linear;
        -moz-transition: all 0.1s linear;
        transition: all 0.1s linear;
    }
    .panel-login .panel-heading a.active{
        color: #029f5b;
        font-size: 18px;
    }
    .center {
        margin: 0 auto;
        width: 80%;
    }

</style>

