<template>
  <v-autocomplete
    :items="items"
    item-text="name"
    return-object
    clearable
    v-model="item"
  ></v-autocomplete>
</template>

<script>
export default {
  name: "Select",
  props: ["items"],
  data() {
    return {
      item: null
    };
  },
  methods: {},
  watch: {
    item(value) {
      value
        ? this.$emit("handleSelect", value)
        : this.$emit("handleSelect", null);
    }
  }
};
</script>

<style></style>
