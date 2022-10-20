import Builder from '@/store/core/builder';

export default function ModuleBuilder(modules) {
  const builders = [];

  modules.forEach((module) => {
    const builder = new Builder(module.store);

    builders[module.name] = builder.build();
  });

  return { ...builders };
}
