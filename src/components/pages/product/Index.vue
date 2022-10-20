<template>
  <div class="">
    <template>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Products</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              Create Product
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.id"
                      label="Dessert name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.title"
                      label="Calories"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.description"
                      label="Fat (g)"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.userId"
                      label="Carbs (g)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="closeMethod"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="saveMethod"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDeleteMethod">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirmMethod">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <core-datatable></core-datatable>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import CoreDatatable from '@/components/core/widgets/Datatable.vue';

const { mapGetters, mapActions } = createNamespacedHelpers('product');

export default {
  name: 'ProductIndex',
  components: { CoreDatatable },

  computed: {
    ...mapGetters(['formTitle', 'dialog', 'dialogDelete', 'editedIndex', 'editedItem', 'defaultItem']),
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
