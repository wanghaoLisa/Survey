<?php
$servername  = "localhost";
$username  = "u782298765_ye";
$password  = "hBkkXY1kVUV5";
$dbname  = "u782298765_xian";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else{
    echo "Connection successfully";
} 
// Change character set to utf8
mysqli_set_charset($conn,"utf8");

// sql to create table
$sql = "CREATE TABLE Map (
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
random varchar (255),
zoomLevel varchar (255),
		GENDER varchar (255),
		AGE varchar (255),
		FAMILIARITY varchar (255),
		EDUCATION varchar (255),
		question varchar (255),
		name varchar (255),
		position varchar (255),
		
		rating varchar (255),
		price_level varchar (255),
		vicinity varchar (255),
		types varchar (255),
		place_id varchar (255),
		reg_date TIMESTAMP
)DEFAULT CHARSET=utf8;";

if ($conn->query($sql) === TRUE) {
    echo "Table MyTableName created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

///////////////////////////////////
// sql to create table2
$sql2 = "CREATE TABLE Reason (
ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
random varchar (255),
		name varchar(255),
		type varchar(255),
		address varchar(255),
		position varchar(255),
		Lng varchar(255),
		Lat varchar(255),
		cause varchar(5000),
		GENDER varchar(255),
AGE varchar(255),
FAMILIARITY varchar(255),
EDUCATION varchar(255),
typeOfProblem varchar(255),
NegativeCause varchar(5000),
       contact varchar(255),
		reg_date TIMESTAMP
) DEFAULT CHARSET=utf8;";

if ($conn->query($sql2) === TRUE) {
    echo "Table Reason created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}




$conn->close();

?>

