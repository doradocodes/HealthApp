import {getData} from "../storage";
import {formatDate} from "./dateUtils";

export const getLocalData = async (date) => {
    const key = `${formatDate(date)}`;
    const response = await getData(key);
    console.log('response',key, response);
    if (response) {
        const data = JSON.parse(response);
        // console.log('data', data);
        return data;
    }
    return {
        waterIntake: 0,
        steps: 0,
        breakfast: {},
        lunch: {},
        dinner: {},
    };
}