function requestData(): string {
    const request = {
        url: "https://flixhq.to/search/<query>",
        method: "GET",
        headers: [],
        body: null
    };
    const removeScripts = true;
    const allowExternalScripts = false;
    const separator = "-";

    return JSON.stringify({
        request,
        removeScripts,
        allowExternalScripts,
        separator
    } as RequestData);
}

function logic() {
    const elements = document.querySelectorAll<HTMLElement>(
        "#main-wrapper > div > section > div.block_area-content.block_area-list.film_list.film_list-grid > div.film_list-wrap > div.flw-item"
    )!;

    const titles: SearchData = [];

    elements.forEach((element) => {
        const format = String(
            element!.querySelector<HTMLElement>("div.film-detail > div.fd-infor > span.fdi-type")?.innerText
        ).toLowerCase();

        const qualityDiv = element.querySelector<HTMLElement>(
            "div.film-poster > div:nth-child(1)"
        );

        console.log(`https://flixhq.to${element.querySelector("div.film-poster > a")!.getAttribute("href")}`);
        titles.push({
            url: `https://flixhq.to${element.querySelector("div.film-poster > a")!.getAttribute("href")}` ?? "",
            img: element
                .querySelector("div.film-poster > img")!.getAttribute("data-src") ?? "",
            title: element.querySelector<HTMLElement>("div.film-detail > h2.film-name")?.innerText ?? "",
            indicatorText: qualityDiv?.innerText ?? "",
            currentCount:
                format === "movie"
                    ? Number(
                        element.querySelector<HTMLElement>(
                            "div.film-detail > div.fd-infor > span.fdi-item:nth-child(1)"
                        )?.innerText
                    )
                    : 0,
            totalCount:
                format === "movie"
                    ? Number(
                        String(
                            element.querySelector<HTMLElement>(
                                "div.film-detail > div.fd-infor > span.fdi-duration"
                            )?.innerText
                        ).replace("m", "")
                    )
                    : 0,
        });
    });


    const choutenDiv = document.getElementById("chouten");
    const resultElement = document.createElement("p");

    resultElement.innerText = JSON.stringify(titles);
    choutenDiv!.appendChild(resultElement);
}