<template>
  <div class="post">
    <div v-if="isLoading" class="loading">
      Loading...
    </div>
    <div class="">
      <div class="" v-if="!isLoading">
        <div class="row border-bottom border-top p-2 bg-light">
          <div class="col-1">Sl</div>
          <div class="col-3">Product id</div>
          <div class="col-2">Product title</div>
          <div class="col-3">User Id</div>
        </div>

        <div v-for="(item, index) in productList" :key="item.id">
          <div class="row border-1 p-2">
            <div class="col-1 text-left">
              {{ index + 1 }}
            </div>
            <div class="col-3">
              {{ item.id }}
            </div>
            <div class="col-2">
              <strong class="text-danger">{{ item.title }}</strong>
            </div>
            <div class="col-3">
              <span class="badge badge-info">{{ item.userId }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProductIndex',
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    };
  },
  computed: { ...mapGetters(['productList', 'isLoading']) },
  methods: {
    ...mapActions(['fetchAllProducts']),
    getResults() {
      this.fetchAllProducts(this.query);
    },
  },
  beforeRouteEnter(to, from, next) {
    this.getResults();
    next();
  },
};
</script>

<style scoped>

</style>
