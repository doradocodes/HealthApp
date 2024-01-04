import {View, Text, ScrollView, ImageBackground, Image, Pressable, StyleSheet, Switch} from "react-native";
import {Button} from "@rneui/base";
import globalStyles, {COLORS} from "../components/styles/globalStyles";
import {getData, storeData} from "../storage";
import {useEffect, useState} from "react";
import {getCurrentDate} from "../utils/dateUtils";
import * as Haptics from "expo-haptics";
import * as React from "react";
import moduleStyles from "../components/styles/moduleStyles";
import AppleHealthKit, {
    HealthValue,
    HealthKitPermissions,
} from 'react-native-health'

const permissions = {
    permissions: {
        read: [AppleHealthKit.Constants.Permissions.HeartRate],
        write: [AppleHealthKit.Constants.Permissions.Steps],
    },
}
export default function SettingsScreen({ navigation }) {
    const [selectedAvatar, setSelectedAvatar] = useState(0);
    const [isMetricSystem, setIsMetricSystem] = useState(false);
    const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(false);
    const [isSideQuestsEnabled, setIsSideQuestsEnabled] = useState(false);
    const [isAppleHealthEnabled, setIsAppleHealthEnabled] = useState(false);


    const getAvatar = async () => {
        const resAvatar = await getData('avatar');
        if (resAvatar) {
            setSelectedAvatar(parseInt(resAvatar));
        }
    }

    useEffect(() => {
        getAvatar();
    }, [selectedAvatar]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', (e) => {
            Haptics.selectionAsync();
        });

        return unsubscribe;
    }, [navigation]);

    const updateAvatar = async (index) => {
        Haptics.selectionAsync();
        setSelectedAvatar(index);
        await storeData('avatar', (index).toString());
    };

    return <View>
        <ScrollView style={globalStyles.container}>
            <Text style={globalStyles.header}>Settings</Text>
            <View style={moduleStyles.module}>
                <View style={moduleStyles.innerContainer}>
                    <Text style={{
                        ...globalStyles.baseText,
                        textAlign: 'center',
                    }}>Choose your character</Text>
                    <View style={styles.avatarContainer}>
                        <Pressable style={styles.avatarPressable} onPress={() => updateAvatar(0)}>
                            <Image
                                source={require('./../assets/character-1.png')} style={globalStyles.avatar}
                                style={{
                                    ...styles.avatar,
                                    ...(selectedAvatar === 0 ? styles.avatarSelected : {})
                                }}
                            />
                        </Pressable>
                        <Pressable style={styles.avatarPressable} onPress={() => updateAvatar(1)}>
                            <Image
                                source={require('./../assets/character-2.png')}
                                style={{
                                    ...styles.avatar,
                                    ...(selectedAvatar === 1 ? styles.avatarSelected : {})
                                }}
                            />
                        </Pressable>
                        <Pressable style={styles.avatarPressable} onPress={() => updateAvatar(2)}>
                            <Image
                                source={require('./../assets/character-3.png')}
                                style={{
                                    ...styles.avatar,
                                    ...(selectedAvatar === 2 ? styles.avatarSelected : {})
                                }}
                            />
                        </Pressable>
                        <Pressable style={styles.avatarPressable} onPress={() => updateAvatar(3)}>
                            <Image
                                source={require('./../assets/character-4.png')}
                                style={{
                                    ...styles.avatar,
                                    ...(selectedAvatar === 3 ? styles.avatarSelected : {})
                                }}
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style={moduleStyles.module}>
                <View
                    style={{
                        ...moduleStyles.innerContainer,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minHeight: 0,
                    }}
                >
                    <Text style={globalStyles.baseText}>Use metric system?</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        { isMetricSystem ? <Text style={globalStyles.baseText}>Yes</Text> : <Text style={globalStyles.baseText}>No</Text>}
                        <Switch
                            trackColor={{false: COLORS.lightGrey, true: COLORS.green}}
                            thumbColor={'white'}
                            ios_backgroundColor={COLORS.grey}
                            onValueChange={() => {
                                Haptics.selectionAsync();
                                setIsMetricSystem(!isMetricSystem)
                            }}
                            value={isMetricSystem}
                        />
                    </View>

                </View>
            </View>
            <View style={moduleStyles.module}>
                <View
                    style={{
                        ...moduleStyles.innerContainer,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minHeight: 0,
                    }}
                >
                    <Text style={globalStyles.baseText}>Turn off notifications?</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        { isNotificationsEnabled ? <Text style={globalStyles.baseText}>Yes</Text> : <Text style={globalStyles.baseText}>No</Text>}
                        <Switch
                            trackColor={{false: COLORS.lightGrey, true: COLORS.green}}
                            thumbColor={'white'}
                            ios_backgroundColor={COLORS.grey}
                            onValueChange={() => {
                                Haptics.selectionAsync();
                                setIsNotificationsEnabled(!isNotificationsEnabled)
                            }}
                            value={isNotificationsEnabled}
                        />
                    </View>
                </View>
            </View>
            <View style={moduleStyles.module}>
                <View
                    style={{
                        ...moduleStyles.innerContainer,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minHeight: 0,
                    }}
                >
                    <Text style={globalStyles.baseText}>Turn off side quests?</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        { isSideQuestsEnabled ? <Text style={globalStyles.baseText}>Yes</Text> : <Text style={globalStyles.baseText}>No</Text>}
                        <Switch
                            trackColor={{false: COLORS.lightGrey, true: COLORS.green}}
                            thumbColor={'white'}
                            ios_backgroundColor={COLORS.grey}
                            onValueChange={() => {
                                Haptics.selectionAsync();
                                setIsSideQuestsEnabled(!isSideQuestsEnabled)
                            }}
                            value={isSideQuestsEnabled}
                        />
                    </View>
                </View>
            </View>
            <View style={moduleStyles.module}>
                <View
                    style={{
                        ...moduleStyles.innerContainer,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minHeight: 0,
                    }}
                >
                    <Text style={globalStyles.baseText}>Connect to Apple Health?</Text>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: 10,
                        }}
                    >
                        { isAppleHealthEnabled ? <Text style={globalStyles.baseText}>Yes</Text> : <Text style={globalStyles.baseText}>No</Text>}
                        <Switch
                            trackColor={{false: COLORS.lightGrey, true: COLORS.green}}
                            thumbColor={'white'}
                            ios_backgroundColor={COLORS.grey}
                            onValueChange={() => {
                                Haptics.selectionAsync();
                                setIsAppleHealthEnabled(!isAppleHealthEnabled)
                            }}
                            value={isAppleHealthEnabled}
                        />
                    </View>
                </View>
            </View>
            <Button onPress={() => {
                Haptics.selectionAsync();
                AppleHealthKit.initHealthKit(permissions, (error) => {
                    /* Called after we receive a response from the system */

                    if (error) {
                        console.log('[ERROR] Cannot grant permissions!')
                    }

                    /* Can now read or write to HealthKit */

                    const options = {
                        startDate: new Date(2020, 1, 1).toISOString(),
                    }

                    AppleHealthKit.getHeartRateSamples(
                        options,
                        (callbackError, results) => {
                            /* Samples are now collected from HealthKit */
                            if (results) {
                                console.log(results)
                            } else {
                                console.log(callbackError)
                            }
                        },
                    )
                })
            }}>Connect Apple Health</Button>
        </ScrollView>
        <ImageBackground source={require('./../assets/2d351f0091d46a9d6440ad3b34760350.jpg')} resizeMode="stretch" style={globalStyles.backgroundImage} />
    </View>;
}

const styles = StyleSheet.create({
    avatarContainer: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 5,
        justifyContent: 'center',
        gap: 5,
    },
    avatarPressable: {
        width: 60,
    },
    avatar: {
        ...globalStyles.avatar,
        width: 60,
        height: 60,
        backgroundColor: COLORS.lightGrey,
        borderRadius: 5,
    },
    avatarSelected: {
        opacity: 1,
        backgroundColor: 'transparent',
        borderWidth: 3,
        borderColor: COLORS.lightGrey,
    }
})