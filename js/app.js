const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// ************** Variables ****************

// Buttons

const logo = $('#logo');
const btnBalances = $('#btn-balances');
const btnCategories = $('#btn-categories');
const btnReports = $('#btn-reports');
const btnNewOperation = $('#new-operation');
const btnCancel = $('#btn-cat-cancel');
const btnCancelOperation = $('#btnCancelOperation')

// Sections

const secBalance = $('#secBalance');
const secCategories = $('#secCategories');
const secReports = $('#secReports');
const newOperation = $('#newOperation');
const editCategory = $('#editCategory');

// Balance 

const selectFilterCategory = $('#category');
const positiveBalance = $('#positiveBalance')
const negativeBalance = $('#negativeBalance')
const totalBalance = $('#total')

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
const selectTypeOperation = $('#selectTypeOperation');
const selectTypeFilter = $('#typeFilter');
const selectOrder = $('#order');
// const selectCategoryFilter = $('#category');


// ************** End Variables ****************

// ************** Arrays of Objects **************

const categoryList = [
    // {
    //     id: 0,
    //     name: "Todas"
    // },
    {
        id: 1,
        name: "Comida"
    },
    {
        id: 2,
        name: "Servicios"
    },
    {
        id: 3,
        name: "Educación"
    },
    {
        id: 4,
        name: "Transporte"
    },
    {
        id: 5,
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

        case btnCancel:
            secBalance.style.display = 'none' 
            secCategories.style.display = 'block'
            secReports.style.display = 'none'
            newOperation.style.display = 'none'
            editCategory.style.display = 'none'
        break;

        case btnCancelOperation:
            secBalance.style.display = 'block' 
            secCategories.style.display = 'none'
            secReports.style.display = 'none'
            newOperation.style.display = 'none'
            editCategory.style.display = 'none'
        break;


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
    return getDataFromLocalStorage("categories").find(category => category.id === parseInt(id))
}
const categoryEdit = (id) => {
    const chosenCategory = findCategory(id)
    $(".input-edit-category").value = chosenCategory.name
    btnEditCategory.setAttribute("data-id", parseInt(id))
}
const saveCategoryData = (id) => {
    return {
        id: parseInt(id),
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
    // console.log(btnEditCategory)
    const catId = btnEditCategory.getAttribute("data-id")
    // console.log(catId)
    containerCategory.innerHTML= ""
    secBalance.style.display = 'none' 
    secCategories.style.display = 'block'
    secReports.style.display = 'none'
    newOperation.style.display = 'none'
    editCategory.style.display = 'none'
    saveDataInLocalStorage('categories', categoryEditInput(catId))
    generateCategory(getDataFromLocalStorage('categories'))
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

const colors = () => {
    if (selectTypeOperation.value === 'Gasto') {
        return true
    }return false
}

btnAddOperation.addEventListener("click", (e) => {
    e.preventDefault()

    // console.log("estoy acá",selectTypeOperation.value)

    let operations = getDataFromLocalStorage("operations") || [];
    operations.push({
        id: operations.length +1,
        description:capitalize(inputDescription.value),
        category:inputSelectCategory.value,
        dateSelect: inputDateForm.value,
        type: selectTypeOperation.value,
        mont:inputMont.value,
        selectTypeOperation: colors()
    });

    saveDataInLocalStorage('operations', operations)
    
    $('#imgOperations').classList.add('hidden')
    $('#table').classList.remove('hidden')
    tbodyOperation.innerHTML= ""
    generateTable(operations)
    $('#formNewOperation').reset()
    showBalance("Ganancia")
    showBalance("Gasto")
    showBalance("Total")
})

inputDateForm.addEventListener("change", (e) =>{
    dateSelect = e.target.value
})

const generateTable = (data) =>{
    const operations = data || [];
    if(operations.length > 0) {
        for (const {id, description, category, dateSelect, mont, selectTypeOperation} of operations){
            tbodyOperation.innerHTML += `
            <div class="flex font-semibold flex-wrap md:w-full md:px-0 justify-around" >
                <div class="flex w-full justify-between md:w-auto">
                    <p class="text-left md:text-center mt-5 md:mt-0 md:w-[150px]">${description}</p>
                    <p class="text-right md:text-center mt-5 md:mt-0 md:w-[150px]">${category}</p>
                </div>
                <p class="md:w-[150px] text-center mt-5 md:mt-0 hidden sm:hidden lg:inline-block  ">${formatDate(dateSelect)}</p>
                <div class="flex w-full md:w-auto mb-2 border-b-2 md:border-b-0 pb-3 border-[#be185d] justify-between">
                    <div class="md:w-[150px]">
                    <div class="text-left md:text-center ${selectTypeOperation ? "text-red-600" : "text-green-600"} md:w-auto">$${mont}</div>
                    </div>
                    <div class="mt-5 md:mt-0 flex justify-around md:w-[150px]">
                        <button class="btnEditOperation pl-3 text-[#F599BF] font-semibold" onclick="operationEdit(${id})" data-id=${id} >Editar</button>
                        <button class="btnDeleteOperation pl-3 font-bold text-red-600" data-id=${id}>Eliminar</button>
                    </div>
                </div>
            </div>`
        } 
        for (const btn of $$('.btnEditOperation')) {
            btn.addEventListener('click', () =>{
                // console.log(btn)
                secBalance.style.display = 'none' 
                secCategories.style.display = 'none'
                secReports.style.display = 'none'
                newOperation.style.display = 'block'
                editCategory.style.display = 'none'
                const operationId = btn.getAttribute("data-id")
                saveDataInLocalStorage('operations', operationEditInput(operationId))
                tbodyOperation.innerHTML= ""
                generateTable(operationEditInput(operationId))
               
                
            })
        }
        for (const btn of $$('.btnDeleteOperation')){
            btn.addEventListener('click', () => {
                console.log(btn) 
                const btnDeleteIdd = btn.getAttribute("data-id")
                removeOperation(btnDeleteIdd) 
                saveDataInLocalStorage('operations', removeOperation(btnDeleteIdd))
                tbodyOperation.innerHTML= ""
                generateTable(removeOperation(btnDeleteIdd)) 
            })
        }

        $('#imgOperations').classList.add('hidden')
        $('#table').classList.remove('hidden')
        
    }
    
}
const removeOperation = (id) => {
    showBalance("Ganancia")
    showBalance("Gasto")
    showBalance("Total")
    return getDataFromLocalStorage('operations').filter(operation => operation.id !== parseInt(id))
}
const findOperation = (id) => {
    return getDataFromLocalStorage('operations').find(operation => operation.id === parseInt(id))
}
const operationEdit = (id) => {
    const chosenOperation = findOperation(id)
    console.log(chosenOperation)
    inputDescription.value = chosenOperation.description
    inputDescription.value = chosenOperation.category
    inputDateForm.value = chosenOperation.dateSelect
    selectTypeOperation.value = chosenOperation.type
    inputMont.value = chosenOperation.mont
    
    
}
const saveOperationData = (id) => {
    return {
        id: parseInt(id),
        description:inputDescription.value,
        category:inputDescription.value,
        dateSelect:inputDateForm.value,
        type:selectTypeOperation.value,
        mont: inputMont.value,
    }  
}

const operationEditInput = (id) => {
    return getDataFromLocalStorage('operations').map(operation => {
        if (operation.id === parseInt(id)) {
            return saveOperationData(id)
        }
        return operation
    })
}


const formatDate = (date) => {
    return date.split("-").reverse().join("-");
}

// Date filter

const year = new Date().getFullYear()
const month = new Date().getMonth()
date.value = `${year}-${month+1}-01`

// function Filters

// const filteredOperations = [];
const filterBy = (typeOfFilter, propiedad) => {
    const operations = getDataFromLocalStorage('operations');
    let filteredOperations = operations.filter(operation =>
        
        {
            tbodyOperation.innerHTML = ""
            return operation[propiedad] === typeOfFilter
        } ) ;
        generateTable(filteredOperations)
}

const filterByDate = (dateSince) => {
    const operations = getDataFromLocalStorage('operations');
    let filteredOperations = operations.filter(operation =>
        
        {
            tbodyOperation.innerHTML = ""
            return operation["dateSelect"] >= dateSince
        } ) ;
        generateTable(filteredOperations)
}
// functions order by
const orderByToLowerToHigherAmount  = (mont) => {
    return getDataFromLocalStorage('operations').sort((a,b) => a.mont - b.mont)
}
const orderByToHigherToLowerAmount = (mont) => {
    return getDataFromLocalStorage('operations').sort((a,b) => b.mont - a.mont)
}
const orderByZToA = (description) => {
    return getDataFromLocalStorage('operations').sort((a,b) =>{
    if (a.description < b.description) {
        return 1
    }if (a.description > b.description) {
        return -1
    } return 0
    }) 
}
const orderByAToZ = (description) => {
    return getDataFromLocalStorage('operations').sort((a,b) =>{
        if (a.description > b.description) {
            return 1
        }if (a.description < b.description) {
            return -1
        } return 0
    }) 
}
convertirFecha = (dateSelect) => {
    let fechaSp = dateSelect.split("-");
    let anio = new Date().getFullYear();
    if (fechaSp.length == 3) {
      anio = fechaSp[2];
    }
    var mes = fechaSp[1] - 1;
    var dia = fechaSp[0];
  
    return new Date(anio, mes, dia);
  }
const orderByLessRecent = (dateSelect) => {
    return getDataFromLocalStorage('operations').sort((a, b) => { 
        return convertirFecha(a.dateSelect) - convertirFecha(b.dateSelect); 
   })
}
const orderByMoreRecent = (dateSelect) => {
    return getDataFromLocalStorage('operations').sort((a, b) => { 
        return convertirFecha(b.dateSelect) - convertirFecha(a.dateSelect); 
   })
}


const calculateBalance = (balanceType) => {
    const operations = getDataFromLocalStorage('operations');
    return operations.filter(operation => 
        {
            return operation.type === balanceType
        } )
        .reduce((accumulator, operation) => accumulator + parseInt(operation.mont), 0) ;
}



const showBalance = (type) => {
    if(type === 'Ganancia'){
        positiveBalance.innerHTML = "$" + calculateBalance("Ganancia")
    }else if(type === 'Gasto'){
        negativeBalance.innerHTML = "-$" + calculateBalance("Gasto")
    }else if(type === 'Total'){
        const total = calculateBalance("Ganancia")-calculateBalance("Gasto")
        console.log(total);
        if (total > 0) {
            totalBalance.innerHTML = "$" + total
            totalBalance.classList.add("text-green-600")
            if(totalBalance.classList.contains("text-red-600")){
                totalBalance.classList.remove("text-red-600")
                console.log(" if tiene clase roja");
            }
        }else if (total < 0){
            totalBalance.innerHTML = "-$" + Math.abs(total)
            totalBalance.classList.add("text-red-600")
            if(totalBalance.classList.contains("text-green-600")){
                totalBalance.classList.remove("text-green-600")
                console.log(" if tiene clase verde");
            }
        } else if (total === 0){
            totalBalance.innerHTML = "$" + total
            totalBalance.classList.remove("text-green-600")
            totalBalance.classList.remove("text-red-600")
        }
    }
}

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

btnCancel.addEventListener('click', () =>{
    changeSection(btnCancel)
})

btnCancelOperation.addEventListener('click', () => {
    changeSection(btnCancelOperation)
})

// Button for add category

btnAddCategory.addEventListener('click', () =>{
    //validacion 
    let categoriesLocalStorage = getDataFromLocalStorage('categories')
    categoriesLocalStorage.push({
        id: categoriesLocalStorage.length +1,
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



hideFilters.addEventListener('click',() => {
    formFilters.classList.toggle('hidden')
    if(formFilters.classList.contains('hidden')){
        hideFilters.innerHTML = 'Mostrar Filtros'
    }else{
        hideFilters.innerHTML = 'Ocultar Filtros'
    }
})

// event select filter of type

selectTypeFilter.addEventListener('change', (e) => {
    if(e.target.value != "all"){
        filterBy(e.target.value, "type")   
    }else{
        tbodyOperation.innerHTML = ""
        generateTable(getDataFromLocalStorage('operations'))
    }
})

selectFilterCategory.addEventListener('change', (e) => {
    if(e.target.value != "all"){
        filterBy(e.target.value, "category")   
    }else{
        tbodyOperation.innerHTML = ""
        generateTable(getDataFromLocalStorage('operations'))
    }    
})

date.addEventListener('change', (e) => {
    filterByDate(e.target.value)   
})

selectOrder.addEventListener('change', (e) => {
    if(e.target.value == "mayMon"){
        tbodyOperation.innerHTML = ""
        generateTable(orderByToHigherToLowerAmount()) 
    }if (e.target.value == "menMon") {
        tbodyOperation.innerHTML = ""
        generateTable(orderByToLowerToHigherAmount())
    } if (e.target.value == "za") {
        tbodyOperation.innerHTML = ""
        generateTable(orderByZToA())  
    }if (e.target.value == "az") {
        tbodyOperation.innerHTML = ""
        generateTable(orderByAToZ())    
    }if (e.target.value == "masRec") {
        tbodyOperation.innerHTML = ""
        generateTable(orderByMoreRecent())
    }if (e.target.value == "menRec") {
        tbodyOperation.innerHTML = ""
        generateTable(orderByLessRecent())
    }
})

// Window on load

window.addEventListener('load', () => {
    generateCategory(getDataFromLocalStorage('categories'))
    filterListCategory(getDataFromLocalStorage('categories'))
    generateOperationTable(getDataFromLocalStorage('categories'))
    generateTable(getDataFromLocalStorage('operations'))
    if (getDataFromLocalStorage('operations')) {
        showBalance("Ganancia")
        showBalance("Gasto")
        showBalance("Total")
    }
})