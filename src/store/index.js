import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    favorites: [
      {id: 0, cityKey:"215854",cityName:"Tel Aviv",countryName:"Israel", temp: "25", weatherTxt: "hot"},
      {id: 0, cityKey:"226396",cityName:"Tokyo",countryName:"Japan", temp: "22", weatherTxt: "hot"}
    ],
    weather: [
      {cityName: "Tel Aviv", countryName: "Israel", cityKey: "215854", temp: "", weatherTxt: ""}
    ],
  },
  getters: {
    favorites: (state) => state.favorites,
    weather: (state) => state.weather,
  },
  actions: {
    addFavorite({commit}, obj) {
      commit('newFavorite', obj)
    },
    removeFavorite({commit}, obj) {
      let index = -1;
      for(let i=0;i<this.getters.favorites.length;i++){
          if(obj.cityKey==this.getters.favorites[i].cityKey){
            index = i;
          }  
      }
      commit('deleteFavorite', index)
    },
    setWeather({commit}, obj) {
      commit('setWeather', obj)
    },
  },
  mutations: {
    newFavorite: (state, favorite) => state.favorites.push(favorite),
    deleteFavorite: (state, index) => {
      state.favorites.splice(index,1)
    },
    setWeather: (state, obj) => state.weather = obj,
  },
  modules: {
  }
})


