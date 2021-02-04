<template>
  <v-row>
    <v-app-bar color="black accent-4" dense dark>
      <v-toolbar-title>Page title | </v-toolbar-title>
      <v-breadcrumbs :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
        <template v-slot:item="{ item }">
          <v-breadcrumbs-item :to="item.href" :disabled="item.disabled">
            {{ item.text }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </v-app-bar>
  </v-row>
</template>

<script>
export default {
  name: "Navbar",
  props: ["items"],
  data() {
    return {};
  }
};
</script>

<style scooped>
.v-breadcrumbs li a {
  color: #fff !important;
}
.v-breadcrumbs li:last-child a {
  color: #949494 !important;
}
</style>
