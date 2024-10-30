import { handleGetproductLocalStorage } from "../persistence/localstorage";
import { handleRenderList } from "../views/store";

export const handleSearchProductByName = (input) =>{

    const inputHeader = document.getElementById("inputHeader");
    const productos = handleGetproductLocalStorage

    const result = productos.filter((el) => 
        
        el.nombre.toLowerCase().includes(inputHeader.value())
    );
 
    handleRenderList(result)


}