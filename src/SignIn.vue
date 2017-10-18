<template>
    <div class="container">

        <div class="row">
            <div class="center">
            <div class="panel panel-login col-sm-12">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-6">
                            <a v-on:click="loginForm()" class="active" id="login-form-link">Login</a>
                        </div>
                        <div class="col-xs-6">
                            <a v-on:click="registerForm()" id="register-form-link">Register</a>
                        </div>
                    </div>
                    <hr>
                </div>
                <div class="panel-body">
                    <div class="col-lg-12">
                        <form id="login-form" role="form" style="display: block;" v-on:submit.prevent>
                            <h2>Login</h2>
                            <div class="form-group">
                                <input type="text" name="username" v-model="credentials.username" tabindex="1" class="form-control" placeholder="Username" value="">
                            </div>
                            <div class="form-group">
                                <input type="password" name="password" v-model="credentials.password" tabindex="2" class="form-control" placeholder="Password">
                            </div>
                            <div class="col-xs-6 form-group pull-right">
                                <input type="submit"  v-on:click="login" tabindex="3" class="form-control btn btn-login">
                            </div>
                        </form>
                        <form id="register-form" role="form" style="display: none;"  v-on:submit.prevent>
                            <h2>Register</h2>
                            <div class="form-group">
                                <input type="text" name="username" v-model="credentials.username" tabindex="1" class="form-control" placeholder="Username" value="">
                            </div>
                            <div class="form-group">
                                <input type="email" name="email" v-model="credentials.email" tabindex="2" class="form-control" placeholder="Email" value="">
                            </div>
                            <div class="form-group">
                                <input type="text" name="location" v-model="credentials.location" tabindex="2" class="form-control" placeholder="City" value="">
                            </div>
                            <div class="form-group">
                                <input type="password" name="password" v-model="credentials.password" tabindex="3" class="form-control" placeholder="Password">
                            </div>
                            <div class="col-xs-6 form-group pull-right">
                                <input type="submit" name="login-submit"  v-on:click="register" tabindex="4" class="form-control btn btn-login" value="Register">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div>

        <div v-if="errorFlag" style="color: indianred;">
            {{ error.bodyText }}
        </div>
        <div v-if="invalidEmailError" style="color: indianred;">
            Please enter a valid email, username and password. Your location is optional
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
                invalidEmailError: false,
                credentials: {
                    username: '',
                    email: '',
                    location: '',
                    password: ''
                }
            }
        },
        mounted: function() {
        },
        computed: mapGetters({
        }),
        methods: {
            register: function() {
                const options = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                const body = {
                    "username": this.credentials.username,
                    "email": this.credentials.email,
                    "password": this.credentials.password,
                    "location": this.credentials.location
                };

                if(this.validate() === true) {
                    this.$http.post('http://csse-s365.canterbury.ac.nz:4817/api/v2/users', body, options)
                        .then(function(response) {
                            console.log(response);
                            this.login();
                        }, function(error) {
                            this.error = error;
                            this.errorFlag = true;
                        });
                } else {
                    this.invalidEmailError = true;
                }
            },
            validate: function() {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                let emailValid = re.test(this.credentials.email);
                let usernameValid = (this.username !== '');
                let passwordValid = (this.password !== '');
                return emailValid && usernameValid && passwordValid;
            },
            login: function() {
                this.$http.post('http://csse-s365.canterbury.ac.nz:4817/api/v2/users/login?username=' + this.credentials.username + '&password=' + this.credentials.password)
                    .then(function(response) {
                        this.$store.commit('login', response.body);
                        this.$router.push({name: 'projects'})
                    }, function(error) {
                        this.error = error;
                        this.errorFlag = true;
                    });
            },
            loginForm: function() {
                let login = document.getElementById("login-form");
                let register = document.getElementById("register-form");
                let loginLink = document.getElementById("login-form-link");
                let registerLink = document.getElementById("register-form-link");
                login.style.display = "block";
                register.style.display = "none";
                loginLink.classList.add("active");
                registerLink.classList.remove("active");
            },
            registerForm: function() {
                let login = document.getElementById("login-form");
                let register = document.getElementById("register-form");
                let loginLink = document.getElementById("login-form-link");
                let registerLink = document.getElementById("register-form-link");
                login.style.display = "none";
                register.style.display = "block";
                loginLink.classList.remove("active");
                registerLink.classList.add("active");
            }
        }

    }

</script>

<style>
    .panel-login {
        border-color: #ccc;
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
        font-size: 15px;
        -webkit-transition: all 0.1s linear;
        -moz-transition: all 0.1s linear;
        transition: all 0.1s linear;
        cursor: pointer;
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