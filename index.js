const printEquation = (a, b, c) => {
    console.log(`Equation is: (${a}) x^2 + (${b}) x + (${c}) = 0`);
}

const printRoots = (roots) => {
    if (roots.length === 2) {
        console.log(`There are 2 roots\nx1 = ${roots[0]}\nx2 = ${roots[1]}`);
    } else if (roots.length === 1) {
        console.log(`Root is: ${roots[0]}`);
    } else {
        console.log("No real roots");
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
        printEquation([]);
    }
}