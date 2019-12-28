var activeKartya, tomb, tovabbMegy, szamlalo, fajlTartalom, billentyuk, erdemjegy, ido, sec, min, karakter, szoveg, kep;
var ertek = 0;
var i = 0;
var hiba = 0;
var begepeltSzoveg = [];
var kiirtSzoveg = [];
var arany = 0;

document.querySelector('.fooldal').scrollIntoView();

tovabbMegy = true;
//Eltüntetjük a Pause gombot
document.querySelector('#stop-tick').style.display = 'none';

//Kártyakattintás műveletei - eltoljuk az oldalt, hogy megjelenhessen a másik
function kartyaKattintas() {
    if (ertek == 0) {
        document.querySelector('.fooldal').style.transform = "translateX(-120rem)";
        document.querySelector('.feladatoldal').style.transform = "translateX(-120rem)";
        ertek = 120;
    } else {
        console.log('középső bal bibi van');
    }
    document.querySelector('.feladatoldal__kezeles-kartya .kartya__test-kep').classList.remove('alap');
}

//Valamelyik kártyára kattintunk
document.getElementById('kartya_01').addEventListener('click', function () {
    activeKartya = 1;
    document.querySelector('.kartya__test-kep').innerHTML = nyuszi; //SVG beillesztése
    document.querySelector('.kartya__test-kep').style.backgroundColor = '#dfecf1'; //háttérszín megadása
    document.querySelector('.kartya__test-kep #nyuszi').style.cssText = 'width: 60%; margin-left: 0rem;';   
    kartyaKattintas();
    fajlBeolvasas();
});
document.getElementById('kartya_02').addEventListener('click', function () {
    activeKartya = 2;
    document.querySelector('.kartya__test-kep').innerHTML = csacsi;
    document.querySelector('.kartya__test-kep').style.backgroundColor = '#dfebf7';
    document.querySelector('.kartya__test-kep #csacsi').style.cssText = 'width: 80%; margin-left: 0rem;';
    kartyaKattintas();
    fajlBeolvasas();
});
document.getElementById('kartya_03').addEventListener('click', function () {
    activeKartya = 3;
    document.querySelector('.kartya__test-kep').innerHTML = maci;
    document.querySelector('.kartya__test-kep').style.backgroundColor = '#f0dbcd';
    document.querySelector('.kartya__test-kep #maci').style.cssText = 'width: 80%; margin-left: 0rem;';
    kartyaKattintas();
    fajlBeolvasas();
});
document.getElementById('kartya_04').addEventListener('click', function () {
    activeKartya = 4;
    document.querySelector('.kartya__test-kep').innerHTML = tigris;
    document.querySelector('.kartya__test-kep').style.backgroundColor = '#fbefe1';
    document.querySelector('.kartya__test-kep #tigris').style.cssText = 'width: 100%; margin-left: 1rem;';
    kartyaKattintas();
    fajlBeolvasas();
});
document.getElementById('kartya_05').addEventListener('click', function () {
    activeKartya = 5;
    document.querySelector('.kartya__test-kep').innerHTML = oroszlan;
    document.querySelector('.kartya__test-kep').style.backgroundColor = '#f0e8e2';
    document.querySelector('.kartya__test-kep #oroszlan').style.cssText = 'width: 110%; margin-left: -4rem;';    
    kartyaKattintas();
    fajlBeolvasas();
});

//Visszanyilra kattintunk
document.querySelector('.feladatoldal__navigacio-nyil').addEventListener('click', function () {
    if (ertek == 120) {
        document.querySelector('.fooldal').style.transform = "translateX(0)";
        document.querySelector('.feladatoldal').style.transform = "translateX(0)";
        ertek = 0;
    }
    document.querySelector('.feladatoldal__kezeles-kartya .kartya__test-kep').classList.remove('szint_' + activeKartya);
    document.querySelector('.feladatoldal__kezeles-kartya .kartya__test-kep').classList.add('alap');

    tisztit();
});

//információra kattintunk
document.querySelector('.signs').addEventListener('click', function () {
    if (ertek == 0) {
        document.querySelector('.fooldal').style.transform = "translateX(120rem)";
        document.querySelector('.help').style.transform = "translateX(120rem)";
        ertek = 120;
    } else {
        console.log('középső bal bibi van');
    }
});
//információs oldalon lévő visszanyílra kattintunk
document.querySelector('#help__nyil-jobb').addEventListener('click', function () {
    if (ertek == 120) {
        document.querySelector('.fooldal').style.transform = "translateX(0)";
        document.querySelector('.help').style.transform = "translateX(0)";
        ertek = 0;
    }
});

//Play, Pause gombok eseményei
document.querySelector('#start-tick').addEventListener('click', play);
document.querySelector('#start-tick').addEventListener('click', idoSzamlalo);
document.querySelector('#stop-tick').addEventListener('click', pause);
document.querySelector('#stop-tick').addEventListener('click', idoMegallito);

//Play gomb kattintásának műveletei
function play() {
    document.querySelector('.feladatoldal__navigacio-nyil').classList.remove('aktiv');
    document.querySelector('.feladatoldal__navigacio-nyil').classList.add('inaktiv');
    document.querySelector('#start-tick').style.display = 'none';
    document.querySelector('#stop-tick').style.display = 'block';
    document.querySelector('.kartya__test').classList.add('arnyek');
    document.querySelector('.betu').classList.add("betu_jon");
    tisztit();
    tovabbMegy = true;
    betuBeolvasas();
}

document.querySelector('#start-tick').addEventListener('mouseover', function () {
    document.querySelector('.kartya__test-gomb').style.cssText = 'background-color: rgba(0,0,17, 0.3); transition: 0.3s;';
});
document.querySelector('#start-tick').addEventListener('mouseout', function () {
    document.querySelector('.kartya__test-gomb').style.cssText = 'background-color: rgba(0,0,17, 0.15); transition: 0.3s;';
});
//Pause gomb kattintásának műveletei
function pause() {
    document.querySelector('.feladatoldal__navigacio-nyil').classList.remove('inaktiv');
    document.querySelector('.feladatoldal__navigacio-nyil').classList.add('aktiv');
    document.querySelector('#stop-tick').style.display = 'none';
    document.querySelector('#start-tick').style.display = 'block';
    document.querySelector(".kartya__test").classList.remove('arnyek');
    document.querySelector('.betu').classList.remove("betu_jon");
    i = 0; //Ha újra kezdjük a szintet, akkor 0-ról számoljon
    tovabbMegy = false; //Nem lehet a gombnyomást követően gépelni
}
document.querySelector('#stop-tick').addEventListener('mouseover', function () {
    document.querySelector('.kartya__test-gomb').style.cssText = 'background-color: rgba(0,0,17, 0.3); transition: 0.3s;';
});
document.querySelector('#stop-tick').addEventListener('mouseout', function () {
    document.querySelector('.kartya__test-gomb').style.cssText = 'background-color: rgba(0,0,17, 0.15); transition: 0.3s;';
});

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
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("kiir").innerHTML = this.responseText; //kiíratom a fájl tartalmát
            fajlTartalom = this.responseText; //beleteszem a fájl tartalmát egy változóba
            //document.getElementById('billentyuk').innerHTML = '0/' + fajlTartalom.length; //kiíratom a karakterek számát  
            document.getElementById('billentyuk').innerHTML = `0/${fajlTartalom.length}`; //a fenti kiíratás frissebb módja (Template Literal) 
        }
    };
    //A szintnek megfelelő szöveg kiválasztása
    if (activeKartya == 1) {
        xhttp.open("GET", szint_1, true);
    } else if (activeKartya == 2) {
        xhttp.open("GET", szint_2, true);
    } else if (activeKartya == 3) {
        xhttp.open("GET", szint_3, true);
    } else if (activeKartya == 4) {
        xhttp.open("GET", szint_4, true);
    } else if (activeKartya == 5) {
        xhttp.open("GET", szint_5, true);
    } else xhttp.open("GET", szint_0, true);
    xhttp.send();
    //A megjelenő szöveg színe szürke
    document.querySelector('.kiir').style.color = 'grey';
    //console.log(fajlTartalom.length);
}

//Betűnkénti beolvasás műveletei
function betuBeolvasas() {
    document.getElementById('kiir').innerHTML = fajlTartalom;
    //document.getElementById('billentyuk').innerHTML = '0/' + fajlTartalom.length; //kiíratom a karakterek számát       
    document.getElementById('billentyuk').innerHTML = `0/${fajlTartalom.length}`; //kiíratom a karakterek számát       
    //Kiíratjuk az első betűt a kis téglalapba
    document.getElementById('betu').innerHTML = fajlTartalom[i];

    //Gombnyomás észlelése az oldalon
    document.onkeypress = function (esemeny) {
        if (tovabbMegy) {
            let Unicode;
            let betu;
            if (typeof event !== 'undefined') { //ha valamilyen esemény történik, amely nem 'undefined'...
                Unicode = esemeny.charCode || esemeny.keyCode; //unicode kódja a leütött karakternek       
                betu = String.fromCharCode(Unicode); //átalakítjuk a fenti unicode-ot karakterré
                //ha kapunk valamilyen karaktert, kiíratjuk tömbbe
                if (betu) {
                    kiirtSzoveg.push(fajlTartalom[i]); //kiirtSzoveg tömbbe íratom a karaktereket (vesszővel elválasztja)
                    begepeltSzoveg.push(betu);
                }
                //Ha nem azt a betűt ütjük le, amelyik megjelenik...
                if (betu !== fajlTartalom[i]) {
                    hiba++; //...növelem a hibák számát
                    //kiirtSzoveg[i] = "<span style = 'color:red'>" + kiirtSzoveg[i] + "</span>"; //megjelölöm pirossal a kiíratáskor a hibás karaktert
                    kiirtSzoveg[i] = `<span style = 'color:red'>${kiirtSzoveg[i]}</span>`; //a fenti kiíratás frissebb módja
                    begepeltSzoveg[i] = `<span style = 'color:red'>${begepeltSzoveg[i]}</span>`;
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
                            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes; //megjelenítem a karaktert
                        } else if (activeKartya == 2) {
                            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes;
                        } else if (activeKartya == 3) {
                            document.querySelector('.beszolasKep').innerHTML = maci_egyes;
                        } else if (activeKartya == 4) {
                            document.querySelector('.beszolasKep').innerHTML = tigris_egyes;
                        } else if (activeKartya == 5) {
                            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes;
                        }
                        document.getElementById('erdemjegy').innerHTML = 1;
                        szoveg = "Jááj! Mökfoksz bukni! Mára vége vann!";
                        beszolas();
                    } else if (arany >= 30 && arany <= 54.99) {
                        if (activeKartya == 1) {
                            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
                        } else if (activeKartya == 2) {
                            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes;
                        } else if (activeKartya == 3) {
                            document.querySelector('.beszolasKep').innerHTML = maci_kettes;
                        } else if (activeKartya == 4) {
                            document.querySelector('.beszolasKep').innerHTML = tigris_kettes;
                        } else if (activeKartya == 5) {
                            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes;
                        }
                        document.getElementById('erdemjegy').innerHTML = 2;
                        szoveg = "Vigyázzá, mer ha így haladol, mökbukol! Végezté márra!";
                        beszolas();
                    } else if (arany >= 55 && arany <= 74.99) {
                        if (activeKartya == 1) {
                            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
                        } else if (activeKartya == 2) {
                            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas;
                        } else if (activeKartya == 3) {
                            document.querySelector('.beszolasKep').innerHTML = maci_harmas;
                        } else if (activeKartya == 4) {
                            document.querySelector('.beszolasKep').innerHTML = tigris_harmas;
                        } else if (activeKartya == 5) {
                            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas;
                        }
                        document.getElementById('erdemjegy').innerHTML = 3;
                        szoveg = "Végeztél... ha gyakorolsz még, menni fog ez jobban is!";
                        beszolas();
                    } else if (arany >= 75 && arany <= 89.99) {
                        if (activeKartya == 1) {
                            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
                        } else if (activeKartya == 2) {
                            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes;
                        } else if (activeKartya == 3) {
                            document.querySelector('.beszolasKep').innerHTML = maci_negyes;
                        } else if (activeKartya == 4) {
                            document.querySelector('.beszolasKep').innerHTML = tigris_negyes;
                        } else if (activeKartya == 5) {
                            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes;
                        }
                        document.getElementById('erdemjegy').innerHTML = 4;
                        szoveg = "A végére értél jó eredménnyel! Nagyon ügyes vagy!";
                        beszolas();
                    } else if (arany >= 90) {
                        if (activeKartya == 1) {
                            document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
                        } else if (activeKartya == 2) {
                            document.querySelector('.beszolasKep').innerHTML = csacsi_otos;
                        } else if (activeKartya == 3) {
                            document.querySelector('.beszolasKep').innerHTML = maci_otos;
                        } else if (activeKartya == 4) {
                            document.querySelector('.beszolasKep').innerHTML = tigris_otos;
                        } else if (activeKartya == 5) {
                            document.querySelector('.beszolasKep').innerHTML = oroszlan_otos;
                        }
                        document.getElementById('erdemjegy').innerHTML = 5;
                        szoveg = "Gratulálok a jeles eredményedhez! Like!";
                        beszolas();
                    }

                    if (hiba == 0) {
                        if (activeKartya == 1) {
                            document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
                        } else if (activeKartya == 2) {
                            document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul;
                        } else if (activeKartya == 3) {
                            document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul;
                        } else if (activeKartya == 4) {
                            document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul;
                        } else if (activeKartya == 5) {
                            document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul;
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
                    } else if (arany >= 90) document.getElementById('erdemjegy').innerHTML = 5;

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
    i = 0;
    szamlalo = 0;
    sec = 0;
    min = 0;
}

//Sajátos időszámláló - elindítok egy számlálót, amely másodpercenként növekszik eggyel. Majd figyelem, hogy az így növekedett szám kisebb-e mint 60, mert akkor vált a min változó.
szamlalo = 0;
sec = 0;
min = 0;

function idoSzamlalo() {

    ido = setInterval(function () {
        if (szamlalo <= 600) {
            szamlalo++;
            if (szamlalo % 60 == 0) {
                min++;
            }
            if (szamlalo % 1 == 0) {
                sec++;
            }
            if (sec > 59) {
                sec = szamlalo - ((szamlalo / 60) * 60);
            }
            if (sec < 10 && min < 10) {
                document.getElementById('tick').innerHTML = `0${min}:0` + sec;
            }
            if (sec >= 10 && min < 10) {
                document.getElementById('tick').innerHTML = `0${min}:` + sec;
            }
            if (sec < 10 && min >= 10) {
                document.getElementById('tick').innerHTML = min + ':0' + sec;
            }
            if (sec >= 10 && min >= 10) {
                document.getElementById('tick').innerHTML = min + ':' + sec;
            }

            if (szamlalo == 300) {
                szoveg = "Figyelj, mert most vagyunk az időnk felénél!"; //...kiírassam ezt a szöveget                
                //Ha nem indítjuk el a billentyűleütéssel a programot, akkor is ki kell rajzolnia egy állatot!
                if (activeKartya == 1) {
                    document.querySelector('.beszolasKep').innerHTML = nyuszi_alap;
                } else if (activeKartya == 2) {
                    document.querySelector('.beszolasKep').innerHTML = csacsi_alap;
                } else if (activeKartya == 3) {
                    document.querySelector('.beszolasKep').innerHTML = maci_alap;
                } else if (activeKartya == 4) {
                    document.querySelector('.beszolasKep').innerHTML = tigris_alap;
                } else if (activeKartya == 5) {
                    document.querySelector('.beszolasKep').innerHTML = oroszlan_alap;
                }

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
    }, 1000);
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
    for (var i = 0; i < hossz; i++) {
        eredmeny += kisbetuk.charAt(Math.floor(Math.random() * stringHossz));
    }
    return eredmeny;
}
//console.log(generalj(400));

//Karakterek program működése közben
var idoMegint = 0;
function beszolas() {
    if (document.getElementById('jnegyzet').checked == true) { //A jelölőnégyzet bepipálásakor van csak beszólás - alapesetben bepipálva
        document.querySelector('.container_hatterKarakter').style.cssText = "display: grid; z-index: 2";
        idoMegint = szamlalo; //megadom a számláló értékét egy mésik változónak
        clearInterval(ido); //megállítom az időt
        tovabbMegy = false; //nem engedek gépelni
        document.getElementById('beszolas').innerHTML = szoveg;
        document.querySelector('.hatterKarakter').style.cssText = "display: block; opacity: 1; z-index: 2"; //beállítjuk a háttérszínt

        karakter = setTimeout(function () { //3mp múlva eltüntetem a karaktert...
            clearTimeout(karakter); //eltüntetem a karaktert...
            document.querySelector('.container_hatterKarakter').style.cssText = "display: none; z-index: 0";
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
}


function beszolashoz() {
    //hibátlanul és kevés hibával (5-ös és 4-es jegyekhez)
    if (maradtBetu == 50 && arany >= 90) {
        if (hiba == 0) {
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
                szoveg = "Ilyen eredménnyel akkorát ugrasz, mint egy nyúl!";
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul;
                szoveg = "Ó-r-IÁÁÁÁÁÁ-s-i vagy! Így tovább!";
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul;
                szoveg = "Rákaptál, mint maci a lépesmézre!";
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul;
                szoveg = "Itt jön a tigris, nála erősebb nincs is!";
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul;
                szoveg = "Olyan király vagy, mint én!";
            }
        } else {
            szoveg = "Nagyon ügyes vagy, csak így tovább!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_otos;
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_otos;
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_otos;
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_otos;
            }
        }
        beszolas();
    }
    if (maradtBetu == 100 && arany >= 90) {
        if (hiba == 0) {
            szoveg = "Ezt már nevezem! Mindent bele!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul;
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul;
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul;
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul;
            }
        } else {
            szoveg = "Le a kalappal, csak így folytasd tovább!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_otos;
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_otos;
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_otos;
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_otos;
            }
        }
        beszolas();
    }
    if (maradtBetu == 150 && arany >= 90) {
        if (hiba == 0) {
            szoveg = "Ha így folytatod, te leszel a győztes!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul;
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul;
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul;
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul;
            }
        } else {
            szoveg = "Nem semmi, amit a gombokkal művelsz!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_otos;
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_otos;
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_otos;
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_otos;
            }
        }
        beszolas();
    }
    if (maradtBetu == 200 && arany >= 90) {
        if (hiba == 0) {
            szoveg = "Nem tudsz hibázni! Így tovább!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul;
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul;
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul;
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul;
            }
        } else {
            szoveg = "Úgy látom valaki már megállíthatatlan!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_otos;
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_otos;
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_otos;
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_otos;
            }
        }
        beszolas();
    }
    if (maradtBetu == 250 && arany >= 90) {
        if (hiba == 0) {
            szoveg = "Hohó... komolyan kell venni Téged!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul;
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul;
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul;
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul;
            }
        } else {
            szoveg = "Felülmúlhatatlan az ügyességed! Hajrá!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_otos;
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_otos;
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_otos;
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_otos;
            }
        }
        beszolas();
    }
    if (maradtBetu == 300 && arany >= 90) {
        if (hiba == 0) {
            szoveg = "Nem jutok szóhoz... nagyon megy ez!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul;
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul;
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul;
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul;
            }
        } else {
            szoveg = "Most kezdenek csak irigyelni mások!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_otos;
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_otos;
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_otos;
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_otos;
            }
        }
        beszolas();
    }
    if (maradtBetu == 350 && arany >= 90) {
        if (hiba == 0) {
            szoveg = "A gombok nagyon szeretnek Téged!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul;
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul;
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul;
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul;
                szoveg = "Ha így haladsz, letolsz a trónomról!";
            }
        } else {
            szoveg = "Te biztos dobogós leszel! Befutó vagy!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_otos;
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_otos;
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_otos;
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_otos;
            }
        }
        beszolas();
    }

    // 4-es
    if (maradtBetu == 50 && (arany < 90 && arany >= 75)) {
        szoveg = "Gyerünk! Majdnem megvan a jeles!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
            szoveg = "Ne szaladj így elõre! Lassabban, pontosabban!";
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes;
            szoveg = "Olyan kis csacsi vagy, figyelj oda jobban!";
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_negyes;
            szoveg = "Olyan szorgos vagy, mint a méhecske!";
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_negyes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes;
        }
        beszolas();
    }
    if (maradtBetu == 100 && (arany < 90 && arany >= 75)) {
        szoveg = "Csak egy kicsi kell még hozzá! Hajrá!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_negyes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_negyes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes;
        }
        beszolas();
    }
    if (maradtBetu == 150 && (arany < 90 && arany >= 75)) {
        szoveg = "Húzz bele az ötösért! Klikk-klikk-klikk...";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_negyes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_negyes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes;
        }
        beszolas();
    }
    if (maradtBetu == 200 && (arany < 90 && arany >= 75)) {
        szoveg = "Koncentrálj, van még esély! Képes vagy rá!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_negyes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_negyes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes;
        }
        beszolas();
    }
    if (maradtBetu == 250 && (arany < 90 && arany >= 75)) {
        szoveg = "Már nem kellene sok, de így is jó vagy!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_negyes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_negyes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes;
        }
        beszolas();
    }
    if (maradtBetu == 300 && (arany < 90 && arany >= 75)) {
        szoveg = "Meglesz már a négyes, alább ne add!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_negyes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_negyes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes;
        }
        beszolas();
    }
    if (maradtBetu == 350 && (arany < 90 && arany >= 75)) {
        szoveg = "Jó jegy az a négyes, a második legjobb!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_negyes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_negyes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes;
        }
        beszolas();
    }

    // 3-as
    if (maradtBetu == 50 && (arany < 75 && arany >= 55)) {
        szoveg = "Nem rossz egy közepestől! Menne jobban?";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_harmas;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_harmas;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas;
        }
        beszolas();
    }
    if (maradtBetu == 100 && (arany < 75 && arany >= 55)) {
        szoveg = "Stabilan tartod a hármast! Biztos a kedvenc számod.";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas;
            szoveg = "Egyre fentebb lépsz a szamárlétrán!";
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_harmas;
            szoveg = "Bocs, hogy beleszólok... de ezt Te jobban is tudod!"
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_harmas;
            szoveg = "Grrrr...Figyelj oda jobban!";
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas;
        }
        beszolas();
    }
    if (maradtBetu == 150 && (arany < 75 && arany >= 55)) {
        szoveg = "Egy jó gomb, egy rossz gomb. Arany középút!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_harmas;
            szoveg = "Ennél még én is jobb vagyok a nagy mancsommal!";
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_harmas;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas;
        }
        beszolas();
    }
    if (maradtBetu == 200 && (arany < 75 && arany >= 55)) {
        szoveg = "A középmezőnyt erősíted!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_harmas;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_harmas;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas;
        }
        beszolas();
    }
    if (maradtBetu == 250 && (arany < 75 && arany >= 55)) {
        szoveg = "Egy, meg egy, meg egy egyenlő három!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_harmas;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_harmas;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas;
        }
        beszolas();
    }
    if (maradtBetu == 300 && (arany < 75 && arany >= 55)) {
        szoveg = "Nem javulsz, szerintem maradsz közepes!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_harmas;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_harmas;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas;
        }
        beszolas();
    }
    if (maradtBetu == 350 && (arany < 75 && arany >= 55)) {
        szoveg = "Biztos, hogy dobogós hely nem lesz a tiéd!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_harmas;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_harmas;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas;
        }
        beszolas();
    }

    //2-es
    if (maradtBetu == 50 && (arany < 55 && arany >= 30)) {
        szoveg = "Hát, ez éppen elégséges eddig!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_kettes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_kettes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes;
        }
        beszolas();
    }
    if (maradtBetu == 100 && (arany < 55 && arany >= 30)) {
        szoveg = "Mi történik? Nem vagyok én ehhez hozzászokva...";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_kettes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_kettes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes;
        }
        beszolas();
    }
    if (maradtBetu == 150 && (arany < 55 && arany >= 30)) {
        szoveg = "Egyujjas kesztyű van rajtad, vagy mi?";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_kettes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_kettes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes;
        }
        beszolas();
    }
    if (maradtBetu == 200 && (arany < 55 && arany >= 30)) {
        szoveg = "Most próbáld meg az ujjaiddal nyomogatni a gombokat...";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_kettes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_kettes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes;
        }
        beszolas();
    }
    if (maradtBetu == 250 && (arany < 55 && arany >= 30)) {
        szoveg = "Szerintem neked összenőttek az ujjaid!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_kettes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_kettes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes;
        }
        beszolas();
    }
    if (maradtBetu == 300 && (arany < 55 && arany >= 30)) {
        szoveg = "Hahó! Te direkt ütsz mellé a gomboknak?";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_kettes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_kettes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes;
        }
        beszolas();
    }
    if (maradtBetu == 350 && (arany < 55 && arany >= 30)) {
        szoveg = "Ebből bukta lesz, ha így folytatod... de nem diós-mákos!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_kettes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_kettes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes;
        }
        beszolas();
    }

    //1-es
    if (maradtBetu == 50 && arany < 30) {
        szoveg = "Ez most micsoda? Nem gombmelléűtő verseny ez!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_egyes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_egyes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes;
        }
        beszolas();
    }
    if (maradtBetu == 100 && arany < 30) {
        szoveg = "Látom, a piros szín a kedvenced...";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_egyes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_egyes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes;
        }
        beszolas();
    }
    if (maradtBetu == 150 && arany < 30) {
        szoveg = "Lehet, hogy meg kellene vizsgáltatnod a szemed!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_egyes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_egyes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes;
        }
        beszolas();
    }
    if (maradtBetu == 200 && arany < 30) {
        szoveg = "Azt hiszed ökölvívó órán vagy? Ujjaidat használd!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_egyes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_egyes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes;
        }
        beszolas();
    }
    if (maradtBetu == 250 && arany < 30) {
        szoveg = "Téosz mosmicsinálol? Nem érteni mágyár?";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_egyes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_egyes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes;
        }
        beszolas();
    }
    if (maradtBetu == 300 && arany < 30) {
        szoveg = "Ááá... ezt nem hiszem el! Végem van!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_egyes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_egyes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes;
        }
        beszolas();
    }
    if (maradtBetu == 350 && arany < 30) {
        szoveg = "Kinyírtál teljesen! ?!#/&<%$@";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes;
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes;
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_egyes;
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_egyes;
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes;
        }
        beszolas();
    }
}