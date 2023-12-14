import {Icon, Slider} from "@rneui/base";
import {View, Text, StyleSheet} from "react-native";
import {useEffect, useState} from "react";
import * as React from "react";

export default function CustomSlider({
                                         color,
                                         step,
                                         max,
                                         containerStyles,
                                         defaultValue,
                                         onValueChange,
                                         icon,
                                         trackHeight
                                     }) {
    // const [currentValue, setCurrentValue] = useState(defaultValue);

    // console.log('currentValue', currentValue, typeof currentValue);

    // useEffect(() => {
    //     console.log('defaultValue', defaultValue, typeof defaultValue);
    //     setCurrentValue(defaultValue);
    // }, [defaultValue])

    return <View style={{...containerStyles, ...styles.sliderContainer}}>
        <Slider
            value={defaultValue}
            // animateTransitions
            animationType="timing"
            maximumTrackTintColor="#ccc"
            maximumValue={max}
            minimumTrackTintColor={color}
            minimumValue={0}
            onValueChange={onValueChange}
            orientation="horizontal"
            step={step || 1}
            style={styles.slider}
            thumbStyle={{height: 30, width: 30}}
            thumbTintColor={color}
            thumbTouchSize={{width: 40, height: 40}}
            trackStyle={{height: trackHeight || 20, borderRadius: 20}}

        />
    </View>;
}

const styles = StyleSheet.create({
    sliderContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    slider: {
        width: '100%',
    },

});