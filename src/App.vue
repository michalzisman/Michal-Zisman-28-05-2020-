<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <router-link to="/">
          <span class="white--text">Herolo Weather Task</span>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <router-link to="/">
        <v-tooltip v-model="showHome" bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </template>
          <span>Home</span>
        </v-tooltip>
      </router-link>

      <router-link to="/favorites">
        <v-tooltip v-model="showHeart" bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </template>
          <span>Favorites</span>
        </v-tooltip>
      </router-link>
    </v-app-bar>

    <v-content>
      <br><br>
      <router-view></router-view>
    </v-content>
    
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
    
  },

  data: () => ({
    showHome: false,
    showHeart: false,
  }),
};
</script>
