<?php 
	
	$usuario = "root";
	$servidor = "localhost";
	$basededatos = "shinystats";
	$url = $_GET['url'];

	$conexion = mysqli_connect( $servidor, $usuario, "", $basededatos) or die ("No se ha podido conectar al servidor de Base de datos");

	function getLastId($conexion)
	{
		$consulta = "SELECT max(code) FROM usuario" or die("Maaaaal");
		$resultado = mysqli_query( $conexion, $consulta );
		$aux = $resultado->fetch_row();
		$contador = $aux[0];

		return $contador;
	}

	function insertarShiny($id,$np,$ocurrencia,$conexion){
		$insert = "INSERT INTO shiny(id,ocurrencia,nPokedex,codeUsuario) VALUES ('NULL',".$ocurrencia.",".$np.",".$id.")";

		mysqli_query( $conexion, $insert );

	}

	function leerPokemon($id,$pokemon,$conexion)
	{
		$array = explode(":",$pokemon);
		$nombrePokemon = $array[0];
		$ocurrencia = $array[1];
		$resultado = mysqli_query($conexion,"SELECT nPokedex FROM pokemon WHERE nombre='".$nombrePokemon."';");
		$aux = $resultado->fetch_row();
		$np = $aux[0];

		insertarShiny($id,$np,$ocurrencia,$conexion);
	}

	function leerUsuario($p,$conexion){
		
		mysqli_query($conexion,"INSERT INTO usuario VALUES('NULL')") or die("Error al insertar nuevo usuario");
		$id = getLastId($conexion);
		$array = explode(",", $p);
		foreach($array as $pokemon){
			leerPokemon($id,$pokemon,$conexion);
		}
	}

	function leerDatos($file,$conexion)
	{
		$array = file($file);
		foreach($array as $aux){
			leerUsuario($aux,$conexion);
		}
	}

	leerDatos($url,$conexion);
	mysqli_close($conexion);
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	
</body>
</html>