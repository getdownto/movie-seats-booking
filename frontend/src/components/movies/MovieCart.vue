<template>
    <div class="card">
        <div class="rating">9.7</div>
        <div class="image">
            <img src="https://image.freepik.com/free-vector/abstract-poster-template-with-elegant-landscape_1361-2207.jpg" alt="movie">
        </div>
        <h3>Movie Title</h3>
        <p class="genre">Comedy, Romance</p>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>
     .card {
         flex-basis: 18%;
         color: rgb(236, 236, 236);
         position: relative;
         margin: 3rem 1%;
     }

     .image {
         width: 100%;
         height: 23vw;
         margin-bottom: 1.5rem;
     }

     img {
        width:100%;
        height:100%;
        object-fit: cover;
        overflow: hidden;
     }

     h3 {
         margin: 0.5rem 0;
         font-weight: 400;
     }

     p {
         font-size: 0.9rem;
         color: rgba(236, 236, 236, 0.719)
     }

     .rating {
         position: absolute;
         padding: 0.3rem 1rem;
         background-color: #e95d6b;
         border-radius: 30px;
         top: -15px;
         left: 50%;
         transform: translate(-50%, 0);
     }
</style>