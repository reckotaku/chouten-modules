"use strict";
function requestData() {
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
    });
}
function logic() {
    const elements = document.querySelectorAll("#main-wrapper > div > section > div.block_area-content.block_area-list.film_list.film_list-grid > div.film_list-wrap > div.flw-item");
    const titles = [];
    elements.forEach((element) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const format = String((_a = element.querySelector("div.film-detail > div.fd-infor > span.fdi-type")) === null || _a === void 0 ? void 0 : _a.innerText).toLowerCase();
        const qualityDiv = element.querySelector("div.film-poster > div:nth-child(1)");
        console.log(`https://flixhq.to${element.querySelector("div.film-poster > a").getAttribute("href")}`);
        titles.push({
            url: (_b = `https://flixhq.to${element.querySelector("div.film-poster > a").getAttribute("href")}`) !== null && _b !== void 0 ? _b : "",
            img: (_c = element
                .querySelector("div.film-poster > img").getAttribute("data-src")) !== null && _c !== void 0 ? _c : "",
            title: (_e = (_d = element.querySelector("div.film-detail > h2.film-name")) === null || _d === void 0 ? void 0 : _d.innerText) !== null && _e !== void 0 ? _e : "",
            indicatorText: (_f = qualityDiv === null || qualityDiv === void 0 ? void 0 : qualityDiv.innerText) !== null && _f !== void 0 ? _f : "",
            currentCount: format === "movie"
                ? Number((_g = element.querySelector("div.film-detail > div.fd-infor > span.fdi-item:nth-child(1)")) === null || _g === void 0 ? void 0 : _g.innerText)
                : 0,
            totalCount: format === "movie"
                ? Number(String((_h = element.querySelector("div.film-detail > div.fd-infor > span.fdi-duration")) === null || _h === void 0 ? void 0 : _h.innerText).replace("m", ""))
                : 0,
        });
    });
    const choutenDiv = document.getElementById("chouten");
    const resultElement = document.createElement("p");
    resultElement.innerText = JSON.stringify(titles);
    choutenDiv.appendChild(resultElement);
}
