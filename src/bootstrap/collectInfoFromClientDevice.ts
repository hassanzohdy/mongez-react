import Is from "@flk/supportive-is";

interface Object {
    [key: string]: Function;
}

export default function collectInfoFromClientDevice() {
    const bodyClasses = document.body.classList;

    const detectDeviceType = () => {
        const windowSize = document.body.clientWidth;
        for (const browserName of ['firefox', 'chrome', 'opera', 'safari', 'edge']) {
            if (Is.browser(browserName)) {
                bodyClasses.add(browserName);
            }
        }

        let isMobileOf: Object = Is.mobile;

        for (const deviceType of ['ios', 'andriod', 'ipad', 'iphone']) {
            if (isMobileOf[deviceType] && isMobileOf[deviceType]()) {
                bodyClasses.add(deviceType);
            }
        }

        if (windowSize <= 570) {
            bodyClasses.add('mobile');
            bodyClasses.remove('desktop');
            bodyClasses.remove('tablet');
        } else if (windowSize <= 1024) {
            bodyClasses.add('tablet');
            bodyClasses.remove('desktop');
            bodyClasses.remove('mobile');
        } else {
            bodyClasses.add('desktop');
            bodyClasses.remove('mobile');
            bodyClasses.remove('tablet');
        }
    }

    detectDeviceType();

    window.addEventListener('resize', detectDeviceType);
}