const loadCategorys = () =>{
    fetch('https://openapi.programming-hero.com/api/news/categories')
    .then((res)=>res.json())
    .then((data)=> displayCategorys(data.data.news_category))
}

const displayCategorys = categorys =>{
    console.log(categorys)
    const categorysItem = document.getElementById('categorys-item');
    categorys.forEach(category => {
        const categoryButton = document.createElement('p');
        categoryButton.classList.add('category');
        console.log(category);
        categoryButton.innerHTML =`
        <a class="nav-link active" aria-current="page" href="#"  style="text-decoration: none;">${category.category_name}</a>
        `;
        categorysItem.appendChild(categoryButton);
        
    })

    
}
loadCategorys();