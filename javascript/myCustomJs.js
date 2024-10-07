function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}

/*JavaScript och jQueryUI för index.html*/
$(document).ready(function(){ //Ger cookies policy rutan en stilig kollapsbar meny
    $(function(){
        $('#accordion').accordion({
            autoHeight: false, //'autoHeight' samt 'heightStyle' får höjden att matcha innehållet
            heightStyle: "content",
            classes: { 
                "ui-accordion-header": "w3-green w3-border-green", //Färgar header när den är aktiv
                "ui-accordion-header-collapsed": "w3-light-green w3-border-0 w3-hover-text-white", //Färgen när header är inaktiv
            },
        });
    });

    $("#policy").show();

    let cookieValue = getCookie("policy"); //Söker cookie med namnet som du anger

    if(cookieValue == "Has read the Policy") { //Om den har denna värde...
        $("#policy").hide(); //... så göms policy rutan
    }
});

function readPolicy(){ //När användare acceptera villkoren så... 
    $("#policy").hide(); //... göms policy rutan... 
    setCookie("policy", "Has read the Policy", 1); //... och sätter en cookie som heter "policy" med värdet " "Has read the Policy"
}

function setCookie(cname,cvalue,exdays) { // funktion från W3-schools som skapar en cookie med
    const d = new Date();                 // med tre inparametrar: namn, värde och utgångsdatum
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
} //Kod tagen från exempel mappen

function getCookie(cname) { //funktion som hittar cookien med angivet namn (cname)
    let name = cname + "="; 
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        //alert(c.substring(name.length, c.length));
        return c.substring(name.length, c.length);
        }
    }
    return "";
  }







/*JavaScript, jQuery och jQueryUI för survey.html*/
$(document).ready(function(){
    $('#alertboxbt').click(function(){
        $('#alertbox').hide("drop", 500);
    });

    $('#send').click(function(event){
        event.preventDefault(); //Förhindrar formuläret att skickas
        
        let address = $('#address').val();
        const validationEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        
        if (validationEmail.test(address)) {
            let fullname = $('#fname').val() + " " + $('#sname').val();
            let content = "Your message: " + $('#message').val() + "\nFavourite city: " + $('input[name="city"]:checked').val(); //Hämtar det valda radioknappens värde samt textarea
            const URIaddress = encodeURIComponent(address);
            const URIfullname = encodeURIComponent(fullname);
            const URIcontent = encodeURIComponent(content); //Encode förvandlar specialtecken till valida tecken
    
            window.location = 'mailto:' + URIaddress + '?subject=' + URIfullname + '&body=' + URIcontent; //Öppnar email fönstret om du har ett
        }
        else {
            $("#alertbox").show("bounce", { times:5, distance:100 }, "easeOutBack", "slow"); //En varningslåda poppar ner och studsar 5 gånger om #address är tom.

            $("#address").css("background-color", "mistyrose"); 
        }
    });
    $('#address').focus(function(){
        $('#address').css("background-color", "white");
    });
});


/*JavaScript för bucketlist.html*/
let myCities = new Array (); /*let deklarerar en variabel som kan ändras, i det här fallet så är den ett fält/array*/

$(document).ready(function(){
    $(function(){
        $('#sortable').sortable({
            items: ".sortitem" //Väljer vilka saker man kan sortera
        });
    });
});

function onInput() {
    document.getElementById("inputError1").innerHTML = "";
    document.getElementById("inputError3").innerHTML = "";
    if (myCities[0]!=null){/*Om fältet har ett värde vid position 0, så skrivs det in i textarean*/
        document.getElementById("put1").innerHTML = myCities[0];
    }
    else {/*Annars visas det en tomruta i textarean utan att sätta in något i 'myCities' fältet. Det är för att undvika ett 'undefined' värde ska visas på textfältet*/
        document.getElementById("put1").innerHTML = "";
    }
    if (myCities[1]!=null){/*Resten av metoden kör samma kod fast vid en annan position*/
        document.getElementById("put2").innerHTML = myCities[1];
    }
    else {
        document.getElementById("put2").innerHTML = "";
    }
    if (myCities[2]!=null){
        document.getElementById("put3").innerHTML = myCities[2];
    }
    else {
        document.getElementById("put3").innerHTML = "";
    }
    if (myCities[3]!=null){
        document.getElementById("put4").innerHTML = myCities[3];
    }
    else {
        document.getElementById("put4").innerHTML = "";
    }
    if (myCities[4]!=null){
        document.getElementById("put5").innerHTML = myCities[4];
    }
    else {
        document.getElementById("put5").innerHTML = "";
    }
}

function sortCities() {
    if (myCities[0]==null){/*Om 'myCities' fältet ej har ett definierat värde vid position 0, så körs denna kod*/
        document.getElementById("inputError3").innerHTML = "You cannot sort an empty list. Please add a city.";
        document.getElementById("inputError2").innerHTML = "";
    }
    else {
        myCities.sort();/*Sorterar fältet i alfabetisk ordning*/
        onInput();
        document.getElementById("inputError2").innerHTML = "List have been sorted alphabetically!";
    }
} 

function removeCity1() {
    myCities.splice(0,1);/*Tar bort fält element specifierad inom parantes. Den första värdet benämner position medans den andra värdet benämner antal element som ska tas bort*/
    onInput();
    document.getElementById("inputError2").innerHTML = "";
}

function removeCity2() {
    myCities.splice(1,1);
    onInput();
    document.getElementById("inputError2").innerHTML = "";
}

function removeCity3() {
    myCities.splice(2,1);
    onInput();
    document.getElementById("inputError2").innerHTML = "";
}

function removeCity4() {
    myCities.splice(3,1);
    onInput();
    document.getElementById("inputError2").innerHTML = "";
}

function removeCity5() {
    myCities.splice(4,1);
    onInput();
    document.getElementById("inputError2").innerHTML = "";
}

function inputCity() { /*function deklarerar kodblock som fungerar som en metod i C#*/ 
    let add = document.getElementById("fetch").value.trim(); /*Deklarerar ett variabel värde som i nästa rad kollar om input är tomt. '.trim()' tar bort mellanslag som ligger i början och i slutet av strängen*/
    add = add.toUpperCase(); /*Omvandlar alla bokstäver till stora bokstäver*/
    if (add=='' || add==null) {
        document.getElementById("inputError1").innerHTML = 
        "The textbox is empty. Please fill it out with a city name."; /*Om input är tomt, så dyker denna text  på <p id="userError">*/
    }
    else if (myCities[4]!=null) {/*Om 'myCities fältet har ett värde vid position 4, så körs denna kod*/
        document.getElementById("inputError1").innerHTML = 
        "You have reached the maximum amount of cities that can be added. Please remove a previous city!";
    }
    else {
        add = add.replace(/\s{2,}/g, ' '); /*\s kollar efter mellanrum, talet inom '{}' säger minst 2 st mellanrum i rad, g säger till att leta globalt, och char värdet efter komman säger till att alla mellanrum som är minst två i rad ska ersättas med ett mellanslag. Hittade det här koden, som jag har modifierat, härifrån https://stackoverflow.com/a/14053282 */
        myCities.push(add);
        fetchAlert();
        onInput();
    }
    document.getElementById("fetch").value = ''; /*Gör input fältet tom efteråt*/
}

function fetchAlert() {
    let add = document.getElementById("fetch").value.trim();
    add = add.replace(/\s{2,}/g, ' ');
    add = add.toUpperCase(); /*Omvandlar alla bokstäver till stora bokstäver*/
    let list = "";
    for (let i = 0; i < myCities.length; i++) { /*Ändrar meningsbyggnaden för grammatikens skull beroende på om det är ett eller flera saker i array*/
        if (myCities.length == 1)
            list = "is " + [(i+1)] + " city"
        else
            list = "are " + [(i+1)] + " cities";
    }
    let letterStart = add.charAt(0);/*Kollar första bokstaven*/
    let lengthNoSpace = add.replace(/\s{1,}/g, '');/*Tar bort alla mellanslag så att 'length' nedan ej räknar in mellanrum när man skriver in en stad som har ett namn med mellanrum*/
    let length = lengthNoSpace.length;
    
    document.getElementById("inputError2").innerHTML = "There " + list + " on your list.\r" + add + " begins on the letter " + letterStart + ", and is " + length + " letters long.";
}



/*JavaScript, jQuery och jQueryUI för contact.html*/
$(document).ready(function(){//Förhindrar JQuery kod att köra innan hela webbsidan har laddats, vilket också gör så att JS filen kan ligga innan <body> elementet i HTML filen utan fel uppstår med JavaScript ordningen

    $(function(){ //Skapar en tooltip över input fälten när muspekaren hålls ovanför dem
        $('#txtName').tooltip({
            content: "Example: Mikael Herz", //Beskriver innehållet så man slipper använda 'title'
            items: "#txtName", //Sätter vart tooltip ligger. Behövs alltid med 'content'
            show: { effect: "explode", duration: 100 },
            classes: {
                "ui-tooltip": "ui-corner-all ui-widget-shadow w3-amber"
            },  //Lägger till klasser som ger skugga, runda hörn och backgrundsfärg
            position: {
                my: "left+10", //Åt vilket håll tooltip rutan kommer att poppa upp från
                at: "right" //Från vart nånstans på '#txtName' kommer tooltip rutan orienterar sig på
            }, //Betyder att den är på höger sida plus 10 px åt höger
            hide: { effect: "explode", duration: 150 }, 
        });
        $('#txtEmail').tooltip({
            content: "Example: mikaelherz@example.com",
            items: "#txtEmail",
            show: { effect: "shake", duration: 300 },
            classes: {
                "ui-tooltip": "ui-corner-all ui-widget-shadow w3-pale-blue"
            },
            position: {
                my: "left+10", 
                at: "right",
                collision: "none"
            }, 
            hide: { effect: "bounce", duration: 300 }, 
        });
        $('#selCity').tooltip({
            content: "Pick a city",
            items: "#selCity",
            show: { effect: "fold", horizFirst: false, duration: 400 },
            classes: {
                "ui-tooltip": "ui-corner-all ui-widget-shadow w3-lime"
            },
            position: {
                my: "left+20", 
                at: "right" 
            }, 
            hide: { effect: "fold", horizFirst: true, duration: 400 }, 
        });
        $('#txtMsg').tooltip({
            content: "Just type something",
            items: "#txtMsg",
            show: { effect: "clip", direction: "vertical", duration: 100 },
            classes: {
                "ui-tooltip": "ui-corner-all ui-widget-shadow w3-pink"
            },
            position: {
                my: "left+10 top+1", 
                at: "right top" 
            }, 
            hide: { effect: "clip", direction: "horizontal", duration: 200 }, 
        });
    })

    let boolName = false; //Används för form validering
    let boolEmail = false;
    let boolCity = false;
    let boolMsg = false;

    $("#txtName").keyup(function(){ //keyup() funktionen körs när en tangentbordsknapp släppts efter nedtryck
        const name = $(this).val(); //Sätter värdet från txtName på variabeln 
        
        //Specifierar vad för symboler ska finnas via RegEx. Tagen härifrån https://stackoverflow.com/a/31564796
        const validationName = new RegExp(/^(\s)*[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*(\s)*$/);
        
        //Ser om strängen i variabeln endast har symbolen specifierad i 'ValidationName'
        if (validationName.test(name)) { //Om det är sant, kör denna kodblock 
            $("#errorMsg1").hide(); //Gömmer 'errorMsg' i HTML filen
            
            $("#txtName").css("background-color", "white"); //Sätter ett CSS stil element på #txtName input
            $("#txtName").css("border-color", "gray"); 

            boolName = true; //Detta bool kommer senare användas för att kolla om alla input är ifyllda
        }
        else { //Annars körs denna
            $("#errorMsg1").show();
            
            $("#txtName").css("background-color", "mistyrose"); 
            $("#txtName").css("border-color", "red");

            boolName = false; 
        }
    });
    $("#txtName").focus(function(){ //Focus är när ett element blir fokuserad genom att klicka på den via musen eller TAB knappen. När input är fokuserad ändras bakgrundsförgen, samt kantfärgen
        $("#txtName").css("background-color", "lightcyan");
        $("#txtName").css("border-color", "gray");
    });
    $("#txtName").blur(function(){ //Blur är när ett element slutar att vara fokuserad 
        
        const name = $(this).val();
        const validationName = new RegExp(/^(\s)*[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*(\s)*$/);

        if (!validationName.test(name)){ //Hämtar värdet från 'txtName', om det ej finns ett korrekt värde, kör kodblocken
            $("#txtName").css("background-color", "mistyrose"); 
            $("#txtName").css("border-color", "red");

            $("#errorMsg1").show();
        }
        else if (validationName.test(name)){
            $("#txtName").css("background-color", "white");
            $("#txtName").css("border-color", "gray");
        } //Utan denna kodblock så fortsätter input vara cyan om användaren lämnar input efter att ha tryckt på 'send' knappen
    });

    $("#txtEmail").keyup(function(){ 
        const email = $(this).val();
        
        //Ser till att det matchar en emailadress via RegEx. Tagen härifrån https://emailregex.com/
        const validationEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        
        if (validationEmail.test(email)) { //Ser om strängen i variabeln inte matchar ett email format
            $("#errorMsg2").hide(); 
            
            $("#txtEmail").css("background-color", "white"); 
            $("#txtEmail").css("border-color", "gray");

            boolEmail = true;
        }
        else {
            $("#errorMsg2").show();
            
            $("#txtEmail").css("background-color", "mistyrose"); 
            $("#txtEmail").css("border-color", "red");

            boolEmail = false;
        }
    });
    $("#txtEmail").focus(function(){ 
        $("#txtEmail").css("background-color", "lightcyan");
        $("#txtEmail").css("border-color", "gray");
    });
    $("#txtEmail").blur(function(){
        
        const email = $(this).val();
        const validationEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (!validationEmail.test(email)){ 
            $("#txtEmail").css("background-color", "mistyrose"); 
            $("#txtEmail").css("border-color", "red");

            $("#errorMsg2").show();
        } 
        else if (validationEmail.test(email)){
            $("#txtEmail").css("background-color", "white");
            $("#txtEmail").css("border-color", "gray"); 
        }
    });

    $("#selCity").change(function(){ //Koden körs endast när användare väljer ett nytt val
        const ValidationCity = $(this).val(); //Hämtar värdet inom taggen i HTML filen, inte själva innehållet
        if (ValidationCity != ""){
            $("#errorMsg3").hide();

            boolCity = true;
        }
        else {
            $("#errorMsg3").show();

            boolCity = false;
        }
    });
    
    $("#txtMsg").keyup(function(){ 

        if ($(this).val()) {  
            $("#errorMsg4").hide(); 

            $("#txtMsg").css("background-color", "white"); 
            $("#txtMsg").css("border-color", "gray");
            $("#txtMsg").css("border-radius", "0px");
            
            boolMsg = true;
        }
        else { 
            $("#errorMsg4").show();
            
            $("#txtMsg").css("background-color", "mistyrose"); 
            $("#txtMsg").css("border-color", "red");
            $("#txtMsg").css("border-radius", "2px");

            boolMsg = false;
        }
    });
    $("#txtMsg").focus(function(){ 
        $("#txtMsg").css("background-color", "lightcyan");
        $("#txtMsg").css("border-color", "gray");
        $("#txtMsg").css("border-radius", "0px");
    });
    $("#txtMsg").blur(function(){
        if ($(this).val()){
            $("#txtMsg").css("background-color", "white");
            $("#txtMsg").css("border-color", "gray");
            $("#txtMsg").css("border-radius", "0px");
        }
        else {
            $("#txtMsg").css("background-color", "mistyrose"); 
            $("#txtMsg").css("border-color", "red");
            $("#txtMsg").css("border-radius", "2px");

            $("#errorMsg4").show();
        }
    });

    $("#bt").click(function(){ 
        if (boolName && boolEmail && boolCity && boolMsg){ //Kollar om alla input är ifyllda innan animation körs
            $("#show").animate({opacity: '0'}, 400, function(){ //I den första blocket, gör bilden osynlig. Den andra blocket säger att det ska ta 400 millisekunder att slutföra. Den tredje säger att när animationen är färdigt, så körs nästa animation, detta kallas för en callback funktion

                $("#hide").show(function(){//När #hide bilden dyker upp, så åker den direkt ner till sin ursprungliga position (alltså den position den egentligen ligger i själva HTML filen), eftersom jag använde CSS style för att visa bilden 1000px ovanför sin position
                    $("#hide").animate({top: '0px'}, function(){
                        function animateLoop(){//Skapar en animations funktion som loopar
                            $("#hide").animate({opacity: '0.2', width: '-=50px', height: '-=10px'}, 800).delay(100);
                            $("#hide").animate({opacity: '1', width: '+=50px', height: '+=10px'}, 800, animateLoop).delay(100);                   
                        }
                        animateLoop();//Animerar oändligt ända tills den kraschar eller webbsidan ladds om
                    });
                });
            });
            $("#errorMsg5").html("");

            //Tillkallar metoden att ladda ner information
            saveFile(); 
        }
        else{ //Kollar vilka input som är ej ifyllda samt visar det för användaren
            if (!boolName){
                $("#errorMsg1").show();
            }
            if (!boolEmail){
                $("#errorMsg2").show();
            }
            if (!boolCity) {
                $("#errorMsg3").show();
            }
            if (!boolMsg){
                $("#errorMsg4").show();
            }
            $("#errorMsg5").html("Unable to submit form. Please fill out all input fields!");
        }
    });
});

function saveFile() {

    //Hämtar data från varje element i formuläret samt trimmar bort mellanrum i början och slutet av strängen
    let nameValue = document.getElementById('txtName').value.trim(); 
    let emailValue = document.getElementById('txtEmail').value;
    let cityValue = document.getElementById('selCity').value; 
    let msgValue = document.getElementById('txtMsg').value.trim();

    //Tar bort alla dubbla mellanrum. 'selCity' ingår ej eftersom användaren kan ej göra mellanslag samt jag vill inte ändra på 'txtEmail'
    nameValue = nameValue.replace(/\s{2,}/, ' ');
    msgValue = msgValue.replace(/\s{2,}/, ' ');

    //Variabeln tar in allt och gör det till ett meddelande
    let data = '\r Name: ' + nameValue + '\r\n ' +
        'Email: ' + emailValue + '\r\n ' +
        'City: ' + cityValue + '\r\n ' +
        'Message: ' + msgValue;
       
    /*alert(data); /*Alert används för testning, specifikt vad för värde let data har. Dessutom funkar inte HTML attributet required om det finns en alert, i alla fall på Mac-->*/
        
    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], { type: 'text/plain' });
    const sFileName = 'formData.txt'; // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }
    newLink.click();
}