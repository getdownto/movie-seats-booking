<template>
  <div class="card">
    <div class="image">
      <img :src="url" alt="movie" />
    </div>
    <div class="additional">
      <h3>{{ title }}</h3>
      <p class="overview">
        {{ shortDescription }}
      </p>
      <div class="lower">
        <div class="info">
          <span class="info-title">User Rating</span>
          <p>{{ rating }}</p>
        </div>
        <div class="info">
          <span class="info-title">Duration</span>
          <p>{{ duration }} <span>min</span></p>
        </div>
      </div>
      <base-btn className="outline">Book</base-btn>
    </div>
  </div>
</template>

<script>
import BaseBtn from "../base/BaseBtn.vue";
export default {
  components: { BaseBtn },
  props: ["title", "url", "rating", 'startDate', 'endDate', 'duration', 'shortDescription'],
};
</script>

<style scoped>
.card {
  flex-basis: 18%;
  color: rgb(236, 236, 236);
  position: relative;
  margin: 3rem 1%;
  transition: all 0.3s ease-in;
  overflow: hidden;
  flex-shrink: 0;
  border-radius: 7px;
}

.card:hover {
  transform: scale(1.12);
}

.image {
  width: 100%;
  height: 20vw;
  margin-bottom: 1.5rem;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  border-radius: 7px;
}

.additional {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.911);
  color: #313131;
  padding: 1rem;
  position: absolute;
  left: 0;
  bottom: 0;
  left: 0;
  top: 0;
  max-height: 20vw;
    border-radius: 7px;
  transform: translateX(-101%);
  transition: all 0.3s ease-in;
}

.card:hover .additional {
  transform: translateX(0);
}

h3 {
  margin: 0.5rem 0;
  font-weight: 700;
  color: #e95d6b;
}

.overview {
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.lower {
  display: flex;
  justify-content: space-between;
  padding-top: 1.5rem;
}

button {
  margin: auto;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-basis: 50%;
  text-align: center;
  font-size: 1.3rem;
}

.info:first-child {
  border-right: 1px solid rgb(209, 209, 209);
}

.info-title {
  margin-bottom: 0.5rem;
}

.dates {
  font-size: 0.7rem;
  font-weight: 700;
}

span {
  font-size: 0.6rem;
}
</style>
