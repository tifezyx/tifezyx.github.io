if(document.addEventListener){
    document.addEventListener("DOMContentLoaded", function(){
        loaded();
    });
} else if(document.attachEvent){
    document.attachEvent("onreadystatechange", function(){
        loaded();
    });
}

function loaded(){
    
    setInterval(loop, 300);
}

var x = 0;

var titleText = [ "|",
                    "S",
                    "SE",
                    "SET",
                    "SETZ",
                    "SETZ-",
                    "SETZ-D",
                    "SETZ-DI",
                    "SETZ-DIC",
                    "SETZ-DICH",
                    "SETZ-DICH.",
                    "SETZ-DICH.J",
                    "SETZ-DICH.JE",
                    "SETZ-DICH.JET",
                    "SETZ-DICH.JETZ",
                    "SETZ-DICH.JETZT",
					"SETZ-DICH.JETZ",
                    "SETZ-DICH.JET",
                    "SETZ-DICH.JE",
                    "SETZ-DICH.J",
                    "SETZ-DICH.",
                    "SETZ-DICH",
                    "SETZ-DIC",
                    "SETZ-DI",
                    "SETZ-D",
                    "SETZ-",
                    "SETZ",
                    "SET",
                    "SE",
                    "S"];

function loop(){
    document.getElementsByTagName("title")[0].innerHTML = titleText[x++%titleText.length];
}