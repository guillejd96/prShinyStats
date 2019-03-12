	var nPersonas=0;
	var pokemons = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var por = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	var oneTime= false;
	function leerArchivo(e) {
  		var archivo = e.target.files[0];
  		if (!archivo) {
    		return;
  		}
  		var lector = new FileReader();
  		lector.onload = function(e) {
    		var contenido = e.target.result;
    		var array = contenido.split("\r\n");
    		nPersonas=array[0];
    		pokemons= JSON.parse("["+array[1]+"]");
    		por=JSON.parse("["+array[2]+"]");
    		load();
 		 };
  		lector.readAsText(archivo);
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
			if(input==null) alert("input es null");
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

	function importFile(){
		var filename = document.getElementById("import_file");
		alert(filename.files[0].value);
	}