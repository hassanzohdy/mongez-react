import '../localization/locales.js';
import { trans } from '../localization/translator.js';
import '@flk/supportive-is';

const metaData = {
    title: null,
    description: null,
};
/**
 * Create new meta tag and add it to the head tag
 * @param   {object} props
 * @returns {HTMLElement}
 */
function createNewMeta(props) {
    return createHeadElement('meta', props);
}
/**
 * Create and append the given tag to the head
 *
 * @param   {String} tagName
 * @param   {Object} props
 * @returns {HTMLElement}
 */
function createHeadElement(tagName, props) {
    let tag = document.createElement(tagName);
    for (let key in props) {
        tag.setAttribute(key, props[key]);
    }
    document.head.appendChild(tag);
    return tag;
}
/**
 * Create or modify the given meta name
 *
 * @param {string} metaName
 * @param {string} value
 * @returns {void}
 */
function meta(metaName, value) {
    let attributeName = ['keywords', 'description'].includes(metaName) ? 'name' : 'property';
    let meta = document.head.querySelector(`meta[${attributeName}="${metaName}"]`);
    if (!meta) {
        meta = createNewMeta({
            [attributeName]: metaName,
        });
    }
    meta.setAttribute('content', value.trim());
}
/**
 * Add Itemprop meta
 *
 * @param {string} name
 * @param {string} value
 */
function itemprop(name, value) {
    let meta = document.head.querySelector(`meta[itemprop="${name}"]`);
    if (!meta) {
        meta = createNewMeta({
            itemprop: name
        });
    }
    meta.setAttribute('content', value.trim());
}
/**
 * Set page title
 *
 * @param   {string} pageTitle
 */
function setTitle(pageTitle) {
    if (metaData.title === pageTitle)
        return pageTitle;
    document.title = metaData.title = pageTitle;
    meta('og:title', pageTitle);
    meta('twitter:title', pageTitle);
    itemprop('name', pageTitle);
}
/**
 * Set page title using the trans function for translation
 *
 * @param   {string} pageTitle
 * @returns {string}
 */
function translatedTitle(pageTitle) {
    return setTitle(trans(pageTitle));
}
/**
 * Set page description
 *
 * @param {string} title
 */
function setDescription(description) {
    if (metaData.description === description)
        return description;
    // let metaDescriptionTag = document.getElementById('meta-description')
    // metaDescriptionTag.content = meta.description = description;
    meta('description', description);
    itemprop('description', description);
    meta('og:description', description);
    meta('twitter:description', description);
    return description;
}
/**
 * Meta image
 *
 * @param string imagePath
 */
function setImage(imagePath) {
    meta('image', imagePath);
    meta('og:image', imagePath);
    meta('twitter:image', imagePath);
    itemprop('image', imagePath);
}
/**
 * Set meta url
 *
 * @param string url
 * @returns void
 */
function setUrl(url) {
    meta('og:url', url);
    meta('twitter:url', url);
}
/**
 * Set canonical url
 *
 * @param {string} url
 */
function setCanonicalUrl(url) {
    let link = document.head.querySelector(`link[rel="canonical"]`) || createHeadElement('link', {
        rel: 'canonical'
    });
    link.setAttribute('href', url);
}

export { setCanonicalUrl, setDescription, setImage, setTitle, setUrl, translatedTitle };
