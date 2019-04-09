<?php 
	$url = $_GET['url'];
	$conexion = mysqli_connect("localhost","root","","shinystats");

	function newUsuario($conexion){
		if(mysqli_query($conexion,"INSERT INTO usuario(code) VALUES(NULL)")){
			$consulta = "SELECT max(code) FROM usuario" or die("Maaaaal");
			$resultado = mysqli_query( $conexion, $consulta );
			$aux = $resultado->fetch_row();
			return $aux[0];
		} else return "-1";
	}

	function insertPokemon($conexion,$nombre,$ocurrencia,$id){
		$consulta = "SELECT nPokedex FROM pokemon WHERE nombre='".$nombre."';";
		$res = mysqli_query($conexion,$consulta);
		$nPokedex = $res->fetch_row()[0];

		$insert = "INSERT INTO shiny VALUES (NULL, ".$ocurrencia.",".$nPokedex.",".$id.") ";

		if (mysqli_query($conexion,$insert)) {
		}
		else {
			echo "error";			
		}
		
	}

	function insertDifference($conexion,$np,$id){
		$consulta = "INSERT INTO shiny VALUES (NULL, 0,".$np.",".$id.") ";
		mysqli_query($conexion,$consulta);
	}

	function setDifference($conexion,$nombres,$id){
		$res = mysqli_query($conexion,"SELECT nombre,nPokedex FROM pokemon");
		while($valor = mysqli_fetch_array($res)){
			$name = $valor['nombre'];
			$np = $valor['nPokedex'];
			if(!in_array($name,array($nombres))){
				insertDifference($conexion,$np,$id);
			}
		}
	}

	function leerDatos($conexion,$url,$id){
		$file = file($url);
		$data = $file[0];
		$array = explode(",",$data);
		$nombresFichero = new SplFixedArray(sizeof($array));
		$i=0;
		foreach ($array as $aux) {
			$nOcurrencia = explode(":",$aux);
			$nombre = $nOcurrencia[0];
			$ocurrencia = $nOcurrencia[1];

			insertPokemon($conexion,$nombre,$ocurrencia,$id); 

			$nombresFichero[$i]=$nombre;
			$i+=1;
		}
		setDifference($conexion,$nombresFichero,$id);
	}

	$newID = newUsuario($conexion);
	if($newID!="-1"){
		leerDatos($conexion,$url,$newID);
		echo "1";
	}
	else {
		echo "0";
	}
 ?>