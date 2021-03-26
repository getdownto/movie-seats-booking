<template>
    <div class="not-found">
        <h3>PAGE NOT FOUND</h3>
        <h1 class="heading">404</h1>
        <base-btn link to="/" className="outline">Back to home</base-btn>
    </div>
</template>

<script>
    export default {};
</script>

<style scoped>
    .not-found {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 70vh;
        color: rgb(51, 49, 82);
    }

    .heading {
        font-size: 30vh;
        font-weight: 700;
    }

    a {
        margin-top: 2rem;
    }
</style>
