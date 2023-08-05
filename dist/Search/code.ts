async function logic(payload: BasePayload) {

    const html = await sendRequest(`https://aniwatch.to/search?keyword=${encodeURIComponent(payload.query)}`, {});

    const document = (new DOMParser()).parseFromString(html, "text/html");

    const elements = document.querySelectorAll<HTMLElement>(
        ".film_list-wrap .film-detail > h3 > a"
    );
    const images = document.querySelectorAll(".film_list-wrap .film-poster > img");
    const subDub = document.querySelectorAll<HTMLElement>(
        ".film_list-wrap > div > .film-poster > div.tick.ltr"
    );
    const epCounts = document.querySelectorAll<HTMLElement>(
        ".film_list-wrap > div > .film-poster > .tick.ltr > div"
    );
    const titles: SearchData = [];

    for (let i = 0; i < elements.length; i++) {
        const hasSub = subDub[i].innerText.includes("SUB");
        const hasDub = subDub[i].innerText.includes("DUB");
        const counts = epCounts[i].innerText.replace("Ep ", "").split("/");
        titles.push({
            url: `https://aniwatch.to${elements[i].getAttribute("href")}`,
            img: images[i].getAttribute("data-src") ?? "",
            title: elements[i].innerText,
            indicatorText: `${hasSub ? "Sub" : ""}${hasSub && hasDub ? "|" : ""}${hasDub ? "Dub" : ""
                }`,
            currentCount: parseInt(counts[0]),
            totalCount: parseInt(counts[1]),
        });
    }

    sendResult({
        action: "search",
        result: titles
    });
}