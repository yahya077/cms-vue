import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import BuildStore from './store';
import router from './router';

Vue.config.productionTip = false;
Vue.config.async = true;
let lorem;
let store;
(async function () {
  lorem = await fetch('https://api.npms.io/v2/search?q=react')
    .then(() => [
      {
        name: 'product',
        store: {
          slug: 'todos',
          indexPath: 'https://jsonplaceholder.typicode.com/todos',
          detailPagePrefix: 'http://localhost:8080/#/product/',
          emptyItemObj: {
            id: '',
            title: '',
            description: '',
            userId: 0,
          },
          filterForm: {
            title: '',
          },
          filters: [
            {
              name: 'title',
              label: 'Title',
              placeHolder: 'Enter title',
              component: {
                tag: 'v-text-field',
              },
            },
          ],
          fields: [
            {
              name: 'title',
              label: 'Title',
              placeHolder: 'Enter title',
              component: {
                tag: 'v-text-field',
              },
              showOnCreate: true,
              showOnEdit: true,
              showOnForm: true,
            },
            {
              name: 'description',
              label: 'Description',
              placeHolder: 'Enter description',
              component: {
                tag: 'v-text-field',
              },
              showOnCreate: true,
              showOnEdit: true,
              showOnForm: true,
            },
            {
              name: 'userId',
              label: 'User Id',
              placeHolder: 'Enter user id',
              component: {
                tag: 'v-text-field',
              },
              showOnCreate: true,
              showOnEdit: true,
              showOnForm: true,
            },
          ],
          create: {
            active: true,
            type: 'dialog',
            buttonText: 'Create Product',
          },
          headers: [
            {
              text: 'ID',
              align: 'start',
              value: 'id',
              endpoint: 'http://localhost:8080/#/productCreate',
            },
            {
              text: 'Title',
              value: 'title',
            },
            {
              text: 'Description',
              value: 'description',
              sortable: false,
            },
            {
              text: 'Category',
              value: 'category.title',
              sortable: false,
            },
            {
              text: 'User ID',
              value: 'userId',
            },
            {
              text: 'Actions',
              value: 'actions',
              sortable: false,
            },
          ],
          dataTableActions: [
            {
              key: 'edit',
              name: 'Edit',
              method: 'product/editMethod',
              icon: 'mdi-pencil',
            },
            {
              key: 'delete',
              name: 'Delete',
              method: 'product/deleteMethod',
              icon: 'mdi-delete',
            },
          ],
        },
        route: {
          key: 'product',
        },
      },
    ]);
  // → 🎉
  console.log(lorem);
  store = BuildStore(lorem);
  new Vue({
    router,
    vuetify,
    store,
    render: (h) => h(App),
  }).$mount('#app');
}());
