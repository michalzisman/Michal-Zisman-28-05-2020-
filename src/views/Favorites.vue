<template>
  <div class="favorites">
    <ErrorPopUp v-if="error"/>
    <p class="headline primary--text" v-if="noFavs" align="center"
      justify="center">
      You have no locations saved in your favorites
    </p>
    <v-item-group :key="favoritesBlock">
      <v-container>
        <v-row justify="center">
          <v-col
            v-for="favorite in favorites"
            :key="favorite.cityKey"
            cols="12"
            lg="3"
            md="4"
            sm="6"
          >
            <v-item>
              <v-card
                class="pa-5"
                height="350"
              >
                <p class="headline">
                  {{favorite.cityName}}, {{favorite.countryName}} 
                </p>
                <p class="headline">
                  {{favorite.temp}}&deg;C 
                </p>
                <br>
                <p class="display-2">
                  {{favorite.weatherTxt}}
                </p>
                <br><br><br>
                <v-btn
                  color="primary"
                  dark
                  v-on:click="seeFullForecast(favorite)"
                >
                  See full forecast
                </v-btn>
              </v-card>
            </v-item>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
import ErrorPopUp from '@/components/ErrorPopUp.vue'
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'


  export default {
    name: 'Home',
    components: {
      ErrorPopUp
    },
    computed: mapGetters(['favorites']),
    data: () => ({
      selected: [],
      noFavs: false,
      isFavs: false,
      error: false,
      favoritesBlock: 0
    }),

    methods: {

      ...mapActions(['setWeather']),

      seeFullForecast(favorite) {
        this.setWeather(favorite);
        this.$router.push('/')
      }
    },

    mounted: async function() {
      if(this.favorites.length==0){
        this.noFavs = true;
      }
    }
  }
</script>
