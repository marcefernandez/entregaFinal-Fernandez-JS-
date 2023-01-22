const shopContent = document.getElementById("shopContent");
const verCarrito = document.getElementById("verCarrito");
const modalContainer = document.getElementById("modalContainer");
const showAlert = document.getElementById("showAlert");
const cantidadCarrito = document.getElementById("cantidadCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

productos.forEach((product) => {
    let content = document.createElement("div");
    content.className = "card";
    content.innerHTML = `
    <img src= "${product.img}">
    <h3>${product.nombre}</h3>
    <p class="price">${product.precio} $</p>
    `;

    shopContent.append(content);

    let comprar = document.createElement("button");
    comprar.innerText = "comprar";
    comprar.className = "comprar";

    content.append(comprar);

    comprar.addEventListener("click", () => {

    const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id);    
    
        if(repeat) {
            carrito.map((prod) => {
                if(prod.id === product.id) {
                    prod.cantidad++;
                }
            });
        } else {
        carrito.push({
            id: product.id,
            img: product.img,
            nombre: product.nombre,
            precio: product.precio,
            cantidad:product.cantidad,
        });
        }
        console.log(carrito);
        carritoCounter();
        saveLocal();   
    });

    comprar.addEventListener('click' , () => {
        swal.fire('Producto agregado al carrito')
    })
});

//Api
document.addEventListener('DOMContentLoaded', traerProductos)


async function traerProductos(){
    const url ='https://fakestoreapi.com/products'
    
    try {
        const resultado = await fetch(url)
        const respuesta = await resultado.json()
        pintarProductos(respuesta)


    } catch (error) {
        console.log(error)
    }
}

 function pintarProductos(productos){
    console.log(productos)
 }

  
//probar storage

//set item
const saveLocal = () => {
localStorage.setItem("carrito", JSON.stringify(carrito));
};




//get item
JSON.parse(localStorage.getItem("carrito"));