function requestData(): string {
    var removeScripts = false;
    var allowExternalScripts = true;
    var usesApi = true;

    return JSON.stringify({
        request: null,
        removeScripts: removeScripts,
        allowExternalScripts: allowExternalScripts,
        usesApi: usesApi
    } as RequestData);
}

function logic() {
const resultElement = document.createElement("p");
    const choutenDiv = document.getElementById("chouten");
    resultElement.innerText = JSON.stringify({ 
        title: "Season 1", 
        list: [] 
    } as InfoEpisodeList);

    choutenDiv!.appendChild(resultElement);
}
