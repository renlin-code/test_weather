<template>
  <div class="todays-weather">
    <div class="todays-weather__top">
      <div class="todays-weather__left">
        <div class="todays-weather__absolute-temp">{{ todaysWeatherData.temperatures.absolute }}°</div>
      </div>
      <div class="todays-weather__center">
        <div class="todays-weather__icon">
          <img :src="todaysWeatherData.iconUrl" alt="" />
        </div>
      </div>
      <div class="todays-weather__right">
        <div class="todays-weather__description">{{ todaysWeatherData.description }}</div>
        <div class="todays-weather__feels-like">
          <span>Ощущается как</span> {{ todaysWeatherData.temperatures.feelsLike }}°
        </div>
      </div>
    </div>
    <div class="todays-weather__bottom">
      <div class="todays-weather__wind">
        <IconWind class="todays-weather__wind-icon" />
        {{ todaysWeatherData.wind.speed }} м/с
        <IconWindArrow
          class="todays-weather__wind-icon todays-weather__wind-icon--arrow"
          :style="`transform: rotate(${todaysWeatherData.wind.deg}deg)`"
        />
      </div>
      <div class="todays-weather__humidity">
        <IconHumidity class="todays-weather__humidity-icon" />
        {{ todaysWeatherData.humidity }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type todaysWeather } from "~/types";
import IconWind from "./icons/IconWind";
import IconWindArrow from "./icons/IconWindArrow";
import IconHumidity from "./icons/IconHumidity";

const props = defineProps({
  todaysWeatherData: {
    type: Object as PropType<todaysWeather>,
    default: null,
  },
});
</script>

<style scoped lang="scss">
.todays-weather {
  &__top {
    display: flex;
    margin-bottom: 4px;
  }
  &__icon {
    width: 64px;
    height: 64px;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  &__absolute-temp {
    font-size: 48px;
    line-height: 50px;
    font-weight: 500;
  }
  &__right {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-top: 4px;
    font-size: 14px;
    line-height: 20px;
  }
  &__description {
    font-weight: 500;
  }
  &__feels-like {
    span {
      opacity: 0.8;
    }
  }
  &__bottom {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  &__wind,
  &__humidity {
    display: flex;
    align-items: center;
    gap: 4px;
    &-icon {
      width: 16px;
      height: 16px;
    }
  }
  &__wind-icon--arrow {
    width: 14px;
    height: 14px;
  }
}
</style>
