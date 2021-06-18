<?php
	$Name=$_POST['Name'];
	$College=$_REQUEST['College_Name'];
	$email=$_REQUEST['email'];
	$phone=$_REQUEST['phone'];
	$subject=$_REQUEST['subject'];
	$rdiobtn=$_REQUEST['rdiobtn'];
	
if(!empty($Name) || !empty($College) || !empty($email) || !empty($phone)
|| !empty($subject)|| !empty($rdiobtn)){ 	
	$host="localhost";
	$dbuser="root";
	$dbpassword="";
	$dbname="login";
	
	$conn=new mysqli_connect($host,$dbuser,$dbpassword,$dbname);

	if( mysqli_connect_error()){
		die('Connect Error('. mysqli_connect_error().')'. mysqli_connect_error());
		}else{
			$SELECT= "SELECT email From registerform Where email=? Limit 1";
			$INSERT= "INSERT Into registerform(Name,College,email,phone,
			subject,rdiobtn) values(?,?,?,?,?,?)";
			
			$stmt=$conn->prepare($SELECT);
			$stmt->bind_param("s",$email);
			$stmt->execute();
			$stmt->bind_result($email);
			$stmt->store_result();
			$rnum=$stmt->num_rows;
			if($rdiobtn==True)
			{
				$b='yes';
			}
			else{
				$b='no';
			}
			
			if($subject==1)
			{
				$s='English';
			}
			else if($subject==2){
				$b='Marathi';
			}
			else
			{
				$b="Hindi";
			}
			
			if($rnum==0){
				$stmt->close();
				$stmt1="INSERT Into registerform(Name,College,Email,Phone,
			Subject,Beginner) values(".$Name.",".$College.",".$email.",".$phone.",".$s.",".$b.") ";
				$stmt=$conn->prepare("INSERT Into registerform(Name,College,email,phone,
			subject,rdiobtn) values(?,?,?,?,?,?)");
				$stmt->bind_param("ssssss",$Name, $College, $email, $phone
					,$s,$b );
				$stmt->execute();
				echo "New record inserted successfully";
				}
				else{
				echo "Someone alredy register using this email";
				}
				$stmt->close();
				$conn->close();			
		}
}
	else{
		echo "All field are required";
		die();
	}
?>	
