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

// Categories

const containerCategory = $('#containerCategory')
const inputCategory = $('#input-category')
const btnAddCategory = $('#add-category')

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

// ******************************************* Functions *********************************************

// changeSection

const changeSection = (id) => {
    switch (id) {
        case logo:
            secBalance.style.display = 'block' 
            secCategories.style.display = 'none'
            secReports.style.display = 'none'
            newOperation.style.display = 'none'
        break;

        case btnBalances:
            secBalance.style.display = 'block' 
            secCategories.style.display = 'none'
            secReports.style.display = 'none'
            newOperation.style.display = 'none'
        break;

        case btnCategories:
            secBalance.style.display = 'none' 
            secCategories.style.display = 'block'
            secReports.style.display = 'none'
            newOperation.style.display = 'none'
        break;

        case btnReports:
            secBalance.style.display = 'none' 
            secCategories.style.display = 'none'
            secReports.style.display = 'block'
            newOperation.style.display = 'none'
        break;

        case btnNewOperation:
            secBalance.style.display = 'none' 
            secCategories.style.display = 'none'
            secReports.style.display = 'none'
            newOperation.style.display = 'block'
        break;
   }
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

