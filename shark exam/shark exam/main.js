
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

let deleteBtn =document.getElementById('card-button');

// Problem 1. List of pitches on page load [3}


pitchCreateBtn.addEventListener('click' ,()=>{


    let product ={

        title :pitchTitleInput.value,
       price : pitchPriceInput.value,
        founder :pitchfounderInput.value,
        category :pitchCategoryInput.value,
        image :pitchImageInput.value
    }
    
        fetch("http://localhost:3000/pitches" ,{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            },
           body :JSON.stringify(product),
        }).then((res) => res.json())
    
        .then((data) => fetchData())
    
        .catch((err) => console.log(err))

})

function fetchData() {
    fetch("http://localhost:3000/pitches")
        .then((res) => 
            res.json())

        .then((data) => {
            setData(data)
            productData = data
        })

        .catch((err) => console.log(err));

        
}
fetchData();

let productData = [];

function setData(data) {
    let show = data.map((el) => 
        storeData(el.id,el.image, el.category, el.title, el.price, el.founder)
        
    )
    mainSection.innerHTML = show.join(" ");
}

function storeData(id,image, category,founder, price, title) {

    let store =
        `
    
              <div class="card data-id="${id}">
               <a href="desc.html?title=${encodeURIComponent(title)}&founder= ${encodeURIComponent(founder)}&category= ${encodeURIComponent(category)}&price= 
               ${encodeURIComponent(price)}&image= ${encodeURIComponent(image)}" target="_blank">
                <div class="card-img">
                  <img src="${image}" alt="${title}" height="300px" width="400px">
                </div>
                </a>
                <div class="card-body" style = " margin : 20px;">
                  <div class="card-title">${title}</div>
                  <div class="card-founder">${founder}</div>
                  <div class="card-category">${category}</div>
                  <div class="card-price">${price}</div>
                  <a href="#" data-id="${id}" class="card-link"   style="font-weight: bold; text-decoration: none; color: black; font-weight: bold;">EDIT</a>
                  <button data-id="${id}" class="card-button"  style="font-weight: bold; text-decoration: none; color: white; font-weight: bold; background-color: black;">DELETE</button>
                </div>
              </div>
            
    `

    return store

}

document.addEventListener('click', (e)=>{
     
    if(e.target.classList.contains("card-button"))
    {
        deleteProduct(e.target.dataset.id);
    }
}
)

function deleteProduct(id)
{
    fetch(`http://localhost:3000/pitches/${id}`,{
        method: 'DELETE'

    })
    .then((res)=>res.json())
    .then((data)=>console.log(data),
        alert('delete succsess..'))
    
    .catch((err)=>console.log(err))
}




document.addEventListener('click', (e)=>

    {
        if(e.target.classList.contains("card-link"))
        {
           
            console.log(e.target.dataset.id);
            updateData(e.target.dataset.id);
        }
    });
    
    function updateData(id)
    {
        fetch(`http://localhost:3000/pitches/${id}`)
        .then((res)=> res.json())
        .then((data)=>{
          
            
            (updatePitchIdInput.value = data.id),
            (updatePitchTitleInput.value = data.title),
            (updatePitchImageInput.value = data.image),
            (updatePitchCategoryInput.value = data.category),
            (updatePitchfounderInput.value = data.founder),
            (updatePitchPriceInput.value = data.price)
        
        })
        .catch((err)=> console.log(err));
    }
    updatePitchBtn.addEventListener('click',()=>{
      let updateobj = {
    
        id : updatePitchIdInput.value,
        title : updatePitchTitleInput.value,
        image : updatePitchImageInput.value,
        category : updatePitchCategoryInput.value,
        founder : updatePitchfounderInput.value,
        price : updatePitchPriceInput.value
        
    };
    console.log(updateobj)    
    
    
    fetch(`http://localhost:3000/pitches/${updateobj.id}`,{
      method : 'PUT',
      headers : {
    
        'Content-Type' : 'application/json'
    
        },
    
        body: JSON.stringify(updateobj)
      })
      .then((res)=>res.json())
      .then((data)=>fetchData())
      .catch((err)=>console.log(err));
    
    
    })
    
    
    /////////////////////////////////////////
    




// document.addEventListener('click', (e)=>{
     
//     if(e.target.classList.contains("card-link"))
//     {
//         updateData(e.target.dataset.id);
//     }
// }
// )
// function updateData(id){

    
//     fetch(`http://localhost:3000/pitches/${id}`)
//     .then((res)=>res.json())
//     .then((data)=>{
//         updatePitchIdInput.value = data.id,
//         updatePitchTitleInput.value = data.title,
//         updatePitchImageInput.value = data.image,
//         updatePitchfounderInput.value = data.founder,
//         updatePitchCategoryInput.value = data.category,
//         updatePitchPriceInput.value = data.price

//     })
//     .catch((err)=>console.log(err))
    
// }


// updatePitchBtn.addEventListener('click' ,()=>{



//     let upobj ={

//         id :updatePitchIdInput.value,
//         title : updatePitchTitleInput.value,
//         price : updatePitchPriceInput.value,
//         founder :updatePitchfounderInput.value,
//         category : updatePitchCategoryInput.value,
//         image :updatePitchImageInput.value 
//     }
    
//         fetch(`http://localhost:3000/pitches/${upobj.id}` ,{
//             method : 'PUT',
//             headers : {
//                 'Content-Type' : 'application/json',
//             },
//            body :JSON.stringify(upobj),
//         }).then((res) => res.json())
    
//         .then((data) => fetchData())
    
//         .catch((err) => console.log(err))

// })


// updatePricePitchPriceButton.addEventListener('click' ,()=>{



//     let updatePrice ={

//         id :updatePitchIdInput.value,
//         price : updatePitchPriceInput.value,
//     }
    
//         fetch(`http://localhost:3000/pitches/${updatePrice.id}` ,{
//             method : 'PUT',
//             headers : {
//                 'Content-Type' : 'application/json',
//             },
//            body :JSON.stringify(updatePrice),
//         }).then((res) => res.json())
    
//         .then((data) => fetchData())
    
//         .catch((err) => console.log(err))

// })