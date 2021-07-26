const { fs } = require('@flk/fs');
const { default: Is } = require('@flk/supportive-is');
const { Obj, trim, toCamelCase } = require('reinforcements');
const { tabN, tab } = require('./../../helpers');

const inputs = {
    text: 'TextInput',
    textarea: 'TextAreaInput',
    hidden: 'HiddenInput',
    number: 'NumberInput',
    email: 'EmailInput',
    password: 'PasswordInput',
    select: 'SelectInput',
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
    MultiLingualInput: 'MultiLingualInput',
};

const alteredValuesBasedOnInputType = ['switch', 'checkbox', 'radio', 'file'];

const isCheckbox = inputType => ['checkbox', 'switch'].includes(inputType);

function getInputComponent(type) {
    return inputs[type];
}

function getInputs(inputsList, importsList, importedInputs, command) {
    const addImport = path => {
        if (!importsList.includes(path)) {
            importsList.push(path);
        }
    };

    const injectInput = input => !importedInputs.includes(input) && importedInputs.push(input);

    return inputsList.map((input, index) => {
        let data = '';
        if (input.newRow === undefined && index === 0) {
            input.newRow = true;
        }

        if (input.newRow === true && index !== 0) {
            data += tabN('</GridContainer>', 3);
        }

        if (input.newRow === true || index === 0) {
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

        if (isCheckbox(input.type) && inputOptions.required !== undefined) {
            delete inputOptions.required;
        }

        if ([1, 0].includes(inputOptions.required)) {
            inputOptions.required = inputOptions.required === 1;
        }

        injectInput(getInputComponent(input.type))

        let componentName = inputs[input.type];

        if (input.multiLingual) {
            componentName = 'MultiLingualInput';

            injectInput('MultiLingualInput');
        }

        let attributes = '';

        if (inputOptions.service) {
            let serviceFileName = inputOptions.service;
            let module = inputOptions.module;
            let serviceName = module === 'self' ? command.serviceObjectName : (serviceFileName === 'service' ? module : toCamelCase(serviceFileName));
            const importFile = module === 'self' ? './../../services/service' : `apps/${command.appName}/${module}/services/${serviceFileName}`;
            delete inputOptions.service;

            attributes += `request={() => ${serviceName}Service.list({paginate: false})}`;

            addImport(`import ${serviceName}Service from '${importFile}';`);
        }

        // might be generated from autocomplete/select service API
        delete inputOptions.selectType;
        delete inputOptions.module;

        const customProps = inputOptions.customProps;

        delete inputOptions.customProps;

        for (let attribute in inputOptions) {
            if (attribute === 'value' && alteredValuesBasedOnInputType.includes(input.type)) continue;

            attributes += `${attribute}`;
            let value = inputOptions[attribute];

            if (Is.array(value)) {
                value = `[${value.map(value => `'${value}`).join("', ")}']`;

                attributes += `={${value}}`;
            } else if (value[0] === '$') {
                value = value.replace(/\$/, '');

                if (value.includes('.')) {
                    addImport("import { Obj } from 'reinforcements';");
                    value = `Obj.get(record, '${value}')`;
                } else {
                    value = 'record.' + value;
                }

                attributes += `={${value}}`;
            } else if (typeof value === 'number' || value === false || value[0] === '#') {
                attributes += `={${value}}`;
            } else if (typeof value === 'string') {
                attributes += `="${value}"`;
            } else if (value === true) {
                attributes += ``; // just add the property name
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

module.exports = function updateForm(moduleDirectory, form, command) {
    const filePath = moduleDirectory + '/components/module/Form.tsx';

    const importedInputs = [];

    const importsList = [
        `import { GridContainer, GridItem } from 'mongez/components';`,
    ];

    const inputs = getInputs(form.inputs, importsList, importedInputs, command);

    importsList.push(`import { ${importedInputs.join(', ')} } from 'mongez/form';`);

    const content = fs.get(filePath)
        .replace('inputsList', inputs)
        .replace('importsList', importsList.join('\n'));
    fs.put(filePath, content);
}