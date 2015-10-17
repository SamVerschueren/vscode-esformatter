// Type definitions for esformatter v0.7.3
// Project: https://github.com/millermedeiros/esformatter
// Definitions by: Sam Verschueren <https://github.com/SamVerschueren>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module "esformatter" {
    export function format(codeStr: string, options?: any): string;
    export function transform(ast: any, options?: any): any;
    export function rc(filePath?: string, options?: any): Object;
    export function register(plugin: Object): void;
    export function unregister(plugin: Object): void;
    export function unregisterAll(): void;
}