import config from "../config";
import cacheManager from "../cache/CacheManager";
import collectInfoFromClientDevice from "./collectInfoFromClientDevice";

export default function bootstrap() {
    collectInfoFromClientDevice();

    const cacheDriver = config.get('cache.driver');

    if (cacheDriver) {
        cacheManager.setDriver(cacheDriver);
    }
}