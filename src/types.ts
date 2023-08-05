// =====================
//      Homepage
// =====================

type HompageData = {
    url: string;
    titles: {
        primary: any;
        secondary?: string | null;
    };
    image: string | null;
    subtitle: any;
    subtitleValue: never[];
    buttonText: string;
    iconText?: string;
    showIcon: boolean;
    indicator: string;
    current?: number | null;
    total?: number | null;
};

type HomepageFinalData = {
    result: {
        type: "Carousel" | "list" | "grid_<number>x" | string,
        title: string,
        data: HompageData[]
    }[],
    nextUrl: null | string;
}

interface RequestObject {
    url: string,
    method: "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "PATCH",
    headers: { [key: string]: any }[],
    body: string | null
}

interface RequestData {
    request: RequestObject | null,
    removeScripts?: boolean,
    allowExternalScripts?: boolean,
    usesApi?: boolean,
    separator: string,
}

// =====================
//        Info
// =====================

interface InfoData {
    result: {
        id: string;
        titles: {
            primary: string;
            secondary: string | undefined;
        };
        altTitles: string[];
        description: string | undefined;
        poster: string | null | undefined;
        status: string | undefined;
        totalMediaCount: number;
        mediaType: string;
        seasons: {
            name: string;
            url: string;
        }[];
        mediaList: any[];
    }
}

interface InfoEpisodeList {
    list: {
        url: string;
        title: string;
        number: number;
    }[],
    title: string,
}

// =====================
//         Media
// =====================

interface MediaData {
    result: {
        title: string;
        list: {
            url: string;
            name: string;
        }[];
    }[],
    nextUrl: string | null
}

interface MediaQuality {
    quality: string,
    file: string,
    type: string
}

interface MediaVideo {
    result: {
        skips: {
            start: number;
            end: number;
            type: string;
        }[];
        sources: MediaQuality[];
        subtitles: {
            url: string,
            language: string,
        }[]
    }
}

// =====================
//         Search
// =====================

type SearchData = {
    url: string;
    img: string;
    title: string;
    indicatorText: string;
    currentCount: number;
    totalCount: number;
}[];