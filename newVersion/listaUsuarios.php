<?php 
	$conexion = mysqli_connect("localhost","root","","shinystats") or die ("No se ha podido conectar al servidor de Base de datos");

	$resultado = mysqli_query($conexion,"SELECT * FROM usuario");
 ?>

 <!DOCTYPE html>
 <html lang="es">
 <head>
 	<meta charset="UTF-8">
 	<title>Lista de Usuarios</title>
 	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="css/index.css">
	<script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
 </head>
 <body>
 	<h1>Lista de usuarios</h1>
 	<table border="1" id="table">
 		<tr>
 			<th>Id del usuario</th>
 			<th>Resultado</th>
 			<th>Porcentaje</th>
 		</tr>
 		<?php 
 			while($columna = mysqli_fetch_array($resultado)){
 				$id = $columna['code'];
 				$select = "SELECT count(*) FROM shiny WHERE codeUsuario=".$id." AND ocurrencia>0";
 				$aux1 = mysqli_query($conexion,$select); 
 				$n = $aux1->fetch_row()[0];
 				$aux2 = mysqli_query($conexion,"SELECT count(*) FROM pokemon");
 				$nTotal = $aux2->fetch_row()[0];
 				echo "<tr>";
 				echo "<td><a href='usuario.php?id=".$id."'>".$id."</td>";
 				echo "<td><p>(".$n."/".$nTotal.")</p></td>";
 				echo "<td><p>".round(($n/$nTotal)*100,2)."%</p></td>";
 				echo "</tr>";
 			}
 		 ?>
 	</table>
 	<input type="button" value="Volver" class="btn btn-outline-primary" onclick="location.href='index.php'">
 </body>
 </html>