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
        fields: this.store.fields,
        indexPath: this.store.indexPath,
        detailPagePrefix: this.store.detailPagePrefix,
        filterFormObj: this.store.filterForm,
        filters: this.store.filters,
        dataTableActions: this.store.dataTableActions,
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
        fields: (state) => state.fields,
        indexPath: (state) => state.indexPath,
        detailPagePrefix: (state) => state.detailPagePrefix,
        filterFormObj: (state) => state.filterFormObj,
        filters: (state) => state.filters,
        dataTableActions: (state) => state.dataTableActions,
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
        getHeaders(state) {
          state.headers = this.store.headers;
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
        open(state) {
          state.dialog = true;
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
        async fetchAll({ commit, state }) {
          await client.get(state.indexPath)
            .then((response) => {
              console.log(response.data);
              commit('setModelItems', [{
                id: 1,
                title: 'this is title',
                description: 'this is description',
                category: {
                  title: 'Category Name',
                },
              }]);
            });
        },
        async filterForm({ commit, state }) {
          let filterQuery = '?';
          Object.keys(state.filterFormObj).forEach((key) => {
            filterQuery += `${key}=${state.filterFormObj[key]}`;
          });
          console.log(filterQuery);
          await client.get(state.indexPath + filterQuery)
            .then((response) => {
              console.log(response.data);
              commit('setModelItems', [{
                id: 1,
                title: 'this is title',
                description: 'this is description',
                category: {
                  title: 'Category Name',
                },
              }]);
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
        openMethod({ commit }) {
          commit('open');
        },
        getHeadersMethod({ commit }) {
          commit('getHeaders');
        },
      },
    };
  }
}
