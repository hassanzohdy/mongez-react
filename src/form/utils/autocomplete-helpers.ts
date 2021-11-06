import Is from "@flk/supportive-is";
import { AxiosResponse } from "axios";
import { AutoCompleteOption } from "./types";
import { OptionValue } from "./types/AutoComplete";
import { getLocalizedText, trans } from "../../localization";

export function getSelectOptions(value: OptionValue, options: AutoCompleteOption[], multiple: boolean): AutoCompleteOption | AutoCompleteOption[] {
    return multiple ? options.filter(option => (value as string[]).includes(String(option.value))) : options.find(option => String(option.value) === String(value));
}

export function mapOption(option) {
    if (Is.string(option)) {
        option = {
            text: trans(option),
            value: option,
        }
    } else if (Is.numeric(option)) {
        option = {
            text: option,
            value: option,
        };
    } else if (Is.object(option)) {
        let label = option.label || option.text || option.name || option.title;

        label = getLocalizedText(label);

        option = {
            ...option,
            text: label,
            value: option.value || option.id
        };
    }

    return option;
}

export function mapResponse(response: AxiosResponse): AutoCompleteOption[] {
    return response.data.records.map(mapOption);
}