/**
 * Created by zc on 2017/6/21.
 */
var Terraformer = {};
Terraformer.ArcGIS = require('terraformer-arcgis-parser');
var fs = require("fs");

var filePath = __dirname + "\\dataJsonFromArcgis\\4.json";
var fsEsriJson = fs.readFileSync(filePath);
var esriJson = JSON.parse(fsEsriJson);

// parse an ArcGIS Geometry to GeoJSON
var geometry = esriJson.features[0].geometry;
var geojsonPoint = Terraformer.ArcGIS.parse(geometry);


console.log(JSON.stringify(geojsonPoint));

// parse an ArcGIS Geometry to GeoJSON
var geojsonPoint = Terraformer.ArcGIS.parse({
    "x": -122.6764,
    "y": 45.5165,
    "spatialReference": {
        "wkid": 4326
    }
});


// convert a GeoJSON object into an ArcGIS geometry
var arcgisPoint = Terraformer.ArcGIS.convert({
    "type": "Point",
    "coordinates": [45.5165, -122.6764]
});

