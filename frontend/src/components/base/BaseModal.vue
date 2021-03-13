<template>
    <div class="backdrop" @click="closeModal">
        <div class="modal">
            <div class="close" @click="closeModal"></div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            closeModal() {
                this.$emit('closeModal')
            }
        }
    }
</script>

<style scoped>
.backdrop {
    width: 100%;
    height: 100%;
    z-index: 100;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5) ;
}

.modal {
    position: fixed;
    z-index: 500;
    background-color: white;
    min-width: 40%;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.329);
    padding: 2rem 4rem;
    left: 30%;
    top: 25%;
    /* transition: all 0.3s ease-out;
    transform: translateY(-100vh);
    opacity: 0;
    animation-name: falling;
    animation-duration: 0.3s; */
}

.close:after{
        display: block;
        float: right;
        content: "\00d7"; /* This will render the 'X' */
        cursor: pointer;
}


/* @keyframes falling {
    from {transform: translateY(-100vh); opacity: 0;}
    to {transform: translateY(0); opacity: 1;}
  } */
</style>