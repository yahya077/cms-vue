export default class Builder {
  withDetail = true;

  withEdit = true;

  withCreate = true;

  withIndex = true;

  constructor(key) {
    this.key = key;
  }

  preparePrefix(type) {
    switch (type) {
      case 'edit':
        return `/:${this.key}/${type}`;
      case 'create':
        return `${this.capitalize(type)}`;
      case 'detail':
        return `/:${this.key}`;
      default:
        return '';
    }
  }

  // eslint-disable-next-line class-methods-use-this
  capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  // eslint-disable-next-line class-methods-use-this
  buildServiceRoute(type) {
    return {
      path: `/${this.key + this.preparePrefix(type)}`,
      alias: `${this.key}.${type}`,
      component: () => import(`@/components/pages/${this.key}/${this.capitalize(type)}.vue`),
      name: `${this.capitalize(this.key)}.${this.capitalize(type)}`,
      meta: {
        title: `route.${this.key}.${type}`, noCache: true, affix: true,
      },
    };
  }

  getRoutes() {
    const routes = [];
    if (this.withIndex) {
      routes.push(this.buildServiceRoute('index'));
    }
    if (this.withDetail) {
      routes.push(this.buildServiceRoute('detail'));
    }
    if (this.withCreate) {
      routes.push(this.buildServiceRoute('create'));
    }
    if (this.withEdit) {
      routes.push(this.buildServiceRoute('edit'));
    }
    return routes;
  }
}
