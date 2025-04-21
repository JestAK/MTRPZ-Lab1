import readline from 'node:readline';
import fs from 'node:fs';

const printEquation = (a, b, c) => {
    console.log(`Equation is: (${a}) x^2 + (${b}) x + (${c}) = 0`);
}

const printRoots = (roots) => {
    if (roots.length === 2) {
        console.log(`There are 2 roots\nx1 = ${roots[0]}\nx2 = ${roots[1]}`);
    } else if (roots.length === 1) {
        console.log(`There is 1 root\nx1 = ${roots[0]}`);
    } else {
        console.log("There are 0 roots");
    }
}

const calculateDiscriminant = (a, b, c) => {
    return b * b - 4 * a * c;
}

const calculateRoots = (a, b, c) => {
    const discriminant = calculateDiscriminant(a, b, c);
    if (discriminant > 0) {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        printRoots([root1, root2]);
    } else if (discriminant === 0) {
        const root = -b / (2 * a);
        printRoots([root]);
    } else {
        printRoots([]);
    }
}

const parseNumber = (str) => {
    const num = Number(str);
    return isNaN(num) ? null : num;
}

const interactiveMode = async () => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const question = (prompt) => new Promise(res => rl.question(prompt, res));
    let a, b, c;

    while (true) {
        const answer = await question('a = ');
        const n = parseNumber(answer.trim());
        if (n === null) {
            console.log(`Error. Expected a valid real number, got ${answer.trim()} instead`);
        } else if (n === 0) {
            console.log('Error. a cannot be 0');
        } else {
            a = n;
            break;
        }
    }

    while (true) {
        const answer = await question('b = ');
        const n = parseNumber(answer.trim());
        if (n === null) {
            console.log(`Error. Expected a valid real number, got ${answer.trim()} instead`);
        } else {
            b = n;
            break;
        }
    }

    while (true) {
        const answer = await question('c = ');
        const n = parseNumber(answer.trim());
        if (n === null) {
            console.log(`Error. Expected a valid real number, got ${answer.trim()} instead`);
        } else {
            c = n;
            break;
        }
    }

    rl.close();
    printEquation(a, b, c);
    calculateRoots(a, b, c);
}

const nonInteractiveMode = (path) => {
    if (!fs.existsSync(path)) {
        console.log(`file ${path} does not exist`);
        process.exit(1);
    }
    const content = fs.readFileSync(path, 'utf-8').trim();
    const parts = content.split(" ");
    if (parts.length !== 3) {
        console.log('invalid file format');
        process.exit(1);
    }
    const [n1, n2, n3] = parts;
    const a = parseNumber(n1);
    const b = parseNumber(n2);
    const c = parseNumber(n3);
    if ([a, b, c].includes(null)) {
        console.log('invalid file format');
        process.exit(1);
    }
    if (a === 0) {
        console.log('Error. a cannot be 0');
        process.exit(1);
    }
    printEquation(a, b, c);
    calculateRoots(a, b, c);
}

const main = async() => {
    const args = process.argv.slice(2);
    if (args.length === 0) {
        await interactiveMode();
    } else if (args.length === 1) {
        nonInteractiveMode(args[0]);
    } else {
        console.log(`Usage: node ${process.argv[1]} [input_file]`);
        process.exit(1);
    }
}

await main()