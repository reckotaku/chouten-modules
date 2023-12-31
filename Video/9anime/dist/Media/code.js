"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const baseURL = "https://aniwave.to";
async function getVRF(query, action) {
    const nineAnimeURL = "9anime.eltik.net";
    const reqURL = `https://${nineAnimeURL}/${action}?query=${encodeURIComponent(query)}&apikey=${"enimax"}`;
    const source = await sendRequest(reqURL, {});
    try {
        const parsedJSON = JSON.parse(source);
        if (parsedJSON.url) {
            return parsedJSON.url;
        }
        else {
            throw new Error(`${action}-VRF1: Received an empty URL or the URL was not found.`);
        }
    }
    catch (err) {
        throw new Error(`${action}-VRF1: Could not parse the JSON correctly.`);
    }
}
async function getVidstreamLink(query, isViz = true) {
    var _a, _b;
    const nineAnimeURL = "9anime.eltik.net";
    const apiKey = "enimax";
    const reqURL = `https://${nineAnimeURL}/raw${isViz ? "Vizcloud" : "Mcloud"}?query=${encodeURIComponent(query)}&apikey=${apiKey}`;
    const futoken = await sendRequest("https://vidstream.pro/futoken", {});
    const rawSource = JSON.parse(await sendRequest(reqURL, {
        "Content-Type": "application/x-www-form-urlencoded",
    }, "POST", new URLSearchParams({
        query,
        futoken,
    }).toString())).rawURL;
    const source = await sendRequest(rawSource, {
        referer: isViz ? "https://vidstream.pro/" : "https://mcloud.to/",
        "x-requested-with": "XMLHttpRequest",
    });
    try {
        const parsedJSON = JSON.parse(source);
        const manifestUrl = (_b = (_a = parsedJSON === null || parsedJSON === void 0 ? void 0 : parsedJSON.result) === null || _a === void 0 ? void 0 : _a.sources[0]) === null || _b === void 0 ? void 0 : _b.file;
        if (manifestUrl) {
            return [
                {
                    file: manifestUrl,
                    quality: isViz ? "Vizcloud" : "Mcloud",
                    type: "hls",
                },
            ];
        }
        else {
            throw new Error("VIZCLOUD1: Received an empty URL or the URL was not found.");
        }
    }
    catch (err) {
        throw new Error("VIZCLOUD0: Could not parse the JSON correctly.");
    }
}
async function getFilemoonLink(filemoonHTML) {
    const nineAnimeURL = "9anime.eltik.net";
    const apiKey = "enimax";
    const reqURL = `https://${nineAnimeURL}/filemoon?apikey=${apiKey}`;
    const source = await sendRequest(reqURL, {
        "Content-Type": "application/x-www-form-urlencoded",
    }, "POST", new URLSearchParams({
        query: filemoonHTML,
    }).toString());
    try {
        const parsedJSON = JSON.parse(source);
        if (parsedJSON.url) {
            return parsedJSON.url;
        }
        else {
            throw new Error("FILEMOON1: Received an empty URL or the URL was not found.");
        }
    }
    catch (err) {
        throw new Error("FILEMOON0: Could not parse the JSON correctly.");
    }
}
async function decryptSource(query) {
    const nineAnimeURL = "9anime.eltik.net";
    const reqURL = `https://${nineAnimeURL}/decrypt?query=${encodeURIComponent(query)}&apikey=${"enimax"}`;
    const source = await sendRequest(reqURL, {});
    try {
        const parsedJSON = JSON.parse(source);
        if (parsedJSON.url) {
            return parsedJSON.url;
        }
        else {
            throw new Error("DECRYPT1: Received an empty URL or the URL was not found.");
        }
    }
    catch (err) {
        throw new Error("DECRYPT0: Could not parse the JSON correctly.");
    }
}
async function logic(payload) {
    var _a, _b, _c;
    const serverHTML = JSON.parse(await sendRequest(`${baseURL}/ajax/server/list/${payload.query}?vrf=${encodeURIComponent(await getVRF(payload.query, "vrf"))}`, {})).result;
    const serverDOM = new DOMParser().parseFromString(serverHTML, "text/html");
    const allServers = serverDOM.querySelectorAll("li");
    const servers = [];
    servers.push({
        title: "Video",
        list: [],
    });
    const supportedServers = ["vidstream", "mycloud", "filemoon"];
    for (let i = 0; i < allServers.length; i++) {
        const currentServer = allServers[i];
        let type = i.toString();
        try {
            const tempType = (_c = (_b = (_a = currentServer === null || currentServer === void 0 ? void 0 : currentServer.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling) === null || _b === void 0 ? void 0 : _b.innerText) === null || _c === void 0 ? void 0 : _c.trim();
            if (tempType) {
                type = tempType;
            }
        }
        catch (err) {
            console.warn(err);
        }
        const serverName = currentServer.innerText.toLowerCase();
        if (supportedServers.includes(serverName)) {
            servers[0].list.push({
                url: JSON.stringify([currentServer.getAttribute("data-link-id"), serverName]),
                name: `${serverName}-${type}`,
            });
        }
    }
    sendResult({
        result: servers,
        action: "server",
    });
}
async function addSource(query, index, extractor = "vidstream") {
    const serverVRF = await getVRF(query, "vrf");
    const serverData = JSON.parse(await sendRequest(`${baseURL}/ajax/server/${query}?vrf=${encodeURIComponent(serverVRF)}`, {})).result;
    const serverURL = serverData.url;
    const sourceDecrypted = await decryptSource(serverURL);
    let source = [];
    if (extractor == "vidstream") {
        const vidstreamID = sourceDecrypted.split("/").pop();
        source.push(...(await getVidstreamLink(vidstreamID, true)));
    }
    else if (extractor == "filemoon") {
        const filemoonHTML = await sendRequest(sourceDecrypted, {});
        const m3u8File = await self.getFilemoonLink(filemoonHTML);
        source = [
            {
                quality: "Filemoon#" + index,
                type: m3u8File.includes(".m3u8") ? "hls" : "mp4",
                file: m3u8File,
            },
        ];
    }
    else {
        const mCloudID = sourceDecrypted.split("/").pop();
        source.push(...(await self.getVidstreamLink(mCloudID, false)));
    }
    // if ("skip_data" in serverData) {
    //     serverData.skip_data = JSON.parse(await self.decryptSource(serverData.skip_data));
    //     source.skipIntro = {
    //         start: serverData.skip_data.intro[0],
    //         end: serverData.skip_data.intro[1]
    //     };
    // }
    return source;
}
async function getSource(payload) {
    const serverInfo = JSON.parse(payload.query);
    const serverID = serverInfo[0];
    const serverName = serverInfo[1];
    const sources = await addSource(serverID, "", serverName);
    const headers = {};
    if (serverName === "vidstream") {
        headers["referer"] = "https://vidstream.pro/";
    }
    else if (serverName === "mycloud") {
        headers["referer"] = "https://mcloud.to/";
    }
    console.log({
        sources: sources,
        subtitles: [],
        skips: [],
        headers,
    });
    sendResult({
        result: {
            sources: sources,
            subtitles: [],
            skips: [],
            headers,
        },
        action: "video",
    });
}
