<template>
    <div id="pledge">
        <div class="container">




            <div class="row">
                <div class="center">
                    <div class="panel panel-login col-sm-12">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-6">
                                    <h2 class="active" id="">Pledge</h2>
                                </div>
                            </div>
                            <hr>
                        </div>
                        <div class="panel-body">
                            <div class="col-lg-12">
                                <form id="pledge-form" role="form" style="display: block;" v-on:submit.prevent>
                                    <div class="form-group">
                                        <input type="number" min="1" name="amount" v-model="amount" tabindex="1" class="form-control" placeholder="Amount">
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="cardDetails" v-model="cardDetails" tabindex="2" class="form-control" placeholder="Credit Card Details">
                                    </div>
                                    <input type="checkbox" v-model="anonymous" id="anonymous" name="anonymous" value="anonymous"> Anonymous <br>
                                    <div v-if="unauthorisedFlag == true">
                                        <p style="color: indianred;"> Please login to make a pledge!</p>
                                    </div>
                                    <div v-if="forbiddenFlag == true">
                                        <p style="color: indianred;"> Sorry, you cannot pledge to your own project OR this project is no longer open to pledges</p>
                                    </div>
                                    <div class="col-xs-6 form-group pull-left">
                                        <input type="submit" value="Cancel" v-on:click="cancel" tabindex="3" class="form-control btn btn-cancel">
                                    </div>
                                    <div class="col-xs-6 form-group pull-right">
                                        <input type="submit"  v-on:click="pledge" tabindex="4" class="form-control btn btn-login">
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
                unauthorisedFlag: false,
                forbiddenFlag: false,
                amount: "",
                anonymous: false,
                cardDetails: ""
            }
        },
        mounted: function() {
        },

        computed: mapGetters({
            getState: 'getState'
        }),

        methods: {
            pledge: function() {
                const body = {
                    "id": this.$store.getters.getState.id, //id of backer
                    "amount": parseInt(this.amount),
                    "anonymous": this.anonymous,
                    "card": {
                        "authToken": "thisisatoken"
                    }
                };
                const options = {
                    headers: {
                        'X-Authorization': this.$store.getters.getState.token,
                        'Content-Type': 'application/json'
                    }
                };
                this.$http.post('http://csse-s365.canterbury.ac.nz:4817/api/v2/projects/' + this.$route.params.id + '/pledge', body, options)
                    .then(function(response) {
                        console.log("Success")
                        console.log(response)
                        history.go(-1);
                    }, function(error) {
                        if(error.status === 401) {
                            this.unauthorisedFlag = true;
                            this.forbiddenFlag = false;
                        }
                        if(error.status === 403) {
                            this.forbiddenFlag = true;
                            this.unauthorisedFlag = false;
                        }
                        this.error = error;
                    });
            },
            cancel: function() {
                history.go(-1);
            }
        }
    }
</script>
