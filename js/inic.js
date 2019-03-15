	var nPersonas=0;
	var pokemons = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER];
	var por = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var oneTime= false;
	var nombres= ["Bulbasur","Charmander","Squirtle","Squirtle (con gafas)","Caterpie","Rattata","Pichu","Pikachu","Raichu (Alola)","Pichu (gorro clebracion)","Pikachu (gorro celebracion)","Pikachu (gorra)","Pikachu (sombrero Halloween)",
	"Pichu (sombrero Halloween)","Pichu (gorro Navidad)","Pikachu (gorro Navidad)","Pikachu (flores)","Raichu (flores)","Sandshrew","Nidoran","Cleffa","Psyduck","Mankey","Growlithe","Machop","Geodude","Ponyta","Magnemite","Grimer","Shellder",
	"Gastly","Drowzee","Krabby","Cubone","Marowak (Alola)","Elekid","Magby","Pinsir","Magikarp","Eevee","Eevee (flores)","Omanyte","Kabuto","Aerodactyl","Articuno","Zapdos","Moltres","Dratini","Chikorita","Cyndaquil","Totodile","Togepi","Natu",
	"Mareep","Azurril","Sunkern","Murkrow","Misdreavus","Wynaut","Pineco","Snubbul","Swinub","Delibird","Houndour","Larvitar","Lugia","Ho-oh","Poochyena","Zigzagoon","Taillow","Wingull","Makuhita","Sableye","Aron","Meditite","Plusle","Minum",
	"Budew","Roselia","Wailmer","Spoink","Swablu","Feebas","Shuppet","Duskull","Absol","Snorunt","Clamperl","Luvdisc","Beldum","Latias","Kyogre","Groudon","Shinx","Drifloon","Meltan"];
	
	var mayorPorcentaje = [0,0,0,0,0];
	var menorPorcentaje = [0,0,0,0,0];

	function leerArchivos(e){
		var archivos = e.target.files;
		for(var i=0;i<archivos.length;i++){
			leerArchivo(archivos[i]);
		}
	}

	function leerArchivo(file) {
  		if (!file) {
    		return;
  		}
  		var lector = new FileReader();
  		lector.onload = function(e) {
    		var contenido = e.target.result;
    		var array = contenido.split("\r\n");
    		var newData = JSON.parse("["+array[0]+"]");
    		addNewData(newData);
    		load();
 		 };
  		lector.readAsText(file);
	}

	function addNewData(newData){
		for(var i=0;i<96;i++){
			pokemons[i]+=newData[i];
		}
		nPersonas++;
	}

	function clean(){
		nPersonas=0;
		load();
		closeResume();

		document.getElementById("file-input").value="";
	}

	function load(){
		if(!oneTime){
			oneTime=true;
			var input = document.getElementById("file-input");
			input.addEventListener('change', leerArchivos, false);
		}
		setUp();
		var td = document.getElementById("td1");
		td.innerText = nPersonas;
	}

	function setUp(){
		for(var i=0;i<96;i++){
			if(nPersonas==0){
				por[i]=0;
				pokemons[i]=0;
			}
			else {
				var value = trunc((pokemons[i]/nPersonas)*100,2);
				if(value>100){
					por[i]=100;
				} 
				else {
					por[i]=value;	
				}
			}
		}
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
			var data = nPersonas+"\r\n"+pokemons.toString()+"\r\n"+por.toString();
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

	function resume(){
		calcularMayores();
		calcularMenores();
		showResume();
	}

	function calcularMayores(){
		var max1=max2=max3=max4=max5=pokemons.length-1;
		for(var i=0;i<96;i++){
			if(pokemons[i]>pokemons[max5]){
				if(pokemons[i]>pokemons[max4]){
					if(pokemons[i]>pokemons[max3]){
						if(pokemons[i]>pokemons[max2]){
							if(pokemons[i]>pokemons[max1]){
								max1=i;
							} else {
								max2=i;
							}
						} else {
							max3=i;
						}
					} else {
						max4=i;
					}
				} else {
					max5=i;
				}
			}
		}
		mayorPorcentaje = [max1,max2,max3,max4,max5];
	}

	function calcularMenores(){
		var min1=min2=min3=min4=min5=pokemons.length-2;
		for(var i=0;i<96;i++){
			if(pokemons[i]>0){
				if(pokemons[i]<pokemons[min5]){
					if(pokemons[i]<pokemons[min4]){
						if(pokemons[i]<pokemons[min3]){
							if(pokemons[i]<pokemons[min2]){
								if(pokemons[i]<pokemons[min1]){
									min1=i;
								} else {
									min2=i;
								}
							} else {
								min3=i;
							}
						} else {
							min4=i;
						}
					} else {
						min5=i;
					}
				}
			}
		}
		menorPorcentaje = [min1,min2,min3,min4,min5];
	}

	function showResume(){
		var tableResumen = document.getElementById("resumen");
		var tdMejores = document.getElementById("mejores");
		var tdPeores = document.getElementById("peores");
		var list1 = new Array(6);
		var list2 = new Array(6);
		for(var i=0;i<6;i++){
			var aux1 = document.createElement("p");
			var aux2 = document.createElement("p");
			list1[i]=aux1;
			list2[i]=aux2;
		}		

		for(var i=0;i<6;i++){
			if(i==0){
				list1[0].innerText="Pokemons con mayor ocurrencia";
				list2[0].innerText="Pokemons con menor ocurrencia";
			}
			else {
				list1[i].innerText=i+": "+nombres[mayorPorcentaje[i-1]]+" ("+pokemons[mayorPorcentaje[i-1]]+") ("+por[mayorPorcentaje[i-1]]+"%)";
				list2[i].innerText=i+": "+nombres[menorPorcentaje[i-1]]+" ("+pokemons[menorPorcentaje[i-1]]+") ("+por[menorPorcentaje[i-1]]+"%)";
			}
		}

		for(var i=0;i<6;i++){
			tdMejores.appendChild(list1[i]);
			tdPeores.appendChild(list2[i]);
		}

		tableResumen.style.visibility="visible";
	}

	function closeResume(){
		var tdMejores = document.getElementById("mejores");
		var tdPeores = document.getElementById("peores");
		while (tdMejores.hasChildNodes() || tdPeores.hasChildNodes()) {   
  			if(tdMejores.hasChildNodes()) tdMejores.removeChild(tdMejores.firstChild);
  			if(tdPeores.hasChildNodes()) tdPeores.removeChild(tdPeores.firstChild);
		} 
		var tableResumen = document.getElementById("resumen");
		resumen.style.visibility="hidden";
	}