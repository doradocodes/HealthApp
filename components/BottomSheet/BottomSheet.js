import {Dimensions, Pressable, StyleSheet} from "react-native";
import {Gesture} from "react-native-gesture-handler";
import {useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated";
import * as React from "react";
import {useEffect} from "react";
import AnimatedView from "react-native-reanimated/src/reanimated2/component/View";
import {COLORS} from "../styles/globalStyles";
import {Icon} from "@rneui/base";

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function BottomSheet({children, isVisible, setIsVisible}) {
    const translateY = useSharedValue(SCREEN_HEIGHT); // 0 = open, SCREEN_HEIGHT = closed
    const context = useSharedValue(0);

    useEffect(() => {
        if (isVisible) {
            translateY.value = withSpring(0, {damping: 20});
        } else {
            translateY.value = withSpring(SCREEN_HEIGHT, {damping: 20});
        }
    }, [isVisible]);

    const pan = Gesture.Pan()
        .onStart(() => {
            context.value = {y: translateY.value};
        }).onUpdate((event) => {
            if ((context.value.y + event.translationY) < 0) {
                translateY.value = withSpring(context.value.y + event.translationY, {damping: 15});
            }
        });

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: translateY.value,
                }
            ]
        }
    });

    return <AnimatedView style={[styles.bottomSheetContainer, animatedStyle]}>
        <Pressable style={styles.closeButton} onPress={() => setIsVisible(false)}>
            <Icon name="close" type="material-community" size={30} color={COLORS.grey}/>
        </Pressable>

        {children}

    </AnimatedView>

}

const styles = StyleSheet.create({
    bottomSheetContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: 20,
        width: '100%',
        backgroundColor: COLORS.backgroundColor,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        zIndex: 10,
    },
    closeButton: {position: 'absolute', top: 18, right: 15, zIndex: 1},
    dragIndicatorContainer: {
        width: '100%',
        padding: 10,
    },
    dragIndicator: {
        width: 50,
        height: 5,
        backgroundColor: '#ABB0BA',
        borderRadius: 5,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});
