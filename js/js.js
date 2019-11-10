var activeKartya, tomb, tovabbMegy, szamlalo, fajlTartalom, billentyuk, erdemjegy, ido, sec, min, karakter, szoveg, kep;
var i = 0;
var hiba = 0;
var begepeltSzoveg = [];
var kiirtSzoveg = [];
var arany = 0;

tovabbMegy = true;
//Eltüntetjük a Pause gombot
document.querySelector('.pause').style.display = 'none';

//Kártyakattintás műveletei
function kartyaKattintas() {
    document.querySelector('.wrapper1').classList.remove('megjelenitGrid');
    document.querySelector('.wrapper1').classList.add('eltuntet');
    document.querySelector('.wrapper2').classList.remove('eltuntet');
    document.querySelector('.wrapper2').classList.add('megjelenitGrid');  
    document.querySelector('.feladatoldal__kezeles-kartya .kartya__test-kep').classList.remove('alap');
    document.querySelector('.feladatoldal__kezeles-kartya .kartya__test-kep').classList.add('szint_' + activeKartya);    
}

//Valamelyik kártyára kattintunk
document.getElementById('kartya_01').addEventListener('click', function() {
    activeKartya = 1;
    kep = './img/nyuszi_karakter.webp';
    document.querySelector('.kep').src = kep;
    kartyaKattintas();
    fajlBeolvasas();
});
document.getElementById('kartya_02').addEventListener('click', function() {
    activeKartya = 2;
    kep = './img/csacsi_karakter.webp';
    document.querySelector('.kep').src = kep;
    kartyaKattintas();
    fajlBeolvasas();
});
document.getElementById('kartya_03').addEventListener('click', function() {
    activeKartya = 3;
    kep = './img/maci_karakter.webp';
    document.querySelector('.kep').src = kep;
    kartyaKattintas();
    fajlBeolvasas();
});
document.getElementById('kartya_04').addEventListener('click', function() {
    activeKartya = 4;
    kep = './img/tigris_karakter.webp';
    document.querySelector('.kep').src = kep;
    kartyaKattintas();
    fajlBeolvasas();
});
document.getElementById('kartya_05').addEventListener('click', function() {
    activeKartya = 5;
    kep = './img/oroszlan_karakter.webp';
    document.querySelector('.kep').src = kep;
    kartyaKattintas();
    fajlBeolvasas();
});

//Visszanyilra kattintunk
document.querySelector('.feladatoldal__navigacio-nyil').addEventListener('click', function() {
    document.querySelector('.wrapper1').classList.remove('eltuntet');
    document.querySelector('.wrapper1').classList.add('megjelenitGrid');
    document.querySelector('.wrapper2').classList.remove('megjelenitGrid');
    document.querySelector('.wrapper2').classList.add('eltuntet');
    document.querySelector('.feladatoldal__kezeles-kartya .kartya__test-kep').classList.remove('szint_' + activeKartya);
    document.querySelector('.feladatoldal__kezeles-kartya .kartya__test-kep').classList.add('alap');

    tisztit();
});


document.querySelector('.play').addEventListener('click', play);
document.querySelector('.play').addEventListener('click', idoSzamlalo);
document.querySelector('.pause').addEventListener('click', pause);
document.querySelector('.pause').addEventListener('click', idoMegallito);

//Play gomb kattintásának műveletei
function play() {
    document.querySelector('.feladatoldal__navigacio-nyil').classList.remove('aktiv');
    document.querySelector('.feladatoldal__navigacio-nyil').classList.add('inaktiv');    
    document.querySelector('.play').style.display = 'none';    
    document.querySelector('.pause').style.display = 'block';
    document.querySelector('.kartya__test').classList.add('arnyek');
    document.querySelector('.betu').classList.add("betu_jon");    
    tisztit();
    tovabbMegy = true;    
    betuBeolvasas();   
}
//Pause gomb kattintásának műveletei
function pause() {
    document.querySelector('.feladatoldal__navigacio-nyil').classList.remove('inaktiv');
    document.querySelector('.feladatoldal__navigacio-nyil').classList.add('aktiv');    
    document.querySelector('.pause').style.display = 'none';
    document.querySelector('.play').style.display = 'block';
    document.querySelector(".kartya__test").classList.remove('arnyek');
    document.querySelector('.betu').classList.remove("betu_jon");
    i = 0; //Ha újra kezdjük a szintet, akkor 0-ról számoljon
    tovabbMegy = false; //Nem lehet a gombnyomást követően gépelni
}

//Fájlbeolvasás kártyakattintásra
function fajlBeolvasas() {
    var szint_0 = './txt/alap.txt';
    var szint_1 = './txt/kezdo_1.txt';
    var szint_2 = './txt/kezdo_2.txt';
    var szint_3 = './txt/halado_1.txt';
    var szint_4 = './txt/halado_2.txt';
    var szint_5 = './txt/profi_1.txt';
    
    //AJAX módszer a helyi fájl olvasására - aszinkron!!! (Ezért kellett ezt a fájlbeolvasást még a kártyára való kattintásnál meghívni, hogy mire benyomjuk a Play gombot, addigra a fajlTartalom változóba tényleg bele kerüljön a sztring a különböző állományokból (kezdo_1.txt, stb.).)
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {     
        document.getElementById("kiir").innerHTML = this.responseText; //kiíratom a fájl tartalmát
        fajlTartalom = this.responseText; //beleteszem a fájl tartalmát egy változóba
        document.getElementById('billentyuk').innerHTML = '0/' + fajlTartalom.length; //kiíratom a karakterek számát  
      }
    };
    //A szintnek megfelelő szöveg kiválasztása
    if (activeKartya == 1) {
        xhttp.open("GET", szint_1, true);
    }else if (activeKartya == 2) {
        xhttp.open("GET", szint_2, true);
    } else if (activeKartya == 3) {
        xhttp.open("GET", szint_3, true);
    } else if (activeKartya == 4) {
        xhttp.open("GET", szint_4, true);
    } else if (activeKartya == 5) {
        xhttp.open("GET", szint_5, true);
    } else  xhttp.open("GET", szint_0, true);
    xhttp.send();
    //A megjelenő szöveg színe szürke
    document.querySelector('.kiir').style.color = 'grey';
    //console.log(fajlTartalom.length);
}

//Betűnkénti beolvasás műveletei
function betuBeolvasas () {
    document.getElementById('kiir').innerHTML = fajlTartalom;
    document.getElementById('billentyuk').innerHTML = '0/' + fajlTartalom.length; //kiíratom a karakterek számát       
    //Kiíratjuk az első betűt a kis téglalapba
    document.getElementById('betu').innerHTML = fajlTartalom[i];
    
    //Gombnyomás észlelése az oldalon
    document.onkeypress = function(esemeny) {
        if (tovabbMegy) {
            let Unicode;
            let betu;
            if (typeof event !== 'undefined') { //ha valamilyen esemény történik, amely nem 'undefined'...
                Unicode = esemeny.charCode || esemeny.keyCode; //unicode kódja a leütött karakternek       
                betu = String.fromCharCode(Unicode); //átalakítjuk a fenti unicode-ot karakterré
                //ha kapunk valamilyen karaktert, kiíratjuk tömbbe
                if (betu) {
                    kiirtSzoveg.push(fajlTartalom[i]);
                    begepeltSzoveg.push(betu);
                }
                //Ha nem azt a betűt ütjük le, amelyik megjelenik...
                if (betu !== fajlTartalom[i]) {
                    hiba++; //...növelem a hibák számát
                    kiirtSzoveg[i] = "<span style = 'color:red'>" + kiirtSzoveg[i] + "</span>"; //mgejelölöm pirossal a kiíratáskor a hibás karaktert
                    begepeltSzoveg[i] = "<span style = 'color:red'>" + begepeltSzoveg[i] + "</span>";
                }
                document.querySelector('.kiir').innerHTML = kiirtSzoveg.join(''); //eltüntetem a vesszőket a kiíratáshoz a tömbből
                document.querySelector('.begepel').innerHTML = begepeltSzoveg.join('');
    
                //Ha elértük az előre megadott szöveg hosszát...
                if (begepeltSzoveg.length == fajlTartalom.length) {                    
                    //Kiíratjuk a megmaradt betűk számát                   
                    document.getElementById('billentyuk').innerHTML = (maradtBetu + 1) + '/' + fajlTartalom.length;
                    document.getElementById('hiba').innerHTML = hiba; //hibák számát kiíratom                    
                    arany = ((((maradtBetu + 1) - hiba) / (maradtBetu + 1)) * 100).toFixed(2); //(Helyesen leírt karakter + 1) / (öszes leírt karakter + 1) * 100
                    document.getElementById('arany').innerHTML = arany + '%'; //kiíratom a megfelelő arányt
                    //Érdemjegy számítása
                    if (arany <= 29.99) {
                        if (activeKartya == 1) {
                            kep = './img/nyuszi_egyes.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 2) {
                            kep = './img/csacsi_egyes.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 3) {
                            kep = './img/maci_egyes.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 4) {
                            kep = './img/tigris_egyes.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 5) {
                            kep = './img/oroszlan_egyes.webp';
                            document.querySelector('.kep').src = kep;
                        }
                        document.getElementById('erdemjegy').innerHTML = 1;
                        szoveg = "Jááj! Mökfoksz bukni! Mára vége vann!";
                        beszolas();
                    } else if (arany >= 30 && arany <= 54.99) {
                        if (activeKartya == 1) {
                            kep = './img/nyuszi_kettes.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 2) {
                            kep = './img/csacsi_kettes.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 3) {
                            kep = './img/maci_kettes.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 4) {
                            kep = './img/tigris_kettes.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 5) {
                            kep = './img/oroszlan_kettes.webp';
                            document.querySelector('.kep').src = kep;
                        }
                        document.getElementById('erdemjegy').innerHTML = 2;
                        szoveg = "Vigyázzá, mer ha így haladol, mökbukol! Végezté márra!";
                        beszolas();
                    } else if (arany >= 55 && arany <= 74.99) {
                        if (activeKartya == 1) {
                            kep = './img/nyuszi_harmas.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 2) {
                            kep = './img/csacsi_harmas.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 3) {
                            kep = './img/maci_harmas.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 4) {
                            kep = './img/tigris_harmas.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 5) {
                            kep = './img/oroszlan_harmas.webp';
                            document.querySelector('.kep').src = kep;
                        }
                        document.getElementById('erdemjegy').innerHTML = 3;
                        szoveg = "Végeztél... ha gyakorolsz még, menni fog ez jobban is!";
                        beszolas();
                    } else if (arany >= 75 && arany <= 89.99) {
                        if (activeKartya == 1) {
                            kep = './img/nyuszi_negyes.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 2) {
                            kep = './img/csacsi_negyes.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 3) {
                            kep = './img/maci_negyes.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 4) {
                            kep = './img/tigris_negyes.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 5) {
                            kep = './img/oroszlan_negyes.webp';
                            document.querySelector('.kep').src = kep;
                        }
                        document.getElementById('erdemjegy').innerHTML = 4;
                        szoveg = "A végére értél jó eredménnyel! Nagyon ügyes vagy!";
                        beszolas();
                    } else if (arany >= 90) {
                        if (activeKartya == 1) {
                            kep = './img/nyuszi_otos.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 2) {
                            kep = './img/csacsi_otos.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 3) {
                            kep = './img/maci_otos.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 4) {
                            kep = './img/tigris_otos.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 5) {
                            kep = './img/oroszlan_otos.webp';
                            document.querySelector('.kep').src = kep;
                        }
                        document.getElementById('erdemjegy').innerHTML = 5;
                        szoveg = "Gratulálok a jeles eredményedhez! Like!";
                        beszolas();
                    }  
                    
                    if (hiba == 0) {
                        if (activeKartya == 1) {
                            kep = './img/nyuszi_hiba_nelkul.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 2) {
                            kep = './img/csacsi_hiba_nelkul.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 3) {
                            kep = './img/maci_hiba_nelkul.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 4) {
                            kep = './img/tigris_hiba_nelkul.webp';
                            document.querySelector('.kep').src = kep;
                        } else if (activeKartya == 5) {
                            kep = './img/oroszlan_hiba_nelkul.webp';
                            document.querySelector('.kep').src = kep;
                        }
                        szoveg = "Ez hibátlan lett! Csak ámulok és bámulok!";
                        beszolas();                    
                    }
                    
                    tovabbMegy = false; //nem fut tovább a begépelés
                    idoMegallito(); //megállítom az időt
                }
                //Ha még nem értük el a megadott szöveg hosszát... 
                else {
                    //Növeljük a kiírandó betűk számát eggyel, amely a téglalapban jelenik meg
                    i++;          
                    //Kiíratjuk a betűt a kis téglalapba
                    document.getElementById('betu').innerHTML = fajlTartalom[i];                    
                    //Kiíratjuk a megmaradt betűk számát
                    maradtBetu = i;                    
                    billentyuk = maradtBetu + '/' + fajlTartalom.length;
                    document.getElementById('billentyuk').innerHTML = billentyuk;         
                    document.getElementById('hiba').innerHTML = hiba; //hibák számát kiíratom
                    //Arányszámolás                    
                    arany = (((maradtBetu - hiba) / maradtBetu) * 100).toFixed(2); //(Helyesen leírt karakter) / (összes leütött karakter) * 100
                    document.getElementById('arany').innerHTML = arany + '%'; //kiíratom a megfelelő arányt                    
                    //Érdemjegy számítása
                    if (arany <= 29.99) {
                        document.getElementById('erdemjegy').innerHTML = 1;
                    } else if (arany >= 30 && arany <= 54.99) {
                        document.getElementById('erdemjegy').innerHTML = 2;
                    } else if (arany >= 55 && arany <= 74.99) {
                        document.getElementById('erdemjegy').innerHTML = 3;
                    } else if (arany >= 75 && arany <= 89.99) {
                        document.getElementById('erdemjegy').innerHTML = 4;
                    } else if (arany >= 90)  document.getElementById('erdemjegy').innerHTML = 5;
                    
                    beszolashoz();
                }    
            }
        }        

        //ha másmilyen esemény történik...
        else if (esemeny) {
            betu = esemeny.which;
            //console.log(betu);
        }        
        return false; // Prevents the default action    
    };    
}

//Tisztítás műveletei
function tisztit() {
    document.getElementById('kiir').innerHTML = "";
    document.getElementById('begepel').innerHTML = "";    
    document.getElementById('billentyuk').innerHTML = "0/0";
    document.getElementById('hiba').innerHTML = "0";
    document.getElementById('tick').innerHTML = "00:00";
    document.getElementById('arany').innerHTML = "0%";
    document.getElementById('erdemjegy').innerHTML = "";
    begepeltSzoveg = [];
    kiirtSzoveg = [];
    hiba = 0;
    i=0;
    szamlalo = 0;
    sec = 0;
    min = 0;
}

//Sajátos időszámláló - elindítok egy számlálót, amely másodpercenként növekszik eggyel. Majd figyelem, hogy az így növekedett szám kisebb-e mint 60, mert akkor vált a min változó.
szamlalo = 0;
sec = 0;
min = 0;

function idoSzamlalo() {
               
    ido = setInterval(function(){
        if (szamlalo <= 600) {
            szamlalo++;                    
            if (szamlalo % 60 == 0) {
                min++;                        
            }
            if (szamlalo % 1 == 0) {
                sec++;
            }
            if (sec > 59) {
                sec = szamlalo - ((szamlalo/60)*60);
            }      
            if (sec < 10 && min < 10) {
                document.getElementById('tick').innerHTML = '0' + min + ':' + '0' + sec;
            }                 
            if (sec >= 10 && min < 10) {
                document.getElementById('tick').innerHTML = '0' + min + ':' + sec;
            }
            if (sec < 10 && min >= 10) {
                document.getElementById('tick').innerHTML = min + ':' + '0' + sec;
            }
            if (sec >= 10 && min >= 10) {
                document.getElementById('tick').innerHTML = min + ':' + sec;
            }
            
            if (szamlalo == 300) {                
                szoveg = "Figyelj, mert most vagyunk az időnk felénél!"; //...kiírassam ezt a szöveget                
                beszolas(); //...ezzel a függvénnyel
            }

            if (szamlalo == 540) { //Vége előtt 1 perccel...
                if (activeKartya == 1) {
                    document.querySelector('.beszolas').style.fontSize = "3.3rem"; //Lecsökkentem a betűméretet, hogy...
                    szoveg = "Figyi, húzzuk fel a nyúlcipőt, mert mindjárt lejár az idő..."; //...kiírassam ezt a szöveget      
                } else {
                    szoveg = "Már csak egy perc van hátra... mindjárt vége!";
                }
                beszolas(); //...ezzel a függvénnyel
            } else {
                document.querySelector('.beszolas').style.fontSize = "3.5rem"; //Egyébként marad a betűméret
            }
        }
        //Ha a 10 perc letelik, akkor...
        if (szamlalo >= 600) {
            clearInterval(ido); //...megállítom az időt...
            tovabbMegy = false; //...megállítom a begépelhetőséget...
        }                              
    },1000);    
};

function idoMegallito() {    
    clearInterval(ido);  
};

//Véletlen sztring generátor - kisebb relációs jel (<) nem lehet benne, mert ha rá kerül a sor, akkor az utána lévő karaktereket kihagyja addig, míg a nagyobb relációs jel (>) meg nem érkezik!!!
function generalj(hossz) {
    var eredmeny = '';
    var kisbetuk = 'aábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz';
    var kisEsNagybetuk = 'AÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZaábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz';
    var kisEsNagybetukEsSzamok = 'AÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZaábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz0123456789';
    var kisEsNagybetukEsSzamokJelek = 'AÁBCDEÉFGHIÍJKLMNOÓÖŐPQRSTUÚÜŰVWXYZaábcdeéfghiíjklmnoóöőpqrstuúüűvwxyz0123456789§+!%/=()€[]$>#&@{}';
    var stringHossz = kisbetuk.length;
    for ( var i = 0; i < hossz; i++ ) {
       eredmeny += kisbetuk.charAt(Math.floor(Math.random() * stringHossz));
    }    
    return eredmeny;    
}
//console.log(generalj(400));

//Karakterek program működése közben
var idoMegint = 0;
function beszolas() {
    document.querySelector('.wrapper3').style.display = "grid";
    document.querySelector('.karakterBelep').style.display = 'block'; //megjelenítem a karaktert     
    idoMegint = szamlalo; //megadom a számláló értékét egy mésik változónak
    clearInterval(ido); //megállítom az időt
    tovabbMegy = false; //nem engedek gépelni
    document.getElementById('beszolas').innerHTML = szoveg;   
    document.querySelector('.hatterKarakter').style.cssText = "display: block; opacity: 1; z-index: 3"; //beállítjuk a háttérszínt

    karakter = setTimeout(function() { //3mp múlva eltüntetem a karaktert...
        clearTimeout(karakter); //eltüntetem a karaktert...
        document.querySelector('.wrapper3').style.display = "none";
        document.querySelector('.karakterBelep').style.display = 'none'; //eltüntetem a karaktert...                
        szamlalo = idoMegint; //visszaadom a számláló értékét a megállítás előttről
        idoSzamlalo(); //elindítom az időt
        if (szamlalo == 600 || begepeltSzoveg.length == fajlTartalom.length) { //ha lejárt a 10 perc, vagy végére értünk a szövegnek
            tovabbMegy = false; //nem engedek tovább gépelni
            idoMegallito(); //megállítom az időt
        } else { //ellenkező esetben
            tovabbMegy = true; //újra engedek gépelni
        }        
        document.getElementById('beszolas').innerHTML = "";
        document.querySelector('.hatterKarakter').style.cssText = "display: none; opacity: 0; z-index: 0"; //levesszük a háttérszint
    }, 3000);
}

function beszolashoz() {     
    //hibátlanul és kevés hibával (5-ös és 4-es jegyekhez)
    if (maradtBetu == 50 && arany >= 90){
        if (hiba == 0) {
            if (activeKartya == 1) {
                kep = './img/nyuszi_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
                szoveg = "Ilyen eredménnyel akkorát ugrasz, mint egy nyúl!";
            } else if (activeKartya == 2) {
                kep = './img/csacsi_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
                szoveg = "Ó-r-IÁÁÁÁÁÁ-s-i vagy! Így tovább!";
            } else if (activeKartya == 3) {
                kep = './img/maci_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
                szoveg = "Figyelemreméltó a munkád! Hajrá!";
            } else if (activeKartya == 4) {
                kep = './img/tigris_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
                szoveg = "Itt jön a tigris, nála erősebb nincs is!";
            } else if (activeKartya == 5) {
                kep = './img/oroszlan_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
                szoveg = "Olyan király vagy, mint én!";
            }            
        } else {
            if (activeKartya == 1) {
                kep = './img/nyuszi_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 2) {
                kep = './img/csacsi_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 3) {
                kep = './img/maci_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 4) {
                kep = './img/tigris_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 5) {
                kep = './img/oroszlan_otos.webp';
                document.querySelector('.kep').src = kep;
            }
            szoveg = "Nagyon ügyes vagy, csak így tovább!";                
        }            
        beszolas();           
    }
    if (maradtBetu == 100 && arany >= 90) {
        if (hiba == 0) {
            if (activeKartya == 1) {
                kep = './img/nyuszi_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 2) {
                kep = './img/csacsi_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 3) {
                kep = './img/maci_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 4) {
                kep = './img/tigris_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 5) {
                kep = './img/oroszlan_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            }
            szoveg = "Ezt már nevezem! Mindent bele!";
        } else {
            if (activeKartya == 1) {
                kep = './img/nyuszi_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 2) {
                kep = './img/csacsi_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 3) {
                kep = './img/maci_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 4) {
                kep = './img/tigris_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 5) {
                kep = './img/oroszlan_otos.webp';
                document.querySelector('.kep').src = kep;
            }
            szoveg = "Le a kalappal, csak így folytasd tovább!";
        }                
        beszolas();                                        
    }
    if (maradtBetu == 150 && arany >= 90) {
        if (hiba == 0) {
            if (activeKartya == 1) {
                kep = './img/nyuszi_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 2) {
                kep = './img/csacsi_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 3) {
                kep = './img/maci_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 4) {
                kep = './img/tigris_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 5) {
                kep = './img/oroszlan_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            }
            szoveg = "Ha így folytatod, te leszel a győztes!";
        } else {
            if (activeKartya == 1) {
                kep = './img/nyuszi_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 2) {
                kep = './img/csacsi_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 3) {
                kep = './img/maci_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 4) {
                kep = './img/tigris_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 5) {
                kep = './img/oroszlan_otos.webp';
                document.querySelector('.kep').src = kep;
            }
            szoveg = "Nem semmi, amit a gombokkal művelsz!";
        }              
        beszolas();            
    }
    if (maradtBetu == 200 && arany >= 90) {
        if (hiba == 0) {
            if (activeKartya == 1) {
                kep = './img/nyuszi_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 2) {
                kep = './img/csacsi_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 3) {
                kep = './img/maci_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 4) {
                kep = './img/tigris_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 5) {
                kep = './img/oroszlan_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            }
            szoveg = "Nem tudsz hibázni! Így tovább!";
        } else {
            if (activeKartya == 1) {
                kep = './img/nyuszi_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 2) {
                kep = './img/csacsi_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 3) {
                kep = './img/maci_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 4) {
                kep = './img/tigris_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 5) {
                kep = './img/oroszlan_otos.webp';
                document.querySelector('.kep').src = kep;
            }
            szoveg = "Úgy látom valaki már megállíthatatlan!";
        }
        beszolas();
    }
    if (maradtBetu == 250 && arany >= 90) {
        if (hiba == 0) {
            if (activeKartya == 1) {
                kep = './img/nyuszi_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 2) {
                kep = './img/csacsi_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 3) {
                kep = './img/maci_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 4) {
                kep = './img/tigris_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 5) {
                kep = './img/oroszlan_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            }
            szoveg = "Hohó... komolyan kell venni Téged!";
        } else {
            if (activeKartya == 1) {
                kep = './img/nyuszi_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 2) {
                kep = './img/csacsi_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 3) {
                kep = './img/maci_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 4) {
                kep = './img/tigris_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 5) {
                kep = './img/oroszlan_otos.webp';
                document.querySelector('.kep').src = kep;
            }
            szoveg = "Felülmúlhatatlan az ügyességed! Hajrá!";
        }
        beszolas();
    }
    if (maradtBetu == 300 && arany >= 90) {
        if (hiba == 0) {
            if (activeKartya == 1) {
                kep = './img/nyuszi_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 2) {
                kep = './img/csacsi_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 3) {
                kep = './img/maci_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 4) {
                kep = './img/tigris_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 5) {
                kep = './img/oroszlan_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            }
            szoveg = "Nem jutok szóhoz... nagyon megy ez!";
        } else {
            if (activeKartya == 1) {
                kep = './img/nyuszi_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 2) {
                kep = './img/csacsi_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 3) {
                kep = './img/maci_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 4) {
                kep = './img/tigris_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 5) {
                kep = './img/oroszlan_otos.webp';
                document.querySelector('.kep').src = kep;
            }
            szoveg = "Most kezdenek csak irigyelni mások!";
        }
        beszolas();
    }
    if (maradtBetu == 350 && arany >= 90) {
        if (hiba == 0) {
            if (activeKartya == 1) {
                kep = './img/nyuszi_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 2) {
                kep = './img/csacsi_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 3) {
                kep = './img/maci_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 4) {
                kep = './img/tigris_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 5) {
                kep = './img/oroszlan_hiba_nelkul.webp';
                document.querySelector('.kep').src = kep;
                szoveg = "Ha így haladsz, letolsz a trónomról!";
            } else {
                szoveg = "A gombok nagyon szeretnek Téged!";
            }            
        } else {
            if (activeKartya == 1) {
                kep = './img/nyuszi_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 2) {
                kep = './img/csacsi_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 3) {
                kep = './img/maci_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 4) {
                kep = './img/tigris_otos.webp';
                document.querySelector('.kep').src = kep;
            } else if (activeKartya == 5) {
                kep = './img/oroszlan_otos.webp';
                document.querySelector('.kep').src = kep;
            }
            szoveg = "Te biztos dobogós leszel! Befutó vagy!";
        }
        beszolas();
    }

    // 4-es
    if (maradtBetu == 50 && (arany < 90 && arany >= 75)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_negyes.webp';
            document.querySelector('.kep').src = kep;
            szoveg = "Ne szaladj így elõre! Lassabban, pontosabban!";
        } else if (activeKartya == 2) {
            kep = './img/csacsi_negyes.webp';
            document.querySelector('.kep').src = kep;
            szoveg = "Olyan kis csacsi vagy, figyelj oda jobban!";
        } else if (activeKartya == 3) {
            kep = './img/maci_negyes.webp';
            document.querySelector('.kep').src = kep;
            szoveg = "Olyan szorgos vagy, mint a méhecske!";
        } else if (activeKartya == 4) {
            kep = './img/tigris_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_negyes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Gyerünk! Majdnem megvan a jeles!";          
        beszolas();
    }
    if (maradtBetu == 100 && (arany < 90 && arany >= 75)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_negyes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Csak egy kicsi kell még hozzá! Hajrá!";            
        beszolas();
    }
    if (maradtBetu == 150 && (arany < 90 && arany >= 75)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_negyes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Húzz bele az ötösért! Klikk-klikk-klikk...";            
        beszolas();
    }
    if (maradtBetu == 200 && (arany < 90 && arany >= 75)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_negyes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Koncentrálj, van még esély! Képes vagy rá!";            
        beszolas();
    }
    if (maradtBetu == 250 && (arany < 90 && arany >= 75)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_negyes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Már nem kellene sok, de így is jó vagy!";            
        beszolas();
    }
    if (maradtBetu == 300 && (arany < 90 && arany >= 75)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_negyes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Meglesz már a négyes, alább ne add!";            
        beszolas();
    }
    if (maradtBetu == 350 && (arany < 90 && arany >= 75)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_negyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_negyes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Jó jegy az a négyes, a második legjobb!";            
        beszolas();
    }

    // 3-as
    if (maradtBetu == 50 && (arany < 75 && arany >= 55)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_harmas.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Nem rossz egy közepestől! Menne jobban?";            
        beszolas();
    }
    if (maradtBetu == 100 && (arany < 75 && arany >= 55)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_harmas.webp';
            document.querySelector('.kep').src = kep;
            szoveg = "Egyre fentebb lépsz a szamárlétrán!";
        } else if (activeKartya == 3) {
            kep = './img/maci_harmas.webp';
            document.querySelector('.kep').src = kep;
            szoveg = "Bocs, hogy beleszólok... de ezt Te jobban is tudod!"
        } else if (activeKartya == 4) {
            kep = './img/tigris_harmas.webp';
            document.querySelector('.kep').src = kep;
            szoveg = "Grrrr...Figyelj oda jobban!";
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_harmas.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Stabilan tartod a hármast! Biztos a kedvenc számod.";                            
        beszolas();
    }
    if (maradtBetu == 150 && (arany < 75 && arany >= 55)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_harmas.webp';
            document.querySelector('.kep').src = kep;
            szoveg = "Még én is ügyesebben ütném le a billentyűket a nagy mancsommal!";
        } else if (activeKartya == 4) {
            kep = './img/tigris_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_harmas.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Egy jó gomb, egy rossz gomb. Arany középút!";        
        beszolas();
    }
    if (maradtBetu == 200 && (arany < 75 && arany >= 55)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_harmas.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "A középmezőnyt erősíted!";            
        beszolas();
    }
    if (maradtBetu == 250 && (arany < 75 && arany >= 55)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_harmas.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Egy, meg egy, meg egy egyenlő három!";            
        beszolas();
    }
    if (maradtBetu == 300 && (arany < 75 && arany >= 55)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_harmas.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Nem javulsz, szerintem maradsz közepes!";            
        beszolas();
    }
    if (maradtBetu == 350 && (arany < 75 && arany >= 55)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_harmas.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_harmas.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Biztos, hogy dobogós hely nem lesz a tiéd!";            
        beszolas();
    }
    
    //2-es
    if (maradtBetu == 50 && (arany < 55 && arany >= 30)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_kettes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Hát, ez éppen elégséges eddig!";            
        beszolas();
    }
    if (maradtBetu == 100 && (arany < 55 && arany >= 30)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_kettes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Mi történik? Nem vagyok én ehhez hozzászokva...";            
        beszolas();
    }
    if (maradtBetu == 150 && (arany < 55 && arany >= 30)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_kettes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Egyujjas kesztyű van rajtad, vagy mi?";
        beszolas();
    }
    if (maradtBetu == 200 && (arany < 55 && arany >= 30)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_kettes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Most próbáld meg az ujjaiddal nyomogatni a gombokat...";            
        beszolas();
    }
    if (maradtBetu == 250 && (arany < 55 && arany >= 30)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_kettes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Szerintem neked összenőttek az ujjaid!";            
        beszolas();
    }
    if (maradtBetu == 300 && (arany < 55 && arany >= 30)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_kettes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Hahó! Te direkt ütsz mellé a gomboknak?";            
        beszolas();
    }
    if (maradtBetu == 350 && (arany < 55 && arany >= 30)) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_kettes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_kettes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Ebből bukta lesz, ha így folytatod... de nem diós-mákos!";            
        beszolas();
    }

    //1-es
    if (maradtBetu == 50 && arany < 30) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_egyes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Ez most micsoda? Nem gombmelléűtő verseny ez!";            
        beszolas();
    }
    if (maradtBetu == 100 && arany < 30) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_egyes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Látom, a piros szín a kedvenced...";            
        beszolas();
    }
    if (maradtBetu == 150 && arany < 30) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_egyes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Lehet, hogy meg kellene vizsgáltatnod a szemed!";
        beszolas();
    }
    if (maradtBetu == 200 && arany < 30) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_egyes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Azt hiszed ökölvívó órán vagy? Ujjaidat használd!";            
        beszolas();
    }
    if (maradtBetu == 250 && arany < 30) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_egyes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Téosz mosmicsinálol? Nem érteni mágyár?";            
        beszolas();
    }
    if (maradtBetu == 300 && arany < 30) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_egyes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Ááá... ezt nem hiszem el! Végem van!";            
        beszolas();
    }
    if (maradtBetu == 350 && arany < 30) {
        if (activeKartya == 1) {
            kep = './img/nyuszi_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 2) {
            kep = './img/csacsi_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 3) {
            kep = './img/maci_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 4) {
            kep = './img/tigris_egyes.webp';
            document.querySelector('.kep').src = kep;
        } else if (activeKartya == 5) {
            kep = './img/oroszlan_egyes.webp';
            document.querySelector('.kep').src = kep;
        }
        szoveg = "Kinyírtál teljesen! ?!#/&<%$@";            
        beszolas();
    }
}