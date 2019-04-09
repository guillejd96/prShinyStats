	<?php 
			$usuario = "root";
			$servidor = "localhost";
			$basededatos = "shinystats";

			$conexion = mysqli_connect( $servidor, $usuario, "", $basededatos) or die ("No se ha podido conectar al servidor de Base de datos");

			$consulta = "SELECT * FROM usuario";

			$resultado = mysqli_query( $conexion, $consulta ) or die ( "Algo ha ido mal en la consulta a la base de datos  1");

			echo $resultado->num_rows;

	?>