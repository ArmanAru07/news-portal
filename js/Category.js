const loadCategorys = () =>{
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    try{
        fetch(url)
    .then((res)=>res.json())
    .then((data)=> displayCategorys(data.data.news_category))
    }
    catch(error){
        console.log(error)
    }
}

const displayCategorys = categorys =>{
    // console.log(categorys)
    const categorysItem = document.getElementById('categorys-item');
    categorys.forEach(category => {
        const categoryButton = document.createElement('p');
        categoryButton.classList.add('category');
        // console.log(category);
        categoryButton.innerHTML =`
        <a onclick="loadNews('${category.category_id}')" class="nav-link p-2 fw-bold btn btn-outline-success" type="button" aria-current="page" href="#"  style="text-decoration: none;">${category.category_name}</a>
        `;
        categorysItem.appendChild(categoryButton);
    })
    
}
const loadNews = (category_id) => {
    // loading start 
    toggleSpinner(true);
    const url = ` https://openapi.programming-hero.com/api/news/category/${category_id}`
    try{
        fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    }
    catch(error){
        console.log(error)
    }
    
}

const displayNews = category =>{

   const lengthField= document.getElementById('handelID');
   lengthField.innerText=`${category.length}`


    console.log(category.length)
    const Maindiv = document.getElementById('Main-div');
    Maindiv.innerHTML = '';

    // display no news 
    const noNewsFound = document.getElementById('no-news-found');
    if(category.length === 0){
        noNewsFound.classList.remove('d-none')
        toggleSpinner(false);
    }
    

    let array = []
    category.forEach(elements =>{
        array.push(elements)
    });

    array.sort((a,b) =>{
        return b.total_view - a.total_view;
    });

    array.forEach(element => {
        console.log(element)
        
    // const news = document.getElementById('newses');
    const newses = document.createElement('div')
    newses.innerHTML = `

    <div class="card mb-3">
    <div class="row g-0">
    <div class="col-md-4">
      <img src="${element.image_url}" class="img-fluid rounded-start h-100" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${element.title}</h5>
        <p class="card-text">${element.details.slice(0,250).concat('...')}</p>
        <div class="d-flex justify-content-between">
          <div class="d-flex">
              <div>
                  <img class="img-fluid rounded-circle" height="100" width="100" src="${element.author.img}" alt="">
              </div>
              <div class="p-3 ">
                  <h6>${element.author.name ? element.author.name : "No Data Found!"}</h6>
                  <p><small>${element.author.published_date}</small></p>
              </div>
          </div>
          <div class="p-3 "><i class="fa-regular fa-eye"></i><span>${element.total_view ? element.total_view : "Do not seen by someone!"}</span></div>
          <div class="p-3 ">
              <span>${element.rating.number}</span>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star-half-stroke"></i>
          </div>
          <div class="p-3 ">
          <button onclick="readMore('${element._id}')" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Read More...</button>
          </div>
        </div>
      </div>
    </div>
  </div>  
    </div>
    
    `
    Maindiv.appendChild(newses);
    toggleSpinner(false);
    });
    
}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

loadCategorys();

const readMore = (arman) =>{
    
    const url =`https://openapi.programming-hero.com/api/news/${arman}`;
    try{
        fetch(url)
    .then((res)=>res.json())
    .then((data)=> displayReadMore(data))
    }
    catch(error){
        console.log(error)
    }
}

const displayReadMore = (data) => {
    console.log(data)
    const modalDiv = document.getElementById('read-details')
    modalDiv.innerText = ` ${data.data[0].details ? data.data[0].details : "Not found...!"};
`
}