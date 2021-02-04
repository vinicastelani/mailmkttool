<template>
  <v-row>
    <v-col
      v-for="(link, index) in links"
      :key="index"
      cols="12"
      xl="4"
      lg="4"
      md="4"
      sm="6"
    >
      <v-card
        class="my-4 mx-auto py-4"
        dark
        color="#282828"
        elevation="12"
        :hover="true"
        :to="link.href"
      >
        <v-card-text style="color:#fff;">
          <p class="title font-weight-light text-center my-0">
            {{ link.text }}
          </p>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "DashboardCard",
  props: ["links"],
  data() {
    return {};
  }
};
</script>

<style></style>
