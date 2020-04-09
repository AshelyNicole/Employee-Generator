const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let employees= []
function createTeam(){
    inquirer.prompt([
        {
            type: "list",
            name: "employeeType",
            message: "Select your Employee type:",
            choices: ["Engineer", "Manager", "Intern"]
        },
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your unique ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email?"
        }
    ])
    .then((data)=> { 
        const{ employeeType } = data
        switch (employeeType){
            case "Engineer":
                createEngineer(data)
            break;
            case "Manager":
                createManager(data)
            break;
            case "Intern":
                createIntern(data)
            break;
            default:
            break;
        }
    })
}

function createEngineer(employeeData){
    inquirer.prompt([{
        type: "input",
        name: "github",
        message: "what is your Github?"
    },
    {
        type: "confirm",
        name: "moreEmployees",
        message: "Would you like to add another employee?"
    }]).then((data) => {
        const {name, id, email} = employeeData;
        const { github } = data

        let newEngineer = new Engineer(name, id, email, github)
        employees.push(newEngineer)
        if(data.moreEmployees){
            createTeam()
        } else {
            allPau()
        } 
    })
}


function createManager(employeeData){
    inquirer.prompt([{
        type: "input",
        name:"officeNumber",
        message: "What is your office number?"
    },
    {
        type: "confirm",
        name: "moreEmployees",
        message: "Would you like to add another employee?"
    }]).then((data) =>{ 
        const {name, id, email} = employeeData;
        const { officeNumber } = data

        let newManager = new Manager(name, id, email, officeNumber)
        employees.push(newManager)
        if(data.moreEmployees){
            createTeam()
        } else {
            allPau()
        } 
    })
}

function createIntern(employeeData){
    inquirer.prompt([{
        type: "input",
        name:"school",
        message: "What is your school?"
    },
    {
        type: "confirm",
        name: "moreEmployees",
        message: "Would you like to add another employee?"
    }]).then((data) =>{
        const {name, id, email} = employeeData;
        const { school } = data

        let newIntern = new createIntern(name, id, email, school)
        employees.push(newIntern)
        if(data.moreEmployees)
        {
            createTeam()
        } else {
            nallPau()
        } 
    })
}

function allPau(){

    fs.writeFile(outputPath, render(employees), (err,data) => {
        console.log ("fin")
    })
}

createTeam()