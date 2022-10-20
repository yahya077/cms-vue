<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    app
    color="blue darken-3"
    dark
  >
    <v-app-bar-nav-icon
      @click.stop="dashboard.navigationDrawer.model = !dashboard.navigationDrawer.model">
    </v-app-bar-nav-icon>
    <v-toolbar-title
      style="width: 300px"
      class="ml-0 pl-4"
    >
      <span class="hidden-sm-and-down">{{ dashboard.appBar.title }}</span>
    </v-toolbar-title>
    <v-text-field
      v-if="dashboard.appBar.globalSearch.active"
      flat
      solo-inverted
      hide-details
      prepend-inner-icon="mdi-magnify"
      label="Search"
      class="hidden-sm-and-down"
    ></v-text-field>
    <v-spacer></v-spacer>
    <template v-for="(actionItem, i) in dashboard.appBar.actions">
      <v-menu :key="i" offset-y v-if="actionItem.dropdownList.length > 0">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon v-if="actionItem.iconed">{{ actionItem.pathHolder }}</v-icon>
            <v-avatar
              size="32px"
              item
              v-else
            >
              <v-img
                src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                alt="Vuetify"
              ></v-img>
            </v-avatar>
          </v-btn>
        </template>
        <v-card>
          <v-list dense>
            <v-subheader>{{ actionItem.title }}</v-subheader>
            <v-list-item-group
              v-model="actionItem.model"
              color="blue"
            >
              <v-list-item
                v-for="(dropdownListItem, i) in actionItem.dropdownList"
                :key="i"
              >
                <v-list-item-icon>
                  <v-icon v-text="dropdownListItem.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="dropdownListItem.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-menu>
      <v-btn
        :key="i"
        icon
        v-else
      >
        <v-icon v-if="actionItem.iconed">{{ actionItem.pathHolder }}</v-icon>
        <v-avatar
          size="32px"
          item
          v-else
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          ></v-img>
        </v-avatar>
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: 'CoreAppBar',
};
</script>

<style scoped>

</style>
