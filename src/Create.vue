<template>
    <div id="create">
        <div class="container">
            <div class="row">
                <div class="center">
                    <div class="panel panel-login col-sm-12 col-md-8">
                        <div class="panel-body">
                            <div class="col-sm-12">
                                <form id="login-form" role="form" style="display: block;" v-on:submit.prevent>
                                    <div class="col-sm-12">
                                        <h2>Create a new project</h2>
                                    </div>
                                    <div class="form-group col-sm-12 ">
                                        <input name="title" v-model="title" tabindex="1" class="form-control" placeholder="Title">
                                    </div>
                                    <div class="form-group col-sm-12 ">
                                        <input name="subtitle" v-model="subtitle" tabindex="2" class="form-control" placeholder="Subtitle">
                                    </div>
                                    <div class="form-group col-sm-12 ">
                                        <input name="description" v-model="description" tabindex="3" class="form-control" placeholder="Description">
                                    </div>
                                    <div class="form-group col-sm-12">
                                        <table class="table">
                                            <tbody>
                                            <tr v-for="(reward, index) in rewards">
                                                <td><input type="number" v-model="reward.amount"></td>
                                                <td><input type="text" v-model="reward.description"></td>
                                                <td>
                                                    <a v-on:click="removeElement(index);" style="cursor: pointer">Remove</a>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <div>
                                            <button class="button btn-primary" @click="addReward">Add reward</button>
                                        </div>
                                    </div>
                                    <div class="form-group col-sm-12 ">
                                        <input type="number" min="1" name="target" v-model="target" tabindex="5" class="form-control" placeholder="Funding target">
                                    </div>
                                    <div class="form-group col-sm-12 ">
                                        <h5>Upload an image:</h5>
                                        <input type="file" @change="setImage" accept="image/png, image/jpeg">
                                    </div>
                                    <div v-if="image.length > 0">
                                        <img class="preview" :src="image">
                                    </div>
                                    <div class="col-xs-6 form-group pull-right">
                                        <input type="submit" tabindex="6" v-on:click="createProject" class="form-control btn btn-login">
                                    </div>
                                    <div v-if="errorFlag" style="color: indianred; text-align: right">
                                        {{ error.bodyText }}
                                    </div>
                                    <div v-if="invalidInputFlag" style="color: indianred; text-align: right">
                                        Please enter a valid title, subtitle, description and target amount. Image and rewards are optional
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
                invalidInputFlag: false,
                title: "",
                subtitle: "",
                description: "",
                rewards: [],
                target: "",
                image: "",
                projectId: null
            }
        },

        mounted: function() {
        },

        computed: mapGetters({
            getState: 'getState'
        }),

        methods: {
            createProject: function() {
                const state = this.getState;
                const projectOptions = {
                    headers: {
                        'X-Authorization': state.token,
                        'Content-Type': 'application/json'
                    }
                };
                for(let i =0; i < this.rewards.length; i++) {
                    this.rewards[i].amount = parseInt(this.rewards[i].amount)
                }
                const projectBody = {
                    "title": this.title,
                    "subtitle": this.subtitle,
                    "description": this.description,
                    "target": parseInt(this.target) * 100,
                    "creators": [
                        {
                            "id": state.id
                        }
                    ],
                    "rewards": this.rewards
                };

                const imageOptions = {
                    headers: {
                        'X-Authorization': state.token,
                        'Content-Type': this.image.type
                    }
                };
                if(this.validateInput() === true) {
                    this.invalidInputFlag = false;
                    this.$http.post('http://csse-s365.canterbury.ac.nz:4817/api/v2/projects', projectBody, projectOptions)
                        .then(function(response) {
                            console.log("Success")
                            console.log(response)
                            if(this.image != ''){
                                this.$http.put('http://csse-s365.canterbury.ac.nz:4817/api/v2/projects/' + response.body.id + '/image' , this.image, imageOptions)
                                    .then(function(response) {
                                        console.log("Success");
                                        console.log(response)
                                    }, function(error) {
                                        this.error = error;
                                        this.errorFlag = true;
                                    });
                            }
                            this.$router.push('/projects');
                        }, function(error) {
                            this.error = error;
                            this.errorFlag = true;
                        });

                } else {
                    this.invalidInputFlag = true;
                }

            },

            validateInput: function() {
                let titleCorrect = (this.title !== '');
                let subtitleCorrect = (this.subtitle !== '');
                let descriptionCorrect = (this.description !== '');
                let targetCorrect = (parseInt(this.target) > 0);
                return titleCorrect && subtitleCorrect && descriptionCorrect && targetCorrect;
            },

            setImage: function(event) {
                this.image = event.target.files[0]
            },

            addReward: function() {
                var elem = document.createElement('tr');
                this.rewards.push({
                    amount: 0,
                    description: ""
                });
            },
            removeElement: function(index) {
                this.rewards.splice(index, 1);
            },
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
    img.preview {
        width: 200px;
        padding: 5px;
    }
</style>

