import {Icon, Slider} from "@rneui/base";
import {View, Text, StyleSheet} from "react-native";
import {useState} from "react";
import * as React from "react";

export default function CustomSlider({
                                         color, step, min, max, containerStyles, defaultValue, onValueChange, icon, trackHeight
                                     }) {
    // const [currentValue, setCurrentValue] = useState(0);

    // const val = !isNaN(defaultValue) || 0;
    return <View style={{...containerStyles, ...styles.sliderContainer}}>
        <Slider
            animateTransitions
            animationType="timing"
            maximumTrackTintColor="#ccc"
            maximumValue={max}
            minimumTrackTintColor={color}
            minimumValue={min || 0}
            // onSlidingComplete={() =>
            //     console.log("onSlidingComplete()")
            // }
            // onSlidingStart={() =>
            //     console.log("onSlidingStart()")
            // }
            onValueChange={onValueChange}
            orientation="horizontal"
            step={step || 1}
            style={styles.slider}
            thumbStyle={{height: 30, width: 30}}
            thumbTintColor={color}
            thumbTouchSize={{width: 40, height: 40}}
            trackStyle={{height: trackHeight || 20, borderRadius: 20}}
            value={defaultValue || 0}
            // custom icon
            thumbProps={icon && {
                children: icon,
            }}
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