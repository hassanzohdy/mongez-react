const { default: fs } = require("@flk/fs");
const { root } = require("./../helpers");

module.exports = function updateModules(module, route, searchFor) {
    let path = root('src/shared/modules.ts');
    let content = fs.get(path).replace(searchFor, `{
          entry: ['${route}'],
          module: '${module}',
      },
      ${searchFor}`);

    fs.put(path, content);
}