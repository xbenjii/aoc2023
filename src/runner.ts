import { join } from 'path';
import { stat, writeFile, readFile } from 'fs/promises';
import { moduleTemplate } from './template';
const { dir } = import.meta;

const SESSION_CODE = process.env.SESSION_CODE || false;

const ADVENT_URL = 'https://adventofcode.com/2023/day/{day}/input';

if(!SESSION_CODE) {
    console.log(`Couldn't find AOC_SESSION_CODE env, you can retrieve this from your session=<code> cookie on adventofcode.com after logging in.`);
    process.exit(0);
}

const currentDay = (new Date()).getDate();
const days = Array.from({ length: currentDay }, (_, i) => i + 1);

async function saveInput(day: number, path: string): Promise<any> {
    const response: Response = await fetch(ADVENT_URL.replace('{day}', day.toString()), {
        headers: {
            Cookie: `session=${SESSION_CODE}`
        }
    });
    const input: string = await response.text();
    await writeFile(path, input);
}

async function main(): Promise<any> {
    for(const day of days) {
        const inputFile = join(dir, `../inputs/${day}.txt`);
        try {
            await stat(inputFile);
        } catch(e) {
            await saveInput(day, inputFile);
        }

        let runner: any;
        try {
            runner = await import(`./days/${day}.ts`);
        } catch(err: any) {
            const template = moduleTemplate();
            await writeFile(join(dir, `./days/${day}.ts`), template);
            runner = await import(`./days/${day}.ts`);
        }

        let input: string = '';
        try {
            input = await readFile(inputFile, 'utf-8');
            console.log(`Day ${day}`);
        } catch(e) {

        }

        try {
            await runner.run(input);
        } catch(e) {
            console.error(e);
        }
    }
}

main().catch(console.error);