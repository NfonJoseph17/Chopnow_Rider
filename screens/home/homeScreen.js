import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MapView from 'react-native-maps';

const HomeScreen = ({ navigation }) => {

    const [onlineOfflineSwitch, setonlineOfflineSwitch] = useState(true)

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <View style={{ flex: 1 }}>
                {mapView()}
                {onlineOffLineInfo()}
                {onlineOfflineSwitch ? availableDeliveriesTitle() : null}
            </View>
        </View>
    )

    function availableDeliveriesTitle() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('AvailableDeliveries')}
                style={styles.availableDeliveriesTitleWrapStyle}
            >
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    Available Deliveries
                </Text>
                <MaterialIcons
                    name="arrow-forward-ios"
                    color={Colors.grayColor}
                    size={18}
                />
            </TouchableOpacity>
        )
    }

    function onlineOffLineInfo() {
        return (
            <View style={styles.onlineOffLineInfoWrapStyle}>
                <Text style={{ ...Fonts.blackColor16SemiBold }}>
                    You're {onlineOfflineSwitch ? `Online` : `Offline`}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => { setonlineOfflineSwitch(!onlineOfflineSwitch) }}
                    style={{
                        ...styles.switchStyle,
                        backgroundColor: onlineOfflineSwitch ? Colors.primaryColor : '#DDDEE5',
                        alignItems: onlineOfflineSwitch ? 'flex-end' : 'flex-start'
                    }}>
                    <View style={styles.switchInnerCircleStyle} />
                </TouchableOpacity>
            </View>
        )
    }

    function mapView() {
        return (
            <MapView
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.03,
                    longitudeDelta: 0.03,
                }}
                style={{ flex: 1, }}
            />
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        margin: Sizes.fixPadding * 2.0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    onlineOffLineInfoWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F0F1F8',
        position: 'absolute',
        paddingHorizontal: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding + 2.0,
        right: 20.0, left: 20.0,
        top: 50.0,
        borderRadius: Sizes.fixPadding,
    },
    availableDeliveriesTitleWrapStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F0F1F8',
        position: 'absolute',
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding + 2.0,
        right: 0.0, left: 0.0,
        bottom: 63.0,
        borderRadius: Sizes.fixPadding,
    },
    switchStyle: {
        height: 23.0,
        width: 35.0,
        borderRadius: Sizes.fixPadding * 3.0,
        justifyContent: 'center',
    },
    switchInnerCircleStyle: {
        width: 21.0,
        height: 21.0,
        borderRadius: 10.5,
        backgroundColor: Colors.whiteColor,
        marginHorizontal: Sizes.fixPadding - 8.5,
    }
});

export default HomeScreen;