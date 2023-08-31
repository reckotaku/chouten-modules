"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function logic(payload) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const data = JSON.parse(await sendRequest(`https://api.anify.tv/search?query=${encodeURIComponent(payload.query)}&type=anime&apikey=a29078ed5ace232f708c0f2851530a61`, {}));
    const titles = [];
    for (let i = 0; i < data.length; i++) {
        const hasSub = true;
        const hasDub = true;
        const currentCount = (_c = (_b = (_a = data[i].episodes) === null || _a === void 0 ? void 0 : _a.latest) === null || _b === void 0 ? void 0 : _b.latestEpisode) !== null && _c !== void 0 ? _c : 0;
        const totalCount = (_d = data[i].totalEpisodes) !== null && _d !== void 0 ? _d : 0;
        titles.push({
            url: `https://api.anify.tv/info/${data[i].id}?apikey=a29078ed5ace232f708c0f2851530a61`,
            img: (_e = data[i].coverImage) !== null && _e !== void 0 ? _e : "",
            title: (_h = (_g = (_f = data[i].title.english) !== null && _f !== void 0 ? _f : data[i].title.romaji) !== null && _g !== void 0 ? _g : data[i].title.native) !== null && _h !== void 0 ? _h : "No Title Found",
            indicatorText: `${hasSub ? "Sub" : ""}${hasSub && hasDub ? "|" : ""}${hasDub ? "Dub" : ""}`,
            currentCount,
            totalCount,
        });
    }
    sendResult({
        action: "search",
        result: titles,
    });
}
