<template>
  <div class="background">
    <v-container fluid>
      <navbar :items="items"></navbar>
      <emailsView></emailsView>
    </v-container>
  </div>
</template>

<script>
import Navbar from "../../components/Navbar";
import EmailsView from "./components/EmailsView";

export default {
  name: "Emails",
  components: { Navbar, EmailsView },
  data() {
    return {
      items: [
        { text: "Dashboard", disabled: false, href: "/" },
        { text: "Emails", disabled: true, href: "/emails" }
      ]
    };
  }
};
</script>
<style>
.background {
  background: #1e1e1e;
  height: 100%;
}
</style>
