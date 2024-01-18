export type Episode = {
    name: string,
    air_date: string,
    episode: string,
    characters: string[],
    url: string
}

export type Character = {
    name: string,
    status: Status,
    species: string,
    gender: string,
    image: string,
    location: Locations,
    origin: Origin,
    episode: string[],
}

export type Origin = {
    name: string,
    url: string,
}
export type Locations = {
    name: string,
    type: string,
    dimension: string,
    url: string,
    residents: string[],
}

export enum Status {
    Alive = "ALIVE",
    Dead = "DEAD",
    Unknown = "UNKNOWN"
}