<?php 
	$conexion = mysqli_connect("localhost","root","","shinystats") or die ("No se ha podido conectar al servidor de Base de datos");

	$consultaMayores = "SELECT p.nPokedex as np,p.nombre as nombre,sum(s.ocurrencia) as ocurrencia FROM pokemon p,shiny s WHERE p.nPokedex = s.nPokedex GROUP BY p.nPokedex ORDER BY ocurrencia DESC";

	$resultadoMayores = mysqli_query($conexion,$consultaMayores);

	$consultaMenores = "SELECT p.nPokedex as np,p.nombre as nombre,sum(s.ocurrencia) as ocurrencia FROM pokemon p,shiny s WHERE p.nPokedex = s.nPokedex AND ocurrencia>0 GROUP BY p.nPokedex ORDER BY ocurrencia ASC";

	$resultadoMenores = mysqli_query($conexion,$consultaMenores);

	$consultaSinCoger = "SELECT p.nombre as nombre,sum(s.ocurrencia) as ocurrencia FROM pokemon p,shiny s WHERE p.nPokedex = s.nPokedex GROUP BY p.nPokedex";

	$resultadoSinCoger = mysqli_query($conexion,$consultaSinCoger);

	$consultaNumUsuarios = "SELECT count(*) FROM usuario";

	$res = mysqli_query($conexion,$consultaNumUsuarios);

	$nUsuarios = $res->fetch_row()[0];
 ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Resumen</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="css/index.css">
	<script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
</head>
<body>
	<h1>Resumen</h1><br>
	<div>
		<h3>Shinys más atrapados</h3>
		<table border="1">
			<?php 
				$i=0;
				while(($columna = mysqli_fetch_array($resultadoMayores)) and $i<5){
					$i+=1;

					$id = $columna['np'];

					$consulta = "SELECT count(*) FROM shiny WHERE ocurrencia>0 and nPokedex=".$id;
					$aux = mysqli_query($conexion,$consulta);
					$n = $aux->fetch_row()[0];

					echo "<tr>";
					echo "<td>".$columna['nombre']."</td>";
					echo "<td>".$columna['ocurrencia']."</td>";
					echo "<td>".round(($n/$nUsuarios)*100,2)."%</td>";
					echo "</tr>";
				}
			 ?>
		</table>
	</div>
	<div>
		<h3>Shinys menos atrapados</h3>
		<table border="1">
			<?php 
				$i=0;
				while(($columna = mysqli_fetch_array($resultadoMenores)) and $i<5){
					$i+=1;

					$id = $columna['np'];

					$consulta = "SELECT count(*) FROM shiny WHERE ocurrencia>0 and nPokedex=".$id;
					$aux = mysqli_query($conexion,$consulta);
					$n = $aux->fetch_row()[0];

					echo "<tr>";
					echo "<td>".$columna['nombre']."</td>";
					echo "<td>".$columna['ocurrencia']."</td>";
					echo "<td>".round(($n/$nUsuarios)*100,2)."%</td>";
					echo "</tr>";
				}
			 ?>
		</table>
	</div>
	<h3>Shinys sin coger</h3>
		<table border="1">
			<?php
				while(($columna = mysqli_fetch_array($resultadoSinCoger))){
					if($columna['ocurrencia']=="0"){
						echo "<tr>";
						echo "<td>".$columna['nombre']."</td>";
						echo "<td>".$columna['ocurrencia']."</td>";
						echo "</tr>";	
					}
					
				}
			 ?>
		</table>
	<input type="button" value="Volver" class="btn btn-outline-primary" onclick="location.href='index.php'">
</body>
</html>