const beautifyJs = require('js-beautify').js;

const BASE_ROOT = process.cwd();

function root(path) {
    return BASE_ROOT + '/' + path;
}

function modules(path) {
    return root('src/apps/' + path);
}

function currentModule(path) {
    return modules(global.app + '/' + path);
}

function currentAppName() {
    return global.app;
}

function frontModules(path) {
    return modules('front-office/' + path);
}

function tab(text, numberOfTabs) {
    return '\t'.repeat(numberOfTabs) + text;
};

function tabN(text, numberOfTabs) {
    return tab(text, numberOfTabs) + '\n';
};


function stringify(object, indent, withBraces = true, skips = []) {
    let isArray = Array.isArray(object);
    let data = withBraces ? tabN(isArray ? '[' : '{', indent) : '';

    if (isArray) {
        for (let value of object) {
            if (typeof value === 'string' && !skips.includes(key)) {
                value = `'${value}'`;
            } else if (typeof value === 'object') {
                value = stringify(value, indent + 1, withBraces, skips);
            }

            data += tabN(`${value},`, indent + 1);
        }
    } else {
        for (let key in object) {
            let value = object[key];

            if (typeof value === 'string' && !skips.includes(key)) {
                value = `'${value}'`;
            } else if (typeof value === 'object') {
                value = stringify(value, indent + 1, withBraces);
            }

            data += tabN(`${key}: ${value},`, indent + 1);
        }
    }

    if (withBraces) {
        data += tabN(isArray ? ']' : '}', indent);
    }

    return data;
}

function beautify(content) {
    // return beautifyJs(content, { indent_size: 1, jslint_happy: true });
    return beautifyJs(content);
}

module.exports = {
    root,
    modules,
    currentModule,
    currentAppName,
    frontModules,
    tab,
    tabN,
    stringify,
    beautify,
}
