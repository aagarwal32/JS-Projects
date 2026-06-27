// capitalize test
test('capitalize first letter of a word', () => {
    expect(capitalize("xyz")).toMatch("Xyz");
});

test('capitalize capitalized first letter of a word', () => {
    expect(capitalize("Xyz")).toMatch("Xyz");
});

test('capitalize handling on empty string', () => {
    expect(capitalize("")).toMatch("");
});

test('capitalize single character', () => {
    expect(capitalize("x")).toMatch("X");
});

test('capitalize first letter and lower-case rest', () => {
    expect(capitalize("aBCDEF")).toMatch("Abcdef");
});

test('capitalize handing with numbers mixed in', () => {
    expect(capitalize("xYZ123")).toMatch("Xyz123");
});

test('capitalize handing with all numbers', () => {
    expect(capitalize("12345")).toMatch("12345");
});

// reverse string test
test('reverse three letter string', () => {
    expect(reverseString("xyz")).toMatch("zyx");
});

test('reverse handling on empty string', () => {
    expect(reverseString("")).toMatch("");
});

test('reverse four letter string', () => {
    expect(reverseString("abcd")).toMatch("dcba");
});

test('reverse handling on mixed letters/numbers', () => {
    expect(reverseString("xyz123")).toMatch("321zyx");
});

// reverse and capitalize test
test('reverse mixed number/letter string and capitalize first letter', () => {
    expect(capitalize(reverseString("XYZ123abc"))).toMatch("Cba321zyx");
});

function capitalize(string) {
    const stringLen = string.length;
    if (stringLen > 0) {
        let firstLetter = string.slice(0, 1).toUpperCase();
        let remainingString = string.slice(1).toLowerCase();
        string = firstLetter + remainingString;
    }
    return string;
}

function reverseString(string) {
    return string.split('').reverse().join('');
}