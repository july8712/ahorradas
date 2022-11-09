const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// ************** Variables ****************

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

// Categories and add new operation

const containerCategory = $('#containerCategory')
const inputCategory = $('#input-category')
const btnAddCategory = $('#add-category')
const btnAddOperation = $('#btnAddOperation')

// ver si estas variables van acá

const inputSelectCategory = $('#categoryOperation')
let inputDescription = $('#input-description-operation')
let inputMont = $('#input-mont-operation')
let tbodyOperation = $('#tbodyOperation')
let inputDateForm = $('#dateForm')

// Filters

const hideFilters = $('#hideFilters');
const formFilters = $('#formFilters');
const date = $('#date');


// ************** End Variables ****************

// ************** Arrays of Objects **************

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

let operationList = []

// *************** Functions ***************

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

        // case btnEdit:
        //     secBalance.style.display = 'none' 
        //     secCategories.style.display = 'none'
        //     secReports.style.display = 'none'
        //     newOperation.style.display = 'none'
        //     editCategory.style.display = 'block'
        // break;
   }
}

// Functions for Local Storage

const getDataFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

const saveDataInLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data))
}

if (!getDataFromLocalStorage('categories')) {
    saveDataInLocalStorage('categories', categoryList)
}

// filter 

const filterListCategory = (categories) => {
    categories.map(categories => {
        const { name } = categories
        selectFilterCategory.innerHTML += `
        <option value="${name}">${name}</option>
        `
    })
}
// Function to capitalize the first letter

const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1);
}

// generateCategory

const generateCategory = (categories) => {
    containerCategory.innerHTML = ""
    categories.map(category => {
        const { id, name } = category
        containerCategory.innerHTML += `
        <div class="flex justify-between">
            <p id="${id}" class="bg-[#F599BF] p-1 rounded">${name}</p>
            <div>
                <button class="btnEdit text-[#F599BF] font-semibold" onclick="categoryEdit(${id})">Editar</button>
                <button class="btnDelete pl-3 font-bold text-red-600" data-id=${id}>Eliminar</button>
            </div>
        </div>
        `
        })
        const btnEdit = $$('.btnEdit')
        for (const btn of btnEdit) {
            btn.addEventListener('click', () =>{
                //console.log(btn)
            secBalance.style.display = 'none' 
            secCategories.style.display = 'none'
            secReports.style.display = 'none'
            newOperation.style.display = 'none'
            editCategory.style.display = 'block'
                
            })
        }
        const btnDelete = $$('.btnDelete')
        for (const btn of btnDelete) {
            btn.addEventListener('click', () =>{
                const btnDeleteId = btn.getAttribute("data-id")
                removeCategory(btnDeleteId)
                saveDataInLocalStorage('categories', removeCategory(btnDeleteId))
                generateCategory(removeCategory(btnDeleteId))
                filterListCategory(removeCategory(btnDeleteId))
            })
        }
      
}
const btnEditCategory = $('#btn-cat-edit')
const findCategory = (id) => {
    return categoryList.find(category => category.id === parseInt(id))
}
const categoryEdit = (id) => {
    const chosenCategory = findCategory(id)
    $(".input-edit-category").value = chosenCategory.name
    btnEditCategory.setAttribute("data-id", parseInt(id))
}
const saveCategoryData = (id) => {
    return {
        id: id,
        name: $(".input-edit-category").value   
    }  
}

const removeCategory = (id) => {
    return getDataFromLocalStorage('categories').filter(category => category.id !== parseInt(id))
}

const categoryEditInput = (id) => {
    return getDataFromLocalStorage('categories').map(category => {
        if (category.id === parseInt(id)) {
            return saveCategoryData(id)
        }
        return category
    })
}
btnEditCategory.addEventListener("click", () => {
    console.log(btnEditCategory)
    const catId = btnEditCategory.getAttribute("data-id")
    console.log(catId)
    containerCategory.innerHTML= ""
    generateCategory(categoryEditInput(catId))
})



// newOperationFunctionality

let generateOperationTable = (categories) =>{
    categories.map(categories => {
        const { name } = categories
        inputSelectCategory.innerHTML += `
        <option value="${name}">${name}</option>
        `
    })
}

btnAddOperation.addEventListener("click", (e) => {
    e.preventDefault()
    operationList.push({
        description:inputDescription.value,
        category:inputSelectCategory.value,
        mont:inputMont.value
        
    })
    $('#imgOperations').classList.add('hidden')
    $('#table').classList.remove('hidden')
    tbodyOperation.innerHTML= ""
    generateTable(operationList)
    
})

inputDateForm.addEventListener("change", (e) =>{
    dateSelect = e.target.value
})

const generateTable = (operationList) =>{
    for (const {description, category, mont} of operationList){
        tbodyOperation.innerHTML += `<tr>
        <th class="capitalize">${description}</th>
        <th>${category}</th>
        <th>${dateSelect}</th>
        <th>${mont}</th>
        <th><button class="pl-3 font-bold text-red-600">Editar</button>
        <button class="pl-3 font-bold text-red-600">Eliminar</button></th>
    </tr>`
        
    }
}


// Date filter

const year = new Date().getFullYear()
const month = new Date().getMonth()
date.value = `${year}-${month+1}-01`

// ************** Events ****************

logo.addEventListener('click', () =>{
    changeSection(logo)
})

btnBalances.addEventListener('click', () =>{
    changeSection(btnBalances)
})

btnCategories.addEventListener('click', () =>{
    changeSection(btnCategories)
    generateCategory(getDataFromLocalStorage('categories'))
})

btnReports.addEventListener('click', () =>{
    changeSection(btnReports)
})

btnNewOperation.addEventListener('click', () =>{
    changeSection(btnNewOperation)
    
})

// Button for add category

btnAddCategory.addEventListener('click', () =>{
    let categoriesLocalStorage = getDataFromLocalStorage('categories')
    categoriesLocalStorage.push({
        id: categoriesLocalStorage.length,
        name:capitalize(inputCategory.value) 
    })
    containerCategory.innerHTML= ""
    localStorage.setItem("categories", JSON.stringify(categoriesLocalStorage))
    generateCategory(getDataFromLocalStorage('categories'))
    selectFilterCategory.innerHTML= ""
    filterListCategory(getDataFromLocalStorage('categories'));
    inputCategory.value = ""
    inputSelectCategory.innerHTML= "" 
    generateOperationTable(getDataFromLocalStorage('categories'))
    console.log(getDataFromLocalStorage('categories'))
})

selectFilterCategory.addEventListener('change', (e) =>{
    console.log(e.currentTarget.value)
    // poner acá lo que va a pasar al cambiar el filtro de categoría
})

hideFilters.addEventListener('click',() => {
    formFilters.classList.toggle('hidden')
    if(formFilters.classList.contains('hidden')){
        hideFilters.innerHTML = 'Mostrar Filtros'
    }else{
        hideFilters.innerHTML = 'Ocultar Filtros'
    }
})

// Window on load

window.addEventListener('load', () => {
    generateCategory(getDataFromLocalStorage('categories'))
    filterListCategory(getDataFromLocalStorage('categories'))
    generateOperationTable(getDataFromLocalStorage('categories'))
})