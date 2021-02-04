<template>
  <v-container fluid>
    <navbar :items="items"></navbar>
    <dashboardCard :links="links"></dashboardCard>
  </v-container>
</template>

<script>
import Navbar from "../../components/Navbar";
import DashboardCard from "../../components/DashboardCard";

export default {
  name: "Home",
  components: { Navbar, DashboardCard },
  data() {
    return {
      items: [{ text: "Dashboard", disabled: true, href: "/" }],
      links: [
        { text: "Create emails", href: "/create" },
        { text: "View emails created", href: "/emails" }
      ]
    };
  }
};
</script>

<style></style>
