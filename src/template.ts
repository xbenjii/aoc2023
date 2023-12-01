const moduleTemplate = () => {
    return `
function preprocess(input: string) {
    return input.split(/\n/).filter(Boolean);
}

export async function run(input: string) {
    const data = preprocess(input);
    console.log(data);
}
    `;
}

export { moduleTemplate };