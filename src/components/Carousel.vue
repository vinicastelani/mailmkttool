<template>
  <div class="container">
    <div class="flex__container">
      <span class="controller_item" @click="handleClick">&nbsp;</span>
      <v-row id="row" class="row" ref="carousel">
        <v-col
          v-for="(item, index) in items"
          :key="index"
          class="column justify__center align__center my-0"
        >
          <table cellpadding="0" cellspacing="0" ref="mail"></table>
          <v-btn
            @click="download(index), postMail(index)"
            color="#0000BF"
            style="color: #fff"
            class="my-5"
          >
            <v-icon dark>
              mdi-download
            </v-icon>
            Download
          </v-btn>
        </v-col>
      </v-row>
      <span class="controller_item" @click="handleClick">&nbsp;</span>
    </div>
    <!-- <div class="row justify__center">
      <div class="controller">
        <span
          v-for="(item, index) in items"
          :key="index"
          class="controller__action"
          @click="handleClick(index)"
          >&nbsp;</span
        >
      </div>
    </div> -->
  </div>
</template>

<script>
// import $ from "jquery";
import mailServices from "../services/mailServices";

export default {
  name: "Carousel",
  props: ["items"],
  data() {
    return {
      slices: []
    };
  },
  methods: {
    // handleClick(index) {
    //   $(".row").animate(
    //     {
    //       scrollLeft: this.slices[index].offsetLeft
    //     },
    //     1000
    //   );
    // },
    handleClick() {
      console.log("handleClick");
    },
    async getSlices() {
      await this.$nextTick();
      this.slices = Array.from(this.$refs.carousel.childNodes).map(item => {
        return {
          width: item.offsetWidth,
          offsetLeft: item.offsetLeft
        };
      });
    },
    download(index) {
      const FileSaver = require("file-saver");
      const file = document.implementation.createHTMLDocument();
      file.body.append(this.$refs["mail"][index]);
      const blob = new Blob([file.documentElement.outerHTML], {
        type: "text/plain;charset=utf-8"
      });
      FileSaver.saveAs(blob, "index.html");
    },
    async postMail(index) {
      this.loading = true;
      await mailServices
        .postMail(this.items[index])
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          console.log(err.data);
        });
      this.loading = false;
    }
  },
  watch: {
    async items(value) {
      this.getSlices();
      await this.$nextTick();
      value.map((item, index) => {
        // this.$refs["mail"][index].style.transform = "scale(0.5)";
        this.$refs["mail"][index].innerHTML = item.html;
      });
    }
  },
  mounted() {
    this.getSlices();
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-flow: column;
  max-width: 1440px;
  margin: 0 auto;
}
.row {
  display: flex;
  flex-flow: row;
  position: relative;
  overflow-x: hidden;
  width: 100%;
}
.column {
  display: flex;
  flex-flow: column;
  min-width: 100%;
  margin: 40px auto;
}
/* .controller {
  display: flex;
  justify-content: space-between;
  background: rgba(88, 88, 88, 0.7);
  margin: 40px 0;
  padding: 20px 0;
  max-height: 60px;
}
.controller__action {
  background: #fff;
  margin: 0 20px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
} */
.controller_item {
  position: absolute;
  cursor: pointer;
}
.controller_item:nth-child(1) {
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
  border-right: 30px solid #585858;
  left: 50px;
  top: 40%;
}
.controller_item:nth-child(3) {
  border-top: 50px solid transparent;
  border-bottom: 50px solid transparent;
  border-left: 30px solid #585858;
  right: 50px;
  top: 40%;
}
.justify__between {
  justify-content: space-between;
}
.justify__center {
  justify-content: center;
}
.align__center {
  align-items: center;
}
.flex__container {
  position: relative;
  display: flex;
  flex-flow: row;
}
/* table {
  transform: scale(0.5);
  transition: ease-in 0.5s;
  cursor: pointer;
}
table:hover {
  transform: scale(1);
  transition: ease-out 0.5s;
} */
</style>
