# Employee Traker

## Description

This is a command line application written in Node.js that will store its data in a SQL database using MySQL that tracks employees by employee, role, and department.  
The user can view all employees, departments and roles as well as employees by manager or department and finally, display the total of all salaries for a department. 
The user can add or delete an employee, role, or department.  They can also update an employee's role or manager.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

This application requires that a MYSQL server be installed and running on the server.   Once running, there are three files in the db folder that need to be executed from within MySQL to build the database.  However, before doing that, this application will have to be cloned to a local folder on the server from GitHub:  https://github.com/melliott7264/employee-tracker.   Once cloned, from the root of the installation folder where the package.json file resides, run "npm install".  This assumes that npm has already been installed on your server along with MySQL.   The "npm install" will install all the dependencies including Inquirer, MySQL2 and console table.  At this point you can log onto the MySQL shell and run the following instructions to build the database:  "souce ./db/db.sql;", "source .db/schema.sql" and  "source .db/seeds.sql".  

## Usage

Run the command line application by executing "npm index" from the root of the local folder into which you installed the application above.  Next,  you just have to follow the command line prompts.   You will initially be presented with a menu to View, Add, Update, or Delete the Employees, Departments or Roles.    Each selection will give you its own menu of options.   Where you are asked to choose among options that are already stored in the database, you will be presented with a list.  There is no need to remember names, departments, roles, or ids.  You will be presented with all that information from which to make a choice.  

If you try to delete an item with an association to another table, you will get a warning and not be allowed to do that.  You will have to remove the associations first. 

If you want to exit the application, you can press Control-C at any time.  

Put a YouTube video link here with a walk-through.


## Credits

Mark Elliott  https://github.com/melliott7264


## License

Copyright (c) 2022 Mark Elliott

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---
