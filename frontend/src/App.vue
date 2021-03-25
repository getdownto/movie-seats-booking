<template>
    <main-header></main-header>
    <router-view></router-view>
    <footer-el></footer-el>
</template>

<script>
    import FooterEl from "./components/layout/FooterEl.vue";
    import MainHeader from "./components/layout/MainHeader.vue";

    export default {
        name: "App",
        components: {
            MainHeader,
            FooterEl,
        },
        methods: {
            getAuth() {
                this.$store.dispatch("verify").then(() => {
                    //console.log(this.$store.state, "in verify in App.js");
                });
            },
        },
        // beforeMount() {
        //     this.getAuth()
        //     console.log('BM');
        // },
        created() {
            this.getAuth()
            //console.log('C');
        },
        updated() {
            this.getAuth()
            //console.log('U');
        },
    };
</script>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap");
    @import url("https://use.fontawesome.com/releases/v5.13.0/css/all.css");

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: "Lato", sans-serif;
        font-size: 16px;
        background-color: #0e193a;
    }
</style>
