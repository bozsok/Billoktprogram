var activeKartya, tomb, tovabbMegy, szamlalo, fajlTartalom, billentyuk, erdemjegy, ido, sec, min, karakter, szoveg, kep;
var i = 0;
var hiba = 0;
var begepeltSzoveg = [];
var kiirtSzoveg = [];
var arany = 0;

tovabbMegy = true;
document.querySelector('.pause').style.display = 'none';
document.querySelector('.wrapper2').classList.add('eltuntet');

function kartyaKattintas() {
    document.querySelector('.wrapper1').classList.remove('megjelenitGrid');
    document.querySelector('.wrapper1').classList.add('eltuntet');
    document.querySelector('.wrapper2').classList.remove('eltuntet');
    document.querySelector('.wrapper2').classList.add('megjelenitGrid');
    document.querySelector('.feladatoldal__kezeles-kartya .kartya__test-kep').classList.remove('alap');      
    document.querySelector('.feladatoldal__kezeles-kartya .kartya__test-kep').classList.add('szint_' + activeKartya);    
}

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
function pause() {
    document.querySelector('.feladatoldal__navigacio-nyil').classList.remove('inaktiv');
    document.querySelector('.feladatoldal__navigacio-nyil').classList.add('aktiv');    
    document.querySelector('.pause').style.display = 'none';
    document.querySelector('.play').style.display = 'block';
    document.querySelector(".kartya__test").classList.remove('arnyek');
    document.querySelector('.betu').classList.remove("betu_jon");
    i = 0;
    tovabbMegy = false;
}

function fajlBeolvasas() {
    var szint_0 = './txt/alap.txt';
    var szint_1 = './txt/kezdo_1.txt';
    var szint_2 = './txt/kezdo_2.txt';
    var szint_3 = './txt/halado_1.txt';
    var szint_4 = './txt/halado_2.txt';
    var szint_5 = './txt/profi_1.txt';
    
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {     
        document.getElementById("kiir").innerHTML = this.responseText;
        fajlTartalom = this.responseText;
        document.getElementById('billentyuk').innerHTML = '0/' + fajlTartalom.length; 
      }
    };    
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
    document.querySelector('.kiir').style.color = 'grey';    
}

function betuBeolvasas () {
    document.getElementById('kiir').innerHTML = fajlTartalom;
    document.getElementById('billentyuk').innerHTML = '0/' + fajlTartalom.length;
    document.getElementById('betu').innerHTML = fajlTartalom[i];
    
    document.onkeypress = function(esemeny) {
        if (tovabbMegy) {
            let Unicode;
            let betu;
            if (typeof event !== 'undefined') {
                Unicode = esemeny.charCode || esemeny.keyCode;
                betu = String.fromCharCode(Unicode);
                if (betu) {
                    kiirtSzoveg.push(fajlTartalom[i]);
                    begepeltSzoveg.push(betu);
                }                
                if (betu !== fajlTartalom[i]) {
                    hiba++;
                    kiirtSzoveg[i] = "<span style = 'color:red'>" + kiirtSzoveg[i] + "</span>";
                    begepeltSzoveg[i] = "<span style = 'color:red'>" + begepeltSzoveg[i] + "</span>";
                }
                document.querySelector('.kiir').innerHTML = kiirtSzoveg.join('');
                document.querySelector('.begepel').innerHTML = begepeltSzoveg.join('');
    
                if (begepeltSzoveg.length == fajlTartalom.length) {                    
                    document.getElementById('billentyuk').innerHTML = (maradtBetu + 1) + '/' + fajlTartalom.length;
                    document.getElementById('hiba').innerHTML = hiba;
                    arany = ((((maradtBetu + 1) - hiba) / (maradtBetu + 1)) * 100).toFixed(2);
                    document.getElementById('arany').innerHTML = arany + '%';
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
                    tovabbMegy = false;
                    idoMegallito();
                }
                else {
                    i++;          
                    document.getElementById('betu').innerHTML = fajlTartalom[i];             
                    maradtBetu = i;                    
                    billentyuk = maradtBetu + '/' + fajlTartalom.length;
                    document.getElementById('billentyuk').innerHTML = billentyuk;         
                    document.getElementById('hiba').innerHTML = hiba;
                    arany = (((maradtBetu - hiba) / maradtBetu) * 100).toFixed(2); 
                    document.getElementById('arany').innerHTML = arany + '%';
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
        
        else if (esemeny) {
            betu = esemeny.which;
        }        
        return false;
    };    
}

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
                szoveg = "Figyelj, mert most vagyunk az időnk felénél!";    
                beszolas();
            }
	    if (szamlalo == 540) {
                if (activeKartya == 1) {
                    document.querySelector('.beszolas').style.fontSize = "3.3rem";
                    szoveg = "Figyi, húzzuk fel a nyúlcipőt, mert mindjárt lejár az idő...";
                } else {
                    szoveg = "Már csak egy perc van hátra... mindjárt vége!";
                }
                beszolas();
            } else {
                document.querySelector('.beszolas').style.fontSize = "3.5rem";
            }                           
        }
        if (szamlalo >= 600) {
            clearInterval(ido);
            tovabbMegy = false;
        }                              
    },1000);    
};

function idoMegallito() {    
    clearInterval(ido);  
};

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

var idoMegint = 0;
function beszolas() {
    document.querySelector('.wrapper3').style.display = "grid";
    document.querySelector('.karakterBelep').style.display = 'block';
    idoMegint = szamlalo;
    clearInterval(ido);
    tovabbMegy = false;
    document.getElementById('beszolas').innerHTML = szoveg;
    document.querySelector('.hatterKarakter').style.cssText = "display: block; opacity: 1; z-index: 3";
    karakter = setTimeout(function() {
        clearTimeout(karakter);
	document.querySelector('.wrapper3').style.display = "none";
        document.querySelector('.karakterBelep').style.display = 'none';
        szamlalo = idoMegint;
        idoSzamlalo();
        if (szamlalo == 600 || begepeltSzoveg.length == fajlTartalom.length) {
            tovabbMegy = false;
            idoMegallito();
        } else {
            tovabbMegy = true;
        }        
        document.getElementById('beszolas').innerHTML = "";
        document.querySelector('.hatterKarakter').style.cssText = "display: none; opacity: 0; z-index: 0";
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