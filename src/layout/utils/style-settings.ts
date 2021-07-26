import { Obj } from 'reinforcements';

const styleSettings = {
    settings: {},
    set(moreSettings: any) {
        this.settings = Obj.merge(this.settings, moreSettings);
    },
    get(key: string, defaultValue = null) {
        return Obj.get(this.settings, key, defaultValue);
    }
}

export default styleSettings;