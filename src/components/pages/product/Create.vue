<template>
  <v-container>
    Product Create Show Page (You can show form here)
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('product');

export default {
  name: 'ProductCreate',

  computed: {
    ...mapGetters(['formTitle', 'dialog', 'headers', 'creatable', 'dialogDelete', 'editedIndex', 'editedItem', 'defaultItem']),
  },

  created() {
    this.fetchAll();
  },

  methods: {
    ...mapActions(['fetchAll', 'deleteItemConfirmMethod', 'closeMethod', 'closeDeleteMethod', 'saveMethod']),
  },
};
</script>

<style scoped>

</style>
