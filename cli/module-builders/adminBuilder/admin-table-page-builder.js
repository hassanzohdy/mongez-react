const { fs } = require('@flk/fs');
const { Obj } = require('reinforcements');
const { stringify, tabN, tab, beautify } = require('./../../helpers');

const formattersList = {
    multiLingual: 'MultiLingualFormatter',
    image: 'ImageFormatter',
    bool: 'BooleanFormatter',
    boolean: 'BooleanFormatter',
    email: 'EmailFormatter',
    number: 'NumberFormatter',
    translator: 'TranslatorFormatter',
    // todo
    badge: 'BadgeFormatter',
    select: 'DropdownFormatter',
    dropdown: 'DropdownFormatter',
    link: 'LinkFormatter',
    imageLink: 'ImageLinkFormatter',
    switch: 'SwitchFormatter',
}

function getColumns(columns, importsList) {
    return columns.map((column, index) => {
        if (column.formatter === 'default') {
            delete column.formatter;
        }

        let content = tabN('{', 3);

        content += tabN(`heading: '${column.heading}',`, 4);
        content += tabN(`key: '${column.key}',`, 4);

        if (column.formatter && !importsList.includes(formattersList[column.formatter])) {
            const formatter = formattersList[column.formatter];

            importsList.push(formatter);
            content += tabN(`formatter: ${formatter},`, 4);
        }

        if (index === columns.length - 1) {
            content += tab('},', 3);
        } else {
            content += tabN('},', 3);
        }

        return content;
    }).join(',');
}

module.exports = function updatePageData(moduleDirectory, module, table, role, command) {
    const filePath = moduleDirectory + '/components/module/Page.tsx';

    const importsList = [];

    function getImports() {
        if (importsList.length === 0) return '';

        return `import {${importsList.join(', ')}} from 'mongez/table';`
    }

    // formType = form | lazyForm

    let pageOptions = `{
        service,
        role: '${role}',
        formOptions: {
            ${command.form.options.formType}: Form,
            singleName: '${command.form.options.singleName}',
            modalOptions: ${stringify(command.form.options.modalOptions)},
        },
        table: {
            heading: '${table.heading || module}',
            filter: ${stringify(table.filters, 1, true, ['col'])},
            columns: [
                ${getColumns(table.columns, importsList)}
                tableActions,
            ],
        }
    }`;

    const content = fs.get(filePath)
        .replace('roleName', role)
        .replace('app-name', command.appName)
        .replace('module-name', module)
        .replace('PAGE_OPTIONS', pageOptions)
        .replace('// imports', getImports);
    fs.put(filePath, beautify(content));
}