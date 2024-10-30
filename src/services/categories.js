//==== CATEGORIAS ====


import { categoriaActiva } from "../../main";
import { handleGetproductLocalStorage } from "../persistence/localstorage";
import { handleRenderList } from "../views/store";

const handleFilterProductByCategory = (categoryIn) => {
    const productos = handleGetproductLocalStorage();
    switch(categoryIn){
        case categoriaActiva:
            handleRenderList(productos);
            break;
        case "Todos los productos":
            handleRenderList(productos);
            break;
        case "Hamburguesas":
        case "Bebidas":
        case "Papas":
            const result = productos.filter((el) => el.categoria === categoryIn);
            handleRenderList(result);
        default:
            break;

        case "mayorprecio":
            const resultPrecioM = productos.sort((a,b) => a.precio - b.precio);
            handleRenderList(resultPrecioM);
            break;
        case "menorprecio":
            const resultPreciom = productos.sort((a,b) => b.precio - a.precio);
            handleRenderList(resultPreciom);
            break;
    }
}



//render de la vista categorias 

export const renderCategories = () => {

    //tomamos elementos de la lista de categorias
    const ulList = document.getElementById("ListFilter");

    //creamos esos elementos dentro de la lista
    ulList.innerHTML = `
    <li id = "Todos los productos">Todos los productos</li>
    <li id = "Hamburguesas">Hamburguesas</li>
    <li id = "Bebidas">Bebidas</li></li>
    <li id = "Papas">Papas</li></li>
    <li id = "mayorPrecio">mayor precio</li></li>
    <li id = "menor precio">menorprecio</li></li>
    `;
    //Agregamos el evento de click a cada elemento
    const liElements =  ulList.querySelectorAll("li");
    liElements.forEach((liElement) => {
        liElement.addEventListener("click", () => {            
            handleClick(liElement);
        });

    });

    //Verificamos y manejamos el elemento activo
    const handleClick = (elemento) => {

        handleFilterProductByCategory(elemento.id);

        liElements.forEach((el) => {

            if(el.classList.contains("liActive")){

                el.classList.remove("liActive");
        }else{
            if(elemento === el){
                el.classList.add("liActive");
                }
            }
        });
    
    };

};