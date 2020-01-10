CREATE DATABASE EmployeeDB;

USE EmployeeDB;

CREATE TABLE Departments
(
	DepartmentID bigint IDENTITY(1,1) NOT NULL,
	DepartmentName varchar(1000)
)

SELECT * FROM Departments;
INSERT INTO Departments VALUES ('Finance');
INSERT INTO Departments VALUES ('IT');

CREATE TABLE Employees
(
	EmpID bigint IDENTITY(1,1) NOT NULL,
	EmployeeName varchar(1000),
	Department varchar(1000),
	MailID varchar(1000),
	DOJ date
);

INSERT INTO Employees VALUES('Bish', 'Finance', 'bish111@gmail.com', '06-11-2019');
INSERT INTO Employees VALUES('Tina', 'IT', 'tina42@gmail.com', '06-10-2019');

SELECT DepartmentID, DepartmentName FROM Departments;

SELECT * from Employees where EmpID=2;
