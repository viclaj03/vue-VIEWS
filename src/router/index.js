import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductsTable from '../views/ProductsTable'
import FormProduct from '../views/FormProduct.vue'

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        name: 'Home',
        component: ProductsTable
    },
    
    {
        path: '/newProduct',
        name: 'Form',
        component: FormProduct
    },

    {
        path: '/editProduct/:id',
        name: 'FormEdit',
        component: FormProduct,
        props: true
    },
    
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
