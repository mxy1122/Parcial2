import Swal from "sweetalert2";
import { handleGetproductLocalStorage, setInLocalStorage } from "./src/persistence/localstorage";
import { renderCategories } from "./src/services/categories";
import { handleSearchProductByName } from "./src/services/search";
import { handleGetProductoToStore, handleRenderList } from "./src/views/store";
import "./style.css";
//==APLICACION==

export let categoriaActiva = null;
export const setCategoriaActiva = (categoriaIn) =>{
    categoriaActiva = categoriaIn;
};

export let productoActivo = null;
export const setProductoActivo = (productoIn) =>{
    productoActivo = productoIn;
};

handleGetProductoToStore();
renderCategories();

//Header
//buttonsearch

const buttonSearch= document.getElementById("ButtonSearch");
buttonSearch.addEventListener("click", ()=>{

    handleSearchProductByName();
    
})

//POPUp
const buttonCancel= document.getElementById("cancelButton");
buttonCancel.addEventListener("click", ()=>{
    closeModal();
})

export const openModal = () =>{    
    const modal = document.getElementById("modalPopUP");
    modal.style.display = "flex";

    if(productoActivo){
        const name = document.getElementById("name");
        const img = document.getElementById("img");
        const precio = document.getElementById("precio");
        const categoria = document.getElementById("categoria");
        name.value = productoActivo.nombre;
        img.value = productoActivo.img;
        precio.value = productoActivo.precio;
        categoria.value = productoActivo.categoria;
    }
}


export const closeModal = () =>{    
    const modal = document.getElementById("modalPopUP");
    modal.style.display = "none";
    setProductoActivo(null);
    resetModal();
}

const resetModal = ()=>{

    const nombre = document.getElementById("name"),
    img = document.getElementById("img"),
    precio = document.getElementById("precio"),
    categoria = document.getElementById("categoria");
    nombre.value="";
    img.value="";
    precio.value=0;
    categoria.value="Seleccione una categoria";
 

}

const deleteButton = document.getElementById("deleteButton");
deleteButton.addEventListener("click", ()=>{
    handlebuttonDelete();
})

const handlebuttonDelete = () => {
    handleDeleteProduct();
};

//===Productos===

const buttonAdd= document.getElementById("ButtonAdd");
buttonAdd.addEventListener("click", ()=>{

    openModal();

})

const buttonAccept= document.getElementById("acceptButton");
buttonAccept.addEventListener("click", ()=>{
    handleSaveorModify();
})

//funcion de guardar
const handleSaveorModify = () =>{
    const nombre = document.getElementById("name").value,
     img = document.getElementById("img").value,
     precio = document.getElementById("precio").value,
     categoria = document.getElementById("categoria").value;
    let object = null
   if(productoActivo){
        object = {
            ...productoActivo,
            nombre,
            img,    
            precio,
            categoria,
        };
   }else{
        object = {
        id: new Date().toISOString(),
        nombre,
        img,    
        precio,
        categoria,
    };
}

Swal.fire({
    title: "Bien",
    text: "Producto guardado",
    icon: "success"
  });

    setInLocalStorage(object);
    handleGetProductoToStore();
    closeModal();
}

//Eliminar Elementos 

export const handleDeleteProduct = () => {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "estas seguro?",
        text: "No sera capaz de recuperar este archivo!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            
            const productos = handleGetproductLocalStorage();
            const resultado = productos.filter((el) => el.id !== productoActivo.id);
            
        
            localStorage.setItem("productos", JSON.stringify(resultado));
            const newProductos = handleGetproductLocalStorage();
            handleRenderList(newProductos);
            closeModal();
            
        } else{
            closeModal();
        }
      });
    
};




