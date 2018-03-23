var ajax_word = [];

function Find(e) {
    var text = document.getElementById('quary').value;
    if(text.length>2){
    $.ajax({
        url: 'http://pythonapi.pythonanywhere.com/anagram/word=' + text,
        type: 'GET',
        dataType: 'json',
        success: function(data) {           
                ajax_word = data.word;
            	Add_word(ajax_word);
            	randoms();
        }
    });
}};

function Add_word(ajax_word) {
    document.getElementById('match').innerHTML = "";
    for (var i = 0; i < ajax_word.length; i++) {
        var html = `<div class="words">`;
        for (var c = 0; c < ajax_word[i].length; c++) {
            html += `<div class="font-box"><div class="font">` + ajax_word[i][c] + `</div>	</div>`;
        }
        html += `</div>`;
        document.getElementById('match').innerHTML += html;
    }


}


function randoms() {
	var matchs = document.getElementById('match').childNodes;
	for(i in matchs){
		match = matchs[i];
		console.log(match);

	}
}
//console.log("im called");