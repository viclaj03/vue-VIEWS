<template>
  <div class="row">
    <div class="col-sm-6 col-md-4 col-lg-4">
      <form id="new-prod">
        <fieldset>
          <legend id="legend-prod">{{ tipeForm() }} producto</legend>
          <!-- Aquí los inputs y botones del form -->
          <div class="form-group hide">
            <label for="newprod-id">id:</label>
            <input
              type="text"
              class="form-control"
              id="newprod-id"
              readonly
              v-model="productForm.id"
            />
          </div>
          <div class="form-group">
            <label for="newprod-name">Nombre:</label>
            <input
              type="text"
              class="form-control"
              id="newprod-name"
              required
              v-model="productForm.name"
            />
          </div>
          <div class="form-group">
            <label for="newprod-price">Precio/u.:</label>
            <input
              type="number"
              class="form-control"
              id="newprod-price"
              required
              min="0"
              step="0.01"
              v-model.number="productForm.price"
            />
          </div>
          <div class="form-group">
            <label for="newprod-name">Unidades:</label>
            <input
              type="number"
              class="form-control"
              id="newprod-units"
              required
              min="0"
              v-model.number="productForm.units"
            />
          </div>
          <button
            id="boton"
            type="submit"
            class="btn btn-default btn-primary"
            v-on:click.prevent="addProduct"
          >
            Añadir
          </button>
          <button
            type="reset"
            class="btn btn-danger"
            id="show-table"
            @click="refreshForm"
          >
            Reset
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>


<script>
import { APIService } from "../service/Api";
import { store } from "../service/store";

const api = new APIService();
export default {
  name: "form-product",
  data() {
    return {
      productForm: {},
      ifEdit: false,
    };
  },
  props: ["id"],
  methods: {
    addProduct() {
      if (this.ifEdit) {
        api
          .changeProduct(this.productForm)
          .then(() =>this.$router.push('/'))
          .catch((error) => store.addErrorMensage(error));
      } else {
        api
          .addProduct(this.productForm)
          .then(() =>this.$ruter.push('/') )
          .catch((error) => store.addErrorMensage(error));
      }
     
    },
    tipeForm() {
      if (this.ifEdit) {
        return "Editando ";
      } else {
        return "Nuevo ";
      }
    },
    refreshForm() {
      if (this.id) {
        this.ifEdit = true;
        api
          .getProduct(this.id)
          .then((response) => (this.productForm = response.data))
          .catch((error) => store.addErrorMensage(error));
      } else {
        this.productForm = [];
      }
    },
  },
  mounted() {
    if (this.id) {
      this.ifEdit = true;
      api
        .getProduct(this.id)
        .then((response) => (this.productForm = response.data))
        .catch((error) => store.addErrorMensage(error));
    }
  },
};
</script>