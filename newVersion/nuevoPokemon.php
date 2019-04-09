<?php 
	$nombre = $_GET['pokemon'];
	$np = $_GET['np'];

	$conexion = mysqli_connect("localhost","root","","shinystats");

	$insertPokemon = "INSERT INTO pokemon (nombre, nPokedex) VALUES ('".$nombre."',".$np.");";

	function insertForAll($conexion,$nombre,$np){
		$select = "SELECT code FROM usuario";
		$resultado = mysqli_query($conexion,$select);
		while($value = mysqli_fetch_array($resultado)){
			$id = $value['code'];
			$insert = "INSERT INTO shiny VALUES (NULL, 0,".$np.",".$id.")";
			mysqli_query($conexion,$insert);
		}
	}


	if(mysqli_query($conexion,$insertPokemon)){
		$select = "SELECT code FROM usuario;";

		$resultado = mysqli_query($conexion,$select);

		while ($aux = mysqli_fetch_array($resultado)) {
			$id = $aux['code'];
			$insertShiny = "INSERT INTO shiny(id, ocurrencia, nPokedex, codeUsuario) VALUES (NULL,0,".$np.",".$id.");";
			mysqli_query($conexion,$insertShiny);
		}
		insertForAll($conexion,$nombre,$np);
		echo "1";
	}
	else echo "0";
 ?>