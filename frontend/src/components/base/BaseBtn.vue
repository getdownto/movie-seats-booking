<template>
    <button v-if="!link" :class="className">
        <slot></slot>
    </button>
    <router-link v-else :to="to" :class="className">
        <slot></slot>
    </router-link>
</template>

<script>
    export default {
        props: {
          link: {
            type: Boolean,
            required: false,
            default: false
          },
          to: {
            type: String,
            required: false,
            default: '/'
          },
          className: {
            type: String,
            required: false,
            default: null
          }
        }
    }
</script>

<style scoped>
button,
a {
  text-decoration: none;
  padding: 0.5rem 2.5rem;
  font: inherit;
  background-color: #e95d6b;
  border: 2px solid #e95d6b;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  outline: none;
  text-transform: uppercase;
  font-size: 0.8rem;
  transition: all 0.3s ease;
}

a:hover,
a:active,
button:hover,
button:active {
  transform: scale(0.95);
}

.flat {
  background-color: transparent;
  color: #002d8d;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #e95d6b;
  color: #e95d6b;
  transition: all 0.3s ease;
}

.outline-blue {
  background-color: transparent;
  border-color:  rgb(37, 166, 218);
  color: rgb(37, 166, 218);
  transition: all 0.3s ease;
}

.outline-blue:hover {
color: rgb(37, 166, 218);
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active,
.outline-blue:hover,
.outline-blue:active {
  transform: scale(0.95);
}
</style>