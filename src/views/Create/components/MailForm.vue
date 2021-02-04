<template>
  <div>
    <v-form>
      <v-autocomplete
        return-object
        clearable
        v-model="optionSelect"
        :items="items"
        label="Selecione um componente.."
        item-text="name"
        solo
      ></v-autocomplete>
      <div class="justify-between">
        <v-btn color="#0062ff" @click="handleAdd" :disabled="bool">
          <v-icon style="color:#fff">mdi-plus</v-icon>
          <span style="color:#fff">Adicionar </span>
        </v-btn>
        <v-btn
          color="#0062ff"
          @click="boolDialog = true"
          :disabled="boolDownload"
          :loading="loading"
        >
          <v-icon style="color:#fff">mdi-download</v-icon>
          <span style="color:#fff">Download </span>
        </v-btn>
      </div>
    </v-form>
    <v-dialog v-model="boolDialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline"> Atenção! </v-card-title>
        <v-card-text>
          Ao fazer o download, seu arquivo será salvo na base de dados e ficará
          disponível na sessão de
          <router-link to="/emails">emails criados.</router-link>
          Certifique-se de que o email está completo antes de salva-lo.
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="boolDialog = false">
            Voltar
          </v-btn>
          <v-btn color="primary" text @click="dialogBoolTrue">
            Entendi!
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import utils from "../constants/utils";
export default {
  name: "MailForm",
  props: ["downloadBool", "loading"],
  data: () => {
    return {
      optionSelect: null,
      items: utils,
      boolDialog: false
    };
  },
  computed: {
    bool() {
      return this.optionSelect != null ? false : true;
    },
    boolDownload() {
      return this.downloadBool > 0 ? false : true;
    }
  },
  watch: {
    optionSelect(value) {
      this.$emit("handle-option-select", value);
    }
  },
  methods: {
    handleDownload() {
      this.$emit("handle-download");
    },
    handleAdd() {
      this.$emit("handle-add");
    },
    dialogBoolTrue() {
      this.boolDialog = false;
      this.handleDownload();
    }
  }
};
</script>

<style scoped>
.justify-between {
  display: flex;
  justify-content: space-between;
}
.theme--light.v-btn.v-btn--disabled.v-btn--has-bg {
  transition: ease 0.5s;
  background: #c3c3c3 !important;
}
.theme--light.v-btn.v-btn--disabled.v-btn--has-bg i {
  transition: ease 0.5s;
  color: #fff !important;
}
</style>
