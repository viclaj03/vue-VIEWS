<template>
  <div>
    <div class="col-sm-12 alert alert-danger alert-dismissible">
      <span><strong>ATENCIÓN: </strong>{{ message }}</span>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        onclick="this.parentElement.remove()"
      ></button>
    </div>
  </div>
</template>

<script>

export default {
  name: "error-messages",
  props: ["message"],
  methods: {
    delMessage(index) {
      this.messages.splice(index, 1);
    },
  },
};
</script>
