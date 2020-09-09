$(document).ready(function(){

    getData();
    $(document).on("click", ".cancella", function(){
        // prendo il valore dello span cliccato e lo memorizzo dentro ad una variabile
        var el = $(this);
        // in un'altra variabile prendo l'attributo "data-id" dello span cliccato
        var identificativo = el.parent().attr("data-id");
        // richiamo la funzione cancella che mi permette di cancellare un elemento della lista
        cancella(identificativo)
    });

// al click del bottone prendo il valore inserito nel campo di input, fatto questo richiamo la funzione aggiunti()
    $(".conferma").click(function(){
        var nuovoEl = $("#nuovo").val();
        aggiungi(nuovoEl);
    });

});




// FUNZIONI

// FUNZIONE per effettuare la chiamata con metodo GET
function getData(){
    $.ajax({
        url: "http://157.230.17.132:3018/todos",
        method: "GET",
        success: function (risposta){
            getElement(risposta);
        },
        error: function (){
            alert("Attenzione! Errore!")
        }
    });
}

// FUNZIONE per generare e appendere la mia lista
function getElement(data){
    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    for (var i = 0; i<data.length; i++){

        // specifico il nostro oggetto
        var context = {
            text: data[i].text,
            id: data[i].id,
        }
        var html = template(context);
        $(".todos").append(html);
    }
}

// FUNZIONE cancella per eliminare un elemento della lista al click della X span

function cancella(id){
    $.ajax({
        url: "http://157.230.17.132:3018/todos/"+id,
        method: "DELETE",
        success: function (risposta){
            // cancello l'elemento della lista selezionato con metodo empty
            $(".todos").empty('');
            // richiamo di nuovo la funzione getData per caricare i dati
            getData();
        },
        error: function(){
            alert("ATTENZIONE! Errore!");
        }
    });
}

function aggiungi(nuovo){
    $.ajax({
        url: "http://157.230.17.132:3018/todos",
        method: "POST",
        // avendo scelto il metodo "POST" dobbiamo usare data per inserire il valore text
        data:{
            text: nuovo
        },
        success: function (risposta){
            // console.log(risposta);
        },
        error: function(){
            alert("ATTENZIONE! Errore!");
        }
    });
}
