let title = document.getElementById('title');
let price = document.getElementById('price');
let tax = document.getElementById('tax');
let ads = document.getElementById('ads');
let disc = document.getElementById('disc');
let total = document.getElementById('total');
let count = document.getElementById('count');
let cat = document.getElementById('cat');
let submit = document.getElementById('submit');

//calc totals
function getTotal(){
    if (price.value != '') {
        let resualt =   (+price.value + +tax.value  + +ads.value) - +disc.value;
        total.innerHTML = resualt;
        total.style.background =  '#6407a7';
    }else{
        total.innerHTML = '';
        total.style.background =  '#c63e3e';
    }
}

//create 
let products;
if (localStorage.products_local != null) {
     products = JSON.parse(localStorage.products_local);
}else{
     products = [];
}
submit.onclick = function(){
    let product = {
        title: title.value,
        price: price.value,
        tax: tax.value,
        ads: ads.value,
        disc: disc.value,
        total: total.innerHTML,
        count: count.value,
        cat: cat.value,
    }
    debugger
    if (product.count > 1) {
        for (let i = 0; i < product.count; i++) {
            products.push(product)
        }
        
    }else{
        products.push(product)
    }
    
    
    localStorage.setItem('products_local', JSON.stringify(products));
    clearData();
    getData();
}

function clearData(){
    title.value = '';
    price.value = '';
    tax.value = '';
    ads.value = '';
    disc.value = '';
    total.innerHTML = '';
    count.value = '';
    cat.value = '';
}

// get data
function getData(){
    let tbody = '';
    for (let i = 0; i < products.length; i++) {
            tbody += `
                <tr>
                    <td>${i}</td>
                    <td>${products[i].title}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].tax}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].disc}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].cat}</td>
                    <td><button id="update">update</button></td>
                    <td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
                </tr>`
            
            document.getElementById('tbody').innerHTML = tbody;
            let deleteAll = document.getElementById('delete-all');
            if(products.length > 0){
                deleteAll.innerHTML = `<button onclick="deleteAll()">Delete All (${products.length}) </button>`;
            }else{
                deleteAll.innerHTML = '';
            }
    }

}

//delete item 
function deleteItem(i){
    products.splice(i,1);
    localStorage.products_local = JSON.stringify(products);
    getData();
}

//delete all items
function deleteAll(){
    localStorage.clear();
    products.splice(0);
    getData();
}

getData();