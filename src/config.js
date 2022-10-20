module.exports = {
  modules: [
    {
      name: 'product',
      store: {
        slug: 'todos',
        emptyItemObj: {
          id: '',
          title: '',
          description: '',
          userId: 0,
        },
        headers: [
          {
            text: 'ID',
            align: 'start',
            value: 'id',
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
            text: 'User ID',
            value: 'userId',
          },
          {
            text: 'Actions',
            value: 'actions',
            sortable: false,
          },
        ],
      },
      route: {
        key: 'product',
      },
    },
  ],
};
