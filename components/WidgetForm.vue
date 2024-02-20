<template>
  <form class="widget-form">
    <div class="widget-form__input-group">
      <label class="widget-form__label" for="input"> Введите название города </label>
      <Input id="input" v-model="cityInputValue" placeholder="Лондон, Москва, Париж..." />
    </div>
    <Preloader class="widget-form__loader" v-if="loading" />
    <div class="widget-form__result" v-else>
      <Widget v-if="data" class="widget-form__widget">
        <template #title>
          <h1 class="widget-form__widget-title">{{ cityName }}</h1>
        </template>
        <TodaysWeather :todaysWeatherData="todaysWeatherData" />
        <hr class="widget-form__widget-separator" />
        <NextDaysWeather :nextDaysWeatherData="nextDaysWeatherData" />
      </Widget>
      <NoResults v-else-if="!data && errorMessage" :message="errorMessage" />
    </div>
  </form>
</template>

<script setup lang="ts">
import { type dayWeather, type todaysWeather, type nextDayWeather } from "~/types";
import { debounce } from "~/helpers/debounce";

import Input from "./Input.vue";
import Preloader from "./Preloader.vue";
import Widget from "./Widget.vue";
import NoResults from "./NoResults.vue";

const data: Ref<object> | Ref<null> = ref(null);

const cityInputValue: Ref<string> = ref("");
const errorMessage: Ref<string> = ref("");
const loading: Ref<boolean> = ref(false);

const ERROR_MESSAGE_DEFAULT = "Кажется что-то пошло не так";
const ERROR_MESSAGE_404 = "Упс... Нет данных об этом городе";

const cityName = computed(() => data.value?.city.name);

const getIconUrl = (iconName: string): string =>
  `https://openweathermap.org/img/wn/${iconName}@2x.png`;

//Функция возвращает обЪект с данными из API, но со структурой, которую ждут компоненты
const formatForecast = (forecast: any): dayWeather => {
  const { icon: iconName } = forecast.weather[0];

  const { description: weatherDescription } = forecast.weather[0];
  const descriptionCapitalized =
    weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);

  const { temp: absTemp } = forecast.main;
  const { feels_like: feelsLike } = forecast.main;
  return {
    iconUrl: getIconUrl(iconName),
    description: descriptionCapitalized,
    temperatures: {
      absolute: Math.round(absTemp),
      feelsLike: Math.round(feelsLike),
    },
  };
};

const todaysWeatherData: ComputedRef<todaysWeather> = computed(() => {
  const todaysDate: Date = new Date();
  const firstForecastDate: Date = new Date(data.value?.list[0].dt_txt);

  const firstForecastIsToday: boolean =
    todaysDate.getDate() === firstForecastDate.getDate();

  const todaysLastForecast = data.value?.list[firstForecastIsToday ? 0 : 1];

  const { humidity: weatherHumidity } = todaysLastForecast.main;

  const { speed: windSpeed } = todaysLastForecast.wind;
  const { deg: windDeg } = todaysLastForecast.wind;

  return {
    ...formatForecast(todaysLastForecast),
    humidity: weatherHumidity,
    wind: {
      speed: windSpeed,
      deg: windDeg,
    },
  };
});

const nextDaysWeatherData: ComputedRef<nextDayWeather[]> = computed(() => {
  const AMOUNT_OF_DAYS: number = 3;
  const nextDaysForecasts = [];

  for (let i = 1; i <= AMOUNT_OF_DAYS; i++) {
    const todaysDate: Date = new Date();
    todaysDate.setDate(todaysDate.getDate() + i);
    todaysDate.setHours(12);
    const filteredForecast = data.value?.list.filter((item: any) => {
      const itemDate: Date = new Date(item.dt_txt);
      return (
        itemDate.getDate() === todaysDate.getDate() && itemDate.getHours() === todaysDate.getHours()
      );
    });

    const { dt_txt: date } = filteredForecast[0];

    const weatherData: nextDayWeather = {
      ...formatForecast(filteredForecast[0]),
      date,
    };
    nextDaysForecasts.push(weatherData);
  }
  return nextDaysForecasts;
});

const fetchData = async (city: string) => {
  try {
    data.value = null;
    loading.value = true;
    //Пришлось харкодить api key чтобы выложить в Netlify, но по правильному ключ должен приходить как переменная среда в файле .env
    const API_KEY = "e6163cdc825fff722f829273277a130c";
    const URL = `https://api.openweathermap.org/data/2.5/forecast?cnt=30&lang=ru&q=${city}&units=metric&appid=${API_KEY}`;
    const res = await fetch(URL);
    if (!res.ok) {
      const { status } = res;
      errorMessage.value = status === 404 ? ERROR_MESSAGE_404 : ERROR_MESSAGE_DEFAULT;
      throw new Error(res.statusText);
    }
    data.value = await res.json();
  } catch (error: any) {
    console.error(error.message);
  } finally {
    loading.value = false;
  }
};
watch(cityInputValue, (value) => {
  debounce(() => {
    if (!value) {
      return;
    }
    fetchData(value);
  });
});
</script>

<style scoped lang="scss">
.widget-form {
  position: relative;
  min-width: 500px;
  height: 80vh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media only screen and (max-width: 650px) {
    width: 100%;
    min-width: unset;
  }
  &__input-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  &__label {
    color: $color-primary;
  }
  &__loader {
    position: absolute;
    top: 140px;
    left: 50%;
    transform: translateX(-50%);
  }
  &__result {
    display: flex;
    justify-content: center;
  }
  &__widget {
    &-separator {
      width: 100%;
      height: 1px;
      background: $color-white;
      opacity: 0.6;
      border: none;
      margin: 10px 0;
    }
  }
}
</style>
