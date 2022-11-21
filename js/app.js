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
const btnEditCategory = $('#btn-cat-edit')
const btnAddOperation = $('#btnAddOperation')

// Form to new operation

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
const monthMoreGain = $("#monthMoreGain")
const monthAmountMoreGain = $("#monthAmountMoreGain")
const monthMinorGain = $("#monthMinorGain")
const montAmountMinorGain = $("#montAmountMinorGain")

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
            negativeDates = separateDates(getDataFromLocalStorage('operations'), "spent");
            positiveDates = separateDates(getDataFromLocalStorage('operations'), "gain");
            getHigherDate(positiveDates, "positive")
            getHigherDate(negativeDates, "negative")
            printReport(balanceCategories, "gain")
            printReport(balanceCategories, "spent")
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

// Function to capitalize the first letter
const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1);
}

// Function to get random ID
const randomId = (num1, num2) => {
    return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
}

// Function to print on color the Amounts
const colors = () => {
    if (selectTypeOperation.value === 'spent') {
        return true
    }return false
}

// filter categories to show in "Filtros"
const filterListCategory = (categories) => {
    if (categories.length < 0) return;
    categories.map(categories => {
        const { name } = categories
        selectFilterCategory.innerHTML += `
        <option value="${name}">${name}</option>
        `
    })
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
                <p id="${id}" class="bg-[#F599BF] p-1 rounded font-semibold">${name}</p>
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
            btn.addEventListener('click', () => {
            secBalance.style.display = 'none' 
            secCategories.style.display = 'none'
            secReports.style.display = 'none'
            newOperation.style.display = 'none'
            editCategory.style.display = 'block'  
            })
        }
        const btnDelete = $$('.btnDelete')
        for (const btn of btnDelete) {
            btn.addEventListener('click', () => {
                const btnDeleteId = btn.getAttribute("data-id")
                const categoryToRemove = getDataFromLocalStorage('categories').filter(category => category.id === parseInt(btnDeleteId));
                const categories = removeCategory(btnDeleteId);

                const operations = getDataFromLocalStorage('operations')
                    .filter(operation => operation.category !== categoryToRemove[0].name);
                
                saveDataInLocalStorage("operations", operations)
                saveDataInLocalStorage('categories', categories)
                generateCategory(categories)
                filterListCategory(categories)
                tbodyOperation.innerHTML = ""
                generateTable(operations);
            })
        }      
}

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

const categoryEditInput = (id) => {
    return getDataFromLocalStorage('categories').map(category => {
        if (category.id === parseInt(id)) {
            return saveCategoryData(id)
        }
        return category
    })
}

const removeCategory = (id) => {
    return getDataFromLocalStorage('categories').filter(category => category.id !== parseInt(id))
}

// new Operation Functionality

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

if (!getDataFromLocalStorage("operations") || getDataFromLocalStorage("operations").length <= 0) {
    const initialOperations = []
    saveDataInLocalStorage('operations', initialOperations)
}

// Validate Forms

let valueInput, valueAmount, valueType, valueDate, valueCategory
const saveDataToValiteForms = () =>{
    valueInput= inputDescription.value
    valueAmount= inputAmount.value
    valueType= selectTypeOperation
    valueDate= inputDateForm.value
    valueCategory= inputSelectCategory.value
}
const validateForm = () => {
    if (valueInput !== "" && valueAmount !== "" && valueType !== "" && valueDate !== "" && valueCategory !== "") {
        return true
    }else{
       return false
    }
}

// generateTable

const generateTable = (data) =>{
    const operations = data || [];
    inputDateForm.value = currentDate
    if(operations.length > 0) {
        for (const {id, description, category, dateSelect, amount, selectTypeOperation} of operations){
            tbodyOperation.innerHTML += `
            <div class="flex font-semibold flex-wrap md:w-full md:px-0 justify-around" >
                <div class="flex w-full justify-between md:w-[300px]">
                    <p class="text-left md:text-center mt-5 md:mt-0 md:w-[150px]">${description}</p>
                    <p class="bg-[#F599BF] mb-4 rounded text-right md:text-center mt-5 md:mt-0 md:w-[80px] mr-9">${category}</p>
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
                const operations = removeOperation(btnDeleteIdd) 
                saveDataInLocalStorage('operations', operations)
                tbodyOperation.innerHTML= ""
                generateTable(operations) 
            })
        }
        $('#imgOperations').classList.add('hidden')
        $('#table').classList.remove('hidden')
    }  
}

const removeOperation = (id) => {
    showBalance("gain")
    showBalance("spent")
    showBalance("total")
    console.log(getDataFromLocalStorage('operations').filter(operation => operation.id !== parseInt(id)))
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

// Date filter

const formatDate = (date) => {
    return date.split("-").reverse().join("-");
}

const year = new Date().getFullYear()
const month = new Date().getMonth()
const day = new Date().getDate()
const currentDate = `${year}-${month+1}-${day}`

date.value = `${year}-${month+1}-01`


// function Filters

let filters = {
    type: "",
    category: "",
    date: "",
    order: ""
};

const filterBy = (filters) => {
    let operations = getDataFromLocalStorage('operations');

    if(filters.type) {
        operations = operations.filter((operation) => operation.type === filters.type)
    }

    if(filters.category) {
        operations = operations.filter((operation) => operation.category === filters.category)
    }

    if(filters.date) {
        operations = operations.filter((operation) => new Date(operation.dateSelect) >= new Date(filters.date))
    }

    if (filters.order) {
        switch(filters.order) {
            case "mayMon":
                operations = orderByToLowerOrHigherAmount("ba", operations);
                break;
            case "menMon":
                operations = orderByToLowerOrHigherAmount("ab", operations);
                break;
            case "za":
                operations = orderBy("za", operations)
                break;
            case "az":
                operations = orderBy("az", operations)
                break;
            case "masRec":
                operations = orderByLessOrMoreRecent("more", operations)
                break;
            case "menRec":
                operations = orderByLessOrMoreRecent("less", operations)
                break;
        }
    }
    tbodyOperation.innerHTML = ""
    generateTable(operations)
}

// functions order by

const orderByToLowerOrHigherAmount  = (orderBy, operations) => {
    let order = []
    switch (orderBy) {
        case "ab":
            order = operations.sort((a,b) => a.amount - b.amount)
        break
        case "ba":
            order = operations.sort((a,b) => b.amount - a.amount)
        break
    }
    return order
}

const orderBy = (order, operations) => {
    let orderByLetter = []
    switch (order) {
        case "za":
            orderByLetter = operations.sort((a,b) =>{
            if (a.description < b.description) {
                return 1
            }if (a.description > b.description) {
                return -1
            } return 0
            }) 
        break;
        case "az":
            orderByLetter = operations.sort((a,b) =>{
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

const orderByLessOrMoreRecent = (order, operations) => {
    let orderDateFor = []
    switch (order) {
        case "less":
            orderDateFor = operations.sort((a, b) => { 
            return orderDate(a.dateSelect) - orderDate(b.dateSelect); 
            }) 
        break
        case "more":
            orderDateFor =  operations.sort((a, b) => { 
            return orderDate(b.dateSelect) - orderDate(a.dateSelect); 
            })
        break
        }
    return orderDateFor
}

// functions to calculate balance

const calculateBalance = (balanceType) => {
    const operations = getDataFromLocalStorage('operations');
    return operations.filter(operation => 
        {
            return operation.type === balanceType
        } )
        .reduce((accumulator, operation) => accumulator + parseInt(operation.amount), 0) ;
}

const showBalance = (type) => {
    if(type === 'gain'){
        positiveBalance.innerHTML = "$" + calculateBalance("gain")
    }else if(type === 'spent'){
        negativeBalance.innerHTML = "-$" + calculateBalance("spent")
    }else if(type === 'total'){
        const total = calculateBalance("gain")-calculateBalance("spent")
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

// Reports functions 

let balanceCategories = {}

const separateCategories = (operations, newArray) => {
    for (const operation of operations){
        newArray[operation.category] = {}
       
        newArray[operation.category]["gain"] = operations
            .filter((op) => op.category === operation.category && op.type === "gain")
            .reduce((accumulator, operation) => accumulator + parseInt(operation.amount), 0);


        newArray[operation.category]["spent"] = operations
            .filter((op) => op.category === operation.category && op.type === "spent")
            .reduce((accumulator, operation) => accumulator + parseInt(operation.amount), 0);
        
        newArray[operation.category]["balance"] = newArray[operation.category]["gain"] - newArray[operation.category]["spent"];
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
    return balanceDates
}

const showDataByMonth = () => {
    let dataByMonth = {};
    const operations = getDataFromLocalStorage('operations');
    const arrayDates = filterOfDate();

    for (const operation of operations){
        for(const date of arrayDates) {
            if(operation.dateSelect.slice(0,7) === date) {
                if(dataByMonth[date]) {
                    if(dataByMonth[date][operation.type]) {
                        dataByMonth[date][operation.type] += parseInt(operation.amount);
                    } else {
                        dataByMonth[date][operation.type] = parseInt(operation.amount);
                    }
                } else {
                    dataByMonth[date] = {};
                    dataByMonth[date][operation.type] = parseInt(operation.amount);
                }
            }
        }
    }
    for (const date in dataByMonth) {
        const categories = ["gain", "spent"];
        categories.map((category) => {
            if (!dataByMonth[date][category]) {
                dataByMonth[date][category] = 0;
            }
        });
        dataByMonth[date]["balance"] = 
        parseInt(dataByMonth[date]["gain"]) - 
        parseInt(dataByMonth[date]["spent"]);
    }
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

let negativeDates = separateDates(getDataFromLocalStorage('operations'), "spent");
let positiveDates = separateDates(getDataFromLocalStorage('operations'), "gain");

// Function for print reports

const printReport = (array, type) => {

    const {nameResult, result} = showResults(array, type);
    const {nameDatePositive, resultDatePositive} = getHigherDate(positiveDates, "positive")
    const {nameDateNegative, resultDateNegative} = getHigherDate(negativeDates, "negative")
    calculateTotalsForMonth()
    if (type === "gain") {
        catMoreGain.innerHTML = `${nameResult}`
        amountMoreGain.innerHTML = `+$${result}`
    }
    if (type === "spent"){
        catMinorGain.innerHTML = `${nameResult}`
        amountMinorGain.innerHTML = `-$${result}` 
    }
    if (type === "balance"){
        catMoreBalance.innerHTML = `${nameResult}`
        amountMoreBalance.innerHTML = `$${result}` 
    }
    
    monthMoreGain.innerHTML = `${nameDatePositive}`
    monthAmountMoreGain.innerHTML = `+$${resultDatePositive}`
    monthMinorGain.innerHTML = `${nameDateNegative}`
    montAmountMinorGain.innerHTML = `-$${resultDateNegative}`
}

const totals = {}
const contCategory = $("#contCategory")

const calculateTotalsForCategories = (object) => { 
    contCategory.innerHTML = ""
    
    for (let balanceCategory in object) {
        const balance = object[balanceCategory]["balance"] < 0 ? "-$" + Math.abs(object[balanceCategory]["balance"]) : "$" + object[balanceCategory]["balance"]
        contCategory.innerHTML += `<div class="flex justify-between py-4 font-medium">
                                    <p class=" text-center p-1 rounded font-semibold w-1/4"><span class="bg-[#F599BF] p-1 rounded">${balanceCategory}</span></p>
                                    <p class=" text-center text-green-500 font-bold w-1/4">+$${object[balanceCategory]["gain"]}</p>
                                    <p class=" text-center text-red-500 font-bold w-1/4">-$${object[balanceCategory]["spent"]}</p>
                                    <p class=" text-center font-bold w-1/4">${balance}</p>
                                 </div>`;
    }
}

const calculateTotalsForMonth = () => {
    const arrayBalanceDate = showDataByMonth()
    contDates.innerHTML = ""
    for( const date in arrayBalanceDate){
        const balance = arrayBalanceDate[date]["balance"] < 0 ? "-$" + Math.abs(arrayBalanceDate[date]["balance"]) : "$" + arrayBalanceDate[date]["balance"]
        contDates.innerHTML += `<div class="flex justify-between py-4 font-medium text-center">
                                    <p class="font-bold w-1/4 text-center">${date}</p>
                                    <p class="text-green-500 font-bold w-1/4 text-center">+$${arrayBalanceDate[date]["gain"]}</p>
                                    <p class="text-red-500 font-bold w-1/4 text-center">-$${arrayBalanceDate[date]["spent"]}</p>
                                    <p class="font-bold w-1/4 text-center">${balance}</p>
                                 </div>`;
    }
}

// Events
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

inputDateForm.addEventListener("change", (e) =>{
    dateSelect = e.target.value
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
// button edit category
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
//button edit operation
$('#btnEditarOp').addEventListener('click', () => {
    const operationId = $('#btnEditarOp').getAttribute("data-id")
    saveDataInLocalStorage('operations', operationEditInput(operationId))
    tbodyOperation.innerHTML = ""
    generateTable(getDataFromLocalStorage('operations'))
})
//button add operation
btnAddOperation.addEventListener("click", (e) => {
    e.preventDefault() 
    saveDataToValiteForms()
    const approvedForm = validateForm()
    if (approvedForm) {
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
    showBalance("gain")
    showBalance("spent")
    showBalance("total")
    printReport(balanceCategories, "gain")
    printReport(balanceCategories, "spent")
    printReport(balanceCategories, "balance")
    dateForm.value = currentDate
} else {
    alert("Completa todos los datos para Agregar Nueva Operacion")
}
$('#imgReports').classList.add('hidden')
$('#tableReports').classList.remove('hidden')
 
})
//button add category
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
        filters.type = e.target.value;
        filterBy(filters)
    }else{
        tbodyOperation.innerHTML = ""
        generateTable(getDataFromLocalStorage('operations'))
        filters.type = "";
        filterBy(filters)
    }
})

selectFilterCategory.addEventListener('change', (e) => {
    if(e.target.value != "Todas"){
        filters.category = e.target.value;
        filterBy(filters)   
    }else{
        tbodyOperation.innerHTML = ""
        generateTable(getDataFromLocalStorage('operations'))
        filters.category = "";
        filterBy(filters)
    }    
})

date.addEventListener('change', (e) => {
    filters.date = e.target.value;
    filterBy(filters);
})

selectOrder.addEventListener('change', (e) => {
    filters.order = e.target.value;
    filterBy(filters);
})

// Window on load

window.addEventListener('load', () => {
    generateCategory(getDataFromLocalStorage('categories'))
    filterListCategory(getDataFromLocalStorage('categories'))
    generateOperationTable(getDataFromLocalStorage('categories'))
    generateTable(getDataFromLocalStorage('operations'))
    if (getDataFromLocalStorage('operations')) {
        showBalance("gain")
        showBalance("spent")
        showBalance("total")
    }
    selectTypeFilter.value = "all"
    selectOrder.value = "masRec"
})