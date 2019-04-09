<?php 
	$id = $_GET['id'];

	$conexion = mysqli_connect("localhost","root","","shinystats") or die ("No se ha podido conectar al servidor de Base de datos");

	$resultado = mysqli_query($conexion,"SELECT nPokedex,ocurrencia FROM shiny WHERE codeUsuario=".$id." AND ocurrencia>0");
 ?>

 <!DOCTYPE html>
 <html lang="en">
 <head>
 	<meta charset="UTF-8">
 	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="css/index.css">
	<script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
 	<title>Usuario</title>
 </head>
 <body>
 	<h1>Usuario con id <?php echo $id ?></h1>
 	<table border="1">
 		<tr>
 			<th>Pokemon</th>
 			<th>Ocurrencia</th>
 		</tr>
		<?php 
			while($columna = mysqli_fetch_array($resultado)){
				$nP = $columna['nPokedex'];
				$res = mysqli_query($conexion,"SELECT nombre FROM pokemon WHERE nPokedex=".$nP);
				$nombre = $res->fetch_row()[0];
				echo "<tr>";
 				echo "<td>".$nombre."</td>";
 				echo "<td>".$columna['ocurrencia']."</td>";
 				echo "</tr>";
			}
		 ?>
 	</table>
 	<br><input type="button" value="Volver" class="btn btn-outline-primary" onclick="location.href='listaUsuarios.php'">
 </body>
 </html>