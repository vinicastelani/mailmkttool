<template>
  <div>
    <table cellpadding="0" cellspacing="0" width="600" ref="build"></table>
    <table cellpadding="0" cellspacing="0" width="600" ref="preview"></table>
  </div>
</template>

<script>
export default {
  name: "Preview",
  props: ["component", "componentList"],
  watch: {
    component(value) {
      this.$refs.preview.innerHTML = null;
      value ? (this.$refs.preview.innerHTML = value.html) : false;
    },
    componentList(value) {
      this.$refs.build.innerHTML = null;
      value.map(item => (this.$refs.build.innerHTML += item.html));
    }
  }
};
</script>

<style></style>
