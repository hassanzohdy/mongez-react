import Is from '@flk/supportive-is';
import { trans } from '../localization';

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
export function setTitle(pageTitle) {
    if (metaData.title === pageTitle) return pageTitle;

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
export function translatedTitle(pageTitle) {
    return setTitle(trans(pageTitle));
}

/**
 * Set page description
 * 
 * @param {string} title 
 */
export function setDescription(description) {
    if (metaData.description === description) return description;

    // let metaDescriptionTag = document.getElementById('meta-description')
    // metaDescriptionTag.content = meta.description = description;

    meta('description', description);
    itemprop('description', description);
    meta('og:description', description);
    meta('twitter:description', description);

    return description;
}

/**
 * Set Meta keywords
 * 
 * @param   {String|Array} keywords
 * @returns {void}
 */
export function setKeywords(keywords) {
    if (Is.array(keywords)) {
        keywords = keywords.join(',');
    }

    meta('keywords', keywords);
}

/**
 * Set twitter card
 * 
 * @param  string type 
 * @returns void
 */
export function setTwitterCard(type = 'summary') {
    meta('twitter:card', type);
}

/**
 * Meta image 
 * 
 * @param string imagePath 
 */
export function setImage(imagePath) {
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
export function setUrl(url) {
    meta('og:url', url);
    meta('twitter:url', url);
}

/**
 * Set canonical url
 * 
 * @param {string} url
 */
export function setCanonicalUrl(url) {
    let link = document.head.querySelector(`link[rel="canonical"]`) || createHeadElement('link', {
        rel: 'canonical'
    });

    link.setAttribute('href', url);
}

export function init() {
    setTwitterCard();
}