<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xl="12" lg="12" md="12" sm="12">
        <navbar :items="items"></navbar>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" xl="3" lg="3" md="4" sm="12" class="my-6">
        <mailForm
          v-on:handle-option-select="handleOptionSelect"
          v-on:handle-download="handleDownload"
          v-on:handle-add="handleAdd"
          :downloadBool="componentList.length"
          :loading="loading"
        ></mailForm>
      </v-col>
      <v-col cols="12" xl="9" lg="8" md="8" sm="12" class="my-6" align="center">
        <mailPreview
          :component="component"
          :componentList="componentList"
        ></mailPreview>
      </v-col>
    </v-row>

    <v-dialog v-model="boolDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">
          {{
            message.type == "success"
              ? "Download concluído :)"
              : "Ops, algo de errado aconteceu :("
          }}
        </v-card-title>
        <v-card-text v-if="message.type == 'success'">
          Seu email está disponível na sessão de
          <router-link to="/emails">emails criados</router-link>.
        </v-card-text>
        <v-card-text v-if="message.type != 'success'">
          Entre em contato com os administradores para que o erro possa ser
          veríficado.
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Navbar from "../../components/Navbar";
import MailForm from "./components/MailForm";
import MailPreview from "./components/PreviewComponent";
import mailServices from "@/services/mailServices";

export default {
  name: "Creation",
  components: { Navbar, MailForm, MailPreview },
  data() {
    return {
      items: [
        { text: "Dashboard", disabled: false, href: "/" },
        { text: "Create email", disabled: true, href: "/create" }
      ],
      component: null,
      componentList: [],
      loading: false,
      boolDialog: false,
      message: {
        type: "",
        data: ""
      }
    };
  },
  methods: {
    handleOptionSelect(value) {
      this.component = value;
    },
    async handleDownload() {
      let html = "";
      await this.componentList.map(item => (html += item.html));
      const file = `<html>
       <head></head>
       <body>
         <table cellpadding="0" cellspacing="0" width="600" align="center">${html}</table>
       </body>
       </html>`;
      const FileSaver = require("file-saver");
      const blob = new Blob([file], {
        type: "text/html;"
      });
      FileSaver.saveAs(blob, "index.html");
      await this.postMail(html);
      this.boolDialog = true;
    },
    handleAdd() {
      this.componentList.push(this.component);
    },
    async postMail(param) {
      this.loading = true;
      await mailServices
        .postMail(param)
        .then(response => {
          const { type, data } = response.msg;
          this.message.type = type;
          this.message.data = data;
        })
        .catch(err => {
          console.log(err.data);
        });
      this.loading = false;
    }
  }
};
</script>

<style></style>
