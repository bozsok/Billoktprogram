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
}

document.getElementById('kartya_01').addEventListener('click', function() {
    activeKartya = 1;
    document.querySelector('.kartya__test-kep').innerHTML = nyuszi;
    document.querySelector('.kartya__test-kep').style.backgroundColor = '#dfecf1';
    kartyaKattintas();
    fajlBeolvasas();
});
document.getElementById('kartya_02').addEventListener('click', function() {
    activeKartya = 2;
    document.querySelector('.kartya__test-kep').innerHTML = csacsi;
    document.querySelector('.kartya__test-kep').style.backgroundColor = '#dfebf7';
    kartyaKattintas();
    fajlBeolvasas();
});
document.getElementById('kartya_03').addEventListener('click', function() {
    activeKartya = 3;
    document.querySelector('.kartya__test-kep').innerHTML = maci;
    document.querySelector('.kartya__test-kep').style.backgroundColor = '#f0dbcd';
    kartyaKattintas();
    fajlBeolvasas();
});
document.getElementById('kartya_04').addEventListener('click', function() {
    activeKartya = 4;
    document.querySelector('.kartya__test-kep').innerHTML = tigris;
    document.querySelector('.kartya__test-kep').style.backgroundColor = '#fbefe1';
    document.querySelector('.kartya__test-kep #tigris').style.cssText = 'width: 120%; margin-left: -3rem;';
    kartyaKattintas();
    fajlBeolvasas();
});
document.getElementById('kartya_05').addEventListener('click', function() {
    activeKartya = 5;
    document.querySelector('.kartya__test-kep').innerHTML = oroszlan;
    document.querySelector('.kartya__test-kep').style.backgroundColor = '#f0e8e2';
    document.querySelector('.kartya__test-kep #oroszlan').style.marginLeft = '-1rem';
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
                    kiirtSzoveg[i] = `<span style = 'color:red'>${kiirtSzoveg[i]}</span>`;
                    begepeltSzoveg[i] = `<span style = 'color:red'>${begepeltSzoveg[i]}</span>`;
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
                            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes; //megjelenítem a karaktert 
                            document.querySelector('#nyuszi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; //megjelenő SVG finomítása
                        } else if (activeKartya == 2) {
                            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes; 
                            document.querySelector('#csacsi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 3) {
                            document.querySelector('.beszolasKep').innerHTML = maci_egyes; 
                            document.querySelector('#maci_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 4) {
                            document.querySelector('.beszolasKep').innerHTML = tigris_egyes; 
                            document.querySelector('#tigris_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 5) {
                            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes; 
                            document.querySelector('#oroszlan_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        }
                        document.getElementById('erdemjegy').innerHTML = 1;
                        szoveg = "Jááj! Mökfoksz bukni! Mára vége vann!";
                        beszolas();
                    } else if (arany >= 30 && arany <= 54.99) {
			if (activeKartya == 1) {                            
                            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
                            document.querySelector('#nyuszi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
                        } else if (activeKartya == 2) {
                            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes; 
                            document.querySelector('#csacsi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 3) {
                            document.querySelector('.beszolasKep').innerHTML = maci_kettes; 
                            document.querySelector('#maci_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 4) {
                            document.querySelector('.beszolasKep').innerHTML = tigris_kettes; 
                            document.querySelector('#tigris_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 5) {
                            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes; 
                            document.querySelector('#oroszlan_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        }
                        document.getElementById('erdemjegy').innerHTML = 2;
                        szoveg = "Vigyázzá, mer ha így haladol, mökbukol! Végezté márra!";
                        beszolas();
                    } else if (arany >= 55 && arany <= 74.99) {
			if (activeKartya == 1) {                            
                            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
                            document.querySelector('#nyuszi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
                        } else if (activeKartya == 2) {
                            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas; 
                            document.querySelector('#csacsi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 3) {
                            document.querySelector('.beszolasKep').innerHTML = maci_harmas; 
                            document.querySelector('#maci_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 4) {
                            document.querySelector('.beszolasKep').innerHTML = tigris_harmas; 
                            document.querySelector('#tigris_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 5) {
                            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas; 
                            document.querySelector('#oroszlan_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        }
                        document.getElementById('erdemjegy').innerHTML = 3;
                        szoveg = "Végeztél... ha gyakorolsz még, menni fog ez jobban is!";
                        beszolas();
                    } else if (arany >= 75 && arany <= 89.99) {
			if (activeKartya == 1) {                            
                            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
                            document.querySelector('#nyuszi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
                        } else if (activeKartya == 2) {
                            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes; 
                            document.querySelector('#csacsi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 3) {
                            document.querySelector('.beszolasKep').innerHTML = maci_negyes; 
                            document.querySelector('#maci_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 4) {
                            document.querySelector('.beszolasKep').innerHTML = tigris_negyes; 
                            document.querySelector('#tigris_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 5) {
                            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes; 
                            document.querySelector('#oroszlan_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        }
                        document.getElementById('erdemjegy').innerHTML = 4;
                        szoveg = "A végére értél jó eredménnyel! Nagyon ügyes vagy!";
                        beszolas();
                    } else if (arany >= 90) {
			if (activeKartya == 1) {                            
                            document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
                            document.querySelector('#nyuszi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
                        } else if (activeKartya == 2) {
                            document.querySelector('.beszolasKep').innerHTML = csacsi_otos; 
                            document.querySelector('#csacsi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 3) {
                            document.querySelector('.beszolasKep').innerHTML = maci_otos; 
                            document.querySelector('#maci_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 4) {
                            document.querySelector('.beszolasKep').innerHTML = tigris_otos; 
                            document.querySelector('#tigris_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 5) {
                            document.querySelector('.beszolasKep').innerHTML = oroszlan_otos; 
                            document.querySelector('#oroszlan_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        }
                        document.getElementById('erdemjegy').innerHTML = 5;
                        szoveg = "Gratulálok a jeles eredményedhez! Like!";
                        beszolas();
                    }
                    if (hiba == 0) {
			if (activeKartya == 1) {                            
                            document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
                            document.querySelector('#nyuszi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
                        } else if (activeKartya == 2) {
                            document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul; 
                            document.querySelector('#csacsi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 3) {
                            document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul; 
                            document.querySelector('#maci_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 4) {
                            document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul; 
                            document.querySelector('#tigris_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
                        } else if (activeKartya == 5) {
                            document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul; 
                            document.querySelector('#oroszlan_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
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
                document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
                document.querySelector('#nyuszi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
                szoveg = "Ilyen eredménnyel akkorát ugrasz, mint egy nyúl!";
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul;
                document.querySelector('#csacsi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
                szoveg = "Ó-r-IÁÁÁÁÁÁ-s-i vagy! Így tovább!";
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul;
                document.querySelector('#maci_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
                szoveg = "Figyelemreméltó a munkád! Hajrá!";
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul;
                document.querySelector('#tigris_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
                szoveg = "Itt jön a tigris, nála erősebb nincs is!";
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul;
                document.querySelector('#oroszlan_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
                szoveg = "Olyan király vagy, mint én!";
            }            
        } else {
            szoveg = "Nagyon ügyes vagy, csak így tovább!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
                document.querySelector('#nyuszi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_otos;
                document.querySelector('#csacsi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_otos;
                document.querySelector('#maci_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_otos;
                document.querySelector('#tigris_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_otos;
                document.querySelector('#oroszlan_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            }            
        }            
        beszolas();           
    }
    if (maradtBetu == 100 && arany >= 90) {
        if (hiba == 0) {
            szoveg = "Ezt már nevezem! Mindent bele!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
                document.querySelector('#nyuszi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul;
                document.querySelector('#csacsi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul;
                document.querySelector('#maci_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul;
                document.querySelector('#tigris_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul;
                document.querySelector('#oroszlan_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            }            
        } else {
            szoveg = "Le a kalappal, csak így folytasd tovább!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
                document.querySelector('#nyuszi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_otos;
                document.querySelector('#csacsi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_otos;
                document.querySelector('#maci_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_otos;
                document.querySelector('#tigris_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_otos;
                document.querySelector('#oroszlan_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            }            
        }                
        beszolas();                                        
    }
    if (maradtBetu == 150 && arany >= 90) {
        if (hiba == 0) {
            szoveg = "Ha így folytatod, te leszel a győztes!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
                document.querySelector('#nyuszi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul;
                document.querySelector('#csacsi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul;
                document.querySelector('#maci_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul;
                document.querySelector('#tigris_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul;
                document.querySelector('#oroszlan_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            }            
        } else {
            szoveg = "Nem semmi, amit a gombokkal művelsz!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
                document.querySelector('#nyuszi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_otos;
                document.querySelector('#csacsi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_otos;
                document.querySelector('#maci_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_otos;
                document.querySelector('#tigris_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_otos;
                document.querySelector('#oroszlan_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            }            
        }              
        beszolas();            
    }
    if (maradtBetu == 200 && arany >= 90) {
        if (hiba == 0) {
            szoveg = "Nem tudsz hibázni! Így tovább!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
                document.querySelector('#nyuszi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul;
                document.querySelector('#csacsi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul;
                document.querySelector('#maci_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul;
                document.querySelector('#tigris_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul;
                document.querySelector('#oroszlan_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            }            
        } else {
            szoveg = "Úgy látom valaki már megállíthatatlan!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
                document.querySelector('#nyuszi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_otos;
                document.querySelector('#csacsi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_otos;
                document.querySelector('#maci_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_otos;
                document.querySelector('#tigris_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_otos;
                document.querySelector('#oroszlan_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            }            
        }
        beszolas();
    }
    if (maradtBetu == 250 && arany >= 90) {
        if (hiba == 0) {
            szoveg = "Hohó... komolyan kell venni Téged!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
                document.querySelector('#nyuszi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul;
                document.querySelector('#csacsi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul;
                document.querySelector('#maci_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul;
                document.querySelector('#tigris_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul;
                document.querySelector('#oroszlan_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            }            
        } else {
            szoveg = "Felülmúlhatatlan az ügyességed! Hajrá!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
                document.querySelector('#nyuszi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_otos;
                document.querySelector('#csacsi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_otos;
                document.querySelector('#maci_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_otos;
                document.querySelector('#tigris_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_otos;
                document.querySelector('#oroszlan_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            }            
        }
        beszolas();
    }
    if (maradtBetu == 300 && arany >= 90) {
        if (hiba == 0) {
            szoveg = "Nem jutok szóhoz... nagyon megy ez!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
                document.querySelector('#nyuszi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul;
                document.querySelector('#csacsi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul;
                document.querySelector('#maci_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul;
                document.querySelector('#tigris_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul;
                document.querySelector('#oroszlan_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            }            
        } else {
            szoveg = "Most kezdenek csak irigyelni mások!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
                document.querySelector('#nyuszi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_otos;
                document.querySelector('#csacsi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_otos;
                document.querySelector('#maci_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_otos;
                document.querySelector('#tigris_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_otos;
                document.querySelector('#oroszlan_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            }           
        }
        beszolas();
    }
    if (maradtBetu == 350 && arany >= 90) {
        if (hiba == 0) {
            szoveg = "A gombok nagyon szeretnek Téged!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_hiba_nelkul;
                document.querySelector('#nyuszi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_hiba_nelkul;
                document.querySelector('#csacsi_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_hiba_nelkul;
                document.querySelector('#maci_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_hiba_nelkul;
                document.querySelector('#tigris_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_hiba_nelkul;
                document.querySelector('#oroszlan_hiba_nelkul').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
                szoveg = "Ha így haladsz, letolsz a trónomról!";
            }                     
        } else {
            szoveg = "Te biztos dobogós leszel! Befutó vagy!";
            if (activeKartya == 1) {
                document.querySelector('.beszolasKep').innerHTML = nyuszi_otos;
                document.querySelector('#nyuszi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 2) {
                document.querySelector('.beszolasKep').innerHTML = csacsi_otos;
                document.querySelector('#csacsi_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 3) {
                document.querySelector('.beszolasKep').innerHTML = maci_otos;
                document.querySelector('#maci_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 4) {
                document.querySelector('.beszolasKep').innerHTML = tigris_otos;
                document.querySelector('#tigris_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            } else if (activeKartya == 5) {
                document.querySelector('.beszolasKep').innerHTML = oroszlan_otos;
                document.querySelector('#oroszlan_otos').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            }            
        }
        beszolas();
    }

    // 4-es
    if (maradtBetu == 50 && (arany < 90 && arany >= 75)) {
        szoveg = "Gyerünk! Majdnem megvan a jeles!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
            document.querySelector('#nyuszi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            szoveg = "Ne szaladj így elõre! Lassabban, pontosabban!";
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes;
            document.querySelector('#csacsi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            szoveg = "Olyan kis csacsi vagy, figyelj oda jobban!";
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_negyes;
            document.querySelector('#maci_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            szoveg = "Olyan szorgos vagy, mint a méhecske!";
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_negyes;
            document.querySelector('#tigris_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes;
            document.querySelector('#oroszlan_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }       
        beszolas();
    }
    if (maradtBetu == 100 && (arany < 90 && arany >= 75)) {
        szoveg = "Csak egy kicsi kell még hozzá! Hajrá!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
            document.querySelector('#nyuszi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes;
            document.querySelector('#csacsi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_negyes;
            document.querySelector('#maci_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_negyes;
            document.querySelector('#tigris_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes;
            document.querySelector('#oroszlan_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }        
        beszolas();
    }
    if (maradtBetu == 150 && (arany < 90 && arany >= 75)) {
        szoveg = "Húzz bele az ötösért! Klikk-klikk-klikk...";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
            document.querySelector('#nyuszi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes;
            document.querySelector('#csacsi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_negyes;
            document.querySelector('#maci_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_negyes;
            document.querySelector('#tigris_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes;
            document.querySelector('#oroszlan_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }        
        beszolas();
    }
    if (maradtBetu == 200 && (arany < 90 && arany >= 75)) {
        szoveg = "Koncentrálj, van még esély! Képes vagy rá!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
            document.querySelector('#nyuszi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes;
            document.querySelector('#csacsi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_negyes;
            document.querySelector('#maci_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_negyes;
            document.querySelector('#tigris_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes;
            document.querySelector('#oroszlan_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }
        beszolas();
    }
    if (maradtBetu == 250 && (arany < 90 && arany >= 75)) {
        szoveg = "Már nem kellene sok, de így is jó vagy!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
            document.querySelector('#nyuszi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes;
            document.querySelector('#csacsi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_negyes;
            document.querySelector('#maci_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_negyes;
            document.querySelector('#tigris_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes;
            document.querySelector('#oroszlan_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }
        beszolas();
    }
    if (maradtBetu == 300 && (arany < 90 && arany >= 75)) {
        szoveg = "Meglesz már a négyes, alább ne add!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
            document.querySelector('#nyuszi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes;
            document.querySelector('#csacsi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_negyes;
            document.querySelector('#maci_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_negyes;
            document.querySelector('#tigris_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes;
            document.querySelector('#oroszlan_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }
        beszolas();
    }
    if (maradtBetu == 350 && (arany < 90 && arany >= 75)) {
        szoveg = "Jó jegy az a négyes, a második legjobb!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_negyes;
            document.querySelector('#nyuszi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_negyes;
            document.querySelector('#csacsi_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_negyes;
            document.querySelector('#maci_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_negyes;
            document.querySelector('#tigris_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_negyes;
            document.querySelector('#oroszlan_negyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }
        beszolas();
    }

    // 3-as
    if (maradtBetu == 50 && (arany < 75 && arany >= 55)) {
        szoveg = "Nem rossz egy közepestől! Menne jobban?";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
            document.querySelector('#nyuszi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas;
            document.querySelector('#csacsi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_harmas;
            document.querySelector('#maci_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_harmas;
            document.querySelector('#tigris_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas;
            document.querySelector('#oroszlan_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }
        beszolas();
    }
    if (maradtBetu == 100 && (arany < 75 && arany >= 55)) {
        szoveg = "Stabilan tartod a hármast! Biztos a kedvenc számod.";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
            document.querySelector('#nyuszi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas;
            document.querySelector('#csacsi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
            szoveg = "Egyre fentebb lépsz a szamárlétrán!";
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_harmas;
            document.querySelector('#maci_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
            szoveg = "Bocs, hogy beleszólok... de ezt Te jobban is tudod!"
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_harmas;
            document.querySelector('#tigris_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            szoveg = "Grrrr...Figyelj oda jobban!";
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas;
            document.querySelector('#oroszlan_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }        
        beszolas();
    }
    if (maradtBetu == 150 && (arany < 75 && arany >= 55)) {
        szoveg = "Egy jó gomb, egy rossz gomb. Arany középút!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
            document.querySelector('#nyuszi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;'; 
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas;
            document.querySelector('#csacsi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_harmas;
            document.querySelector('#maci_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
            szoveg = "Még én is ügyesebben ütném le a billentyűket a nagy mancsommal!";
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_harmas;
            document.querySelector('#tigris_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas;
            document.querySelector('#oroszlan_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }        
        beszolas();
    }
    if (maradtBetu == 200 && (arany < 75 && arany >= 55)) {
        szoveg = "A középmezőnyt erősíted!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
            document.querySelector('#nyuszi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas;
            document.querySelector('#csacsi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_harmas;
            document.querySelector('#maci_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_harmas;
            document.querySelector('#tigris_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas;
            document.querySelector('#oroszlan_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }
        beszolas();
    }
    if (maradtBetu == 250 && (arany < 75 && arany >= 55)) {
        szoveg = "Egy, meg egy, meg egy egyenlő három!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
            document.querySelector('#nyuszi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas;
            document.querySelector('#csacsi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_harmas;
            document.querySelector('#maci_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_harmas;
            document.querySelector('#tigris_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas;
            document.querySelector('#oroszlan_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }
        beszolas();
    }
    if (maradtBetu == 300 && (arany < 75 && arany >= 55)) {
        szoveg = "Nem javulsz, szerintem maradsz közepes!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
            document.querySelector('#nyuszi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas;
            document.querySelector('#csacsi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_harmas;
            document.querySelector('#maci_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_harmas;
            document.querySelector('#tigris_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas;
            document.querySelector('#oroszlan_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }
        beszolas();
    }
    if (maradtBetu == 350 && (arany < 75 && arany >= 55)) {
        szoveg = "Biztos, hogy dobogós hely nem lesz a tiéd!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_harmas;
            document.querySelector('#nyuszi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_harmas;
            document.querySelector('#csacsi_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_harmas;
            document.querySelector('#maci_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_harmas;
            document.querySelector('#tigris_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_harmas;
            document.querySelector('#oroszlan_harmas').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }
        beszolas();
    }
    
    //2-es
    if (maradtBetu == 50 && (arany < 55 && arany >= 30)) {
        szoveg = "Hát, ez éppen elégséges eddig!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
            document.querySelector('#nyuszi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes;
            document.querySelector('#csacsi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_kettes;
            document.querySelector('#maci_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_kettes;
            document.querySelector('#tigris_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes;
            document.querySelector('#oroszlan_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }
        beszolas();
    }
    if (maradtBetu == 100 && (arany < 55 && arany >= 30)) {
        szoveg = "Mi történik? Nem vagyok én ehhez hozzászokva...";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
            document.querySelector('#nyuszi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes;
            document.querySelector('#csacsi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_kettes;
            document.querySelector('#maci_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_kettes;
            document.querySelector('#tigris_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes;
            document.querySelector('#oroszlan_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }
        beszolas();
    }
    if (maradtBetu == 150 && (arany < 55 && arany >= 30)) {
        szoveg = "Egyujjas kesztyű van rajtad, vagy mi?";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
            document.querySelector('#nyuszi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes;
            document.querySelector('#csacsi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_kettes;
            document.querySelector('#maci_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_kettes;
            document.querySelector('#tigris_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes;
            document.querySelector('#oroszlan_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }
        beszolas();
    }
    if (maradtBetu == 200 && (arany < 55 && arany >= 30)) {
        szoveg = "Most próbáld meg az ujjaiddal nyomogatni a gombokat...";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
            document.querySelector('#nyuszi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes;
            document.querySelector('#csacsi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_kettes;
            document.querySelector('#maci_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_kettes;
            document.querySelector('#tigris_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes;
            document.querySelector('#oroszlan_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }
        beszolas();
    }
    if (maradtBetu == 250 && (arany < 55 && arany >= 30)) {
        szoveg = "Szerintem neked összenőttek az ujjaid!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
            document.querySelector('#nyuszi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes;
            document.querySelector('#csacsi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_kettes;
            document.querySelector('#maci_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_kettes;
            document.querySelector('#tigris_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes;
            document.querySelector('#oroszlan_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }
        beszolas();
    }
    if (maradtBetu == 300 && (arany < 55 && arany >= 30)) {
        szoveg = "Hahó! Te direkt ütsz mellé a gomboknak?";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
            document.querySelector('#nyuszi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes;
            document.querySelector('#csacsi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_kettes;
            document.querySelector('#maci_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_kettes;
            document.querySelector('#tigris_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes;
            document.querySelector('#oroszlan_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }
        beszolas();
    }
    if (maradtBetu == 350 && (arany < 55 && arany >= 30)) {
        szoveg = "Ebből bukta lesz, ha így folytatod... de nem diós-mákos!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_kettes;
            document.querySelector('#nyuszi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_kettes;
            document.querySelector('#csacsi_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_kettes;
            document.querySelector('#maci_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_kettes;
            document.querySelector('#tigris_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_kettes;
            document.querySelector('#oroszlan_kettes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }        
        beszolas();
    }

    //1-es
    if (maradtBetu == 50 && arany < 30) {
        szoveg = "Ez most micsoda? Nem gombmelléűtő verseny ez!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes;
            document.querySelector('#nyuszi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes;
            document.querySelector('#csacsi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_egyes;
            document.querySelector('#maci_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_egyes;
            document.querySelector('#tigris_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes;
            document.querySelector('#oroszlan_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }        
        beszolas();
    }
    if (maradtBetu == 100 && arany < 30) {
        szoveg = "Látom, a piros szín a kedvenced...";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes;
            document.querySelector('#nyuszi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes;
            document.querySelector('#csacsi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_egyes;
            document.querySelector('#maci_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_egyes;
            document.querySelector('#tigris_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes;
            document.querySelector('#oroszlan_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }        
        beszolas();
    }
    if (maradtBetu == 150 && arany < 30) {
        szoveg = "Lehet, hogy meg kellene vizsgáltatnod a szemed!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes;
            document.querySelector('#nyuszi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes;
            document.querySelector('#csacsi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_egyes;
            document.querySelector('#maci_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_egyes;
            document.querySelector('#tigris_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes;
            document.querySelector('#oroszlan_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }        
        beszolas();
    }
    if (maradtBetu == 200 && arany < 30) {
        szoveg = "Azt hiszed ökölvívó órán vagy? Ujjaidat használd!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes;
            document.querySelector('#nyuszi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes;
            document.querySelector('#csacsi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_egyes;
            document.querySelector('#maci_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_egyes;
            document.querySelector('#tigris_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes;
            document.querySelector('#oroszlan_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }        
        beszolas();
    }
    if (maradtBetu == 250 && arany < 30) {
        szoveg = "Téosz mosmicsinálol? Nem érteni mágyár?";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes;
            document.querySelector('#nyuszi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes;
            document.querySelector('#csacsi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_egyes;
            document.querySelector('#maci_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_egyes;
            document.querySelector('#tigris_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes;
            document.querySelector('#oroszlan_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }        
        beszolas();
    }
    if (maradtBetu == 300 && arany < 30) {
        szoveg = "Ááá... ezt nem hiszem el! Végem van!";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes;
            document.querySelector('#nyuszi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes;
            document.querySelector('#csacsi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_egyes;
            document.querySelector('#maci_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_egyes;
            document.querySelector('#tigris_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes;
            document.querySelector('#oroszlan_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }        
        beszolas();
    }
    if (maradtBetu == 350 && arany < 30) {
        szoveg = "Kinyírtál teljesen! ?!#/&<%$@";
        if (activeKartya == 1) {
            document.querySelector('.beszolasKep').innerHTML = nyuszi_egyes;
            document.querySelector('#nyuszi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 2) {
            document.querySelector('.beszolasKep').innerHTML = csacsi_egyes;
            document.querySelector('#csacsi_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 3) {
            document.querySelector('.beszolasKep').innerHTML = maci_egyes;
            document.querySelector('#maci_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';            
        } else if (activeKartya == 4) {
            document.querySelector('.beszolasKep').innerHTML = tigris_egyes;
            document.querySelector('#tigris_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        } else if (activeKartya == 5) {
            document.querySelector('.beszolasKep').innerHTML = oroszlan_egyes;
            document.querySelector('#oroszlan_egyes').style.cssText = 'width: auto; height: 600px; align-self: flex-end;';
        }        
        beszolas();
    }
}