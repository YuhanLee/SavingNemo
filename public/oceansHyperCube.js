// var oceansObject;
// (function oceans(){
//     var oceansHyperCubeDef = {
//         qDimensions: [
//             {
//                 qDef: {
//                     qFieldDefs: ["Ocean Basins"]
//                 }
//             }
//         ],
//         qMeasures: [
//             {
//                 qDef: { qDef: "=Count(Country)" },
//                 qSortBy: { qSortByNumeric: -1 }
//             }
//         ],
//         qInterColumnSortOrder: [2, 0, 1],
//         qInitialDataFetch: [
//             {
//                 qTop: 0,
//                 qLeft: 0,
//                 qHeight: 2222, //rows
//                 qWidth: 3
//             }
//         ]
//     };
//
//     app.createCube(oceansHyperCubeDef, hypercube => {
//         // after creating a cube you define a callback function to handle it
//         // this function will be called each time the data changes (ie. when
//         // someone makes a selection).
//         // console.log(hypercube);
//
//         // the basic matrix of data is available in the hypercube datapages
//         let matrix = hypercube.qHyperCube.qDataPages[0].qMatrix;
//         // console.log(matrix);
//         //console.log(hypercube.qHyperCube.qDataPages[0]);
//
//         // you can then treat the matrix as an array
//         matrix.forEach((row, index) => {
//             // the value for each column can be obtained by referencing array indexes
//             // you can use qText for text values and qNum for numerical
//             oceansObject[row[0].qText] ;
//
//         });
//         console.log(oceansObject);
//     });
// }).bind(main)();
//
