import Vue from 'vue';
import Vuex from 'vuex';
import config from '@/config';
import ModuleBuilder from '@/store/core/moduleBuilder';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: ModuleBuilder(config.modules),
});
