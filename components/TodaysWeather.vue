<template>
  <div class="todays-weather">
    <div class="todays-weather__top">
      <div class="todays-weather__left">
        <div class="todays-weather__absolute-temp">{{ temperatures.absoluteTemp }}°</div>
      </div>
      <div class="todays-weather__center">
        <div class="todays-weather__icon">
          <img :src="weatherIconUrl" alt="" />
        </div>
      </div>
      <div class="todays-weather__right">
        <div class="todays-weather__description">{{ description }}</div>
        <div class="todays-weather__feels-like">
          <span>Ощущается как</span> {{ temperatures.feelsLike }}°
        </div>
      </div>
    </div>
    <div class="todays-weather__bottom">
      <div class="todays-weather__wind">
        <IconWind class="todays-weather__wind-icon" />
        {{ wind.windSpeed }} м/с
        <IconWindArrow
          class="todays-weather__wind-icon todays-weather__wind-icon--arrow"
          :style="`transform: rotate(${wind.windDeg}deg)`"
        />
      </div>
      <div class="todays-weather__humidity">
        <IconHumidity class="todays-weather__humidity-icon" />
        {{ humidity }}%
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconWind from "./icons/IconWind";
import IconWindArrow from "./icons/IconWindArrow";
import IconHumidity from "./icons/IconHumidity";

const props = defineProps({
  todaysWeatherData: Object,
});

const weatherIconUrl = computed(
  () =>
    `https://openweathermap.org/img/wn/${props.todaysWeatherData.weather[0].icon}@2x.png`
);

const temperatures = computed(() => {
  const { temp: absoluteTemp } = props.todaysWeatherData.main;
  const { feels_like: feelsLike } = props.todaysWeatherData.main;
  return {
    absoluteTemp: Math.round(absoluteTemp),
    feelsLike: Math.round(feelsLike),
  };
});

const description = computed(() => {
  const { description } = props.todaysWeatherData.weather[0];
  return description.charAt(0).toUpperCase() + description.slice(1);
});

const humidity = computed(() => props.todaysWeatherData.main.humidity);
const wind = computed(() => {
  const { speed: windSpeed } = props.todaysWeatherData.wind;
  const { deg: windDeg } = props.todaysWeatherData.wind;

  return {
    windSpeed,
    windDeg,
  };
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
