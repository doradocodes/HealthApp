import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
    try {
        console.log('storing data', key, value);
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e)
    }
};

export const updateData = async(key, value) => {
    try {
        console.log('updating data', key, value);
        await AsyncStorage.mergeItem(key, value);
    } catch (e) {
        console.log(e)
    }
}

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log('stored data', key, value)
            return value;
        }
    } catch (e) {
        console.log(e)
    }
};