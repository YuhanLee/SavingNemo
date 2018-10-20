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
        // {
        //   qDef: { qDef: "=Count(Distinct [Partners])" },
        //   qSortBy: { qSortByNumeric: -1 }
        // }
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
      console.log(matrix);
      // console.log(hypercube.qHyperCube.qDataPages[0]);

      // you can then treat the matrix as an array
      matrix.forEach((row, index) => {
        // the value for each column can be obtained by referencing array indexes
        // you can use qText for text values and qNum for numerical
        mainMap.countries[row[0].qText] = { count: row[1].qText };

        // console.log("Country:", row[0].qText + row[1].qText);
      });
      // console.log(mainMap);
    });
  });
}
