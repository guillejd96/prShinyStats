<?php 
			$usuario = "root";
			$servidor = "localhost";
			$basededatos = "shinystats";

			$conexion = mysqli_connect( $servidor, $usuario, "", $basededatos ) or die ("No se ha podido conectar al servidor de Base de datos");
			
			$consulta = "SELECT p.nombre,p.nPokedex,sum(s.ocurrencia) as ocurrencia FROM pokemon p,shiny s WHERE p.nPokedex = s.nPokedex GROUP BY p.nPokedex";

			$resultado = mysqli_query( $conexion, $consulta ) or die ( "Algo ha ido mal en la consulta a la base de datos  1");
?>

<!DOCTYPE html>
	<html lang="es">
	<head>
		<meta charset="UTF-8">
		<title>Tabla Pokemons</title>
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
		<link rel="stylesheet" type="text/css" href="css/index.css">
		
	</head>
	<body>
		<table border="1" id="table">
		<tr>
			<th><p>nPokedex</p></th>
			<th><p>Nombre</p></th>
			<th><p>Ocurrencia</p></th>
		</tr>
		<?php
			if($resultado->num_rows>1){
				while ($columna = mysqli_fetch_array($resultado)) {
				echo "<tr>";
 				echo "<td>" .$columna['nPokedex']. "</td><td>" .$columna['nombre']. "</td><td>".$columna['ocurrencia']."</td>";
 				echo "</tr>";
				}
				echo "</table>";
			}
			else {
				echo "</table>";
 				echo "<p>No hay datos</p>";
			}
			
		?>
		<p><input type="button" value="Volver a Inicio" class="btn btn-outline-primary" onclick="location.href='index.php'"></p>
	</body>
	</html>	