"use strict";

function requestData(): string {
    const removeScripts = true;
    const allowExternalScripts = false;

    return JSON.stringify({
        request: null,
        removeScripts: removeScripts,
        allowExternalScripts: allowExternalScripts
    } as RequestData);
}


function logic() {
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
        document.getElementById("wrapper")?.getAttribute("data-id");

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
    } as InfoData);

    choutenDiv!.appendChild(resultElement);
}
