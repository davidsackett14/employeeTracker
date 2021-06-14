const mysql = require("mysql");
const inquirer = require("inquirer");
const util = require("util");
const cTable = require('console.table');

// const cTable = require("console.table");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: ":b.RW!cYRVf3PBv",
  database: "employee_db",
});

// const employeeRole = [];

// const managers = [];
// let managers = () => {
//   connection.query("SELECT title FROM role", (err, res) => {
//     if (err) throw err;
//     console.log(res);
//   });
// };

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
  console.table(roles)
  console.log(roles);
  //  const roles = await connection.query("SELECT title FROM role");
  // console.log(roles);

  const managerSelection = await connection.query(
    "SELECT first_name, last_name FROM employee WHERE role_id = 1"
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
            "none",
          ],
        },
      ])
      .then(data => {
        const employeeObject = data;
        const roleID = ()=>{
          switch (data.role) {
            case "Manager":
              return 1;
              break;
              case "Sales-person":
              return 2;
              break;
              case "Trainer":
              return 3;
              break;
              case "Line_worker":
              return 4;
              break;
          
            default:
              break;
          }

        };
        
   
        const employeeRow =  `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employeeObject.firstName}','${employeeObject.lastName}', ${roleID()},1);`
        const employeeAddToTable = ()=> connection.query(employeeRow, (err, res)=>{
          if (err) throw err;
          console.log("row added successfully")

        }
          
        );
        employeeAddToTable()
      });
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
      }
     
    ])
    .then(data => {
      const roleObject = data
      console.log(roleObject)
      const roleRow =  `INSERT INTO role (title, salary, department_id) VALUES ('${roleObject.roleName}',${roleObject.rolePay},1);`
      const roleAddToTable = ()=> connection.query(roleRow, (err, res)=>{
        if (err) throw err;
        console.log("row added successfully");
        console.table(roleObject)
        
      });
      roleAddToTable()
  });
};
const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Please enter new department name",
      },
     
    ])
    .then(data => {
      const departmentObject = data;
      console.log(departmentObject);
      const departmentRow = `INSERT INTO department (name) VALUES ('${departmentObject.name}');`;
      const departmentAddToTable = () =>
        connection.query(departmentRow, (err, res) => {
          if (err) throw err;
          console.log("department added successfully");
          console.table(departmentObject);
        });
      departmentAddToTable();
    });
};
const viewEmployee = async () => {
  const allEmployeeQuery = "SELECT * FROM employee";
  await connection.query(allEmployeeQuery, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
};

const viewDepartment =  async () => {
  const allDepartmentQuery = "SELECT * FROM department";
  await connection.query(allDepartmentQuery, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
};;

const viewRole = async () => {
  const allRoleQuery = "SELECT * FROM role";
  await connection.query(allRoleQuery, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
};



connection.connect(err => {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});
