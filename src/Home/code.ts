function requestData(): string {
    const request: RequestObject = {
        url: "https://aniwatch.to/home",
        method: "GET",
        headers: [],
        body: null
    };

    const removeScripts = true;
    const allowExternalScripts = false;

    return JSON.stringify({
        request,
        removeScripts: removeScripts,
        allowExternalScripts: allowExternalScripts
    } as RequestData)
}

let reqId = 0;
let resolveFunctions: {[key: string]: Function} = {};

window.onmessage = function(event: MessageEvent){
    const data = JSON.parse(event.data);
    resolveFunctions[data.reqId](data.responseText);
}

function logic() {
    function sendRequest(url: string, headers: {[key: string]: string}){
        return new Promise((resolve, reject) => {
            const currentReqId = (++reqId).toString();
    
            resolveFunctions[currentReqId] = resolve;
    
            // @ts-ignore
            Native.sendHTTPRequest(JSON.stringify({
                reqId: currentReqId,
                action: "HTTPRequest",
                url,
                headers
            }));
        });
    
    }

    console.log(sendRequest);

    let top = document.querySelector(".deslide-wrap")!;
    let spotlights = top.querySelectorAll<HTMLElement>(".deslide-item");

    let spotlight_data: Array<HompageData> = []
    for (let i = 0; i < spotlights.length; i++) {
        let item = spotlights[i];

        spotlight_data.push(
            {
                url: `https://aniwatch.to${item.querySelector<HTMLElement>(".desi-buttons > .btn.btn-secondary.btn-radius")!.getAttribute("href")}`,
                titles: {
                    primary: item.querySelector<HTMLElement>(".desi-head-title.dynamic-name")?.innerText,
                    secondary: item.querySelector<HTMLElement>(".desi-head-title.dynamic-name")?.getAttribute("data-jname") ?? ""
                },
                image: item.querySelector<HTMLElement>(".film-poster-img")?.getAttribute("data-src") ?? "",
                subtitle: item.querySelector<HTMLElement>(".desi-description")?.innerText.trim(),
                subtitleValue: [],
                buttonText: "Watch Now",
                iconText: item.querySelector<HTMLElement>(".sc-detail > div:nth-child(1)")?.innerText.trim(),
                showIcon: false,
                indicator: "Spotlight"
            }
        )
    }

    let recents_wrapper = document.querySelector("#main-content > section:nth-child(2)")?.querySelector(".film_list-wrap");
    let recents = recents_wrapper!.querySelectorAll(".flw-item");

    let recents_data: Array<HompageData> = []
    for (let i = 0; i < recents?.length; i++) {
        let item = recents[i];

        recents_data.push(
            {
                url: `https://aniwatch.to${item.querySelector<HTMLElement>(".dynamic-name")!.getAttribute("href")}`,
                titles: {
                    primary: item.querySelector<HTMLElement>(".dynamic-name")?.innerText
                },
                image: item.querySelector<HTMLElement>(".film-poster-img")?.getAttribute("data-src") ?? "",
                subtitle: "",
                subtitleValue: [],
                showIcon: false,
                buttonText: "",
                indicator: item.querySelector<HTMLElement>(".tick-rate")?.innerText ?? "",
                current: item.querySelector<HTMLElement>(".tick-sub") != null ? parseInt(item.querySelector<HTMLElement>(".tick-sub")?.innerText ?? "") : null,
                total: item.querySelector<HTMLElement>(".tick-eps") != null ? parseInt(item.querySelector<HTMLElement>(".tick-eps")?.innerText ?? "") : null
            }
        )
    }
    let new_wrapper = document.querySelector("#main-content > section:nth-child(5)")?.querySelector(".film_list-wrap");
    let new_list = new_wrapper!.querySelectorAll(".flw-item");

    let new_data: Array<HompageData> = [];
    for (let i = 0; i < new_list?.length; i++) {
        let item = new_list[i];

        new_data.push(
            {
                url: `https://aniwatch.to${item.querySelector<HTMLElement>(".dynamic-name")?.getAttribute("href")}`,
                titles: {
                    primary: item.querySelector<HTMLElement>(".dynamic-name")?.innerText
                },
                image: item.querySelector<HTMLElement>(".film-poster-img")?.getAttribute("data-src") ?? "",
                subtitle: "",
                subtitleValue: [],
                showIcon: false,
                buttonText: "",
                indicator: item.querySelector<HTMLElement>(".tick-rate")?.innerText ?? "",
                current: item.querySelector(".tick-sub") != null ? parseInt(item.querySelector<HTMLElement>(".tick-sub")?.innerText ?? "") : null,
                total: item.querySelector(".tick-eps") != null ? parseInt(item.querySelector<HTMLElement>(".tick-eps")?.innerText ?? "") : null
            }
        )
    }
    // #main-content > section:nth-child(8)
    let upcoming_wrapper = document.querySelector("#main-content > section:nth-child(8)")?.querySelector(".film_list-wrap");
    let upcoming_list = upcoming_wrapper!.querySelectorAll(".flw-item");

    let upcoming_data: Array<HompageData> = [];
    for (let i = 0; i < upcoming_list?.length; i++) {
        let item = upcoming_list[i];

        upcoming_data.push(
            {
                url: `https://aniwatch.to${item.querySelector<HTMLElement>(".dynamic-name")?.getAttribute("href")}`,
                titles: {
                    primary: item.querySelector<HTMLElement>(".dynamic-name")?.innerText
                },
                image: item.querySelector<HTMLElement>(".film-poster-img")?.getAttribute("data-src") ?? "",
                subtitle: "",
                subtitleValue: [],
                showIcon: false,
                buttonText: "",
                indicator: item.querySelector<HTMLElement>(".tick-rate")?.innerText ?? "",
                current: item.querySelector(".tick-sub") != null ? parseInt(item.querySelector<HTMLElement>(".tick-sub")?.innerText ?? "") : null,
                total: item.querySelector(".tick-eps") != null ? parseInt(item.querySelector<HTMLElement>(".tick-eps")?.innerText ?? "") : null
            }
        )
    }

    let top_viewed_wrapper = document.querySelector("#top-viewed-day");
    let top_viewed_list = top_viewed_wrapper!.querySelectorAll("li");

    let top_viewed_data: Array<HompageData> = [];
    for (let i = 0; i < top_viewed_list?.length; i++) {
        let item = top_viewed_list[i];

        top_viewed_data.push(
            {
                url: `https://aniwatch.to${item.querySelector<HTMLElement>(".dynamic-name")?.getAttribute("href")}`,
                titles: {
                    primary: item.querySelector<HTMLElement>(".dynamic-name")?.innerText
                },
                image: item.querySelector<HTMLElement>(".film-poster-img")?.getAttribute("data-src") ?? "",
                subtitle: "",
                subtitleValue: [],
                showIcon: false,
                buttonText: "",
                indicator: item.querySelector<HTMLElement>(".fdi-item.ml-2")?.innerText + " Views",
                current: item.querySelector(".tick-sub") != null ? parseInt(item.querySelector<HTMLElement>(".tick-sub")?.innerText ?? "") : null,
                total: item.querySelector(".tick-eps") != null ? parseInt(item.querySelector<HTMLElement>(".tick-eps")?.innerText ?? "") : null
            }
        )
    }

    let choutenDiv = document.getElementById("chouten");
    let resultElement = document.createElement("p");
    resultElement.innerText = JSON.stringify({
        result: [
            {
                type: "Carousel",
                title: "Spotlight",
                data: spotlight_data
            },
            {
                type: "list",
                title: "Recently Released",
                data: recents_data
            },
            {
                type: "grid_2x",
                title: "Now on Zoro",
                data: new_data
            },
            {
                type: "list",
                title: "Top Upcoming",
                data: upcoming_data
            },
            {
                type: "grid_3x",
                title: "Most Viewed",
                data: top_viewed_data
            },
        ],
        nextUrl: null
    } as HomepageFinalData);

    choutenDiv!.appendChild(resultElement);
}
