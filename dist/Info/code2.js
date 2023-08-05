"use strict";
function requestData() {
    var removeScripts = false;
    var allowExternalScripts = true;
    var usesApi = true;
    return JSON.stringify({
        request: null,
        removeScripts: removeScripts,
        allowExternalScripts: allowExternalScripts,
        usesApi: usesApi
    });
}
function logic() {
    const resultElement = document.createElement("p");
    const choutenDiv = document.getElementById("chouten");
    resultElement.innerText = JSON.stringify({
        title: "Season 1",
        list: []
    });
    choutenDiv.appendChild(resultElement);
}
