const $ = (selector) => document.querySelector(selector)
const $$ = (selector) => document.querySelectorAll(selector)

// ***** Variables *******

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

let inputSelectCategory = $('#categoryOperation')
let inputDescription = $('#input-description-operation')
let inputAmount = $('#input-amount-operation')
let tbodyOperation = $('#tbodyOperation')
let inputDateForm = $('#dateForm')

// Filters

const hideFilters = $('#hideFilters');
const formFilters = $('#formFilters');
const date = $('#date');
const selectTypeOperation = $('#selectTypeOperation');
const selectTypeFilter = $('#typeFilter');
const selectOrder = $('#order');

// Reports

const catMoreGain = $('#catMoreGain')
const amountMoreGain = $('#amountMoreGain')
const catMinorGain = $('#catMinorGain')
const amountMinorGain = $('#amountMinorGain')
const catMoreBalance = $('#catMoreBalance')
const amountMoreBalance = $('#amountMoreBalance')
const contDates = $("#contDates")

// ***** End Variables *******

// ***** Arrays of Objects *****

const categoryList = [
    {
        id: 0,
        name: "Todas"
    },
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

// ***** Functions *****

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
            separateCategories(getDataFromLocalStorage('operations'), balanceCategories)
            calculateTotalsForCategories(balanceCategories)
            showDataByMonth()
            negativeDates = separateDates(getDataFromLocalStorage('operations'), "Gasto");
            positiveDates = separateDates(getDataFromLocalStorage('operations'), "Ganancia");
            getHigherDate(positiveDates, "positive")
            getHigherDate(negativeDates, "negative")
            printReport(balanceCategories, "Ganancia")
            printReport(balanceCategories, "Gasto")
            printReport(balanceCategories, "balance")
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
    if (categories.length < 0) return;
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
    if (categories.length < 0) return;
    containerCategory.innerHTML = ""
    categories.map(category => {
        const { id, name } = category
        if (id != 0) {
            containerCategory.innerHTML += `
            <div class="flex justify-between">
                <p id="${id}" class="bg-[#F599BF] p-1 rounded">${name}</p>
                <div>
                    <button class="btnEdit text-[#F599BF] font-semibold" onclick="categoryEdit(${id})">Editar</button>
                    <button class="btnDelete pl-3 font-bold text-red-600" data-id=${id}>Eliminar</button>
                </div>
            </div>
            `
        }
        
        })
        const btnEdit = $$('.btnEdit')
        for (const btn of btnEdit) {
            btn.addEventListener('click', () =>{
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
    const catId = btnEditCategory.getAttribute("data-id")
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
    if (categories.length < 0) return;
    categories.map(categories => {
        const { name, id } = categories
        if(id != 0){
           inputSelectCategory.innerHTML += `
        <option value="${name}">${name}</option>
        ` 
        }
    })
}

const colors = () => {
    if (selectTypeOperation.value === 'Gasto') {
        return true
    }return false
}

if (!getDataFromLocalStorage("operations") || getDataFromLocalStorage("operations").length <= 0) {
    const initialOperations = []
    saveDataInLocalStorage('operations', initialOperations)
}
const randomId = (num1, num2) => {
    return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
}

btnAddOperation.addEventListener("click", (e) => {
    e.preventDefault() 
    let operations = getDataFromLocalStorage("operations") || [];
    operations.push({
        id: randomId(10,500),
        description:capitalize(inputDescription.value),
        category:inputSelectCategory.value,
        dateSelect: inputDateForm.value,
        type: selectTypeOperation.value,
        amount:inputAmount.value,
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
    printReport(balanceCategories, "Ganancia")
    printReport(balanceCategories, "Gasto")
    printReport(balanceCategories, "balance")
    dateForm.value = currentDate
 
})

$('#btnEditarOp').addEventListener('click', () => {
    const operationId = $('#btnEditarOp').getAttribute("data-id")
    saveDataInLocalStorage('operations', operationEditInput(operationId))
    tbodyOperation.innerHTML = ""
    generateTable(getDataFromLocalStorage('operations'))
    

})

inputDateForm.addEventListener("change", (e) =>{
    dateSelect = e.target.value
})

const generateTable = (data) =>{
    const operations = data || [];
    inputDateForm.value = currentDate
    if(operations.length > 0) {
        for (const {id, description, category, dateSelect, amount, selectTypeOperation} of operations){
            tbodyOperation.innerHTML += `
            <div class="flex font-semibold flex-wrap md:w-full md:px-0 justify-around" >
                <div class="flex w-full justify-between md:w-auto">
                    <p class="text-left md:text-center mt-5 md:mt-0 md:w-[150px]">${description}</p>
                    <p class="text-right md:text-center mt-5 md:mt-0 md:w-[150px]">${category}</p>
                </div>
                <p class="md:w-[150px] text-center mt-5 md:mt-0 hidden sm:hidden lg:inline-block  ">${formatDate(dateSelect)}</p>
                <div class="flex w-full md:w-auto mb-2 border-b-2 md:border-b-0 pb-3 border-[#be185d] justify-between">
                    <div class="md:w-[150px]">
                    <div class="text-left md:text-center ${selectTypeOperation ? "text-red-600" : "text-green-600"} md:w-auto">$${amount}</div>
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
                btnAddOperation.classList.add('hidden')
                $('#h2-form').classList.add('hidden')
                $('#btnEditarOp').classList.remove('hidden')
                $('#h2-form-edit').classList.remove('hidden')
                
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
    inputSelectCategory.value = chosenOperation.category
    inputDateForm.value = chosenOperation.dateSelect
    selectTypeOperation.value = chosenOperation.type
    inputAmount.value = chosenOperation.amount
    $('#btnEditarOp').setAttribute("data-id", parseInt(id))
}

const saveOperationData = (id) => {
    return {
        id: parseInt(id),
        description:inputDescription.value,
        category:inputSelectCategory.value,
        dateSelect:inputDateForm.value,
        type:selectTypeOperation.value,
        amount: inputAmount.value,
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
const day = new Date().getDate()
const currentDate = `${year}-${month+1}-${day}`
date.value = `${year}-${month+1}-01`
console.log(currentDate, "currentDate");
// function Filters

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

const orderByToLowerOrHigherAmount  = (orderBy) => {
    let order = []
    switch (orderBy) {
        case "ab":
            order = getDataFromLocalStorage('operations').sort((a,b) => a.amount - b.amount)
        break
        case "ba":
            order = getDataFromLocalStorage('operations').sort((a,b) => b.amount - a.amount)
        break
    }
    return order
}


// unificar funciones de orden

const orderBy = (order) => {
    let orderByLetter = []
    switch (order) {
        case "za":
            orderByLetter = getDataFromLocalStorage('operations').sort((a,b) =>{
            if (a.description < b.description) {
                return 1
            }if (a.description > b.description) {
                return -1
            } return 0
            }) 
        break;
        case "az":
            orderByLetter = getDataFromLocalStorage('operations').sort((a,b) =>{
                if (a.description > b.description) {
                    return 1
                }if (a.description < b.description) {
                    return -1
                } return 0
            }) 
        break
    }
    return orderByLetter
}

const orderDate = (dateSelect) => {
    let fechaSp = dateSelect.split("-");
    let year = new Date().orderDate
    if (fechaSp.length == 3) {
      year = fechaSp[2];
    }
    var month = fechaSp[1] - 1;
    var day = fechaSp[0];
  
    return new Date(year, month, day);
}

const orderByLessOrMoreRecent = (order) => {
    let orderDateFor = []
    switch (order) {
        case "less":
            orderDateFor = getDataFromLocalStorage('operations').sort((a, b) => { 
            return orderDate(a.dateSelect) - orderDate(b.dateSelect); 
            }) 
        break
        case "more":
            orderDateFor =  getDataFromLocalStorage('operations').sort((a, b) => { 
            return orderDate(b.dateSelect) - orderDate(a.dateSelect); 
            })
        break
        }
    return orderDateFor
}

const calculateBalance = (balanceType) => {
    const operations = getDataFromLocalStorage('operations');
    return operations.filter(operation => 
        {
            return operation.type === balanceType
        } )
        .reduce((accumulator, operation) => accumulator + parseInt(operation.amount), 0) ;
}

const showBalance = (type) => {
    if(type === 'Ganancia'){
        positiveBalance.innerHTML = "$" + calculateBalance("Ganancia")
    }else if(type === 'Gasto'){
        negativeBalance.innerHTML = "-$" + calculateBalance("Gasto")
    }else if(type === 'Total'){
        const total = calculateBalance("Ganancia")-calculateBalance("Gasto")
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



// ***** Events *******
$('#btn-menu-burguer').addEventListener('click', () => {
    $('#navbar-menu-burguer').classList.toggle('hidden')
 
})
$('#btn-balances-burguer').addEventListener('click', () => {
    changeSection(btnBalances)
})
$('#btn-categories-burguer').addEventListener('click', () => {
    changeSection(btnCategories)
    generateCategory(getDataFromLocalStorage('categories'))
})
$('#btn-reports-burguer').addEventListener('click', () => {
    changeSection(btnReports)
    generateCategory(getDataFromLocalStorage('categories'))
})

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
    let categoriesLocalStorage = getDataFromLocalStorage('categories')
    let newCategory = capitalize(inputCategory.value.toLowerCase())

    let categoryExists = false;
    for (const category of categoriesLocalStorage) {
        if(newCategory === category.name){
            categoryExists = true;
        }
    }
 
    if(!categoryExists){
        categoriesLocalStorage.push({
            id: randomId(10,500),
            name:newCategory 
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
    }
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
        generateTable(orderByToLowerOrHigherAmount("ba")) 
    }if (e.target.value == "menMon") {
        tbodyOperation.innerHTML = ""
        generateTable(orderByToLowerOrHigherAmount("ab"))
    }if (e.target.value == "za") {
        tbodyOperation.innerHTML = ""
        generateTable(orderBy("za"))  
    }if (e.target.value == "az") {
        tbodyOperation.innerHTML = ""
        generateTable(orderBy("az"))    
    }if (e.target.value == "masRec") {
        tbodyOperation.innerHTML = ""
        generateTable(orderByLessOrMoreRecent("more"))
    }if (e.target.value == "menRec") {
        tbodyOperation.innerHTML = ""
        generateTable(orderByLessOrMoreRecent("less"))
    }
})

// ********** Reports functions ***********

// Top earning category
// totalGainForCategory
let balanceCategories = {}

const separateCategories = (operations, newArray) => {
    for (const operation of operations){
        newArray[operation.category] = {}
       
        newArray[operation.category]["Ganancia"] = operations
            .filter((op) => op.category === operation.category && op.type === "Ganancia")
            .reduce((accumulator, operation) => accumulator + parseInt(operation.amount), 0);


        newArray[operation.category]["Gasto"] = operations
            .filter((op) => op.category === operation.category && op.type === "Gasto")
            .reduce((accumulator, operation) => accumulator + parseInt(operation.amount), 0);
        
        newArray[operation.category]["balance"] = newArray[operation.category]["Ganancia"] - newArray[operation.category]["Gasto"];
        newArray[operation.category]["Month"] = operation.dateSelect.slice(5,7)
        newArray[operation.category]["Year"] = operation.dateSelect.slice(0,4)
    }
    return newArray
}


const filterOfDate = () => {
    const arrayDates = [];
    for (const dates of getDataFromLocalStorage('operations')) {
        let dateOfCreation = dates.dateSelect.slice(0,7)
        if(arrayDates.indexOf(dateOfCreation) == -1) {
            arrayDates.push(dateOfCreation);
        }
    }
    console.log(arrayDates, "arrayDates");
    return arrayDates;
}

const separateDates = (operations, type) => {
    let balanceDates = {}
    const arrayDates = filterOfDate();
    for (const operation of operations){
        for(const date of arrayDates) {
            if(operation.dateSelect.slice(0,7) === date && operation.type === type) {
                if(balanceDates[date]) {
                    balanceDates[date] += parseInt(operation.amount);
                } else {
                    balanceDates[date] = parseInt(operation.amount);
                }
            }
        }
    }
    console.log(balanceDates, "balanceDates")
    return balanceDates
}

const showDataByMonth = () => {
    let dataByMonth = {};
    const operations = getDataFromLocalStorage('operations');
    const arrayDates = filterOfDate();
// recorro el array de operaciones
    for (const operation of operations){
        // recorro el array de fechas
        for(const date of arrayDates) {
            // filtro la operación por fecha
            if(operation.dateSelect.slice(0,7) === date) {
                // pregunto si la fecha existe en el objeto nuevo
                if(dataByMonth[date]) {
                    // si existe crea un nuevo valor con el tipo gasto/ganancia y le asigna el monto
                    if(dataByMonth[date][operation.type]) {
                        dataByMonth[date][operation.type] += parseInt(operation.amount);
                    } else {
                        dataByMonth[date][operation.type] = parseInt(operation.amount);
                    }
                } else {
                    // si no existe lo crea
                    dataByMonth[date] = {};
                    dataByMonth[date][operation.type] = parseInt(operation.amount);
                }
            }
        }
    }
    // vuelvo a recorrer el nuevo objeto y si no existe le agrego un valor de gasto y uno de ganancia
    for (const date in dataByMonth) {
        const categories = ["Ganancia", "Gasto"];
        categories.map((category) => {
            if (!dataByMonth[date][category]) {
                dataByMonth[date][category] = 0;
            }
        });
        // calculo el balance
        dataByMonth[date]["balance"] = 
        parseInt(dataByMonth[date]["Ganancia"]) - 
        parseInt(dataByMonth[date]["Gasto"]);
    }
    // devuelvo el objeto para mostrar los totales por fecha
    return dataByMonth
}

const showResults = (array, type) => {
    let nameResult, result = 0;
    for(const name in array) {
        for (const column in array[name]) {       
            if(column === type && array[name][column] > result){
                result = array[name][column]
                nameResult = name
            }
        }
    }
    return {nameResult, result};
}

const getHigherDate = (array, type) => {
    let nameDatePositive, nameDateNegative, resultDatePositive = 0, resultDateNegative = 0;
    for(const name in array) {
        if(type === "positive"){
            if(resultDatePositive < array[name]){
            resultDatePositive = array[name]
            nameDatePositive = name
            }
        }else if (type === "negative"){
            if(resultDateNegative < array[name]){
            resultDateNegative = array[name]
            nameDateNegative = name
            }
        }
    }
    if(type === "positive"){
        return {nameDatePositive, resultDatePositive};
    }else{
        return {nameDateNegative, resultDateNegative};
    }
}

let negativeDates = separateDates(getDataFromLocalStorage('operations'), "Gasto");
let positiveDates = separateDates(getDataFromLocalStorage('operations'), "Ganancia");

const monthMoreGain = $("#monthMoreGain")
const monthAmountMoreGain = $("#monthAmountMoreGain")
const monthMinorGain = $("#monthMinorGain")
const montAmountMinorGain = $("#montAmountMinorGain")

// Function for print reports

const printReport = (array, type) => {

    const {nameResult, result} = showResults(array, type);
    const {nameDatePositive, resultDatePositive} = getHigherDate(positiveDates, "positive")
    const {nameDateNegative, resultDateNegative} = getHigherDate(negativeDates, "negative")
    calculateTotalsForMonth()
    if (type === "Ganancia") {
        catMoreGain.innerHTML = `${nameResult}`
        amountMoreGain.innerHTML = `+$${result}`
    }
    if (type === "Gasto"){
        catMinorGain.innerHTML = `${nameResult}`
        amountMinorGain.innerHTML = `-$${result}` 
    }
    if (type === "balance"){
        catMoreBalance.innerHTML = `${nameResult}`
        amountMoreBalance.innerHTML = `$${result}` 
    }
    
    monthMoreGain.innerHTML = `${nameDatePositive}`
    monthAmountMoreGain.innerHTML = `+${resultDatePositive}`
    monthMinorGain.innerHTML = `${nameDateNegative}`
    montAmountMinorGain.innerHTML = `-${resultDateNegative}`
}

const totals = {}
const contCategory = $("#contCategory")

const calculateTotalsForCategories = (object) => { 
    contCategory.innerHTML = ""
    for (let balanceCategory in object) {
        contCategory.innerHTML += `<div class="flex justify-between py-4 font-medium">
                                    <p class=" text-right bg-[#F599BF] p-1 rounded">${balanceCategory}</p>
                                    <p class=" text-right text-green-500">+$${object[balanceCategory]["Ganancia"]}</p>
                                    <p class=" text-right text-red-500">-$${object[balanceCategory]["Gasto"]}</p>
                                    <p class=" text-right">$${object[balanceCategory]["balance"]}</p>
                                 </div>`;
    }
}

const calculateTotalsForMonth = () => {
    const arrayBalanceDate = showDataByMonth()
    contDates.innerHTML = ""
    for( const date in arrayBalanceDate){
        contDates.innerHTML += `<div class="flex justify-between py-4 font-medium">
                                    <p class="text-right">${date}</p>
                                    <p class="text-right text-green-500">+$${arrayBalanceDate[date]["Ganancia"]}</p>
                                    <p class="text-right text-red-500">-$${arrayBalanceDate[date]["Gasto"]}</p>
                                    <p class="text-right">$${arrayBalanceDate[date]["balance"]}</p>
                                 </div>`;
    }
}

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