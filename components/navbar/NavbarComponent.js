Vue.component('navbar-components', {
    template: `
    
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">AudioEnhancer</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <span class="navbar-nav mr-auto">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </span>
                <span class="form-inline my-2 my-lg-0">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <a class="nav-link" data-toggle="modal" data-target="#modal-login" v-if="!islogin">Login <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link" data-toggle="modal" data-target="#modal-register" v-if="!islogin">Register <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item active">
                            <a class="nav-link"  v-if="islogin" v-on:click="logout">Sign out <span class="sr-only">(current)</span></a>
                        </li>
                    </ul>
                </span>
            </div>
        </nav>


        <!-- login-modal -->
        <div class="modal fade" id="modal-login" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control" name="email" aria-describedby="emailHelp"
                                    placeholder="Enter email" v-model="inputEmailLogin">
                            </div>

                            <div class="form-group">
                                <label for="password">Password</label>
                                <input type="password" class="form-control" name="password" placeholder="Password"
                                    v-model="inputPasswordLogin">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click="login">Login</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- register-modal -->
        <div class="modal fade" id="modal-register" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="email">Name</label>
                                <input type="text" class="form-control" placeholder="Enter name" v-model="inputNameRegister">
                            </div>

                            <div class="form-group">
                                <label for="password">Email</label>
                                <input type="email" class="form-control" placeholder="Password" v-model="inputEmailRegister">
                            </div>

                            <div class="form-group">
                                <label for="email">Password</label>
                                <input type="password" class="form-control" placeholder="Enter email" v-model="inputPasswordRegister">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" @click="register">Register</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,

    data: function () {
        return {
            islogin: false,
            inputEmailLogin: '',
            inputPasswordLogin: '',

            inputNameRegister: '',
            inputEmailRegister: '',
            inputPasswordRegister: ''
        }
    },
    created() {
        if (localStorage.access_token) {;
            this.islogin = true;
            this.$emit('is-login', this.islogin);
        }
    },
    methods: {
        login: function () {
            axios({
                method: 'POST',
                url: 'http://localhost:3000/users/login',
                data: {
                    email: this.inputEmailLogin,
                    password: this.inputPasswordLogin
                }
            }).then((result) => {
                localStorage.access_token = result.data.token;
                this.islogin = true;
                this.$emit('is-login', this.islogin);
            }).catch((err) => {
                console.log(err);
            });
        },
        register: function () {
            let data = {
                name: this.inputNameRegister,
                email: this.inputEmailRegister,
                password: this.inputPasswordRegister
            }

            axios({
                method: 'POST',
                url: 'http://localhost:3000/users/register',
                data
            }).then((result) => {
                console.log(result.data);
            }).catch((err) => {
                console.log(err.response);
            });

        },
        logout: function () {
            localStorage.clear();
            this.islogin = false;
            this.$emit('is-login', this.islogin);
        }
    }
})