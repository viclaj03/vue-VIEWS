<template>
  <tr>
    <td>{{product.id}}</td>
    <td>{{ product.name }}</td>
    <td>{{ product.units }}</td>
    <td>{{ product.price.toFixed(2)}}</td>
    <td>{{productImport.toFixed(2)}}</td>
    <td>
       <button @click="deleteProduct" class="btn btn-delete">
          <i class="bi bi-trash"></i>
        </button>
        <button @click="upUnits" class="btn btn-up">
            <i class="bi bi-arrow-up-circle-fill"></i>
        </button>
        <button v-if="product.units" @click="downUnits" class="btn btn-down" >
                        <i class="bi bi-arrow-down-circle-fill"></i>
        </button>
         <button v-else @click="downUnits" class="btn btn-down " disabled >
                        <i class="bi bi-arrow-down-circle-fill"></i>
        </button>
        <button @click="editProduct" class="btn btn-edit">
                        <i class="bi bi-pencil"></i>
        </button> 
    </td>
  </tr>
</template>

<script>
export default {
  name: "product-row",
  props: ["product"],
  computed:{
    productImport(){
      return this.product.units * this.product.price
    }
  },
  methods:{
    upUnits(){
      this.$emit('up-down', this.product , +1)
    },
    downUnits(){
      this.$emit('up-down', this.product , -1)
    },
    deleteProduct(){
      this.$emit('delete-product')
    },
    editProduct(){
      this.$router.push( '/editProduct/' + this.product.id) 
    }
  },
  
};


</script>

