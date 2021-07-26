const { default: fs } = require("@flk/fs");
const { root, stringify } = require("./../../helpers");

module.exports = function updateTranslations(translations) {
    if (! translations) return;
    
    const localizedTranslations = {};
    for (let translation of translations) {
        for (let localeCode in translation.text) {
            let text = translation.text[localeCode];
            if (!localizedTranslations[localeCode]) {
                localizedTranslations[localeCode] = {};
            }

            localizedTranslations[localeCode][translation.name] = text;
        }
    }

    for (let localCode in localizedTranslations) {
        let path = root('src/shared/locales/' + localCode + '.ts');

        let keywords = localizedTranslations[localCode];

        let fileContent = fs.get(path);

        for (let key in keywords) {
            if (fileContent.includes(key + ':') || fileContent.includes(key + ' :')) {
                delete keywords[key];
            }
        }

        let content = fileContent.replace('    // translations', `${stringify(keywords, 0, false)}    // translations`)
        fs.put(path, content);
    }
}