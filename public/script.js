// this is the config object used to connect to an app on a Qlik Sense server
var config = {
  host: "playground-sense.qlik.com",
  prefix: "/showcase/",
  port: "443",
  isSecure: true,
  rejectUnauthorized: false,
  appname: "0b0fc6d5-05ce-44d7-95aa-80d0680b3559"
};

var mainMap = {
  countries: [],
  commitmentBySDG: []
};

var otherMap = [];

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
  require(["js/qlik"], function(qlik) {
    // We're now connected

    // Suppress Qlik error dialogs and handle errors how you like.
    qlik.setOnError(function(error) {
      console.log("ERROR", error);
    });

    // Open a dataset on the server
    app = qlik.openApp(config.appname, config);
    console.log("App Opened", app);

    console.log(app);
    app.getList("FieldList", function(reply) {
      var str = "";
      $.each(reply.qFieldList.qItems, function(key, value) {
        str += value.qName + " ";
      });
      //alert(str);
    });

    var CommitmentCountByCountry = {
      qDimensions: [
        {
          qDef: {
            qFieldDefs: ["Country"]
          }
        }
      ],
      qMeasures: [
        {
          qDef: { qDef: "=Count(Country)" },
          qSortBy: { qSortByNumeric: -1 }
        }
      ],
      qInterColumnSortOrder: [2, 0, 1],
      qInitialDataFetch: [
        {
          qTop: 0,
          qLeft: 0,
          qHeight: 2222, //rows
          qWidth: 3
        }
      ]
    };

    app.createCube(CommitmentCountByCountry, hypercube => {
      let matrix = hypercube.qHyperCube.qDataPages[0].qMatrix;
      matrix.forEach((row, index) => {
        mainMap.countries[row[0].qText] = { count: row[1].qText };
      });
    });

    var anotherOne = {
      qDimensions: [
        {
          qDef: {
            qFieldDefs: ["Commitment Title"]
          }
        }
      ],

      qInterColumnSortOrder: [2, 0, 1],
      qInitialDataFetch: [
        {
          qTop: 0,
          qLeft: 0,
          qHeight: 2222, //rows
          qWidth: 3
        }
      ]
    };

    app.createCube(anotherOne, hypercube => {
      let matrix = hypercube.qHyperCube.qDataPages[0].qMatrix;
      matrix.forEach((row, index) => {
        otherMap.push(row[0].qText);
        //console.log(row[0].qText);
      });
    });

    var commitmentBySDG = {
      qDimensions: [
        {
          qDef: {
            qFieldDefs: ["SDG Target"]
          }
        }
      ],
      qMeasures: [
        {
          qDef: { qDef: "=Count(Distinct[Commitment Title])" }
        }
      ],
      qInterColumnSortOrder: [2, 0, 1],
      qInitialDataFetch: [
        {
          qTop: 0,
          qLeft: 0,
          qHeight: 3333, //rows
          qWidth: 3
        }
      ]
    };

    app.createCube(commitmentBySDG, hypercube => {
      // console.log("hyperCube", hypercube);

      let matrix = hypercube.qHyperCube.qDataPages[0].qMatrix;
      console.log("hyperCube", matrix);

      matrix.forEach((row, index) => {
        if (row[0].qText.startsWith("14")) {
          mainMap.commitmentBySDG[row[0].qText] = { count: row[1].qText };
        }
      });
      console.log(mainMap);
    });
  });
}
