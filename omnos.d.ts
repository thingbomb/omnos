declare const colorCodes: { [key: string]: string };
declare const colors: {
  [key in keyof typeof colorCodes]: (text: string) => string;
};
declare function merge<T>(...objects: T[]): T;
declare function delay(ms: number): Promise<void>;
declare function shuffle<T>(array: T[]): T[];
declare function capitalize(str: string): string;
declare function time<T>(fn: () => T): Promise<number>;

export { memo, colorCodes, colors, merge, delay, shuffle, capitalize, time };
