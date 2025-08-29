export interface IResults {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    published_at: string;
    site: "YouTube";
    size: number;
    type: "Trailer" | "Featurette" | "Clip" | "Teaser";
    official: boolean;
    id: string;
}

export interface IVideo {
    id: number;
    results: IResults[];
}
