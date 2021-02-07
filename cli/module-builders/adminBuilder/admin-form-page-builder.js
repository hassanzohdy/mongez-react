const { fs } = require('@flk/fs');
const { Obj, trim } = require('reinforcements');
const { tabN, tab, currentAppName } = require('./../../helpers');

const inputs = {
    text: 'TextInput',
    textarea: 'TextareaInput',
    hidden: 'HiddenInput',
    number: 'NumberInput',
    email: 'EmailInput',
    password: 'PasswordInput',
    select: 'SelectInput',
    dropdown: 'SelectInput',
    dropdown: 'SelectInput',
    autoComplete: 'AutoComplete',
    checkbox: 'Checkbox',
    switch: 'SwitchButton',
    radio: 'RadioGroup',
    richText: 'RichTextInput',
    date: 'DatePicker',
    image: 'ImageInput',
    file: 'FileInput',
    markdown: 'MarkdownInput',
    switch: 'SwitchButton',
    MultiLingualInput: 'MultiLingualInput',
};

const importedInputs = [];

function getInputComponent(type) {
    return inputs[type];
}

function getInputs(inputsList, importsList) {
    const addImport = path => {
        if (!importsList.includes(path)) {
            importsList.push(path);
        }
    };

    const injectInput = input => !importedInputs.includes(input) && importedInputs.push(input);

    const addObjImport = () => addImport(`import { Obj } from 'reinforcements';`);

    return inputsList.map((input, index) => {
        let data = '';
        if (input.newRow === undefined && index === 0) {
            input.newRow = true;
        }

        if (input.newRow === true && index !== 0) {
            data += tabN('</GridContainer>', 3);
        }

        if (input.newRow === true) {
            data += tabN('<GridContainer>', 3);
        }

        const col = input.col ? ` sm-${input.col}` : '';

        data += tabN(`<GridItem${col}>`, 4);

        const inputOptions = Obj.merge(input, {});

        delete inputOptions.type;
        delete inputOptions.newRow;
        delete inputOptions.multiLingual;

        if (inputOptions.name && !inputOptions.value && inputOptions.type !== 'password') {
            inputOptions.value = `$${inputOptions.name}`;
        }

        injectInput(getInputComponent(input.type))


        let componentName = inputs[input.type];

        if (input.multiLingual) {
            componentName = 'MultiLingualInput';

            injectInput('MultiLingualInput');
        }

        let attributes = '';

        if (inputOptions.service) {
            let serviceName = inputOptions.service;
            delete inputOptions.service;
            attributes += `lazyLoading request={() => ${serviceName}Service.list({paginate: false})}`;
            addImport(`import ${serviceName}Service from 'modules/app/${currentAppName()}/services/service';`);
        }

        const customProps = inputOptions.customProps;

        delete inputOptions.customProps;

        for (let attribute in inputOptions) {
            attributes += `${attribute}`;
            let value = inputOptions[attribute];
            if (value[0] === '$') {
                value = value.replace(/\$/, '');

                if (value.includes('.')) {
                    value = `Obj.get(record, '${value}')`;
                } else {
                    value = 'record.' + value;
                }

                attributes += `={${value}}`;
            } else if (typeof value === 'number' || value[0] === '#') {
                attributes += `={${value}}`;
            } else if (typeof value === 'string') {
                attributes += `="${value}"`;
            }
            attributes += ' ';
        }

        if (customProps) {
            let props = customProps.split('\n');

            for (let prop of props) {
                if (trim(prop).length === 0) continue;

                attributes += prop;
            }
        }

        if (input.type === 'switch') {
            attributes += `checked={record.${inputOptions.name}} onChange={checked => record.${inputOptions.name} = checked}`
        }

        if (input.multiLingual) {
            attributes = `component={${inputs[input.type]}} ${attributes}`;
        }

        data += tabN(`<${componentName} ${attributes} />`, 5);

        data += tabN(`</GridItem>`, 4);

        return data;
    }).join('') + tab('</GridContainer>', 3);
}

module.exports = function updateForm(moduleDirectory, module, form) {
    const filePath = moduleDirectory + '/components/module/Form.tsx';

    const importsList = [
        `import { GridContainer, GridItem } from 'mongez/components';`,
    ];

    const inputs = getInputs(form.inputs, importsList);

    importsList.push(`import { ${importedInputs.join(', ')} } from 'mongez/form';`);

    const content = fs.get(filePath)
        .replace('inputsList', inputs)
        .replace('importsList', importsList.join('\n'));
    fs.put(filePath, content);
}