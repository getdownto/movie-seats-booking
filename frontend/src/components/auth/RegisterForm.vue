<template>
    <div class="form-container" @submit.prevent="validateForm">
        <h2>Register</h2>
        <p>Welcome to Book a Seat</p>
        <form>
            <div class="field-container">
                <input
                    type="text"
                    placeholder="Username"
                    v-model="username"
                    :class="{ invalid: invalid && errors.username.length > 0 }"
                    @blur="validateUsername"
                />
                <label for="username">Username</label>
                <p v-if="invalid && errors.username.length > 0" class="error">
                    {{ errors.username[0] }}
                </p>
            </div>
            <div class="field-container">
                <input
                    type="text"
                    placeholder="Password"
                    v-model="password"
                    :class="{ invalid: invalid && errors.password.length > 0 }"
                    @blur="validatePassword"
                />
                <label for="password">Password</label>
                <p v-if="invalid && errors.password.length > 0" class="error">
                    {{ errors.password[0] }}
                </p>
            </div>
            <div class="field-container">
                <input
                    type="text"
                    placeholder="Repeat password"
                    v-model="repeatPassword"
                    :class="{
                        invalid: invalid && errors.repeatPassword.length > 0,
                    }"
                    @blur="validateRepeat"
                />
                <label for="password">Repeat password</label>
                <p
                    v-if="invalid && errors.repeatPassword.length > 0"
                    class="error"
                >
                    {{ errors.repeatPassword[0] }}
                </p>
            </div>
            <base-btn>Register</base-btn>
            <router-link to="/login"
                >Already have an account yet?
                <span>Login here.</span></router-link
            >
        </form>
    </div>
</template>

<script>
    import userService from "../../services/user-service";

    export default {
        data() {
            return {
                username: "",
                password: "",
                repeatPassword: "",
                errors: {
                    username: [],
                    password: [],
                    repeatPassword: [],
                },
                invalid: false,
            };
        },
        methods: {
            submitForm() {
                if (!this.invalid) {
                    userService
                        .register(this.username, this.password)
                        .then(() => {
                            this.$router.push("/login");
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            },
            validateUsername() {
                this.invalid = false;
                this.errors.username = [];
                if (this.username === "") {
                    this.errors["username"].push("Username is required!");
                    this.invalid = true;
                }
            },
            validatePassword() {
                this.invalid = false;
                this.errors.password = [];
                if (this.password === "") {
                    this.errors["password"].push("Password is required!");
                    this.invalid = true;
                }
                if (this.password.length < 3) {
                    this.errors["password"].push(
                        "Password should be at least 3 characters long!"
                    );
                    this.invalid = true;
                }
            },
            validateRepeat() {
                this.invalid = false;
                this.errors.repeatPassword = [];

                if (this.repeatPassword === "") {
                    this.errors["repeatPassword"].push("Password is required!");
                    this.invalid = true;
                }
                if (this.password !== this.repeatPassword) {
                    this.errors["repeatPassword"].push(
                        "Passwords don't match!"
                    );
                    this.invalid = true;
                }
            },
            validateForm() {
                this.invalid = false;
                this.validateUsername()
                this.validatePassword()
                this.validateRepeat()
                this.submitForm();
            },
        },
        mounted() {},
    };
</script>

<style scoped>
    .form-container {
        background-color: rgba(104, 104, 104, 0.178);
        padding: 1.5rem;
        max-width: 40%;
        margin: 3rem auto;
        border-radius: 30px;
        text-align: center;
        color: rgb(241, 241, 241);
    }

    p {
        color: rgb(104, 104, 104);
        margin-top: 1rem;
    }

    form {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        text-align: left;
    }

    .field-container {
        display: flex;
        flex-direction: column;
        margin: 1rem;
    }

    button {
        margin-top: 2rem;
    }

    input {
        background-color: transparent;
        border: none;
        border-bottom: 2px solid #414141;
        font-family: inherit;
        color: #fff;
        padding: 0.5rem;
        outline: none;
        width: 100%;
        transition: all 0.3s;
    }

    input:focus {
        border-bottom: 2px solid #e95d6b;
    }

    input:focus:invalid {
        border-bottom: 3px solid #e00202;
    }

    input::placeholder {
        color: rgba(228, 228, 228, 0.603);
    }

    input:placeholder-shown + label {
        opacity: 0;
        visibility: hidden;
        transform: translateY(-2.2rem);
    }

    label {
        display: block;
        font-size: 0.85rem;
        padding: 0.5rem;
        color: rgba(228, 228, 228, 0.603);
        transition: all 0.3s;
        transform: translateY(-4rem);
    }

    a {
        margin-top: 1rem;
        color: #fff;
        text-decoration: none;
        font-size: 0.9rem;
        text-align: center;
    }

    span {
        color: #e95d6b;
        margin-left: 0.3rem;
    }

    .invalid,
    input:focus.invalid {
        border-bottom: 3px solid #ad033c;
        color: #ad033c;
    }

    .invalid + label {
        color: #ad033c;
    }

    .error {
        color: #ad033c;
        font-style: italic;
        font-size: 0.8rem;
        margin-top: -1.5rem;
    }
</style>
