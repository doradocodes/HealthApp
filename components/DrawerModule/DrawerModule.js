import {Pressable, StyleSheet, Text, View} from "react-native";
import {Icon} from "@rneui/base";
import {useState} from "react";

export default function DrawerModule({title, children}) {
    const [isOpen, setIsOpen] = useState(true);
    return <View style={styles.container}>

        <Pressable
            style={styles.header}
            onPress={() => setIsOpen(!isOpen)}
        >
            <Text style={styles.title}>{title}</Text>
            <Text>
                {isOpen ?
                    <Icon name={'chevron-down'} type="material-community" size={35}/>
                    :
                    <Icon name={'chevron-left'} type="material-community" size={35}/>
                }
            </Text>
        </Pressable>

        {isOpen &&
            <View style={styles.innerContainer}>
                {children}
            </View>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 25,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 24,
    },
    innerContainer: {
        marginTop: 10,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
    }
});
