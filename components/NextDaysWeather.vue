<template>
  <div class="next-days-weather">
    <ul class="next-days-weather__list">
      <li
        v-for="day in weatherData"
        :key="day.dt"
        class="next-days-weather__item"
      >
        <div class="next-days-weather__item-title">
          {{ getDateWeekDay(day.dt_txt) }}
        </div>
        <div class="next-days-weather__item-icon">
          <img :src="getItemIconUrl(day)" alt="" />
        </div>
        <div class="next-days-weather__item-temps">
          {{ getItemTemperatures(day).absoluteTemp }}°
          <span>{{ getItemTemperatures(day).feelsLike }}°</span>
        </div>
        <div class="next-days-weather__item-description">
          {{ getItemDescription(day) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getDateWeekDay } from "@/helpers/getDateWeekDay.ts";
const props = defineProps({
  weatherData: Array,
});
const getItemIconUrl = (item) =>
  `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

console.log(props.weatherData);

const getItemTemperatures = (item) => {
  const { temp: absoluteTemp } = item.main;
  const { feels_like: feelsLike } = item.main;
  return {
    absoluteTemp: Math.round(absoluteTemp),
    feelsLike: Math.round(feelsLike),
  };
};

const getItemDescription = (item) => item.weather[0].description;
</script>

<style scoped lang="scss">
.next-days-weather {
  &__list {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-title {
      text-align: center;
      margin-bottom: 2px;
    }
    &-icon {
      width: 50px;
      height: 50px;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &-temps {
      display: flex;
      flex-direction: column;
      text-align: center;
      gap: 2px;
      font-size: 20px;
      margin-bottom: 10px;
      span {
        opacity: 0.8;
        font-size: 14px;
      }
    }
    &-description {
      font-size: 12px;
      width: min-content;
    }
  }
}
</style>
