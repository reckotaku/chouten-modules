function requestData() {
    var removeScripts = false;
    var allowExternalScripts = true;
    var usesApi = true;
    var imports = [
        "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
    ];

    return JSON.stringify({
        request: null,
        removeScripts: removeScripts,
        allowExternalScripts: allowExternalScripts,
        usesApi: usesApi,
        imports: imports
    })
}

function logic() {
    function getFile(url: string) {
        var request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);
        if (request.status === 200) {
            return request.responseText;
        } else {
            return null;
        }
    }

    function extractAndConcatenateString(originalString: string, stops: [number, number][]) {
        let decryptedKey = '';
        let offset = 0;
        let encryptedString = originalString

        for (const i in stops) {
            const start = stops[i][0];
            const end = stops[i][1];

            decryptedKey += encryptedString.slice(
                start - offset,
                end - offset
            )

            encryptedString = encryptedString.slice(0, start - offset) + encryptedString.slice(end - offset);
            offset += end - start;
        }

        return {
            dec_key: decryptedKey,
            enc_string: encryptedString
        }
    }


    const myElement = document.getElementById("json-result")!;
    const myJsonString = myElement.getAttribute("data-json")!;
    const myJsonObject = JSON.parse(myJsonString.replaceAll("'", '"'));
    if (myJsonObject["encrypted"] == true) {
        let base64 = myJsonObject["sources"];
        let enc_key = getFile(
            "https://raw.githubusercontent.com/enimax-anime/key/e6/key.txt"
        )!;
        let keyArray = [];

        try {
            keyArray = JSON.parse(enc_key);
        } catch (err) {

        }

        let key = extractAndConcatenateString(base64, keyArray);

        // @ts-ignore
        const decryptedSources = CryptoJS.AES.decrypt(key.enc_string, key.dec_key).toString(
            // @ts-ignore
            CryptoJS.enc.Utf8
        );

        const manifestUrl = JSON.parse(decryptedSources)[0].file;
        const resResult = getFile(manifestUrl)!;

        let qualities: Array<MediaQuality> = []
        const resolutions = resResult.split("\\n\\n")[0].match(/(RESOLUTION=)(.*)(\s*?)(\s*.*)/g);
        resolutions?.forEach((res) => {
            const index = manifestUrl.lastIndexOf('/');
            const quality = res.split('\n')[0].split('x')[1].split(',')[0];
            const url = manifestUrl.slice(0, index);
            qualities.push({
                file: url + '/' + res.split('\n')[1].replace("/", ""),
                type: "hls",
                quality: quality + 'p',
            });
        });

        qualities.push({ quality: "auto", file: manifestUrl, type: "hls" });

        const uniqueAuthors = qualities.reduce((accumulator, current) => {
            if (!accumulator.find((item) => item.quality === current.quality)) {
                accumulator.push(current);
            }
            return accumulator;
        }, [] as MediaQuality[]);

        qualities = uniqueAuthors.map(item => item);

        const choutenDiv = document.getElementById("chouten");
        const resultElement = document.createElement("p");
        
        resultElement.innerText = JSON.stringify({
            result: {
                skips:
                    myJsonObject["intro"] != null
                        ? [
                            {
                                start: myJsonObject["intro"]["start"],
                                end: myJsonObject["intro"]["end"],
                                type: "Opening",
                            },
                            {
                                start: myJsonObject["outro"]["start"],
                                end: myJsonObject["outro"]["end"],
                                type: "Ending",
                            },
                        ]
                        : [],
                sources: qualities,
                subtitles: myJsonObject["tracks"]
                    .map((element: any) => {
                        if (element["kind"] == "captions") {
                            return {
                                url: element["file"],
                                language: element["label"],
                            };
                        }
                    })
                    .filter((elements: any) => {
                        return (
                            elements != null &&
                            elements !== undefined &&
                            elements !== ""
                        );
                    }),
            },
            nextUrl: null,
        });
        
        choutenDiv!.appendChild(resultElement);
    } else {
        const manifestUrl = myJsonObject["sources"][0].file;
        const resResult = getFile(manifestUrl)!;

        let qualities = []
        const resolutions = resResult.split("\\n\\n")[0].match(/(RESOLUTION=)(.*)(\s*?)(\s*.*)/g);
        resolutions?.forEach((res) => {
            const index = manifestUrl.lastIndexOf('/');
            const quality = res.split('\n')[0].split('x')[1].split(',')[0];
            const url = manifestUrl.slice(0, index);
            qualities.push({
                file: url + '/' + res.split('\n')[1].replace("/", ""),
                type: "hls",
                quality: quality + 'p',
            });
        });

        qualities.push({ quality: "auto", file: manifestUrl, type: "hls" })

        const uniqueAuthors = qualities.reduce((accumulator, current) => {
            if (!accumulator.find((item) => item.quality === current.quality)) {
                accumulator.push(current);
            }
            return accumulator;
        }, [] as MediaQuality[]);

        qualities = uniqueAuthors.map(item => item)
        let choutenDiv = document.getElementById("chouten");
        let resultElement = document.createElement("p");
        resultElement.innerText = JSON.stringify({
            result: {
                skips:
                    myJsonObject["intro"] != null
                        ? [
                            {
                                start: myJsonObject["intro"]["start"],
                                end: myJsonObject["intro"]["end"],
                                type: "Opening",
                            },
                            {
                                start: myJsonObject["outro"]["start"],
                                end: myJsonObject["outro"]["end"],
                                type: "Ending",
                            },
                        ]
                        : [],
                sources: qualities,
                subtitles: myJsonObject["tracks"]
                    .map((element: any) => {
                        if (element["kind"] == "captions") {
                            return {
                                url: element["file"],
                                language: element["label"],
                            };
                        }
                    })
                    .filter((elements: any) => {
                        return (
                            !!elements
                        );
                    }),
            },
            nextUrl: null,
        });

        choutenDiv!.appendChild(resultElement);
    }
}
