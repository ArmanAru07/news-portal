const loadCategorys = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then((res)=>res.json())
    .then((data)=> displayCategorys(data.data.news_category))
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
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
}

const displayNews = category =>{
    const Maindiv = document.getElementById('Main-div');
    Maindiv.innerHTML = '';

    category.forEach(element => {
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
        <p class="card-text">${element.details}</p>
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
          <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Read More...</button>
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