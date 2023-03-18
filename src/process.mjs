import { collect } from "@turf/turf";
import sites from "../data/sites.json" assert {type: "json"};
import neighborhoods from "../data/neighborhoods.json" assert {type: "json"};
import fs from "fs";

sites.features.forEach(function(feature) {
    feature.properties = {
        count: 1
    };
});

let output = collect(neighborhoods, sites, "count", "count");
output.features.forEach(function(feature, index) {
    feature.properties.count = feature.properties.count.length;
    feature.id = index;
});

output = JSON.stringify(output);
fs.writeFile("../data/output.json", output, function(error) {
    if (error) throw error;

    console.log("success. 👍");
});
