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
    echo "最新反馈";
}

// Change character set to utf8
mysqli_set_charset($conn,"utf8");


$sql3 = "SELECT cause,NegativeCause FROM Reason ORDER BY ID DESC LIMIT 6";
$result = $conn->query($sql3);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "<br> 意见: ". $row["cause"]. $row["NegativeCause"]."<br>";
    }
} else {
    echo "0 results";
}

$conn->close();

?>