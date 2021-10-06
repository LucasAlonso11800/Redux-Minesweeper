export type Score = {
    id: string;
    user : string;
    time: string;
    level: string;
};

export type Position = { x: number, y: number }

export type TileType = {
    x: number,
    y: number,
    mine: boolean,
    status: ETileStatus,
    text: string | undefined;
};

export type BoardType = TileType[][];

export enum ETileStatus {
    HIDDEN = 'hidden',
    MINE = 'mine',
    NUMBER = 'number',
    MARKED = 'marked'
};

export enum EGameStatus {
    WAITING,
    PLAYING,
    WON,
    LOST,
};