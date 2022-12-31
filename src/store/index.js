import Vue from 'vue';
import Vuex from 'vuex';
import ModuleBuilder from '@/store/core/moduleBuilder';

Vue.use(Vuex);

export default function BuildStore(modules) {
  return new Vuex.Store({
    modules: ModuleBuilder(modules),
  });
}
