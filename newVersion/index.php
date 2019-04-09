<?php
	$conexion = mysqli_connect("localhost","root","","shinystats") or die ("No se ha podido conectar al servidor de Base de datos");

	$consulta = "SELECT * FROM usuario";

	$resultado = mysqli_query( $conexion, $consulta ) or die ( "Algo ha ido mal en la consulta a la base de datos  1");

	$nUsuarios = $resultado->num_rows;
 ?>

<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<title>Bienvenido a shinyStats</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="css/index.css">
	<script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
	<script>
		$(document).ready(function() {
			var s = $('#nUsuarios').text();
			s+=<?php echo $nUsuarios ?>;
			$('#nUsuarios').text(s);
		});
	</script>
</head>
<body id="bodyIndex">
	<h1>Bienvenido a shinyStats</h1><br>
	<p id="nUsuarios">N&uacute;mero de usuarios: </p>
	<p id="error"> </p>
	<div>
		<h3>Resumen</h3>
		<input type="button" value="Mostrar Pokemons" class="btn btn-outline-primary" onclick="location.href='showTables.php'">
		<input type="button" value="Mostrar Usuarios" class="btn btn-outline-primary" onclick="location.href='listaUsuarios.php'">
		<input type="button" value="Mostrar Resumen" class="btn btn-outline-primary" onclick="location.href='resumen.php'">
	</div><br>
	<div>
		<h3>Inserción</h3>
		<input type="button" value="Insertar Pokemon" class="btn btn-outline-primary" onclick="location.href='insertarPokemon.html'">	
		<input type="button" value="Insertar Datos" class="btn btn-outline-primary" onclick="location.href='insertarDatos.html'">
		<input type="button" value="Insertar Usuario" class="btn btn-outline-primary" onclick="location.href='insertarUsuario.html'">
	</div>
</body>
</html>