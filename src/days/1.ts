const NUMBER_MAP = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
};
const NUMBER_RE = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;

function preprocess(input: string) {
    return input.split(/\n/).filter(Boolean);
}

function calculateFirstAndLastNumbers(input: string[]) {
    const numbers = input.map((i) => {
        const n =  i.replace(/[^0-9]/g, '').split('');
        return parseInt(`${n[0]}${n[n.length - 1]}`);
    }).reduce((a, b) => a + b, 0);
    return numbers;
}

function replaceWordsWithNumbers(input: string[]) {
    return input.map((i) => {
        const matches = [...i.matchAll(NUMBER_RE)];
        return matches.length ? matches.map(d => NUMBER_MAP[d[1] as keyof typeof NUMBER_MAP] || d[1]).join('') : i;
    });
}

export async function run(input: string) {
    const data = preprocess(input);
    console.log(calculateFirstAndLastNumbers(data));
    const replaced = replaceWordsWithNumbers(data);
    console.log(calculateFirstAndLastNumbers(replaced));
}
    