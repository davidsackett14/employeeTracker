const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");

// const cTable = require("console.table");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "employee_db",
});

// const employeeRole = [];

// const managers = [];
let managers = () => {
  connection.query("SELECT title FROM role", (err, res) => {
    if (err) throw err;
    console.log(res);
  });
};

const start = () => {
  inquirer
    .prompt({
      name: "initialSelect",
      type: "rawlist",
      message: "What would you like to do",
      choices: [
        "Add a department, role, or employee",
        "View Existing departments, roles, employees",
        "Update employee role",
      ],
    })
    .then(selection => {
      if (selection.initialSelect === "Add a department, role, or employee") {
        addSelect();
      } else if (
        selection.initialSelect ===
        "View Existing departments, roles, employees"
      ) {
        viewSelect();
      } else if (selection.initialSelect === "Update employee role") {
        updateEmployee();
      } else {
        connection.end();
      }
    });
};

const addSelect = () => {
  inquirer
    .prompt({
      name: "tableRowAdd",
      type: "rawlist",
      message: "what would you like to add",
      choices: ["New Employee", "New Department", "New Role"],
    })
    .then(selection => {
      if (selection.tableRowAdd === "New Employee") {
        newEmployee();
      } else if (selection.tableRowAdd === "New Department") {
        addDepartment();
      } else if (selection.tableRowAdd === "New Role") {
        newRole();
      } else {
        start();
      }
    });
};

const viewSelect = () => {
  inquirer
    .prompt({
      name: "tableRowView",
      type: "rawlist",
      message: "what would you like to view",
      choices: ["Employees", "Department", "Roles"],
    })
    .then(selection => {
      if (selection.tableRowView === "Employees") {
        viewEmployee();
      } else if (selection.tableRowView === "Department") {
        viewDepartment();
      } else if (selection.tableRowView === "Roles") {
        viewRole();
      } else {
        start();
      }
    });
};
const updateEmployee = () => {
  inquirer
    .prompt({
      name: "tableRowAdd",
      type: "rawlist",
      message: "what would you like to add",
      choices: ["New Employee", "New Department", "New Role"],
    })
    .then(selection => {
      if (selection.tableRowAdd === "New Employee") {
        newEmployee();
      } else if (selection.tableRowAdd === "New Department") {
        addDepartment();
      } else if (selection.tableRowAdd === "New Role") {
        newRole();
      } else {
        start();
      }
    });
};

const newEmployee = async () => {
  connection.query = await util.promisify(connection.query);

  const roles = await connection.query("SELECT title FROM role");
  console.log(roles);

  const managerSelection = await connection.query(
    "SELECT first_name, last_name FROM employee WHERE role_id = 4"
  );
  console.log(managerSelection);
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "firstName",
          type: "input",
          message: "Please enter employee first name",
        },
        {
          name: "lastName",
          type: "input",
          message: "Please enter employee last name",
        },
        {
          name: "role",
          type: "rawlist",
          message: "Please select employee role",
          choices: [...roles.map(role => role.title)],
        },

        {
          name: "manager",
          type: "rawlist",
          message: "select the employees manager",
          choices: [
            ...managerSelection.map(
              manager => manager.first_name + " " + manager.last_name
            ),
            ,
          ],
        },
      ])
      .then(start);
  });
};

const newRole = () => {
  inquirer
    .prompt([
      {
        name: "roleName",
        type: "input",
        message: "Please enter name of role you wish to add to company",
      },
      {
        name: "rolePay",
        type: "input",
        message:
          "Please enter the pay for this role- use only numerical values",
        validate: function (value) {
          var valid = !isNaN(parseFloat(value));
          return valid || "Please enter a number";
        },
        filter: Number,
      },
      {
        name: "roleDepartment",
      },
    ])
    .then(start);
};
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Please enter employee first name",
      },
      {
        name: "lastName",
        type: "input",
        message: "Please enter employee last name",
      },
      {
        name: "role",
        type: "rawlist",
        message: "Please select employee role",
        choices: ["words", "words2"],
      },
      {
        name: "managerSelect",
        type: "rawlist",
        message: "Please select employee manager",
        choices: ["words", "words2"],
      },
    ])
    .then(start);
};
connection.connect(err => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
