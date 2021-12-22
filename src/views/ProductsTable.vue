<template>
  <div class="row">
    <div class="col-sm-12 col-md-12 col-lg-12" id="almacen">
      <table class="table table-striped table-hover">
        <thead class="thead-dark bg-light">
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Uds.</th>
            <th>Precio/u</th>
            <th>Importe</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <product-row
            @up-down="upDown"
            @delete-product="deleteProduct(key)"
            v-for="(product, key) in products"
            :key="key"
            :product="product"
          ></product-row>
        </tbody>
        <tfoot>
          <th colspan="4">Importe total del almacén:</th>
          <th>{{ importPrice }} €</th>
          <th></th>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script>
import {store} from '../service/store';
import { APIService } from "../service/Api";
import ProductRow from "../components/ProductRow.vue";
const api = new APIService();
export default {
  components: { ProductRow },

  name: "pro-table",
  data() {
    return {
      products: [],
    };
  },
  methods: {
    upDown(product, number) {
      api
        .changeProduct({
          id: product.id,
          name: product.name,
          units: product.units + number,
          price: product.price,
        })
        .then((response) => (product.units = response.data.units))
        .catch((error) => store.addErrorMensage(error.statusText || error.message || error));
    },
    deleteProduct(index) {
      if (confirm("Seguro quires borrar el producto"))
        api
          .delProduct(this.products[index].id)
          .then(() => this.products.splice(index, 1))
          .catch((error) => store.addErrorMensage(error));
    },
  },
  mounted() {
    api
      .getTodos()
      .then((response) => (this.products = response.data))
      .catch((error) =>
        store.addErrorMensage("Error: " + (error.statusText || error.message || error))
      );
  },
  computed: {
    importPrice() {
      if (this.products.length !== 0) {
        return this.products
          .reduce((total, prod) => total + prod.price * prod.units, 0)
          .toFixed(2);
      }
      return 0.0;
    },
  },
};
</script>