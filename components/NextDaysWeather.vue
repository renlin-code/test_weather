<template>
  <div class="next-days-weather">
    <ul class="next-days-weather__list">
      <li
        v-for="(day, index) in nextDaysWeatherData"
        :key="index"
        class="next-days-weather__item"
      >
        <div class="next-days-weather__item-title">
          {{ getDateWeekDay(day.date) }}
        </div>
        <div class="next-days-weather__item-icon">
          <img :src="day.iconUrl" alt="" />
        </div>
        <div class="next-days-weather__item-temps">
          {{ day.temperatures.absolute }}°
          <span>{{ day.temperatures.feelsLike }}°</span>
        </div>
        <div class="next-days-weather__item-description">
          {{ day.description }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { type nextDayWeather } from "~/types";
import { getDateWeekDay } from "~/helpers/getDateWeekDay";
const props = defineProps({
  nextDaysWeatherData: {
    type: Array as PropType<nextDayWeather[]>,
    default: null,
  },
});
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
      text-align: center;
    }
  }
}
</style>
