<template>
  <v-container>
    <ErrorPopUp v-if="error" />
    <SearchBar @custom-event="showReport()" ref="key" />
    <p class="headline">{{cityName}}, {{countryName}}</p>
    <p class="headline">{{temp}}&deg;C</p>
    <p class="display-5">{{currentDay}}</p>
    <p class="display-5" v-if="fav">You have this city in your favorites</p>
    <v-btn v-if="!fav" color="primary" dark v-on:click="addToFavs()">Add to Favorites</v-btn>

    <v-btn v-if="fav" color="primary" dark v-on:click="removeFromFavs()">Remove from Favorites</v-btn>

    <br />
    <br />

    <p class="text-md-center display-2">{{weatherTxt}}</p>

    <Forecast ref="forecast_comp" v-bind:nextDays="nextDays" v-bind:cityKey="weather.cityKey"/>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";

import ErrorPopUp from "@/components/ErrorPopUp.vue";
import SearchBar from "@/components/SearchBar.vue";
import Forecast from "@/components/Forecast.vue";

export default {
  name: "home",
  components: {
    SearchBar,
    ErrorPopUp,
    Forecast
  },
  computed: mapGetters(["weather","favorites"]),
  data: () => ({
    apikey: "", //TODO:; ENTER YOUR API
    cityName: "Tel Aviv",
    countryName: "Israel",
    cityKey: "215854",
    temp: "25",
    weatherTxt: "123",
    currentDay: "",
    nextDays: [],
    fav: false,
    loading: false,
    error: false,
    obj: {}
  }),

  methods: {
    ...mapActions(["setWeather", "addFavorite","removeFavorite"]),

    checkdate() {
      this.currentDay = new Date().getDay();
      if (this.currentDay == 0) {
        this.currentDay = "Sunday";
        this.nextDays = ["Sun", "Mon", "Tue", "Wed", "Thu"];
      }
      if (this.currentDay == 1) {
        this.currentDay = "Monday";
        this.nextDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
      }
      if (this.currentDay == 2) {
        this.currentDay = "Tuesday";
        this.nextDays = ["Tue", "Wed", "Thu", "Fri", "Sat"];
      }
      if (this.currentDay == 3) {
        this.currentDay = "Wednesday";
        this.nextDays = ["Wed", "Thu", "Fri", "Sat", "Sun"];
      }
      if (this.currentDay == 4) {
        this.currentDay = "Thursday";
        this.nextDays = ["Thu", "Fri", "Sat", "Sun", "Mon"];
      }
      if (this.currentDay == 5) {
        this.currentDay = "Friday";
        this.nextDays = ["Fri", "Sat", "Sun", "Mon", "Tue"];
      }
      if (this.currentDay == 6) {
        this.currentDay = "Saturday";
        this.nextDays = ["Sat", "Sun", "Mon", "Tue", "Wed"];
      }
    },

    addToFavs() {
      this.addFavorite(this.weather)
      this.fav = true;
    },

    removeFromFavs() {
      this.removeFavorite(this.weather)
      this.fav = false;
    },

    checkIfFavorite(selected) {
      if(!selected)
      {
        if (this.weather[0])selected = this.weather[0];
        else selected = this.weather
      }
      for (let i = 0; i < this.favorites.length; i++) {
        if (selected.cityKey == this.favorites[i].cityKey) {
          this.fav = true;
          break;
        } else {
          this.fav = false;
        }
      }
    },

    showReport: async function(selcted) {
      if(this.weather[0])
      {
        selcted = this.weather[0]
      }
      if (selcted) {
        this.cityKey = selcted.cityKey ;
        this.cityName = selcted.cityName;
        this.countryName = selcted.countryName;
      }
      try {
        let current = await axios.get(
          "http://dataservice.accuweather.com/currentconditions/v1/" +
            this.cityKey +
            "?apikey=" +
            this.apikey
        );
        this.temp = current.data[0].Temperature.Metric.Value;
        this.weatherTxt = current.data[0].WeatherText;
        let obj = {
          cityKey: this.cityKey,
          cityName: this.cityName,
          countryName: this.countryName,
          temp: this.temp,
          weatherTxt: this.weatherTxt,
        }
        this.setWeather(obj);
        this.checkIfFavorite(selcted);
        await this.$refs.forecast_comp.showForecast();
      } catch (err) {
        this.error = !this.error;
      }
    }
  },

  mounted: async function() {
    this.setWeather(this.weather);
    this.checkdate();
    this.showReport(this.weather);
    this.checkIfFavorite();
  }
};
</script>
