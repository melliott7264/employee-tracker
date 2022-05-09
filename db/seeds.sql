INSERT INTO department (name)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Person', 80000, 1), ('Lead Engineer', 150000, 2), ('Software Engineer', 120000, 2), ('Account Manager', 160000, 3),
 ('Accountant', 125000, 3), ('Legal Team Lead', 250000, 4), ('Lawyer', 190000, 4), ("Sales Team Lead", 120000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('John', 'Doe', 8, null), ('Mike', 'Chan', 1, null), ('Ashley', 'Rodriquez', 2, null), ('Kevin', 'Tupik', 3, 2), ('Kunal', 'Singh', 4, null), ('Malia', 'Brown', 5, 5),
('Sarah', 'Lourd', 6, null), ('Tom', 'Allen', 7, 7);