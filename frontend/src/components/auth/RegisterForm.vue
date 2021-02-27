<template>
    <div class="form-container" @submit.prevent="submitForm">
        <h2>Register</h2>
        <p>Welcome to Book a Seat</p>
        <form>
            <div class="field-container">
                <input type="text" placeholder="Username" v-model="username" />
                <label for="username">Username</label>
            </div>
            <div class="field-container">
                <input type="text" placeholder="Password" v-model="password"/>
                <label for="password">Password</label>
            </div>
            <div class="field-container">
                <input type="text" placeholder="Repeat password" v-model="repeatPassword" />
                <label for="password">Repeat password</label>
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
                username: '',
                password: '',
                repeatPassword: ''
            }
        },
        methods: {
            submitForm() {
                //TO DO: add form validation
                userService.register(this.username, this.password).then(() => {
                    this.$router.push('/login')
                })
            }
        },
        mounted() {

        }
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

    input:placeholder-shown + label {
        opacity: 0;
        visibility: hidden;
        transform: translateY(-2.2rem);
    }

    label {
        display: block;
        font-size: 0.85rem;
        padding: 0.5rem;
        color: rgba(161, 161, 161, 0.603);
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
</style>
