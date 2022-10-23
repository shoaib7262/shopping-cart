let carts = document.querySelectorAll('.add-cart');
let cartItems = JSON.parse(localStorage.getItem('productsInCart'));

let products = [
    {
        id: 1,
        name: 'iPhone',
        tag: "iphone",
        price: 20,
        incart: 0
    },
    {
        id: 2,
        name: 'Nokia',
        tag: "nokia",
        price: 30,
        incart: 0

    },
    {
        id: 3,
        name: 'Samsung Alpha',
        tag: "Samsung Alpha",
        price: 10,
        incart: 0

    },
    {
        id: 4,
        name: 'Samsung',
        tag: "Samsung",
        price: 40,
        incart: 0

    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        // totalCost(products[i]);
    


    })
}

const onLoadNumbers = () => {
    let productNumbers = localStorage.getItem('cartNumbers');
    document.querySelector('.cart span').textContent = productNumbers;


}
const cartNumbers = (product) => {

    let productNumbers = parseInt(localStorage.getItem('cartNumbers'));

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;

    }
    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;

    }
    setItems(product);

}
const setItems = (product) => {

    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].incart += 1;
    }

    else {
        product.incart = 1;

        cartItems = {
            [product.tag]: product
        }
    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

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
    
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    let productContainer = document.querySelector('.products');
    // let cartCost = localStorage.getItem('totalCost');

    if (cartItems && productContainer) {
        
        let cartCost = localStorage.getItem('totalCost');
        // let temp = Object.values(cartItems).map((item)=>{
        //     		return (item.price);
        //     	})
                
            	 cartCost = Object.values(cartItems).reduce((acc, curr)=>{
                   
                        return acc + curr.price * curr.incart;
                  
            	}, 0);
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
        
            productContainer.innerHTML += `
            
            
        <div class="product d-flex justify-content-between  w-50 mb-3 mt-5"  >
         <div class="d-flex">
              <div style="width:50px;height:60px"><img src="./imag/${item.tag}.png"  style="width:100%;height:auto"></div>
           <div class=" d-flex flex-column ">
              <div><span> ${item.name}</span></div>
              <div><span> $${item.price},00</span></div> 
              
             <div> <button class="btn btn-sm border-0 btn-outline-secondary"  onclick="deletFunc(${item.id})"> remove </button></div>
           </div>
        </div>      
            <div class="d-flex flex-column ">
            <i onclick="inCartVal(${item.id}, '-')" class="fa-solid fa-chevron-up"> </i>
                 <span class="ml-1">${item.incart} </span>
            <i onclick="inCartVal(${item.id}, '+')" class="fa-solid fa-chevron-down"></i>
            </div>
        </div>
            
            
            `;
        })

        productContainer.innerHTML += `
        <div class="d-flex justify-content-between w-50 " style="border-top:2px solid black;">    
            <div>
                <h4>Total</h4>
            </div>
            <div> <button onclick="clearCart()">clear cart</button></div>
            <div>
              <h4>$${cartCost},00</h4>
              </div>
        </div>

        `

    }
    

}
const deletFunc = (id)=>{

    // let productNumbers = JSON.parse(localStorage.getItem('cartNumbers'));
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    
    let newObj = Object.values(cartItems).filter((item)=> item.id !== id)
    localStorage.setItem('productsInCart',JSON.stringify(newObj));
    
    
    
    
    displayCart();
}


const clearCart = () => {
    localStorage.clear();

    window.location.href = './cart.html'
    
}


const inCartVal =(id, expression)=>{

    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));


    let allObj = Object.values(cartItems).filter((item)=> item.id !== id)
    
    
    let newObj = Object.values(cartItems).filter((item)=> item.id == id)
    if(expression === "-"){
        
        if(newObj[0].incart  <= 1){
            newObj[0].incart = 1;  
        }
        else{
            newObj[0].incart = newObj[0].incart - 1  
        }
       
    }else{
        newObj[0].incart = newObj[0].incart + 1  
    }
    
    
  

    localStorage.setItem('productsInCart',JSON.stringify([...allObj, ...newObj]))
    
    displayCart();


}
 





onLoadNumbers();
displayCart();


