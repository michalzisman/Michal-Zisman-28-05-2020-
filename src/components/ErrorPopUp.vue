<template>
  <v-container>
    <v-dialog
        v-model="dialog"
        width="500"
      >
        <v-card>
          <v-card-title>
            An error occurred. 
            Please try again later.
          </v-card-title>
  
          <v-divider></v-divider>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              CLOSE
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-container>
</template>

<script>
  export default {
    name: 'ErrorPopUp',

    data: () => ({
      dialog: true
    }),
  }
</script>
