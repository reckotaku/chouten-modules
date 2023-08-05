"use strict";
function requestData() {
    const removeScripts = true;
    const allowExternalScripts = false;
    return JSON.stringify({
        request: null,
        removeScripts: removeScripts,
        allowExternalScripts: allowExternalScripts
    });
}
function logic() {
    var _a;
    const titles = {
        primary: "tet",
        secondary: "",
    };
    const description = "d";
    const poster = "d";
    const status = "";
    let totalMediaCount = "0";
    let seasons = [{
            name: "e",
            url: "rr"
        }];
    let choutenDiv = document.getElementById("chouten");
    let resultElement = document.createElement("p");
    let nextUrl = "https://aniwatch.to/ajax/v2/episode/list/" +
        ((_a = document.getElementById("wrapper")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-id"));
    resultElement.innerText = JSON.stringify({
        result: {
            id: "",
            titles: titles,
            altTitles: [],
            description: description,
            poster: poster,
            status: status,
            totalMediaCount: parseInt(totalMediaCount),
            mediaType: "Episodes",
            seasons: seasons,
            mediaList: [],
        },
        nextUrl: null,
    });
    choutenDiv.appendChild(resultElement);
}
