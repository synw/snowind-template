#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path from 'path';
import { runServer, baseRoutes } from '@agent-smith/server';

const __filename = fileURLToPath(import.meta.url);
const dirpath = path.resolve(path.dirname(__filename), "../");

async function main() {
    //console.log(dirpath, process.env.NODE_ENV);
    let staticPath: string | undefined = undefined;
    if (process.env.NODE_ENV != "development") {
        staticPath = dirpath
    }
    // @ts-ignore
    runServer([...baseRoutes], staticPath, 5185);
}

(async () => {
    await main();
})();