const carrito = document.querySelector("#carrito");
const liTemplate = document.querySelector("#liTemplate");
const footer = document.querySelector("#footer");
const templateFooter = document.querySelector("#templateFooter");
const fragment = document.createDocumentFragment();

//SOLUCION CON OBJETOS
// const carritoObjeto={};

// const agregarAlCarrito= (e)=>{
//     console.log(e.target.dataset.fruta)

//     const producto ={
//         titulo: e.target.dataset.fruta,
//         id:e.target.dataset.fruta,
//         cantidad: 1
//     }

//     if(carritoObjeto.hasOwnProperty(producto.titulo)){
//         producto.cantidad=carritoObjeto[producto.titulo].cantidad+1;
//     }
//     carritoObjeto[producto.titulo]=producto

//     pintarCarrito()

// };

// const pintarCarrito= () => {

//     carrito.textContent=""

//     Object.values(carritoObjeto).forEach(item => {
//         const clone =liTemplate.content.firstElementChild.cloneNode(true)
//         clone.querySelector('.lead').textContent=item.titulo
//         clone.querySelector('.badge').textContent=item.cantidad

//         fragment.appendChild(clone)
//     })
//     carrito.appendChild(fragment)
// };

//btnesBotones.forEach((btn)=> btn.addEventListener("click", agregarAlCarrito));

//SOLUCION CON ARRAY

document.addEventListener("click", (e) => {
  if (e.target.matches(".card-body .btn-primary")) {
    agregarAlCarrito(e);
  }
  if (e.target.matches("#carrito .list-group-item .btn-success")) {
    btnAumentar(e);
  }

  if (e.target.matches("#carrito .list-group-item .btn-danger")) {
    btnDisminuir(e);
  }

  if (e.target.matches("#carrito .card .lead .btn-danger")) {
    btnDisminuir(e);
  }
});

let carritoObjeto = [];

const agregarAlCarrito = (e) => {
  const producto = {
    titulo: e.target.dataset.fruta,
    id: e.target.dataset.fruta,
    cantidad: 1,
    precio: parseInt(e.target.dataset.precio),
  };

  const indice = carritoObjeto.findIndex((item) => item.id === producto.id);

  if (indice === -1) {
    carritoObjeto.push(producto);
  } else {
    carritoObjeto[indice].cantidad++;
  }

  pintarCarrito();
};

const pintarCarrito = () => {
  carrito.textContent = "";
  carritoObjeto.forEach((item) => {
    const clone = liTemplate.content.cloneNode(true);
    clone.querySelector(".text-white .lead").textContent = item.titulo;
    clone.querySelector(".text-white .badge").textContent = item.cantidad;
    clone.querySelector("div .lead span").textContent =
      item.precio * item.cantidad;

    clone.querySelector(".btn-danger").dataset.id = item.id;
    clone.querySelector(".btn-success").dataset.id = item.id;

    fragment.appendChild(clone);
  });
  carrito.appendChild(fragment);

  pintarFooter();
};

const pintarFooter = () => {
  footer.textContent = "";

  const total = carritoObjeto.reduce(
    (acc, current) => acc + current.cantidad * current.precio,
    0
  );
  console.log(total);
  const clone = templateFooter.content.cloneNode(true);
  clone.querySelector("span").textContent = total;

  footer.appendChild(clone);
};

const btnAumentar = (e) => {
  carritoObjeto = carritoObjeto.map((item) => {
    if (item.id === e.target.dataset.id) {
      item.cantidad++;
    }
    return item;
  });
  pintarCarrito();
};

const btnDisminuir = (e) => {
  carritoObjeto = carritoObjeto.filter((item) => {
    if (item.id === e.target.dataset.id) {
      if (item.cantidad > 0) {
        item.cantidad--;
        if (item.cantidad === 0) return;
        return item;
      }
    } else {
      return item;
    }
  });

  pintarCarrito();
};

const btnOcultar = (e) => {
  carritoObjeto = carritoObjeto.filter((item) => {
    if (item.id === e.target.dataset.id) {
      if (item.cantidad > 0) {
        item.cantidad--;
        if (item.cantidad === 0) return;
        return item;
      }
    } else {
      return item;
    }
  });

  pintarCarrito();
};
