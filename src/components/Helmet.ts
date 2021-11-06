import config from '../config';
import { trans } from '../localization';
import { setTitle, setDescription, setImage, setUrl, setCanonicalUrl, setKeywords, setFavIcon } from './../utils/metadata';

type HelmetProps = {
    /**
     * Page Title
     */
    title?: string;
    /**
     * Page id, appended to body tag
     */
    id?: string | null;
    /**
     * body classes
     */
    bodyClass?: string;
    /**
     * Page url, if set to true then the url will be automatically generated 
     */
    url?: string | true;
    /**
     * Page meta description
     */
    description?: string;
    /**
     * Page meta image
     */
    image?: string | null;
    /**
     * If set to true, then the app name will be appended after the provided title
     */
    appendAppName?: boolean;
    /**
     * The separator that will be added after page title and before the application name
     */
    appNameSeparator?: string;
    /**
     * Page meta keywords
     */
    keywords?: string | null | Array<string>;
    /**
     * Page canonical url
     */
    canonicalUrl?: string | null;
    /**
     * App Favicon
     */
    favIcon?: string | null;
}

export default function Helmet(props: HelmetProps) {
    let { title, id = null, image = null, favIcon = null, url = true, appNameSeparator = config.get('meta.appNameSeparator', '|'), keywords = null, canonicalUrl = null, appendAppName = true, description = null, bodyClass = null } = props;
    setTitle(trans(title) + (appendAppName ? ` ${appNameSeparator} ` + config.get('meta.appName', trans('appName')) : ''));

    if (description) {
        setDescription(description);
    }

    if (image) {
        setImage(image);
    }

    if (url) {
        if (url === true) {
            url = window.location.href;
        }

        setUrl(url);
    }

    if (!canonicalUrl && url) {
        canonicalUrl = url as string;
    }

    if (favIcon) {
        setFavIcon(favIcon);
    }

    if (canonicalUrl) {
        setCanonicalUrl(canonicalUrl);
    }

    if (keywords) {
        setKeywords(keywords);
    }

    if (bodyClass) {
        const classes = bodyClass.split(' ');

        for (let className of classes) {
            document.body.classList.add(className);
        }
    }

    if (id) {
        document.body.id = id;
    }

    return null;
}