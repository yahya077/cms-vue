import Builder from '@/router/core/builder';

export default function RouteBuilder(modules) {
  const routes = [];

  modules.forEach((module) => {
    const builder = new Builder(module.route.key);

    routes.push(...builder.getRoutes());
  });

  return routes;
}
