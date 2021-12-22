import axios from 'axios';
const baseURL = 'http://localhost:3000';

export class APIService{
  constructor(){
  }
  getTodos() {
    return axios.get(baseURL+'/products')
  }
  delProduct(id){
    return axios.delete(baseURL+'/products/'+id)
  }
  addProduct(newProduct) {
    return axios.post(baseURL+'/products', newProduct)
  }
  changeProduct(product) {
    return axios.put(baseURL+'/products/'+product.id, {
      id: product.id, 
      name: product.name, 
      price: product.price,
      units: product.units
    })
  }
  getProduct(id){
    return axios.get(baseURL + '/products/' + id )
  }
}
