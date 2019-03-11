var nPersonas=0;
var pokemons = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

		function loadPersonas(){
			var td = document.getElementById("td1");
			td.innerText = nPersonas;
		}

		function SumarPersona(){
			nPersonas++;
			loadPersonas();
		}

		function RestarPersonas(){
			nPersonas--;
			loadPersonas();
		}

		function Sumar(n){
			pokemons[n]++;
		}

		function Restar(n){
			pokemons[n]--;
		}