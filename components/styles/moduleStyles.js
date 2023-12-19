import { StyleSheet } from "react-native";
import {COLORS} from "./globalStyles";

export default StyleSheet.create({
    module: {
        paddingLeft: 15,
        paddingRight: 15,
    },
    innerContainer: {
        minHeight: 100,
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 15,
        marginBottom: 20,
        backgroundColor: COLORS.moduleBackground,
        borderRadius: 15,
        shadowColor: COLORS.shadow,
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 1,
        shadowRadius: 0,
    },
    moduleName: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 16,
    },
    overlayTitle: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 30,
    },
    overlayStyle: {
        padding: 10,
        borderRadius: 15,
        backgroundColor: '#FAF7F0',
        width: '90%',
        height: 'auto',
        minHeight: '30%',
        flexDirection: 'column',
        // justifyContent: 'space-between',
    },
    overlaySubtitle: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
    },
    overlayButton: {
        borderRadius: 20,
        backgroundColor: COLORS.green,
        fontFamily: 'KosugiMaru_400Regular',
    },
    overlayButtonContainer: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 20,
    },
    overlayButtonTitle: {
        fontFamily: 'KosugiMaru_400Regular',
        fontSize: 16,
    },
    editButton: {
        width: 'auto',
        padding: 0,
    },
    editButtonContainer: {
        padding: 0,
        marginRight: -10,
        width: 'auto'
    },
    titleContainer: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    }
});
