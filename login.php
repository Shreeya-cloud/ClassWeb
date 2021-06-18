<?php
$host="localhost";
$dbuser="root";
$dbpassword="";
$dbname="login";
$username=$_REQUEST['username'];
$password=$_REQUEST['password'];

$conn=mysqli_connect($host,$dbuser,$dbpassword,$dbname);	
	
	$sql= "SELECT * From registerform Where Email='$username' AND Phone='$password' Limit 1";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_array($result,MYSQLI_ASSOC);
	$count=mysqli_num_rows($result);
	
	if( ($count)==1){
		$_SESSION["user"]= $username;
		header("Location: test.html");
		exit();
	}
	else{
		echo "You Have Entered Incorrect Password";
		exit();
	}
		

?>	