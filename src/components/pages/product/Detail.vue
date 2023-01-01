<template>
  <div class="row">
    <div class="row">
      Deneme: ipsum
    </div>
    <div class="row">
      Other: lorem
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ProductDetail',
  data() {
    return {
      loading: false,
      post: null,
      error: null,
    };
  },
  computed: { ...mapGetters(['isLoading']) },
  methods: {
    ...mapActions([]),
  },
};
</script>

<style scoped>

</style>
