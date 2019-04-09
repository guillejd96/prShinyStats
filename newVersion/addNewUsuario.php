<?php 
	$conexion = mysqli_connect("localhost","root","","shinystats");
	if(mysqli_query($conexion,"INSERT INTO usuario(id) VALUES(NULL)")){
		$consulta = "SELECT max(code) FROM usuario" or die("Maaaaal");
		$resultado = mysqli_query( $conexion, $consulta );
		$aux = $resultado->fetch_row();
		echo $aux[0];
	} else echo "-1";
 ?>