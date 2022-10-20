import Vue from 'vue';
import VueRouter from 'vue-router';
import CoreLayout from '@/components/layout/CoreLayout.vue';
import config from '@/config';
import RouteBuilder from '@/router/core/routeBuilder';

Vue.use(VueRouter);

const configRoutes = RouteBuilder(config.modules);

const routes = [
  {
    path: '/',
    component: CoreLayout,
    children: [
      {
        path: '/dashboard',
        alias: '/',
        component: () => import('@/components/pages/dashboard/Dashboard.vue'),
        name: 'Dashboard',
        meta: {
          title: 'route.dashboard', icon: 'mdi-view-dashboard', noCache: true, affix: true,
        },
      },
      ...configRoutes,
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
