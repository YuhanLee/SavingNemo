/**
 * http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
 *
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
export function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}

// convert a number to a color using hsl
export function numberToColorHsl(i) {
    // as the function expects a value between 0 and 1, and red = 0° and green = 120°
    // we convert the input to the appropriate hue value
    var hue = i * 1.2 / 360;
    // we convert hsl to rgb (saturation 100%, lightness 50%)
    var rgb = hslToRgb(hue, 1, .5);
    // we format to css value and return
    return 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
}

// convert a color to a number using hsl
// based on formula as provided by @KamilT
export function numberToColorRgb(i) {
    // we calculate red and green
//    var red = Math.floor(255 - (255 * i / 100));
//    var yellow = Math.floor(255 * i / 100);
    // we format to css value and return
//    return 'rgb('+red+','+yellow+',0)'

    //function perc2color(perc) {
        var r, g, b = 0;
        if(i < 50) {
            r = 255;
            g = Math.round(5.1 * i);
        }
        else {
            g = 255;
            r = Math.round(510 - 5.10 * i);
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
    //}
}

export const arrayCountries = [["MC",8],["LI",0],["LU",20],["NO",19],["BM",0],["CH",3],["IM",0],["QA",0],["SM",0],["DK",21],["IE",22],["AU",27],["SE",54],["US",0],["SG",18],["IS",6],["FO",0],["NL",28],["AT",22],["FI",25],["CA",22],["GL",21],["BE",47],["DE",34],["GB",39],["JP",14],["FR",44],["KW",0],["AD",0],["AE",4],["NZ",26],["BN",0],["IT",33],["IL",1],["GU",0],["ES",29],["CY",26],["PR",0],["AW",2],["SI",23],["GR",24],["MT",24],["BH",0],["PT",25],["SA",0],["CZ",19],["OM",0],["TT",0],["EE",28],["GQ",0],["BB",1],["MP",0],["LT",19],["LV",19],["UY",1],["CL",4],["HU",19],["HR",23],["AG",5],["PL",19],["SC",6],["RU",1],["AR",13],["AS",0],["PW",1],["TR",2],["PA",9],["BR",13],["KZ",0],["MY",5],["CR",16],["MX",9],["RO",25],["MU",7],["LY",4],["GA",1],["LB",5],["GD",6],["MV",9],["SR",1],["NR",2],["BG",23],["DM",0],["ME",4],["BW",0],["CO",12],["VC",1],["ZA",5],["BY",0],["CN",10],["CU",5],["AZ",0],["TM",0],["DO",12],["RS",0],["PE",10],["TH",3],["EC",2],["IQ",0],["NA",0],["BA",0],["JM",4],["DZ",9],["BZ",4],["FJ",22],["AL",8],["TN",5],["AO",0],["WS",0],["TO",8],["JO",0],["PY",0],["GE",4],["GY",2],["AM",0],["TL",6],["MN",0],["GT",2],["SV",1],["MH",2],["ID",19],["LK",2],["TV",3],["UA",0],["VU",0],["MA",5],["BO",0],["PH",7],["PG",5],["BT",0],["NG",4],["HN",49],["SD",0],["NI",1],["SB",4],["VN",3],["UZ",0],["KI",2],["DJ",0],["ZM",0],["ST",0],["IN",26],["GH",2],["CM",0],["PK",3],["MR",1],["KE",4],["LS",0],["MM",0],["SN",3],["KH",2],["BD",3],["TD",0],["ZW",0],["TJ",0],["BJ",1],["KM",0],["ML",0],["HT",1],["GN",1],["NP",1],["RW",0],["BF",1],["GW",0],["UG",1],["AF",0],["TG",1],["SL",1],["ET",0],["MZ",1],["SO",0],["ER",0],["MG",2],["CF",0],["LR",1],["MW",0],["NE",0],["BI",0],["EG",4],["CK",4],["CV",1],["HK",2],["BS",1],["VE",1],["GM",2],["CI",1],["NC",4],["SK",19],["PF",1],["MS",1],["KR",2],["TW",1],["AQ",0],["YE",0],["EH",0],["IO",0],["TC",0],["AN",0],["YT",0],["KY",0],["CX",0],["WF",0],["PM",0],["HM",0],["TK",0],["JE",0],["NU",0],["AI",0],["GG",0],["NF",0],["BV",0],["CC",0],["GI",0],["SZ",0],["KG",0]];
