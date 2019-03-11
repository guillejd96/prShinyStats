var nPersonas=0;
var pokemons = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var por = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

		function load(){
			var td = document.getElementById("td1");
			var tdResult = document.getElementById("results");
			var tdPor = document.getElementById("por");
			td.innerText = nPersonas;
			setUp();
			tdResult.innerText=pokemons.toString();
			tdPor.innerText=por.toString();
		}

		function SumarPersona(){
			nPersonas++;
			load();
		}

		function setUp(){
			for(var i=0;i<96;i++){
				if(nPersonas==0){
					por[i]=0;
				}
				else {
					por[i]=trunc((pokemons[i]/nPersonas)*100,2);;
				}
			}
		}

		function RestarPersonas(){
			nPersonas--;
			load();
		}

		function Sumar(n){
			pokemons[n]++;
			load();
		}

		function Restar(n){
			pokemons[n]--;
			load();
		}

		function trunc (x, posiciones = 0) {
			var s = x.toString()
			var l = s.length
			var decimalLength = s.indexOf('.') + 1
			var numStr = s.substr(0, decimalLength + posiciones)
			return Number(numStr)
		}