<template>
  <v-item-group>
      <v-container>
        <v-row justify="center">
          <v-col
            v-for="forecast in forecasts"
            :key="forecast.id" 
            cols="12"
            lg="2"
            md="4"
            sm="6"
          >
            <v-item>
              <v-card
                class="pa-5"
                height="350"
              >
                <v-card-text>
                    <p class="text-md-center headline">
                        {{forecast.day}} 
                    </p>
                    <p class="text-md-center headline">
                        Max: {{forecast.maxTemp}}&deg;C 
                    </p>
                    <p class="text-md-center headline">
                        Min: {{forecast.minTemp}}&deg;C 
                    </p>
                </v-card-text>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
</template>

<script>
import axios from 'axios';

  export default {
    name: 'Forecast',
    props: ['cityKey', 'nextDays'],
    data: () => ({
      apikey: "", //TODO:; ENTER YOUR API
      forecasts: [],
      currentCityKey:"215854"//TEL AVIV default
    }),

    methods: {
      showForecast: async function() {
        if(this.cityKey){
          this.currentCityKey=this.cityKey;
        }
        this.forecasts=[];

        try {
          let response = await axios.get("http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + this.currentCityKey + "?apikey=" + this.apikey +"&metric=true");
          const forecastWeather = response.data.DailyForecasts;
          for (let i=0; i<forecastWeather.length; i++)
          {
              let obj = {};
              obj.id = i;
              obj.day = this.nextDays[i];
              obj.maxTemp = forecastWeather[i].Temperature.Maximum.Value;
              obj.minTemp = forecastWeather[i].Temperature.Minimum.Value;
              this.forecasts.push(obj);
          }
        }
        catch(err)
        {
            this.error = !this.error;
        }
      }
    },

    mounted: async function () {

      this.showForecast()
        
    }
  }
</script>