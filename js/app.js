const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// ***************************************** Variables ***********************************************

// Buttons

const logo = $('#logo');
const btnBalances = $('#btn-balances');
const btnCategories = $('#btn-categories');
const btnReports = $('#btn-reports');
const btnNewOperation = $('#new-operation');


// Sections

const secBalance = $('#secBalance');
const secCategories = $('#secCategories');
const secReports = $('#secReports');
const newOperation = $('#newOperation');
const editCategory = $('#editCategory');

// Balance 

const selectFilterCategory = $('#category');

// Categories

const containerCategory = $('#containerCategory')
const inputCategory = $('#input-category')
const btnAddCategory = $('#add-category')
let btnEdit = $$('.btnEdit')
let btnEditCategory = $('#btn-cat-edit')


// ***************************************** End Variables *******************************************

// ***************************************** Arrays of Objects ***************************************

const categoryList = [
    {
        id: 0,
        name: "Comida"
    },
    {
        id: 1,
        name: "Servicios"
    },
    {
        id: 2,
        name: "Educación"
    },
    {
        id: 3,
        name: "Transporte"
    },
    {
        id: 4,
        name: "Trabajo"
    },
]

let saveCategories = [];

// ******************************************* Functions *********************************************

// changeSection

const changeSection = (id) => {
    switch (id) {
        case logo:
            secBalance.style.display = 'block' 
            secCategories.style.display = 'none'
            secReports.style.display = 'none'
            newOperation.style.display = 'none'
            editCategory.style.display = 'none'
        break;

        case btnBalances:
            secBalance.style.display = 'block' 
            secCategories.style.display = 'none'
            secReports.style.display = 'none'
            newOperation.style.display = 'none'
            editCategory.style.display = 'none'
        break;

        case btnCategories:
            secBalance.style.display = 'none' 
            secCategories.style.display = 'block'
            secReports.style.display = 'none'
            newOperation.style.display = 'none'
            editCategory.style.display = 'none'
        break;

        case btnReports:
            secBalance.style.display = 'none' 
            secCategories.style.display = 'none'
            secReports.style.display = 'block'
            newOperation.style.display = 'none'
            editCategory.style.display = 'none'
        break;

        case btnNewOperation:
            secBalance.style.display = 'none' 
            secCategories.style.display = 'none'
            secReports.style.display = 'none'
            newOperation.style.display = 'block'
            editCategory.style.display = 'none'
        break;

        case btnEdit:
            secBalance.style.display = 'none' 
            secCategories.style.display = 'none'
            secReports.style.display = 'none'
            newOperation.style.display = 'none'
            editCategory.style.display = 'block'
        break;
   }
}

// generateCategory

const generateCategory = (categories) => {
    categories.map(categories => {
        const { id, name } = categories
        containerCategory.innerHTML += `
        <div class="flex justify-between">
            <p id="${id}" class="bg-[#F599BF]/75 capitalize p-1 rounded">${name}</p>
            <div>
                <button class="btnEdit text-[#F599BF] font-semibold" onclick="categoryEdit(${id})">Editar</button>
                <button class="btnDelete pl-3 font-bold text-red-600" data-id=${id} ">Eliminar</button>
            </div>
        </div>
        `
        })
}

const filterListCategory = (categories) => {
    categories.map(categories => {
        const { name } = categories
        console.log(name)
        selectFilterCategory.innerHTML += `
        <option value="${name}">${name}</option>
        `
    })
}


const findCategory = (id) => {
    return categoryList.find(category => category.id === parseInt(id))
}
const categoryEdit = (id) => {
    const chosenCategory = findCategory(id)
    $("#input-edit-category").value = chosenCategory.name
    btnEditCategory.setAttribute("data-id", id)
}
const saveCategoryData = (id) => {
    return {
        id: id,
        name: $("#input-edit-category").value   
    }
}
const categoryEdit2 = (id) => {
    return categoryList.map(category => {
        if (category.id === parseInt(id)) {
            return saveCategoryData(id)
        }
        return category
    })
}

btnEditCategory.addEventListener("click", () => {
    const catId = btnEditCategory.getAttribute("data-id")
    containerCategory.innerHTML= ""
    generateCategory(categoryEdit2(parseInt(catId)))
})

let btnDelete = $$('.btnDelete')

const removeCategory = (id) => {
    return categoryList.filter(category => category.id !== parseInt(id))
}





// ***************************************** Events *******************************************

logo.addEventListener('click', () =>{
    changeSection(logo)
})

btnBalances.addEventListener('click', () =>{
    changeSection(btnBalances)
})

btnCategories.addEventListener('click', () =>{
    changeSection(btnCategories)
})

btnReports.addEventListener('click', () =>{
    changeSection(btnReports)
})

btnNewOperation.addEventListener('click', () =>{
    changeSection(btnNewOperation)
})

for (const btn of btnEdit) {
    btn.addEventListener('click', () =>{
        changeSection(btnEdit)
    })
}

// Button for add category

btnAddCategory.addEventListener('click', () =>{
    saveCategories.push({
        id:categoryList.length +1,
        name:inputCategory.value 
    })
    containerCategory.innerHTML= ""
    localStorage.setItem("categories", JSON.stringify(saveCategories))
    generateCategory(saveCategories)
})

for (const btn of btnDelete) {
    btn.addEventListener('click', () =>{
        const productId = btn.getAttribute("data-id")
        containerCategory.innerHTML= ""
        generateCategory(removeCategory(productId))
    })
}


selectFilterCategory.addEventListener('change', (e) =>{
    console.log(e.currentTarget.value)
    // poner acá lo que va a pasar al cambiar el filtro de categoría
})

// Window on load

window.addEventListener('load', () => {
    const lsCategories = JSON.parse(localStorage.getItem("categories"));
    if(lsCategories == null){
        saveCategories = [...categoryList];
    }else{
        saveCategories = [...lsCategories];
    }
    generateCategory(saveCategories)
    filterListCategory(saveCategories);
})