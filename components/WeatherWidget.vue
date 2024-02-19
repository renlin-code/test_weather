<template>
  <div class="weather-widget">
    <div class="weather-widget__title">Уфа</div>
    <TodaysWeather :todaysWeatherData="todaysWeatherData" />
    <hr class="weather-widget__separator" />
    <NextDaysWeather :weatherData="NextDaysWeatherData" />
  </div>
</template>

<script setup lang="ts">
import res from "@/mocks/res.json";

const todaysWeatherData = computed(() => {
  const todaysDate: Date = new Date();
  const firstForecastDate: Date = new Date(res.list[0].dt_txt);

  const firstForecastIsToday: boolean =
    todaysDate.getDate() === firstForecastDate.getDate();

  const todaysLastForecast = res.list[firstForecastIsToday ? 0 : 1];
  return todaysLastForecast;
});

const NextDaysWeatherData = computed(() => {
  const AMOUNT_OF_DAYS: number = 3;
  const nextDaysForecasts = [];

  for (let i = 1; i <= AMOUNT_OF_DAYS; i++) {
    const date: Date = new Date();
    date.setDate(date.getDate() + i);
    date.setHours(12);
    const filteredForecasts = res.list.filter((item) => {
      const itemDate: Date = new Date(item.dt_txt);
      return (
        itemDate.getDate() === date.getDate() && itemDate.getHours() === date.getHours()
      );
    });
    nextDaysForecasts.push(...filteredForecasts);
  }
  return nextDaysForecasts;
});
</script>

<style scoped lang="scss">
.weather-widget {
  display: inline-block;
  padding: 20px;
  background: $color-bg-gradient;
  border-radius: 10px;
  -webkit-box-shadow: 4px 4px 24px 1px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 24px 1px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 24px 1px rgba(34, 60, 80, 0.2);

  &__title {
    font-size: 20px;
    font-weight: 500;
  }
  &__separator {
    width: 100%;
    height: 1px;
    background: $color-white;
    opacity: 0.6;
    border: none;
    margin: 10px 0;
  }
}
</style>
