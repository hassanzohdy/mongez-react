const env = require('dotenv');
const { fs: fsSync } = require('@flk/fs');
const { readdirSync, existsSync } = require('fs');
const { capitalize } = require('reinforcements');

env.config();

const getDirectories = source => {
    if (!existsSync(source)) return [];

    return readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
};

const getFiles = source => {
    if (!existsSync(source)) return [];

    return readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);
};

const root = path => process.cwd() + '/' + path;

const appsList = getDirectories(root('src/apps'));

const appModules = {};

for (let app of appsList) {
    const modules = getDirectories(root(`src/apps/${app}`));

    const services = [{
        label: 'Self Service',
        value: 'self',
        module: 'self',
    }];

    const addServices = (servicesList, module, servicePath = (serviceName) => module + `/services/${serviceName}`) => {
        for (let serviceFile of servicesList) {
            let serviceName = serviceFile.replace(/.ts|.js/, '');

            services.push({
                label: capitalize(module) + ' / ' + capitalize(serviceName),
                value: serviceName,
                module: module,
            });
        }
    };

    for (let module of modules) {
        const moduleServices = getFiles(root(`src/apps/${app}/${module}/services`));

        addServices(moduleServices, module);
    }

    if (existsSync(root(`src/apps/${app}/services`))) {
        addServices(getFiles(root(`src/apps/${app}/services`)), 'Shared Services', serviceName => `services/${serviceName}`);
    }

    appModules[app] = {
        services,
    };
}

const localeCodes = String(process.env.REACT_APP_LOCALE_CODES_LIST || '').split(',');

const filterInputTypes = [
    { label: 'Search', value: 'search' },
    { label: 'Select', value: 'select' },
    { label: 'Autocomplete', value: 'autocomplete' },
];

const columnFormatter = [
    { label: 'Default', value: 'default' },
    { label: 'Image', value: 'image' },
    { label: 'MultiLingual', value: 'multiLingual' },
    { label: 'Boolean', value: 'boolean' },
    { label: 'Number', value: 'number' },
    { label: 'Email', value: 'email' },
    { label: 'Translator', value: 'translator' },
    { label: 'Badge', value: 'badge' },
    { label: 'Dropdown Input', value: 'dropdown' },
    { label: 'Link', value: 'link' },
    { label: 'Image Link', value: 'imageLink' },
    { label: 'Switch Button', value: 'switch' },
];

const linkTargets = [
    { label: 'Open In Same Window', value: '_self' },
    { label: 'Open In Tab', value: '_blank' },
];

const badges = [
    { label: 'Red Badge', value: 'RedBadge' },
    { label: 'Blue Badge', value: 'BlueBadge' },
    { label: 'Orange Badge', value: 'OrangeBadge' },
    { label: 'Yellow Badge', value: 'YellowBadge' },
    { label: 'Green Badge', value: 'GreenBadge' },
    { label: 'Black Badge', value: 'BlackBadge' },
    { label: 'Dark Badge', value: 'DarkBadge' },
    { label: 'White Badge', value: 'WhiteBadge' },
];

const formInputTypes = [
    {
        "label": "Text",
        "value": "text"
    },
    {
        "label": "Textarea",
        "value": "textarea"
    },
    {
        "label": "Hidden",
        "value": "hidden"
    },
    {
        "label": "Number",
        "value": "number"
    },
    {
        "label": "Email",
        "value": "email"
    },
    {
        "label": "Password",
        "value": "password"
    },
    {
        "label": "Select",
        "value": "select"
    },
    {
        "label": "Auto Complete",
        "value": "autoComplete"
    },
    {
        "label": "Checkbox",
        "value": "checkbox"
    },
    {
        "label": "Switch",
        "value": "switch"
    },
    {
        "label": "Radio",
        "value": "radio"
    },
    {
        "label": "RichText",
        "value": "richText"
    },
    {
        "label": "Date",
        "value": "date"
    },
    {
        "label": "Image",
        "value": "image"
    },
    {
        "label": "File",
        "value": "file"
    },
    {
        "label": "Markdown",
        "value": "markdown"
    }
];

const typeExceptPlaceholder = [
    'checkbox',
    'file',
    'date',
    'image',
    'fileManger',
    'radio',
    'switch',
];

const modalSizes = [
    { label: 'Small', value: 'sm' },
    { label: 'Medium', value: 'md' },
    { label: 'Large', value: 'lg' },
];

const formModalOptions = [
    { label: 'Full Screen Size', value: 'fullScreen' },
    { label: 'Close Using Esc Key', value: 'esc' },
    { label: 'Close On Backdrop Click', value: 'backdrop' },
];

let version;

try {
    const packageJson = fsSync.getJson(__dirname + './../../../package.json') || {};
    version = packageJson.version;
} catch (error) {
    version = '0.0.0';
}

module.exports = {
    version: version,
    apps: appsList,
    appModules,
    locales: localeCodes,
    typeExceptPlaceholder,
    formInputTypes,
    badges,
    linkTargets,
    columnFormatter,
    filterInputTypes,
    modalSizes,
    formModalOptions,
}