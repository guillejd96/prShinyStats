<?php 
	$nombre = $_GET['nombre'];

	$conexion = mysqli_connect("localhost","root","","shinystats");

	$resultado = mysqli_query($conexion,"SELECT nPokedex FROM pokemon WHERE nombre='".$nombre."'");

	echo $resultado->fetch_row()[0];
 ?>