<template>
  <div>
    <v-row>
      <v-col cols="12" xl="12" lg="12" md="12" sm="12" class="px-0 my-10">
        <v-carousel
          height="900"
          v-model="model"
          :hide-delimiters="true"
          @change="mountCarousel(model)"
        >
          <v-carousel-item v-for="(email, i) in emails" :key="i" :eager="true">
            <v-sheet>
              <v-row class="fill-height" align="center" justify="center">
                <div class="flex__container justify__center align__center">
                  <table
                    cellpadding="0"
                    cellspacing="0"
                    width="600"
                    ref="mail"
                  ></table>
                  <v-btn
                    @click="download(i)"
                    color="#0000BF"
                    style="color: #fff"
                    class="my-5"
                  >
                    <v-icon dark>
                      mdi-download
                    </v-icon>
                    Download
                  </v-btn>
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import mailServices from "@/services/mailServices.js";

export default {
  name: "EmailsView",
  components: {},
  data() {
    return {
      emails: [],
      model: 0
    };
  },
  methods: {
    async getMails() {
      await mailServices
        .getEmails()
        .then(response => {
          this.emails = response.data;
        })
        .catch(err => {
          console.log(err.data);
        });
    },
    mountCarousel(index) {
      this.$refs["mail"][index].innerHTML = this.emails[index].html;
    },
    download(index) {
      const file = `<html>
      <head></head>
      <body>
        <table cellpadding="0" cellspacing="0" width="600" align="center">
          ${this.emails[index].html}
        </table>
      </body>
    </html>`;
      const FileSaver = require("file-saver");
      const blob = new Blob([file], { type: "text/html;" });
      FileSaver.saveAs(blob, "index.html");
    }
  },
  created() {
    this.getMails();
  },
  mounted() {
    setTimeout(() => {
      this.mountCarousel(0);
    }, 1000);
  }
};
</script>

<style>
.flex__container {
  position: relative;
  display: flex;
  flex-flow: column;
}

.justify__center {
  justify-content: center;
}
.align__center {
  align-items: center;
}
</style>
