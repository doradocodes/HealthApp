import AppleHealthKit from "react-native-health";

export const getAppleHealthData = async (date, callback) => {
    const options = {
        // startDate: new Date(2024,1,1), // required
        // endDate: date.hours(23).toISOString(),
    };
    console.log('options', options)
    AppleHealthKit.getStepCount(
        options,
        (callbackError, results) => {
            /* Samples are now collected from HealthKit */
            if (results) {
                callback(results);
            } else {
                console.log(callbackError)
            }
        },
    );
}

export const getAppleHealthPermissions = async (callback) => {
    const permissions = {
        permissions: {
            read: [AppleHealthKit.Constants.Permissions.HeartRate],
            write: [AppleHealthKit.Constants.Permissions.Steps],
        },
    }
    AppleHealthKit.initHealthKit(permissions, (error) => {
        console.log('permissions', permissions);
        /* Called after we receive a response from the system */
        if (error) {
            console.log('[ERROR] Cannot grant permissions!')
            callback(false);
        } else {
            callback(true);
        }
    });
}