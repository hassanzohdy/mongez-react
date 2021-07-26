import { trans } from '../localization';
import { setTitle, setDescription, setImage, setUrl, setCanonicalUrl } from './../utils/metadata';

export default function Helmet(props) {
    let { title, id = null, image = null, url = true, canonicalUrl = null, appendAppName = true, description = null, bodyClass = null } = props;
    setTitle(trans(title) + (appendAppName ? ' | ' + trans('appName') : ''));

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
        canonicalUrl = url;
    }

    if (canonicalUrl) {
        setCanonicalUrl(canonicalUrl);
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