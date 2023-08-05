"use strict";
function requestData() {
    const removeScripts = false;
    const allowExternalScripts = true;
    const usesApi = true;
    return JSON.stringify({
        request: null,
        removeScripts: removeScripts,
        allowExternalScripts: allowExternalScripts,
        usesApi: usesApi
    });
}
function logic() {
    const myElement = document.getElementById("json-result");
    const myJsonString = myElement.getAttribute("data-json");
    const myJsonObject = JSON.parse(myJsonString.replaceAll("'", '"'));
    const embedId = myJsonObject["link"]
        .replace("https://megacloud.tv/embed-2/e-1/", "")
        .split("?")[0];
    const url = `https://megacloud.tv/embed-2/ajax/e-1/getSources?id=${embedId}`;
    const choutenDiv = document.getElementById("chouten");
    const resultElement = document.createElement("p");
    resultElement.innerText = JSON.stringify({
        result: [],
        nextUrl: url
    });
    choutenDiv.appendChild(resultElement);
}
