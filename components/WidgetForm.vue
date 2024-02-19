<template>
  <form class="widget-form">
    <div class="widget-form__input-group">
      <label class="widget-form__label" for="input"> Введите название города </label>
      <Input id="input" v-model="city" placeholder="Лондон, Москва, Париж..." />
    </div>
    <Preloader />
    <WeatherWidget />
    <NoResults message="llfsd  sdf sdf sdf" />
  </form>
</template>

<script setup lang="ts">
import Input from "./Input.vue";
import Preloader from "./Preloader.vue";
import WeatherWidget from "./WeatherWidget.vue";
import NoResults from "./NoResults.vue";

const city: Ref<string> = ref("");

watch(city, (value) => console.log(value));
</script>

<style scoped lang="scss">
.widget-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  &__input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__label {
    color: $color-primary;
  }
}
</style>
