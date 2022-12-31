<template>
  <v-data-table
    :headers="headers"
    :items="modelItemList"
    sort-by="calories"
    class="elevation-1"
  >
    <template #[`item.actions`]="{ item }">
      <v-icon
        :key="dataTableAction.key" v-for="dataTableAction in dataTableActions"
        small
        class="mr-2"
        @click="callMethod(dataTableAction.method, item)"
      >
        {{ dataTableAction.icon }}
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
  computed: { ...mapGetters(['modelItemList', 'headers', 'dataTableActions', 'isLoading', 'headers']) },
  methods: {
    ...mapActions(['fetchAll', 'editMethod', 'deleteMethod']),
    callMethod(functionName, event) {
      this.$store.dispatch(functionName, event);
    },
  },
};
</script>

<style scoped>

</style>
