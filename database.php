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


$PHPdata = file_get_contents('php://input');
$data = json_decode($PHPdata, true);
echo $data;
$exeoption = $data['exeoption'];
$random = $data["code"];



if ($exeoption == 1) {

	// get the q parameter from URL
	$q = $data["q"];
	$pos = $data["pos"];
	$rating = $data["rating"];
	$price_level = $data["price_level"];
	$vicinity = $data["vicinity"];
	$types = $data["types"];
	$place_id = $data["place_id"];
	
	$GENDER = $data["GENDER"];
	$AGE = $data["AGE"];
	$FAMILIARITY = $data["FAMILIARITY"];
	$EDUCATION = $data["EDUCATION"];
	$question = $data["question"];
	$zoomLevel = $data["zoomLevel"];


	$sql = "INSERT INTO Map (random,zoomLevel, GENDER, AGE, FAMILIARITY,EDUCATION,question, name, position, rating,price_level,vicinity,types, place_id) VALUES ('$random','$zoomLevel','$GENDER','$AGE', '$FAMILIARITY','$EDUCATION', '$question','$q', '$pos', '$rating', '$price_level', '$vicinity', '$types', '$place_id')";
	if ($conn->query($sql) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sql . "<br>" . $conn->error;
	}

}elseif ($exeoption == 2){

	echo "exeoption == 2";

	$name = $data["name"];
	$type = $data["type"];
	$address = $data["address"];
	$position = $data["position"];
	
	$Lng = $data["Lng"];
	$Lat = $data["Lat"];
	$cause = $data["cause"];

	$GENDER = $data["GENDER"];
	$AGE = $data["AGE"];
	$FAMILIARITY = $data["FAMILIARITY"];
	$EDUCATION = $data["EDUCATION"];
	$typeOfProblem = $data["typeOfProblem"];
	$NegativeCause = $data["NegativeCause"];
	$contact = $data["contact"];
	$district = $data["district"];

	
	$sql2 = "INSERT INTO Reason (random, name,type,address,position,Lng,Lat,cause,GENDER,AGE,FAMILIARITY,EDUCATION,typeOfProblem,NegativeCause,contact,district) 
	VALUES ('$random','$name','$type','$address','$position','$Lng','$Lat','$cause','$GENDER','$AGE','$FAMILIARITY','$EDUCATION','$typeOfProblem','$NegativeCause','$contact','$district')";
	
	if ($conn->query($sql2) === TRUE) {
		echo "New record created successfully TO Reason";
	} else {
		echo "Error: " . $sql2 . "<br>" . $conn->error;
	}
	
}else{
	echo "Error: Parameter error";
}

$conn->close();

?>