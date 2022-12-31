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
        <template>
          <v-btn
            color="primary"
            dark
            class="mb-2"
            @click="openMethod"
          >
            Create Product
          </v-btn>
        </template>
        <v-dialog v-model="dialog" max-width="500px" @click:outside="closeMethod">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ headers[0].text }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    v-for="field in fields"
                   :key= "field.name"
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      :v-if="field.component.tag === 'v-text-field'"
                      v-model="editedItem[field.name]"
                      :label="field.label"
                      :name="field.name"
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
                @click="saveMethod"
              >
                Save
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="closeMethod"
              >
                Cancel
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px" @click:outside="closeDeleteMethod">
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
    ...mapGetters(['formTitle', 'dialog', 'fields', 'headers', 'creatable', 'dialogDelete', 'editedIndex', 'editedItem', 'defaultItem']),
  },

  created() {
    this.fetchAll();
  },

  methods: {
    ...mapActions(['fetchAll', 'deleteItemConfirmMethod', 'closeMethod', 'openMethod', 'closeDeleteMethod', 'saveMethod']),
  },
};
</script>

<style scoped>

</style>
