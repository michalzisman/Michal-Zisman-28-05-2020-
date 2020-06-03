<template>
  <v-container class="px-0">
    <ErrorPopUp v-if="error"/>
    <v-card flat>
      <v-card-text class="px-0">
        <v-autocomplete
          v-model="model"
          :items="items"
          :loading="isLoading"
          :search-input.sync="search"
          hide-no-data
          hide-selected
          item-text="Description"
          item-value="API"
          label="Public APIs"
          placeholder="Start typing to Search"
          prepend-icon="mdi-database-search"
          return-object
          @change="$emit('custom-event', 'this.model.Key')"
        ></v-autocomplete>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import ErrorPopUp from '@/components/ErrorPopUp.vue'
import { mapActions } from "vuex";


  export default {
    name: 'SearchBar',
    components: {
      ErrorPopUp
    },

    data: () => ({
      apikey: "", //TODO:; ENTER YOUR API
      entries: [],
      isLoading: false,
      model: null,
      search: null,
      error: false,
    }),

    methods:{
      ...mapActions(["setWeather"]),
    },

    computed: {
        items () {
          return this.entries.map(entry => {
              const Description = entry.AdministrativeArea.LocalizedName + ", " + entry.Country.LocalizedName
              return Object.assign({}, entry, { Description })
          })
        },
    },

    watch: {
      model (val) {
        if (val != null)
        {
          let selected = {
            cityName: val.LocalizedName,
            countryName: val.Country.LocalizedName,
            cityKey: val.Key
          }
          this.$parent.showReport(selected);
        }
        
      },
        search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        // Items have already been requested
        if (this.isLoading) return

        this.isLoading = true

        fetch('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=' + this.apikey + '%20&q=' + val)
            .then(res => res.json())
            .then(res => {
            this.count = res.length
            this.entries = res
            })
            .catch(()=> {

              this.error = !this.error;
            })
            .finally(() => (this.isLoading = false))
        },
    },
  }
</script>
