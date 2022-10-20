<template>
  <v-data-table
    :headers="headers"
    :items="modelItemList"
    sort-by="calories"
    class="elevation-1"
  >
    <template #[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editMethod(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteMethod(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="fetchAll"
      >
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapGetters, mapActions } = createNamespacedHelpers('product');

export default {
  name: 'CoreDatatable',
  computed: { ...mapGetters(['modelItemList', 'isLoading', 'headers']) },
  methods: {
    ...mapActions(['fetchAll', 'editMethod', 'deleteMethod']),
  },
};
</script>

<style scoped>

</style>
