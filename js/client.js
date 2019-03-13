	var nPersonas=1;
	var pokemons = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var oneTime= false;
	var nombres= ["Bulbasur","Charmander","Squirtle","Squirtle (con gafas)","Caterpie","Rattata","Pichu","Pikachu","Raichu (Alola)","Pichu (gorro clebracion)","Pikachu (gorro celebracion)","Pikachu (gorra)","Pikachu (sombrero Halloween)",
	"Pichu (sombrero Halloween)","Pichu (gorro Navidad)","Pikachu (gorro Navidad)","Pikachu (flores)","Raichu (flores)","Sandshrew","Nidoran","Cleffa","Psyduck","Mankey","Growlithe","Machop","Geodude","Ponyta","Magnemite","Grimer","Shellder",
	"Gastly","Drowzee","Krabby","Cubone","Marowak (Alola)","Elekid","Magby","Pinsir","Magikarp","Eevee","Eevee (flores)","Omanyte","Kabuto","Aerodactyl","Articuno","Zapdos","Moltres","Dratini","Chikorita","Cyndaquil","Totodile","Togepi","Natu",
	"Mareep","Azurril","Sunkern","Murkrow","Misdreavus","Wynaut","Pineco","Snubbul","Swinub","Delibird","Houndour","Larvitar","Lugia","Ho-oh","Poochyena","Zigzagoon","Taillow","Wingull","Makuhita","Sableye","Aron","Meditite","Plusle","Minum",
	"Budew","Roselia","Wailmer","Spoink","Swablu","Feebas","Shuppet","Duskull","Absol","Snorunt","Clamperl","Luvdisc","Beldum","Latias","Kyogre","Groudon","Shinx","Drifloon","Meltan"];
	
	function clean(){
		for(var i=0;i<pokemons.length;i++){
			pokemons[i]=0;
		}
		refresh();
	}

	function refresh(){
		var cant = document.getElementsByClassName("pokemon");
		for(var i=0;i<cant.length;i++){
			cant[i].innerText=pokemons[i];
		}
	}

	function load(){
		if(!oneTime){
			oneTime=true;
			var table = document.getElementById("data");
			var rows = table.rows;
			var cont=0;
			for(var i = 0; i < rows.length; i++) {
				var row = rows[i].cells;
				for(var j=0;j<row.length;j++){
					if(row[j].id=="pokemon"){
						var cant = document.createElement("p");
						cant.className="pokemon";
						cant.innerText=pokemons[cont];
						cont++;
						row[j].appendChild(cant);
					}
				}
			}
		}
		refresh();
	}
	function Sumar(n){
		pokemons[n]++;
		load();
	}

	function Restar(n){
		if(pokemons[n]>0) pokemons[n]--;
		else pokemons[n]=0;
		load();
	}

	function changeExport(){
		var td = document.getElementById("export");
		var exportButton = td.firstChild;

		var input = document.createElement("INPUT");
		input.type = "text";

		var saveButton = document.createElement("INPUT");
		saveButton.type="button";
		saveButton.id="saveButton";
		saveButton.value = "Guardar";

		saveButton.onclick = function(){
			var filename = input.value+".txt";
			var data =pokemons.toString();
			download(data,filename,'text/plain');
			td.removeChild(saveButton);
			td.replaceChild(exportButton,input);
		};

		td.replaceChild(input,exportButton);
		td.appendChild(saveButton);
	}

	// Function to download data to a file
	function download(data, filename, type) {
	    var file = new Blob([data], {type: type});
	    if (window.navigator.msSaveOrOpenBlob) // IE10+
	        window.navigator.msSaveOrOpenBlob(file, filename);
	    else { // Others
	        var a = document.createElement("a"),
	                url = URL.createObjectURL(file);
	        a.href = url;
	        a.download = filename;
	        document.body.appendChild(a);
	        a.click();
	        setTimeout(function() {
	            document.body.removeChild(a);
	            window.URL.revokeObjectURL(url);  
	        }, 0); 
	    }
	}