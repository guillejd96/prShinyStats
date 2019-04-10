<?php 
	$np = $_GET['np'];
	$id = $_GET['id'];
	$ocurrencia = $_GET['oc'];

	$conexion = mysqli_connect("localhost","root","","shinystats");

	$consulta = "UPDATE shiny SET ocurrencia=".$ocurrencia." WHERE nPokedex=".$np." AND codeUsuario=".$id;

	if(mysqli_query($conexion,$consulta)){
		echo "1";
	} else echo "0";
 ?>