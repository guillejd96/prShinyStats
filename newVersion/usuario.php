<?php 
	$id = $_GET['id'];

	$conexion = mysqli_connect("localhost","root","","shinystats") or die ("No se ha podido conectar al servidor de Base de datos");

	$resultado = mysqli_query($conexion,"SELECT nPokedex,ocurrencia FROM shiny WHERE codeUsuario=".$id." AND ocurrencia>0 ORDER BY nPokedex ASC");
 ?>

 <!DOCTYPE html>
 <html lang="en">
 <head>
 	<meta charset="UTF-8">
 	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="css/index.css">
	<script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
 	<title>Usuario</title>
 	<script>
		function guardar(){
			$('#save').hide();
 			$('#inputs').hide();
 			$('#edit').show();

			$('#error').css('color', 'red');

 			var nombre = $('#nombre').val();
 			var ocurrencia = $('#ocurrencia').val();
 			if(nombre=='' || ocurrencia==''){
 				$('#error').text("Campo vacío");
 				$('#error').css('color', 'red');
 			}
 			else {
 				$('#error').text("Cargando...");
 				$('#error').css('color', 'black');
 				$.get("isPokemonInDB.php?pokemon='"+nombre+"'&np=-1", function(data) {
 						if(data=="0"){
 							$('#error').text("El Pokemon no existe en la base de datos");
 							$('#error').css('color', 'red');
 						}
 						else {
 							$('#error').text("Obteniendo nº Pokedex...");
 							$('#error').css('color', 'black');
 							$.get("getNPokedex.php?nombre="+nombre, function(data) {
 								$('#error').text("Actualizando ocurrencia...");
 								$('#error').css('color', 'black');
 								var aux = 'editarOcurrencia.php?np='+data+'&id=<?php echo $id ?>&oc='+ocurrencia;
 								$.get(aux, function(data) {
 									if(data=="1"){
 										window.location.reload();
 									} else {
 										$('#error').text("Error al actualizar");
 										$('#error').css('color', 'red');
 									}
 								});
 							});
 						}
 					});
 			}
		}

		function editar(){
			$('#save').show();
 			$('#inputs').show();
 			$('#edit').hide();
		}

 		$(document).ready(function() {
 			$('#save').hide();
 			$('#inputs').hide();
 			$('#save').click(guardar);
 			$('#edit').click(editar);
 		});
 	</script>
 </head>
 <body>
 	<h1>Usuario con id <?php echo $id ?></h1>
 	<table border="1" id="table">
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
 	<p>

 		<input type="button" value="Editar" class="btn btn-outline-primary" id="edit">
 		
 		<table id="inputs">
 			<tr>
 				<td><p>Nombre:</p></td>
 				<td><input type="text" id="nombre"></td>
 			</tr>
 			<tr>
 				<td><p>Ocurrencia:</p></td>
 				<td><input type="number" id="ocurrencia"></td>
 			</tr>
 		</table>
 		
 		<input type="button" value="Guardar" class="btn btn-outline-primary" id="save">
 	</p>
 	<p>
 		<p id="error"></p>
 		<input type="button" value="Volver" class="btn btn-outline-primary" onclick="location.href='listaUsuarios.php'">	
 	</p>
 </body>
 </html>