	var nPersonas=0;
	var pokemons = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var por = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var oneTime= false;
	var nombres= ["Bulbasur","Charmander","Squirtle","Squirtle (con gafas)","Caterpie","Rattata","Pichu","Pikachu","Raichu (Alola)","Pichu (gorro clebracion)","Pikachu (gorro celebracion)","Pikachu (gorra)","Pikachu (sombrero Halloween)",
	"Pichu (sombrero Halloween)","Pichu (gorro Navidad)","Pikachu (gorro Navidad)","Pikachu (flores)","Raichu (flores)","Sandshrew","Nidoran","Cleffa","Psyduck","Mankey","Growlithe","Machop","Geodude","Ponyta","Magnemite","Grimer","Shellder",
	"Gastly","Drowzee","Krabby","Cubone","Marowak (Alola)","Elekid","Magby","Pinsir","Magikarp","Eevee","Eevee (flores)","Omanyte","Kabuto","Aerodactyl","Articuno","Zapdos","Moltres","Dratini","Chikorita","Cyndaquil","Totodile","Togepi","Natu",
	"Mareep","Azurril","Sunkern","Murkrow","Misdreavus","Wynaut","Pineco","Snubbul","Swinub","Delibird","Houndour","Larvitar","Lugia","Ho-oh","Poochyena","Zigzagoon","Taillow","Wingull","Makuhita","Sableye","Aron","Meditite","Plusle","Minum",
	"Budew","Roselia","Wailmer","Spoink","Swablu","Feebas","Shuppet","Duskull","Absol","Snorunt","Clamperl","Luvdisc","Beldum","Latias","Kyogre","Groudon","Shinx","Drifloon","Meltan"];
	
	var mayorPorcentaje = [0,0,0,0,0];
	var menorPorcentaje = [0,0,0,0,0];

	function leerArchivo(e) {
  		var archivo = e.target.files[0];
  		if (!archivo) {
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
  		lector.readAsText(archivo);
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
	}

	function load(){
		if(!oneTime){
			oneTime=true;
			var input = document.getElementById("file-input");
			input.addEventListener('change', leerArchivo, false);
		}
		setUp();
		var td = document.getElementById("td1");
		var tdResult = document.getElementById("results");
		var tdPor = document.getElementById("por");
		td.innerText = nPersonas;
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
				pokemons[i]=0;
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
		var max1=0,max2=0,max3=0,max4=0,max5=0
		for(var i=0;i<96;i++){
			if(por[i]>por[max5]){
				if(por[i]>por[max4]){
					if(por[i]>por[max3]){
						if(por[i]>por[max2]){
							if(por[i]>por[max1]){
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
		var min1=1000000,min2=1000000,min3=1000000,min4=1000000,min5=1000000;
		for(var i=0;i<96;i++){
			if(por[i]>0){
				if(por[i]<por[min5]){
					if(por[i]<por[min4]){
						if(por[i]<por[min3]){
							if(por[i]<por[min2]){
								if(por[i]<por[min1]){
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
		}
		menorPorcentaje = [min1,min2,min3,min4,min5];
	}

	function showResume(){
		var newTable = document.createElement("table");
		newTable.border=1;
		newTable.id="newTable";
		var column1 = document.createElement("td");
		var column2 = document.createElement("td");

		newTable.appendChild(column1);
		newTable.appendChild(column2);

		document.body.appendChild(newTable);
	}

	//function AddAttachmentAsync(fileName : String) : Attachment;