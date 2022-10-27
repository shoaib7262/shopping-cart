let carts = document.querySelectorAll(".add-cart");
let cartItems = JSON.parse(localStorage.getItem("productsInCart"));

let products = [
  {
    id: 1,
    name: "iPhone",
    tag: "iphone",
    price: 20,
    incart: 0,
  },
  {
    id: 2,
    name: "Nokia",
    tag: "nokia",
    price: 30,
    incart: 0,
  },
  {
    id: 3,
    name: "Samsung Alpha",
    tag: "Samsung Alpha",
    price: 10,
    incart: 0,
  },
  {
    id: 4,
    name: "Samsung",
    tag: "Samsung",
    price: 40,
    incart: 0,
  },
  {
    id: 5,
    name: "Hp",
    tag: "hp",
    price: 6,
    incart: 0,
  },
  {
    id: 6,
    name: "Dell",
    tag: "dell",
    price: 8,
    incart: 0,
  },
  {
    id: 7,
    name: "Lenovo",
    tag: "lenovo",
    price: 1,
    incart: 0,
  },
  {
    id: 8,
    name: "Apple",
    tag: "apple",
    price: 60,
    incart: 0,
  },
  {
    id: 9,
    name: "Toshiba",
    tag: "toshiba",
    price: 1,
    incart: 0,
  },
  {
    id: 10,
    name: "Laptop",
    tag: "Laptop",
    price: 10,
    incart: 0,
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
  });
}

const onLoadNumbers = () => {
  let products = localStorage.getItem("productsInCart");
  products = JSON.parse(products)
  document.querySelector(".cart span").textContent = Object.keys(products).length;
}

const cartNumbers = (product) => {
  setItems(product);
  onLoadNumbers();
}
const setItems = (product) => {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].incart += 1;
  } else {
    product.incart = 1;

    // cartItems = {
    //   [product.tag]: product,
    // };
    cartItems = {
      [product.tag]: product
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
};

// const totalCost = (product) => {
//     let cartCost = localStorage.getItem('totalCost');
//     if (cartCost != null) {
//         cartCost = parseInt(cartCost);
//
//         localStorage.setItem('totalCost', cartCost + product.price);
//     }
//     else {
//         localStorage.setItem('totalCost', product.price);
//     }
// }

const displayCart = () => {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
  let productContainer = document.querySelector(".products");
  // let cartCost = localStorage.getItem('totalCost');

  if (cartItems && productContainer) {
    let cartCost = localStorage.getItem("totalCost");

    cartCost = Object.values(cartItems).reduce((acc, curr) => {
      return acc + curr.price * curr.incart;
    }, 0);
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
            
            
        <div class="product d-flex justify-content-between  w-50 mb-3 mt-5"  >
         <div class="d-flex">
              <div style="width:50px;height:60px"><img src="./imag/${item.tag}.png"  style="width:100%;height:auto"></div>
           <div class=" d-flex flex-column pl-2">
              <div><span> ${item.name}</span></div>
              <div><span class="text-primary" style=""> $${item.price},00</span></div> 
              
             <div> <button class="btn btn-sm border-0 btn-outline-secondary"  onclick="deletFunc(${item.id})"> remove </button></div>
           </div>
        </div>      
            <div class="d-flex flex-column ">
            <i style="cursor:pointer" onclick="inCartVal(${item.id}, '+')" class="fa-solid fa-chevron-up"> </i>
                 <span class="ml-1" style="color:rgb(3,110,69)">${item.incart} </span>
            <i style="cursor:pointer" onclick="inCartVal(${item.id}, '-')" class="fa-solid fa-chevron-down"></i>
            </div>
        </div>
            
            
            `;
    });

    productContainer.innerHTML += `
        <div class="d-flex justify-content-between w-50 mt-3 " style="border-top:2px solid black;">    
            <div>
                <h4>Total</h4>
            </div>
            <div class="mt-2"> <button class="btn btn-outline-secondary btn-sm" onclick="clearCart()">clear cart</button></div>
            <div>
              <h4 class="text-primary">$${cartCost},00</h4>
              </div>
        </div>

        `;
  }
};
const deletFunc = (id) => {
  // let productNumbers = localStorage.getItem("cartNumbers") - 1;
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));

  let newObj = Object.values(cartItems).filter((item) => item.id !== id);

  localStorage.setItem("productsInCart", JSON.stringify(newObj));
  // localStorage.setItem("cartNumbers", productNumbers) - 1;

  displayCart();
};

const clearCart = () => {
  localStorage.clear();

  window.location.href = "./cart.html";
};

const inCartVal = (id, expression) => {
  let cartItems = JSON.parse(localStorage.getItem("productsInCart"));

  let allObj = Object.values(cartItems).filter((item) => item.id !== id);

  let newObj = Object.values(cartItems).filter((item) => item.id == id);
  if (expression === "-") {
    if (newObj[0].incart <= 1) {
      newObj[0].incart = 1;
    } else {
      newObj[0].incart = newObj[0].incart - 1;
    }
  } else {
    newObj[0].incart = newObj[0].incart + 1;
  }

  localStorage.setItem(
    "productsInCart",
    JSON.stringify([...allObj, ...newObj])
  );

  displayCart();
};

onLoadNumbers();
displayCart();
