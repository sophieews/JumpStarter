<template>
    <div id="pledge">
        <div class="container">


            <div v-if="unauthorisedFlag == true">
                <h1 style="text-align: center;"> Please login to make a pledge!</h1>
            </div>

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
                                        <input type="text" name="amount" v-model="amount" tabindex="1" class="form-control" placeholder="Amount" >
                                    </div>
                                    <div class="form-group">
                                        <input type="text" name="cardDetails" v-model="cardDetails" tabindex="2" class="form-control" placeholder="Credit Card Details">
                                    </div>
                                    <div class="col-xs-6 form-group pull-right">
                                        <input type="submit"  v-on:click="pledge" tabindex="3" class="form-control btn btn-login">
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
                amount: 0,
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
                    "id": 3, //id of backer
                    "amount": 100000.0,
                    "anonymous": false,
                    "card": {
                        "authToken": "thisisatoken"
                    }
                };
                const options = {
                    headers: {
                        'X-Authorization': 'dfc94c3f5d5a0ec74db962c261023d75',
                        'Content-Type': 'application/json'
                    }
                };
                this.$http.post('http://localhost:4941/api/v2/projects/' + this.$route.params.id + '/pledge', body, options)
                    .then(function(response) {
                        console.log("Success")
                        console.log(response)
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
        }
    }
</script>