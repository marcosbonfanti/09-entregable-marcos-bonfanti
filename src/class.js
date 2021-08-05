class Products {
    constructor (){
        this.products = [];
        this.contador = 0
    }
    getProducts() {
        if(!this.contador){
            return {"error": "No hay productos"};     
        }
        else{
            return this.products; 
        } 
    }
    addProduct(productAdd) {
        this.contador++; 
        productAdd['id'] = this.contador;
        this.products.push(productAdd);
        return this.products;
    }
    getProductsById(id) {
        if(this.products.find(o => o.id ==  id) == undefined){
            return {"error": "Producto no encontrado"};
        }    
        else {
            return (this.products.find(o => o.id ==  id));
        }
    }
    actualizar(productAdd, id) {
        if(this.products.find(o => o.id ==  id) == undefined){
            return {"error": "Producto no encontrado"};
        }    
        else {
            const index = this.products.findIndex(o => o.id ==  id);
            productAdd['id'] = parseInt(id);
            this.products[index] = productAdd;
            return this.products
        }
    }
    borrar(id) {
        if(this.products.find(o => o.id ==  id) == undefined){
            return {"error": "Producto no encontrado"};
        }    
        else {
            const index = this.products.findIndex(o => o.id ==  id);
            this.products.splice(index, 1);
            return this.products
        }
    }    

}

export default Products;