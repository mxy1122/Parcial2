//=======LocalStorage=======
export const handleGetproductLocalStorage = () =>{
    const productos = JSON.parse(localStorage.getItem("productos"));
    if(productos){
        return productos;
    }else{
        return [];
    }
};

//guardarEn localStorage
export const setInLocalStorage = (productoIn) =>{
if(productoIn){
//Traer los elementos
let productoInLocal = handleGetproductLocalStorage();
console.log(productoIn);
const existingIndex = productoInLocal.findIndex((productosLocal) =>
    productosLocal.id === productoIn.id);
if(existingIndex !== -1){
    productoInLocal[existingIndex] = productoIn;
}else{
//si no existe lo agrego
productoInLocal.push(productoIn);
}
localStorage.setItem("productos", JSON.stringify(productoInLocal));
}

};