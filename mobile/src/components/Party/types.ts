export interface Candidate {
    photo: string;
    party: string;
    name: string;
    rank: number;
    age: string;
    isCurrent: boolean;
    experience: string;
}

export interface Position {
    party: string;
    name: string;
    position: string;
}
