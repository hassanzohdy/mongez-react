import { md5 } from "../../encryption";

const fontFamilyLinkId = 'ffam'; // f(ont) fam(ily)

function createLinkTag() {
    let linkTag = document.createElement('link');

    linkTag.rel = 'stylesheet';

    return linkTag;
}

export function setExternalFontFamily(url: string, fontElementId: string = ''): HTMLElement | null {
    if (!url) return null;

    fontElementId = fontFamilyLinkId + '-' + (fontElementId || md5(url));

    let linkTag: any = document.getElementById(fontElementId) || createLinkTag();

    linkTag.href = url;

    linkTag.id = fontElementId;

    document.head.appendChild(linkTag);

    return linkTag;
}