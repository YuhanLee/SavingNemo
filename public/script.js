// this is the config object used to connect to an app on a Qlik Sense server
var config = {
  host: "playground-sense.qlik.com",
  prefix: "/showcase/",
  port: "443",
  isSecure: true,
  rejectUnauthorized: false,
  // appname: "0b0fc6d5-05ce-44d7-95aa-80d0680b3559"
  appname: "06924e5c-c219-4e5c-ab4a-e1b9af143971"
};

var mainMap = {
  countries: []
};

function main() {
  // our API uses requirejs, so here we're setting up our base URL
  require.config({
    baseUrl:
    (config.isSecure ? "https://" : "http://") +
    config.host +
    (config.port ? ":" + config.port : "") +
    config.prefix +
    "resources"
  });
  
  /**
  * Load the entry point for the Capabilities API family
  * See full documention:
  * https://help.qlik.com/en-US/sense-developer/September2018/Subsystems/APIs/Content/Sense_ClientAPIs/CapabilityAPIs/qlik-interface-interface.htm
  */
  require(["js/qlik"], function (qlik) {
    // We're now connected
    
    // Suppress Qlik error dialogs and handle errors how you like.
    qlik.setOnError(function (error) {
      console.log("ERROR", error);
    });
    
    // Open a dataset on the server
    app = qlik.openApp(config.appname, config);
    console.log("App Opened", app);
    
    console.log(app);
    app.getList("FieldList", function (reply) {
      var str = "";
      $.each(reply.qFieldList.qItems, function (key, value) {
        str += value.qName + " ";
      });
      // alert(str);
    });
    
    var hyperCubeDef = {
      qDimensions: [
        {
          qDef: {
            qFieldDefs: ["Country"]
          }
        }
      ],
      qMeasures: [
        {
          qDef: { qDef: "=Count(Distinct [Commitment Title])" },
          qSortBy: { qSortByNumeric: -1 }
        },
        {
          qDef: { qDef: "=Avg([GDP Per Capita])" },
          qSortBy: { qSortByNumeric: -1 }
        },
        {
          qDef: { qDef: "=Sum(Coastlines)" },
          qSortBy: { qSortByNumeric: -1 }
        },
        {
          qDef: { qDef: "=Count(Distinct [Target Title])" },
          qSortBy: { qSortByNumeric: -1 }
        }
      ],
      // Country Name, # of Commitments, Avg GDP, Coastline Length (km), Number of Targets
      qInterColumnSortOrder: [2, 0, 1, 3, 4],
      qInitialDataFetch: [
        {
          qTop: 0,
          qLeft: 0,
          qHeight: 1000, //rows
          qWidth: 5
        }
      ]
    };
    
    app.createCube(hyperCubeDef, hypercube => {
      console.log(hypercube.qHyperCube.qError);
      // after creating a cube you define a callback function to handle it
      // this function will be called each time the data changes (ie. when
      // someone makes a selection).
      // console.log(hypercube);
      
      // the basic matrix of data is available in the hypercube datapages
      let matrix = hypercube.qHyperCube.qDataPages[0].qMatrix;
      
      // DEBUG: This is the old code that printed everything
      // console.log(matrix);
      var minScore = Number.POSITIVE_INFINITY;
      var maxScore = Number.NEGATIVE_INFINITY;
      var countryScoreMapNotNormal = new Map();
      var countryAndNumCommitments = new Map();
      
      matrix.forEach(function(element) {
        // console.log(element);
        let countryName = element[0].qText;
        let numCommitments = element[1].qNum;
        let gdp = element[2].qNum;
        let coastLengthOrOne = Math.max(1, element[3].qNum);
        let numTargets = element[4].qNum;
        let scoreNotTransform = numCommitments * numTargets / (gdp * coastLengthOrOne);
        var countryCode = "";
        switch(countryName) { 
          case "Afghanistan": 
          countryCode = "AF";
          break;
          case "Albania": 
          countryCode = "AL";
          break;
          case "Algeria": 
          countryCode = "DZ";
          break;
          case "American Samoa": 
          countryCode = "AS";
          break;
          case "Andorra": 
          countryCode = "AD";
          break;
          case "Angola": 
          countryCode = "AO";
          break;
          case "Anguilla": 
          countryCode = "AI";
          break;
          case "Antarctica": 
          countryCode = "AQ";
          break;
          case "Antigua and Barbuda": 
          countryCode = "AG";
          break;
          case "Argentina": 
          countryCode = "AR";
          break;
          case "Armenia": 
          countryCode = "AM";
          break;
          case "Aruba": 
          countryCode = "AW";
          break;
          case "Australia": 
          countryCode = "AU";
          break;
          case "Austria": 
          countryCode = "AT";
          break;
          case "Azerbaijan": 
          countryCode = "AZ";
          break;
          case "Bahamas": 
          countryCode = "BS";
          break;
          case "Bahrain": 
          countryCode = "BH";
          break;
          case "Bangladesh": 
          countryCode = "BD";
          break;
          case "Barbados": 
          countryCode = "BB";
          break;
          case "Belarus": 
          countryCode = "BY";
          break;
          case "Belgium": 
          countryCode = "BE";
          break;
          case "Belize": 
          countryCode = "BZ";
          break;
          case "Benin": 
          countryCode = "BJ";
          break;
          case "Bermuda": 
          countryCode = "BM";
          break;
          case "Bhutan": 
          countryCode = "BT";
          break;
          case "Bolivia, Plurinational State of": 
          countryCode = "BO";
          break;
          case "Bolivia": 
          countryCode = "BO";
          break;
          case "Bosnia and Herzegovina": 
          countryCode = "BA";
          break;
          case "Botswana": 
          countryCode = "BW";
          break;
          case "Bouvet Island": 
          countryCode = "BV";
          break;
          case "Brazil": 
          countryCode = "BR";
          break;
          case "British Indian Ocean Territory": 
          countryCode = "IO";
          break;
          case "Brunei Darussalam": 
          countryCode = "BN";
          break;
          case "Brunei": 
          countryCode = "BN";
          break;
          case "Bulgaria": 
          countryCode = "BG";
          break;
          case "Burkina Faso": 
          countryCode = "BF";
          break;
          case "Burundi": 
          countryCode = "BI";
          break;
          case "Cambodia": 
          countryCode = "KH";
          break;
          case "Cameroon": 
          countryCode = "CM";
          break;
          case "Canada": 
          countryCode = "CA";
          break;
          case "Cape Verde": 
          countryCode = "CV";
          break;
          case "Cayman Islands": 
          countryCode = "KY";
          break;
          case "Central African Republic": 
          countryCode = "CF";
          break;
          case "Chad": 
          countryCode = "TD";
          break;
          case "Chile": 
          countryCode = "CL";
          break;
          case "China": 
          countryCode = "CN";
          break;
          case "Christmas Island": 
          countryCode = "CX";
          break;
          case "Cocos (Keeling) Islands": 
          countryCode = "CC";
          break;
          case "Colombia": 
          countryCode = "CO";
          break;
          case "Comoros": 
          countryCode = "KM";
          break;
          case "Congo": 
          countryCode = "CG";
          break;
          case "Congo, the Democratic Republic of the": 
          countryCode = "CD";
          break;
          case "Cook Islands": 
          countryCode = "CK";
          break;
          case "Costa Rica": 
          countryCode = "CR";
          break;
          case "Côte d'Ivoire": 
          countryCode = "CI";
          break;
          case "Ivory Coast": 
          countryCode = "CI";
          break;
          case "Croatia": 
          countryCode = "HR";
          break;
          case "Cuba": 
          countryCode = "CU";
          break;
          case "Cyprus": 
          countryCode = "CY";
          break;
          case "Czech Republic": 
          countryCode = "CZ";
          break;
          case "Denmark": 
          countryCode = "DK";
          break;
          case "Djibouti": 
          countryCode = "DJ";
          break;
          case "Dominica": 
          countryCode = "DM";
          break;
          case "Dominican Republic": 
          countryCode = "DO";
          break;
          case "Ecuador": 
          countryCode = "EC";
          break;
          case "Egypt": 
          countryCode = "EG";
          break;
          case "El Salvador": 
          countryCode = "SV";
          break;
          case "Equatorial Guinea": 
          countryCode = "GQ";
          break;
          case "Eritrea": 
          countryCode = "ER";
          break;
          case "Estonia": 
          countryCode = "EE";
          break;
          case "Ethiopia": 
          countryCode = "ET";
          break;
          case "Falkland Islands (Malvinas)": 
          countryCode = "FK";
          break;
          case "Faroe Islands": 
          countryCode = "FO";
          break;
          case "Fiji": 
          countryCode = "FJ";
          break;
          case "Finland": 
          countryCode = "FI";
          break;
          case "France": 
          countryCode = "FR";
          break;
          case "French Guiana": 
          countryCode = "GF";
          break;
          case "French Polynesia": 
          countryCode = "PF";
          break;
          case "French Southern Territories": 
          countryCode = "TF";
          break;
          case "Gabon": 
          countryCode = "GA";
          break;
          case "Gambia": 
          countryCode = "GM";
          break;
          case "Georgia": 
          countryCode = "GE";
          break;
          case "Germany": 
          countryCode = "DE";
          break;
          case "Ghana": 
          countryCode = "GH";
          break;
          case "Gibraltar": 
          countryCode = "GI";
          break;
          case "Greece": 
          countryCode = "GR";
          break;
          case "Greenland": 
          countryCode = "GL";
          break;
          case "Grenada": 
          countryCode = "GD";
          break;
          case "Guadeloupe": 
          countryCode = "GP";
          break;
          case "Guam": 
          countryCode = "GU";
          break;
          case "Guatemala": 
          countryCode = "GT";
          break;
          case "Guernsey": 
          countryCode = "GG";
          break;
          case "Guinea": 
          countryCode = "GN";
          break;
          case "Guinea-Bissau": 
          countryCode = "GW";
          break;
          case "Guyana": 
          countryCode = "GY";
          break;
          case "Haiti": 
          countryCode = "HT";
          break;
          case "Heard Island and McDonald Islands": 
          countryCode = "HM";
          break;
          case "Holy See (Vatican City State)": 
          countryCode = "VA";
          break;
          case "Honduras": 
          countryCode = "HN";
          break;
          case "Hong Kong": 
          countryCode = "HK";
          break;
          case "Hungary": 
          countryCode = "HU";
          break;
          case "Iceland": 
          countryCode = "IS";
          break;
          case "India": 
          countryCode = "IN";
          break;
          case "Indonesia": 
          countryCode = "ID";
          break;
          case "Iran, Islamic Republic of": 
          countryCode = "IR";
          break;
          case "Iraq": 
          countryCode = "IQ";
          break;
          case "Ireland": 
          countryCode = "IE";
          break;
          case "Isle of Man": 
          countryCode = "IM";
          break;
          case "Israel": 
          countryCode = "IL";
          break;
          case "Italy": 
          countryCode = "IT";
          break;
          case "Jamaica": 
          countryCode = "JM";
          break;
          case "Japan": 
          countryCode = "JP";
          break;
          case "Jersey": 
          countryCode = "JE";
          break;
          case "Jordan": 
          countryCode = "JO";
          break;
          case "Kazakhstan": 
          countryCode = "KZ";
          break;
          case "Kenya": 
          countryCode = "KE";
          break;
          case "Kiribati": 
          countryCode = "KI";
          break;
          case "Korea, Democratic People's Republic of": 
          countryCode = "KP";
          break;
          case "Korea, Republic of": 
          countryCode = "KR";
          break;
          case "South Korea": 
          countryCode = "KR";
          break;
          case "Kuwait": 
          countryCode = "KW";
          break;
          case "Kyrgyzstan": 
          countryCode = "KG";
          break;
          case "Lao People's Democratic Republic": 
          countryCode = "LA";
          break;
          case "Latvia": 
          countryCode = "LV";
          break;
          case "Lebanon": 
          countryCode = "LB";
          break;
          case "Lesotho": 
          countryCode = "LS";
          break;
          case "Liberia": 
          countryCode = "LR";
          break;
          case "Libyan Arab Jamahiriya": 
          countryCode = "LY";
          break;
          case "Libya": 
          countryCode = "LY";
          break;
          case "Liechtenstein": 
          countryCode = "LI";
          break;
          case "Lithuania": 
          countryCode = "LT";
          break;
          case "Luxembourg": 
          countryCode = "LU";
          break;
          case "Macao": 
          countryCode = "MO";
          break;
          case "Macedonia, the former Yugoslav Republic of": 
          countryCode = "MK";
          break;
          case "Madagascar": 
          countryCode = "MG";
          break;
          case "Malawi": 
          countryCode = "MW";
          break;
          case "Malaysia": 
          countryCode = "MY";
          break;
          case "Maldives": 
          countryCode = "MV";
          break;
          case "Mali": 
          countryCode = "ML";
          break;
          case "Malta": 
          countryCode = "MT";
          break;
          case "Marshall Islands": 
          countryCode = "MH";
          break;
          case "Martinique": 
          countryCode = "MQ";
          break;
          case "Mauritania": 
          countryCode = "MR";
          break;
          case "Mauritius": 
          countryCode = "MU";
          break;
          case "Mayotte": 
          countryCode = "YT";
          break;
          case "Mexico": 
          countryCode = "MX";
          break;
          case "Micronesia, Federated States of": 
          countryCode = "FM";
          break;
          case "Moldova, Republic of": 
          countryCode = "MD";
          break;
          case "Monaco": 
          countryCode = "MC";
          break;
          case "Mongolia": 
          countryCode = "MN";
          break;
          case "Montenegro": 
          countryCode = "ME";
          break;
          case "Montserrat": 
          countryCode = "MS";
          break;
          case "Morocco": 
          countryCode = "MA";
          break;
          case "Mozambique": 
          countryCode = "MZ";
          break;
          case "Myanmar": 
          countryCode = "MM";
          break;
          case "Burma": 
          countryCode = "MM";
          break;
          case "Namibia": 
          countryCode = "NA";
          break;
          case "Nauru": 
          countryCode = "NR";
          break;
          case "Nepal": 
          countryCode = "NP";
          break;
          case "Netherlands": 
          countryCode = "NL";
          break;
          case "Netherlands Antilles": 
          countryCode = "AN";
          break;
          case "New Caledonia": 
          countryCode = "NC";
          break;
          case "New Zealand": 
          countryCode = "NZ";
          break;
          case "Nicaragua": 
          countryCode = "NI";
          break;
          case "Niger": 
          countryCode = "NE";
          break;
          case "Nigeria": 
          countryCode = "NG";
          break;
          case "Niue": 
          countryCode = "NU";
          break;
          case "Norfolk Island": 
          countryCode = "NF";
          break;
          case "Northern Mariana Islands": 
          countryCode = "MP";
          break;
          case "Norway": 
          countryCode = "NO";
          break;
          case "Oman": 
          countryCode = "OM";
          break;
          case "Pakistan": 
          countryCode = "PK";
          break;
          case "Palau": 
          countryCode = "PW";
          break;
          case "Palestinian Territory, Occupied": 
          countryCode = "PS";
          break;
          case "Panama": 
          countryCode = "PA";
          break;
          case "Papua New Guinea": 
          countryCode = "PG";
          break;
          case "Paraguay": 
          countryCode = "PY";
          break;
          case "Peru": 
          countryCode = "PE";
          break;
          case "Philippines": 
          countryCode = "PH";
          break;
          case "Pitcairn": 
          countryCode = "PN";
          break;
          case "Poland": 
          countryCode = "PL";
          break;
          case "Portugal": 
          countryCode = "PT";
          break;
          case "Puerto Rico": 
          countryCode = "PR";
          break;
          case "Qatar": 
          countryCode = "QA";
          break;
          case "Réunion": 
          countryCode = "RE";
          break;
          case "Romania": 
          countryCode = "RO";
          break;
          case "Russian Federation": 
          countryCode = "RU";
          break;
          case "Russia": 
          countryCode = "RU";
          break;
          case "Rwanda": 
          countryCode = "RW";
          break;
          case "Saint Helena, Ascension and Tristan da Cunha": 
          countryCode = "SH";
          break;
          case "Saint Kitts and Nevis": 
          countryCode = "KN";
          break;
          case "Saint Lucia": 
          countryCode = "LC";
          break;
          case "Saint Pierre and Miquelon": 
          countryCode = "PM";
          break;
          case "Saint Vincent and the Grenadines": 
          countryCode = "VC";
          break;
          case "Saint Vincent & the Grenadines": 
          countryCode = "VC";
          break;
          case "St. Vincent and the Grenadines": 
          countryCode = "VC";
          break;
          case "Samoa": 
          countryCode = "WS";
          break;
          case "San Marino": 
          countryCode = "SM";
          break;
          case "Sao Tome and Principe": 
          countryCode = "ST";
          break;
          case "Saudi Arabia": 
          countryCode = "SA";
          break;
          case "Senegal": 
          countryCode = "SN";
          break;
          case "Serbia": 
          countryCode = "RS";
          break;
          case "Seychelles": 
          countryCode = "SC";
          break;
          case "Sierra Leone": 
          countryCode = "SL";
          break;
          case "Singapore": 
          countryCode = "SG";
          break;
          case "Slovakia": 
          countryCode = "SK";
          break;
          case "Slovenia": 
          countryCode = "SI";
          break;
          case "Solomon Islands": 
          countryCode = "SB";
          break;
          case "Somalia": 
          countryCode = "SO";
          break;
          case "South Africa": 
          countryCode = "ZA";
          break;
          case "South Georgia and the South Sandwich Islands": 
          countryCode = "GS";
          break;
          case "Spain": 
          countryCode = "ES";
          break;
          case "Sri Lanka": 
          countryCode = "LK";
          break;
          case "Sudan": 
          countryCode = "SD";
          break;
          case "Suriname": 
          countryCode = "SR";
          break;
          case "Svalbard and Jan Mayen": 
          countryCode = "SJ";
          break;
          case "Swaziland": 
          countryCode = "SZ";
          break;
          case "Sweden": 
          countryCode = "SE";
          break;
          case "Switzerland": 
          countryCode = "CH";
          break;
          case "Syrian Arab Republic": 
          countryCode = "SY";
          break;
          case "Taiwan, Province of China": 
          countryCode = "TW";
          break;
          case "Taiwan": 
          countryCode = "TW";
          break;
          case "Tajikistan": 
          countryCode = "TJ";
          break;
          case "Tanzania, United Republic of": 
          countryCode = "TZ";
          break;
          case "Thailand": 
          countryCode = "TH";
          break;
          case "Timor-Leste": 
          countryCode = "TL";
          break;
          case "Togo": 
          countryCode = "TG";
          break;
          case "Tokelau": 
          countryCode = "TK";
          break;
          case "Tonga": 
          countryCode = "TO";
          break;
          case "Trinidad and Tobago": 
          countryCode = "TT";
          break;
          case "Trinidad & Tobago": 
          countryCode = "TT";
          break;
          case "Tunisia": 
          countryCode = "TN";
          break;
          case "Turkey": 
          countryCode = "TR";
          break;
          case "Turkmenistan": 
          countryCode = "TM";
          break;
          case "Turks and Caicos Islands": 
          countryCode = "TC";
          break;
          case "Tuvalu": 
          countryCode = "TV";
          break;
          case "Uganda": 
          countryCode = "UG";
          break;
          case "Ukraine": 
          countryCode = "UA";
          break;
          case "United Arab Emirates": 
          countryCode = "AE";
          break;
          case "United Kingdom": 
          countryCode = "GB";
          break;
          case "United States": 
          countryCode = "US";
          break;
          case "United States Minor Outlying Islands": 
          countryCode = "UM";
          break;
          case "Uruguay": 
          countryCode = "UY";
          break;
          case "Uzbekistan": 
          countryCode = "UZ";
          break;
          case "Vanuatu": 
          countryCode = "VU";
          break;
          case "Venezuela, Bolivarian Republic of": 
          countryCode = "VE";
          break;
          case "Venezuela": 
          countryCode = "VE";
          break;
          case "Viet Nam": 
          countryCode = "VN";
          break;
          case "Vietnam": 
          countryCode = "VN";
          break;
          case "Virgin Islands, British": 
          countryCode = "VG";
          break;
          case "Virgin Islands, U.S.": 
          countryCode = "VI";
          break;
          case "Wallis and Futuna": 
          countryCode = "WF";
          break;
          case "Western Sahara": 
          countryCode = "EH";
          break;
          case "Yemen": 
          countryCode = "YE";
          break;
          case "Zambia": 
          countryCode = "ZM";
          break;
          case "Zimbabwe": 
          countryCode = "ZW";
          break;
        }
        if (countryCode != "" && !isNaN(scoreNotTransform)) {
          let score = Math.sqrt(scoreNotTransform)
          console.log(countryCode)
          console.log(score)
          console.log(element)
          minScore = Math.min(score, minScore);
          maxScore = Math.max(score, maxScore);
          countryScoreMapNotNormal.set(countryCode, score);
        }
        if (countryCode != "") {
          countryAndNumCommitments.set(countryCode, numCommitments);
        }
      });
      var countryScoreMapNormal = new Map();
      console.log("lowest: " + minScore);
      console.log("highest: " + maxScore);
      for (var [countryCodeKey, scoreValue] of countryScoreMapNotNormal.entries()) {
        let normalScoreValue = (scoreValue - minScore) / (maxScore - minScore);
        countryScoreMapNormal.set(countryCodeKey, normalScoreValue)
      }
      console.log(JSON.stringify([...countryScoreMapNormal]));
      console.log(JSON.stringify([...countryAndNumCommitments]));
    });
  });
}
