// ===STORE===
import { openModal, setProductoActivo } from "../../main";
import { handleGetproductLocalStorage } from "../persistence/localstorage";


export const handleGetProductoToStore = () =>{

    const productos = handleGetproductLocalStorage()
    handleRenderList(productos);

}

export const handleRenderList = (productosIn) => {

const hamburguesas = productosIn.filter((el) => el.categoria === "Hamburguesas");
const bebidas = productosIn.filter((el) => el.categoria === "Bebidas");
const papas = productosIn.filter((el) => el.categoria === "Papas");

    const renderProductoGroup = (productos, title) => {
        if(productos.length > 0){
            const productosHTML = productos.map((producto,index) => {

                return `<div class='containerTarget_Item'  id='product-${producto.categoria}-${index}'>
  
                <div>
                    <img src='${producto.img}'></img>
                </div>

                <div>
                    <h2>${producto.nombre}</h2>
                </div>

                <div class'targetProps'>
                <p><b> Precio:</b> $ ${producto.precio}</p>
                <p><b> Categoria:</b>  ${producto.categoria}</p>
                </div>

                </div>
                </div>   
                `;

            });

            return `
                <section class='sectionStore'>
                    <div class='TitleContainersection>
                        <h3>${title}</h3>
                    </div>
                    <div class='container_productosStore'>
                            ${productosHTML.join("")}
                
                    </div>
        
                    </section>
            `;

        }else{
            return "";
        }
    };

    //renderizar cada uno de los grupos de productos

    const appContainer = document.getElementById("store_container");
    appContainer.innerHTML=`${renderProductoGroup(hamburguesas, "Hamburguesas")}
    ${renderProductoGroup(bebidas, "Bebidas")}
    ${renderProductoGroup(papas, "Papas")}
    `;

    const addEvents = (productoIn) => {
        if(productoIn){
        productoIn.forEach((element, index) => {
            const productoContainer = document.getElementById(`product-${element.categoria}-${index}`);
            productoContainer.addEventListener("click", () => {
               setProductoActivo(element);
               openModal();
            }); 
        });
    }
};
    addEvents(hamburguesas);
    addEvents(bebidas);
    addEvents(papas);   
};