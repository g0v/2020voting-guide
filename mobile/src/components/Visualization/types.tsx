export interface d3method {
    updateDataBubbles: Function;
}

export interface d3props {
    width: number,
    height: number,
    data: Object
}

export interface d3data {
    name: string,
    constituency: string,
    proposal: number | undefined,
    interpellation: number | undefined
}