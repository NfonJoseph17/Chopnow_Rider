import React, { useState } from "react";
import { Image, Dimensions, View, TouchableOpacity, StyleSheet, Text, Platform } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from '@expo/vector-icons';
import MapViewDirections from 'react-native-maps-directions';
import { Key } from "../../constants/key";
import MapView, { Marker } from "react-native-maps";
import Dialog from "react-native-dialog";
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get('window');

const DeliveryDetailWithMapScreen = ({ navigation }) => {

    const deliveryMarker = {
        latitude: 22.6293867,
        longitude: 88.4354486,
    };

    const deliveryBoyMarker = {
        latitude: 22.6292757,
        longitude: 88.444781,
    }

    const [state, setState] = useState({
        showOrderCompletedDialog: false,
        showOrderDetailDialog: false,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        showOrderCompletedDialog,
        showOrderDetailDialog,
    } = state;

    const dialogItem = {
        id: '1',
        orderId: 'ACR147852',
        paymentMethod: 'Online',
        totalPayment: 32.00,
        deliveryAddress: '48, Hunters Road, Vepery',
        pickupAddress: 'Great Western, Mcc Lane, Fort',
        orderItems: [
            {
                item: 'Deal 1',
                amount: 28.00,
            },
            {
                item: '7up Regular 250ml',
                amount: 2.50,
            },
        ],
        customerName: 'Samantha John',
        customerMobileNo: '(+91) 1234567890'
    };

    return (
        <View style={{ flex: 1, }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {mapView()}
                {header()}
                {deliveryInfo()}
                {orderCompletedDialog()}
                {orderDetailDialog()}
            </View>
        </View>
    )

    function orderDetailDialog() {
        return (
            <Dialog.Container
                visible={showOrderDetailDialog}
                contentStyle={styles.orderDetailDialogStyle}
                onRequestClose={() => updateState({ showOrderDetailDialog: false })}
                headerStyle={{ padding: 0.0, margin: 0.0, }}
            >
                <View style={styles.dialogOredrIdWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor14SemiBold }}>
                        Order ID: {dialogItem.orderId}
                    </Text>
                </View>

                <View style={{ margin: Sizes.fixPadding + 10.0, }}>
                    <View style={{
                        backgroundColor: Colors.whiteColor,
                        elevation: 2.0,
                        paddingVertical: Sizes.fixPadding - 5.0,
                    }}>
                        <Text style={{ textAlign: 'center', ...Fonts.primaryColor14SemiBold }}>
                            Order
                        </Text>

                        <View style={styles.dialogDividerStyle} />

                        <View style={{ paddingHorizontal: Sizes.fixPadding, }}>
                            {dialogItem.orderItems.map((item, index) => (
                                <View
                                    key={`${index}`}
                                    style={styles.dialogCommonStyle}
                                >
                                    <Text style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                                        {item.item}
                                    </Text>
                                    <Text style={{ ...Fonts.blackColor14Medium }}>
                                        {`$`}{item.amount}
                                    </Text>
                                </View>
                            ))}

                            <View style={styles.dialogCommonStyle}>
                                <Text style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                                    Delivery Charge
                                </Text>
                                <Text style={{ ...Fonts.blackColor14Medium }}>
                                    $1.50
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ flex: 1, ...Fonts.primaryColor14SemiBold }}>
                                    Total
                                </Text>
                                <Text style={{ ...Fonts.primaryColor14SemiBold }}>
                                    $32.00
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.dialogLocationInfoWrapStyle}>
                        <Text style={{ textAlign: 'center', ...Fonts.primaryColor14SemiBold }}>
                            Location
                        </Text>
                        <View style={styles.dialogDividerStyle} />
                        <View style={{ paddingHorizontal: Sizes.fixPadding }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons
                                    name="location-on"
                                    color={Colors.primaryColor}
                                    size={15}
                                />
                                <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding - 5.0, ...Fonts.blackColor13SemiBold }}>
                                    Street: {dialogItem.deliveryAddress}
                                </Text>
                            </View>
                            <View style={{ width: 15.0, alignItems: 'center' }}>
                                <View style={{ marginBottom: Sizes.fixPadding - 8.0, ...styles.addressIndicatorStyle, }} />
                                <View style={{ marginBottom: Sizes.fixPadding - 8.0, ...styles.addressIndicatorStyle, }} />
                                <View style={{ marginBottom: Sizes.fixPadding - 8.0, ...styles.addressIndicatorStyle, }} />
                                <View style={styles.addressIndicatorStyle} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                <Image
                                    source={require('../../assets/images/icons/direaction.png')}
                                    style={{
                                        width: 15.0, height: 12.0, resizeMode: 'contain',
                                        tintColor: Colors.primaryColor,
                                    }} />
                                <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding - 5.0, ...Fonts.blackColor13SemiBold }}>
                                    Street: {dialogItem.pickupAddress}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: Colors.whiteColor,
                        elevation: 2.0,
                        paddingVertical: Sizes.fixPadding - 5.0,
                    }}>
                        <Text style={{ textAlign: 'center', ...Fonts.primaryColor14SemiBold }}>
                            Customer
                        </Text>
                        <View style={styles.dialogDividerStyle} />
                        <View style={{ paddingHorizontal: Sizes.fixPadding, }}>
                            <View style={{ marginBottom: Sizes.fixPadding - 5.0, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                                    Name
                                </Text>
                                <Text style={{ ...Fonts.blackColor14Medium }}>
                                    {dialogItem.customerName}
                                </Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                                    Mobile Number
                                </Text>
                                <Text style={{ ...Fonts.blackColor14Medium }}>
                                    {dialogItem.customerMobileNo}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.dialogPaymentInfoWrapStyle}>
                        <Text style={{ textAlign: 'center', ...Fonts.primaryColor14SemiBold }}>
                            Payment
                        </Text>
                        <View style={styles.dialogDividerStyle} />
                        <View style={{ paddingHorizontal: Sizes.fixPadding, }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                                    payment Method
                                </Text>
                                <Text style={{ ...Fonts.blackColor14Medium }}>
                                    {dialogItem.paymentMethod}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => { updateState({ showOrderDetailDialog: false }) }}
                        style={styles.startButtonStyle}
                    >
                        <Text style={{ ...Fonts.whiteColor15Bold }}>
                            Ok
                        </Text>
                    </TouchableOpacity>
                </View>
            </Dialog.Container>
        )
    }

    function orderCompletedDialog() {
        return (
            <Dialog.Container
                visible={showOrderCompletedDialog}
                contentStyle={styles.dialogContainerStyle}
                onRequestClose={() => updateState({ showOrderCompletedDialog: false })}
                headerStyle={{ padding: 0.0, margin: 0.0, }}
            >
                <View style={{ alignItems: 'center', padding: Sizes.fixPadding }}>
                    <Image
                        source={require('../../assets/images/icons/finish.png')}
                        style={{ width: 50.0, height: 50.0, tintColor: Colors.primaryColor, }}
                    />
                    <Text style={{ marginTop: Sizes.fixPadding, ...Fonts.blackColor13Regular }}>
                        Congratulation Order completed.
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 8.0, textAlign: 'center', ...Fonts.blackColor13SemiBold }}>
                        You have completed order number{`\n`}ACR147852
                    </Text>
                </View>
            </Dialog.Container>
        )
    }

    function deliveryInfo() {
        return (
            <View style={styles.deliveryInfoWrapStyle}>
                <View style={{ marginHorizontal: Sizes.fixPadding * 2.0, }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => updateState({ showOrderDetailDialog: true })}
                        style={{ ...styles.noteAndPhoneIconWrapStyle, marginBottom: Sizes.fixPadding, }}
                    >
                        <Image
                            source={require('../../assets/images/icons/order_detail.png')}
                            style={{ width: 20.0, height: 20.0, resizeMode: 'contain' }}
                        />
                    </TouchableOpacity>
                    <View style={{ ...styles.noteAndPhoneIconWrapStyle, marginBottom: Sizes.fixPadding + 10.0, }}>
                        <MaterialIcons
                            name="phone"
                            color={Colors.blackColor}
                            size={20}
                        />
                    </View>
                </View>

                <View style={{ backgroundColor: Colors.bodyBackColor, padding: Sizes.fixPadding, }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/images/users/user2.png')}
                            style={{ width: 60.0, height: 60.0, borderRadius: 30.0, }}
                        />
                        <View style={{ marginLeft: Sizes.fixPadding, flex: 1, }}>
                            <Text style={{ marginBottom: Sizes.fixPadding + 5.0, ...Fonts.blackColor14SemiBold }}>
                                Aaron Doe
                            </Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialIcons
                                    name="location-on"
                                    color={Colors.primaryColor}
                                    size={15}
                                />
                                <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding - 5.0, ...Fonts.blackColor13SemiBold }}>
                                    Street: 48, Hunters Road, Vepery
                                </Text>
                            </View>
                            <View style={{ width: 15.0, alignItems: 'center' }}>
                                <View style={{ marginBottom: Sizes.fixPadding - 8.0, ...styles.addressIndicatorStyle, }} />
                                <View style={{ marginBottom: Sizes.fixPadding - 8.0, ...styles.addressIndicatorStyle, }} />
                                <View style={{ marginBottom: Sizes.fixPadding - 8.0, ...styles.addressIndicatorStyle, }} />
                                <View style={styles.addressIndicatorStyle} />
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <View style={{ paddingBottom: Sizes.fixPadding - 5.0, flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                                    <Image
                                        source={require('../../assets/images/icons/direaction.png')}
                                        style={{
                                            width: 15.0, height: 12.0, resizeMode: 'contain',
                                            tintColor: Colors.primaryColor,
                                        }} />
                                    <Text numberOfLines={1} style={{ flex: 1, marginLeft: Sizes.fixPadding - 5.0, ...Fonts.blackColor13SemiBold }}>
                                        Street: Great Western, Mcc Lane, Fort
                                    </Text>
                                </View>
                                <View style={styles.arrowForwardIconWrapStyle} >
                                    <MaterialIcons
                                        name="arrow-forward"
                                        color={Colors.whiteColor}
                                        size={20}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            updateState({ showOrderCompletedDialog: true })
                            setTimeout(() => {
                                updateState({ showOrderCompletedDialog: false })
                                navigation.push('BottomTabBar')
                            }, 2000);
                        }}
                        style={styles.finishButtonStyle}>
                        <Text style={{ ...Fonts.whiteColor15Bold }}>
                            Finish
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    function mapView() {
        return (
            <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
                <MapView
                    style={{ flex: 1, }}
                    initialRegion={{
                        latitude: 22.6292757,
                        longitude: 88.444781,
                        latitudeDelta: 0.03,
                        longitudeDelta: 0.03,
                    }}
                >
                    <MapViewDirections
                        origin={deliveryBoyMarker}
                        destination={deliveryMarker}
                        apikey={Key.apiKey}
                        lineDashPattern={[1]}
                        lineCap="square"
                        strokeColor={Colors.blackColor}
                        strokeWidth={Platform.OS == 'ios' ? 1 : 3}
                    />
                    <Marker coordinate={deliveryBoyMarker}>
                        <Image
                            source={require('../../assets/images/marker2.png')}
                            style={{ width: 30.0, height: 30.0 }}
                        />
                    </Marker>
                    <Marker coordinate={deliveryMarker}>
                        <Image
                            source={require('../../assets/images/marker1.png')}
                            style={{ width: 20.0, height: 20.0 }}
                        />
                    </Marker>
                </MapView>
            </View>
        )
    }

    function header() {
        return (
            <View style={styles.headerWrapStyle}>
                <MaterialIcons
                    name="arrow-back-ios"
                    color={Colors.blackColor}
                    size={22}
                    onPress={() => navigation.pop()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerWrapStyle: {
        position: 'absolute',
        top: 30.0,
        left: 20.0,
    },
    addressIndicatorStyle: {
        width: 3.0,
        height: 3.0,
        borderRadius: 2.0,
        backgroundColor: Colors.blackColor
    },
    noteAndPhoneIconWrapStyle: {
        width: 40.0,
        height: 40.0,
        borderRadius: 20.0,
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        ...CommonStyles.shadow
    },
    finishButtonStyle: {
        backgroundColor: Colors.primaryColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        alignSelf: 'center',
        paddingHorizontal: Sizes.fixPadding * 4.0,
        marginTop: Sizes.fixPadding,
    },
    deliveryInfoWrapStyle: {
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
        right: 0.0,
        ...CommonStyles.shadow
    },
    dialogContainerStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 80,
        backgroundColor: Colors.bodyBackColor,
        padding: 0.0,
    },
    orderDetailDialogStyle: {
        borderRadius: Sizes.fixPadding,
        width: width - 40,
        backgroundColor: Colors.bodyBackColor,
        padding: 0.0,
    },
    dialogPaymentInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        marginTop: Sizes.fixPadding,
    },
    startButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center', justifyContent: 'center',
        marginTop: Sizes.fixPadding * 2.0,
    },
    dialogCommonStyle: {
        marginBottom: Sizes.fixPadding - 5.0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dialogDividerStyle: {
        backgroundColor: Colors.blackColor,
        height: 1.5,
        marginVertical: Sizes.fixPadding - 5.0,
    },
    dialogOredrIdWrapStyle: {
        backgroundColor: Colors.blackColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Sizes.fixPadding,
    },
    dialogLocationInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        paddingVertical: Sizes.fixPadding - 5.0,
        marginVertical: Sizes.fixPadding,
    },
});

export default DeliveryDetailWithMapScreen;