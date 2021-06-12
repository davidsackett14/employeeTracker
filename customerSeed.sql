DROP DATABASE Employee_db;
CREATE DATABASE Employee_db;
USE Employee_db;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT,
    name VARCHAR (30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(30), 
    salary DECIMAL,
    department_id INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY(department_id) REFERENCES department(id)

);

CREATE TABLE employee(
    id INTEGER AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL, 
    manager_id INTEGER,
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES role(id),
    FOREIGN KEY(manager_id) REFERENCES employee(id)
    

);

 INSERT INTO department (name)
 VALUES ('sales');
 INSERT INTO department (name)
 VALUES ('customer_service');
 INSERT INTO department (name)
 VALUES ('production');
  INSERT INTO department (name)
 VALUES ('management');
  INSERT INTO department (name)
 VALUES ('training');

 INSERT INTO role (title, salary, department_id)
 VALUES ('Manager',75000, 1);
  INSERT INTO role (title, salary, department_id)
 VALUES ('Sales-person',50000, 1);
 INSERT INTO role (title, salary, department_id)
 VALUES ('Trainer',60000, 1);
  INSERT INTO role (title, salary, department_id)
 VALUES ('Line_worker',75000, 1);

  INSERT INTO employee (first_name, last_name, role_id)
 VALUES ('daiv','sackett', 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES ('jan','kand', 2, 1 );
 INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES ('jaun', 'hernand', 3, 1);
 INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES ('Jon','bonjovi',4, 1);
 INSERT INTO employee (first_name, last_name, role_id, manager_id)
 VALUES ('John','smoth', 4 ,1);