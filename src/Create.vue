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
                                        <input type="text" name="username" tabindex="1" class="form-control" placeholder="Title">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="subtitle" tabindex="2" class="form-control" placeholder="Subtitle">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="description" tabindex="2" class="form-control" placeholder="Description">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="rewards" tabindex="2" class="form-control" placeholder="Rewards">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" name="target" tabindex="2" class="form-control" placeholder="Funding target">
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
                errorFlag: false
            }
        },

        mounted: function() {
        },

        computed: mapGetters({
        }),

        methods: {
//            getUserProjects: function() {
//                const state = this.getState;
//                this.$http.get('http://localhost:4941/api/v2/projects?creator=' + 1)
//                    .then(function(response) {
//                        this.empty = response.body.length < 1;
//                        this.userProjects = response.data;
//                    }, function(error) {
//                        this.error = error;
//                        this.errorFlag = true;
//                    });
//            }
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

