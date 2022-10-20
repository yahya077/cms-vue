import client from '@/plugins/client';

export default class Builder {
  store = {
    slug: '',
    headers: [],
    emptyItemObj: {},
  };

  constructor(store) {
    this.store = store;
  }

  build() {
    return {
      namespaced: true,
      state: {
        modelItems: [],
        isLoading: false,
        headers: this.store.headers,
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        formTitle: 'New Item',
        editedItem: this.store.emptyItemObj,
        defaultItem: this.store.emptyItemObj,
        slug: this.store.slug,
      },
      getters: {
        modelItemList: (state) => state.modelItems,
        isLoading: (state) => state.isLoading,
        headers: (state) => state.headers,
        dialog: (state) => state.dialog,
        dialogDelete: (state) => state.dialogDelete,
        editedIndex: (state) => state.editedIndex,
        editedItem: (state) => state.editedItem,
        defaultItem: (state) => state.defaultItem,
        formTitle: (state) => state.formTitle,
        slug: (state) => state.slug,
      },
      mutations: {
        setModelItems: (state, modelItems) => {
          state.modelItems = modelItems;
        },
        editItem(state, item) {
          state.editedIndex = state.modelItems.indexOf(item);
          state.editedItem = { ...item };
          state.dialog = true;
        },
        deleteItem(state, item) {
          state.editedIndex = state.modelItems.indexOf(item);
          state.editedItem = { ...item };
          state.dialogDelete = true;
        },
        deleteItemConfirm(state) {
          state.modelItems.splice(state.editedIndex, 1);
        },
        close(state) {
          state.dialog = false;
          state.editedItem = { ...state.defaultItem };
          state.editedIndex = -1;
        },
        formTitle(state) {
          state.formTitle = state.editedIndex === -1 ? 'New Item' : 'Edit Item';
        },
        closeDelete(state) {
          state.dialogDelete = false;
          state.editedItem = { ...state.defaultItem };
          state.editedIndex = -1;
        },
        save(state) {
          if (state.editedIndex > -1) {
            Object.assign(state.desserts[state.editedIndex], state.editedItem);
          } else {
            state.modelItems.push(state.editedItem);
          }
        },
      },
      actions: {
        async fetchAll({ commit }) {
          await client.get(`/${this.state.product.slug}/`)
            .then((response) => {
              commit('setModelItems', response.data);
            });
        },
        deleteMethod({ commit }, item) {
          commit('deleteItem', item);
        },
        editMethod({ commit }, item) {
          commit('editItem', item);
          commit('formTitle');
        },
        deleteItemConfirmMethod({ commit }) {
          commit('deleteItemConfirm');
          commit('closeDelete');
        },
        closeMethod({ commit }) {
          commit('close');
        },
        closeDeleteMethod({ commit }) {
          commit('closeDelete');
        },
        saveMethod({ commit }) {
          commit('save');
          commit('close');
        },
      },
    };
  }
}