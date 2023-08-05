function requestData(): string {
    const removeScripts = true;
    const allowExternalScripts = false;
    const usesApi = true;

    return JSON.stringify({
        request: null,
        removeScripts: removeScripts,
        allowExternalScripts: allowExternalScripts,
        usesApi: usesApi
    } as RequestData);
}

function logic() {
    const myElement = document.getElementById("json-result")!;
    const myJsonString = myElement.getAttribute("data-json")!;
    const myJsonObject = JSON.parse(myJsonString.replaceAll("'", '"'));
    const modified = document.createElement("div");

    modified.innerHTML = myJsonObject["html"];
    document.body.appendChild(modified);

    const subServers = document.querySelector(
        ".ps_-block.ps_-block-sub.servers-sub"
    )!;

    const dubServers = document.querySelector(
        ".ps_-block.ps_-block-sub.servers-dub"
    );

    let elements = subServers.querySelectorAll<HTMLElement>(".server-item");
    const servers = [];
    const subServersList = [];
    const dubServersList = [];

    for (let i = 0; i < elements.length; i++) {
        console.log(elements[i].innerText);
        subServersList.push({
            url:
                "https://aniwatch.to/ajax/v2/episode/sources?id=" +
                elements[i].getAttribute("data-id"),
            name: elements[i].innerText + " (Sub)",
        });
    }

    if (dubServers != null) {
        elements = dubServers.querySelectorAll(".server-item");
        for (let i = 0; i < elements.length; i++) {
            console.log(elements[i].innerText);
            dubServersList.push({
                url:
                    "https://aniwatch.to/ajax/v2/episode/sources?id=" +
                    elements[i].getAttribute("data-id"),
                name: elements[i].innerText + " (Dub)",
            });
        }
    }
    servers.push(
        {
            title: "Sub",
            list: subServersList
        },
        {
            title: "Dub",
            list: dubServersList
        },
    )

    const choutenDiv = document.getElementById("chouten");
    const resultElement = document.createElement("p");

    resultElement.innerText = JSON.stringify({
        result: servers,
        nextUrl: servers[0].list[0].url,
    } as MediaData);

    choutenDiv!.appendChild(resultElement);
}
