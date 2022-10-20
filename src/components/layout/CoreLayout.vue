<template>
  <div class="v-application--wrap">
    <v-navigation-drawer
      v-model="dashboard.navigationDrawer.model"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in dashboard.navigationDrawer.lists">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children.length > 0"
            :key="item.title"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.title"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }} sdsds
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
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
    <CoreBody></CoreBody>
    <v-btn
      bottom
      color="pink"
      dark
      fab
      fixed
      right
      @click="dialog = !dialog"
    >
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog
      v-model="dashboard.interActiveDialogModel"
      width="800px"
    >
      <v-card>
        <v-card-title class="grey darken-2">
          Create contact
        </v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col
              class="align-center justify-space-between"
              cols="12"
            >
              <v-row
                align="center"
                class="mr-0"
              >
                <v-avatar
                  size="40px"
                  class="mx-3"
                >
                  <img
                    src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                    alt=""
                  >
                </v-avatar>
                <v-text-field
                  placeholder="Name"
                ></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field
                prepend-icon="mdi-account-card-details-outline"
                placeholder="Company"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                placeholder="Job title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-mail"
                placeholder="Email"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="tel"
                prepend-icon="mdi-phone"
                placeholder="(000) 000 - 0000"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                prepend-icon="mdi-text"
                placeholder="Notes"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn
            text
            color="primary"
          >More
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="dialog = false"
          >Cancel
          </v-btn>
          <v-btn
            text
            @click="dialog = false"
          >Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import CoreBody from '@/components/layout/CoreBody.vue';

export default {
  name: 'CoreLayout',
  components: { CoreBody },
  data: () => ({
    dashboard: {
      appBar: {
        title: 'Cms Panel',
        globalSearch: {
          active: true,
          endPoint: 'https://google.com',
        },
        actions: [
          {
            title: 'Notifications',
            iconed: true,
            pathHolder: 'mdi-bell',
            model: false,
            dropdownList: [
              {
                title: 'Dropdown item',
                icon: 'mdi-content-copy',
                listModel: false,
              },
            ],
          },
          {
            iconed: false,
            pathHolder: 'https://cdn.vuetifyjs.com/images/logos/logo.svg',
            model: false,
            dropdownList: [],
          },
          {
            iconed: true,
            pathHolder: 'mdi-history',
            model: false,
            dropdownList: [],
          },
        ],
      },
      interActiveDialogModel: false,
      navigationDrawer: {
        model: null,
        lists: [
          {
            title: 'List 01',
            icon: 'mdi-chevron-up',
            'icon-alt': 'mdi-chevron-down',
            model: false,
            children: [
              {
                title: 'List inner 01',
                icon: 'mdi-history',
                model: true,
                children: [],
              },
              {
                title: 'List inner 02',
                icon: 'mdi-content-copy',
                model: true,
                children: [],
              },
            ],
          },
          {
            title: 'List 02',
            icon: 'mdi-cog',
            model: true,
            children: [],
          },
          {
            title: 'List 03',
            icon: 'mdi-chevron-up',
            'icon-alt': 'mdi-chevron-down',
            model: false,
            children: [
              {
                title: 'List inner 03',
                icon: 'mdi-cog',
                model: true,
                children: [],
              },
              {
                title: 'List inner 04',
                icon: 'mdi-cog',
                model: true,
                children: [],
              },
            ],
          },
          {
            title: 'List 04',
            icon: 'mdi-message',
            model: true,
            children: [],
          },
        ],
      },
    },
  }),
  props: {
    source: String,
  },
};
</script>

<style scoped>
button {
  background: transparent !important;
}
</style>
