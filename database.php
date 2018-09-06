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

/*
$sql3 = "SELECT name, type, address, cause FROM Reason";
$result = $conn->query($sql3);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<br> name: ". $row["name"]. " - type: ". $row["type"]. "- address: " . $row["address"] . "- cause: " . $row["cause"]. "<br>";
    }
} else {
    echo "0 results";
}

*/




$exeoption = $_REQUEST["exeoption"];
$random = $_REQUEST["code"];

//$exeoption = 2;

if ($exeoption == 1) {

	// get the q parameter from URL
	$q = $_REQUEST["q"];
	$pos = $_REQUEST["pos"];
	$rating = $_REQUEST["rating"];
	$price_level = $_REQUEST["price_level"];
	$vicinity = $_REQUEST["vicinity"];
	$types = $_REQUEST["types"];
	$place_id = $_REQUEST["place_id"];
	
	$GENDER = $_REQUEST["GENDER"];
	$AGE = $_REQUEST["AGE"];
	$FAMILIARITY = $_REQUEST["FAMILIARITY"];
	$EDUCATION = $_REQUEST["EDUCATION"];
	$question = $_REQUEST["question"];
	$zoomLevel = $_REQUEST["zoomLevel"];


	$sql = "INSERT INTO Map (random,zoomLevel, GENDER, AGE, FAMILIARITY,EDUCATION,question, name, position, rating,price_level,vicinity,types, place_id) VALUES ('$random','$zoomLevel','$GENDER','$AGE', '$FAMILIARITY','$EDUCATION', '$question','$q', '$pos', '$rating', '$price_level', '$vicinity', '$types', '$place_id')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

}elseif ($exeoption == 2){

	echo "exeoption == 2";

	$name = $_REQUEST["name"];
	$type = $_REQUEST["type"];
	$address = $_REQUEST["address"];
	$position = $_REQUEST["position"];
	
	$Lng = $_REQUEST["Lng"];
	$Lat = $_REQUEST["Lat"];
	$cause = $_REQUEST["cause"];

	$GENDER = $_REQUEST["GENDER"];
	$AGE = $_REQUEST["AGE"];
	$FAMILIARITY = $_REQUEST["FAMILIARITY"];
	$EDUCATION = $_REQUEST["EDUCATION"];
	$typeOfProblem = $_REQUEST["typeOfProblem"];
	$NegativeCause = $_REQUEST["NegativeCause"];
	$contact = $_REQUEST["contact"];

	
	$sql2 = "INSERT INTO Reason (random, name,type,address,position,Lng,Lat,cause,GENDER,AGE,FAMILIARITY,EDUCATION,typeOfProblem,NegativeCause,contact) 
	VALUES ('$random','$name','$type','$address','$position','$Lng','$Lat','$cause','$GENDER','$AGE','$FAMILIARITY','$EDUCATION','$typeOfProblem','$NegativeCause','$contact')";
	
	if ($conn->query($sql2) === TRUE) {
		echo "New record created successfully TO Reason";
	} else {
		echo "Error: " . $sql2 . "<br>" . $conn->error;
	}
	
}else{
	echo "Error: Parrameter error";
}

$conn->close();

?>