const { fs } = require('@flk/fs');
const { root } = require('./helpers');
const buildModules = require('./modules-builder');

const commands = fs.getJson(root('mongez.json'));

if (commands.modules) {
    return buildModules(commands.modules);
}