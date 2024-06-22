import React from "react";
import { View, Image, FlatList, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const todaysHistoryList = [
    {
        id: '1',
        orderId: 'ACR147856',
        paymentMethod: 'MTN Mobile Money',
        totalPayment: 500.00,
        orderStatus: 'Pending'
    },
    {
        id: '2',
        orderId: 'AWQ145698',
        paymentMethod: 'MTN Mobile Money',
        totalPayment: 500.00,
        orderStatus: 'Delivered'
    },
    {
        id: '3',
        orderId: 'TRE123654',
        paymentMethod: 'MTN Mobile Money',
        totalPayment: 500.00,
        orderStatus: 'Delivered'
    },
];

const yesterdaysHistoryList = [
    {
        id: '1',
        orderId: 'ACR147856',
        paymentMethod: 'MTN Mobile Money',
        totalPayment: 500.00,
        orderStatus: 'Rejected'
    },
    {
        id: '2',
        orderId: 'AWQ145698',
        paymentMethod: 'MTN Mobile Money',
        totalPayment: 500.00,
        orderStatus: 'Delivered'
    },
    {
        id: '3',
        orderId: 'TRE123654',
        paymentMethod: 'MTN Mobile Money',
        totalPayment: 500.00,
        orderStatus: 'Delivered'
    },
];

const HistoryScreen = ({ navigation }) => {

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <View style={{ flex: 1 }}>
                {header()}
                <FlatList
                    ListHeaderComponent={
                        <>
                            {todaysInfo()}
                            {yesterdaysInfo()}
                        </>
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: Sizes.fixPadding * 7.0
                    }}
                />
            </View>
        </View>
    )

    function yesterdaysInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.orderInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: Sizes.fixPadding - 5.0, }}>
                    <Image
                        source={require('../../assets/images/icons/order_food.png')}
                        style={{ width: 32.0, height: 32.0, resizeMode: 'contain', tintColor: Colors.blackColor, }}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                        <Text numberOfLines={1}>
                            <Text style={{ ...Fonts.grayColor12Medium }}>
                                Order ID: { }
                            </Text>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                {item.orderId}
                            </Text>
                        </Text>
                        <Text numberOfLines={1}>
                            <Text style={{ ...Fonts.grayColor12Medium }}>
                                Payment Method: { }
                            </Text>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                {item.paymentMethod}
                            </Text>
                        </Text>
                        <Text numberOfLines={1}>
                            <Text style={{ ...Fonts.grayColor12Medium }}>
                                Total Payment: { }
                            </Text>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                {item.totalPayment.toFixed(2)}{` XAF`}
                            </Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.orderStatusInfoWrapStyle}>
                    <Text>
                        <Text style={{ ...Fonts.blackColor13SemiBold }}>
                            Order Status: { }
                        </Text>
                        <Text style={{ ...Fonts.primaryColor14SemiBold }}>
                            {item.orderStatus}
                        </Text>
                    </Text>
                </View>
            </View>
        )
        return (
            <View>
                <View style={styles.todayOrYesterdayTitleWrapStyle}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        Yesterday
                    </Text>
                </View>
                <FlatList
                    listKey="yesterdaysHistory"
                    data={yesterdaysHistoryList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function todaysInfo() {
        const renderItem = ({ item }) => (
            <View style={styles.orderInfoWrapStyle}>
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: Sizes.fixPadding - 5.0, }}>
                    <Image
                        source={require('../../assets/images/icons/order_food.png')}
                        style={{ width: 32.0, height: 32.0, resizeMode: 'contain', tintColor: Colors.blackColor, }}
                    />
                    <View style={{ flex: 1, marginLeft: Sizes.fixPadding, }}>
                        <Text numberOfLines={1}>
                            <Text style={{ ...Fonts.grayColor12Medium }}>
                                Order ID: { }
                            </Text>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                {item.orderId}
                            </Text>
                        </Text>
                        <Text numberOfLines={1}>
                            <Text style={{ ...Fonts.grayColor12Medium }}>
                                Payment Method: { }
                            </Text>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                                {item.paymentMethod}
                            </Text>
                        </Text>
                        <Text numberOfLines={1}>
                            <Text style={{ ...Fonts.grayColor12Medium }}>
                                Total Payment: { }
                            </Text>
                            <Text style={{ ...Fonts.blackColor14SemiBold }}>
                               {item.totalPayment.toFixed(2)}{` XAF`}
                            </Text>
                        </Text>
                    </View>
                </View>

                <View style={styles.orderStatusInfoWrapStyle}>
                    <Text>
                        <Text style={{ ...Fonts.blackColor13SemiBold }}>
                            Order Status: { }
                        </Text>
                        <Text style={{ ...Fonts.primaryColor14SemiBold }}>
                            {item.orderStatus}
                        </Text>
                    </Text>
                </View>
            </View>
        )
        return (
            <View>
                <View style={styles.todayOrYesterdayTitleWrapStyle}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        Today
                    </Text>
                </View>
                <FlatList
                    listKey="todaysHistory"
                    data={todaysHistoryList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function header() {
        return (
            <Text style={{ margin: Sizes.fixPadding * 2.0, ...Fonts.blackColor18SemiBold }}>
                History
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    orderInfoWrapStyle: {
        borderRadius: Sizes.fixPadding,
        elevation: 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        backgroundColor: Colors.whiteColor,
        marginBottom: Sizes.fixPadding * 2.0,
        ...CommonStyles.shadow
    },
    orderStatusInfoWrapStyle: {
        padding: Sizes.fixPadding - 5.0,
        backgroundColor: Colors.lightGrayColor,
        borderBottomLeftRadius: Sizes.fixPadding,
        borderBottomRightRadius: Sizes.fixPadding,
    },
    todayOrYesterdayTitleWrapStyle: {
        backgroundColor: Colors.lightGrayColor,
        paddingHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Sizes.fixPadding,
        marginBottom: Sizes.fixPadding * 2.0,
    }
});

export default HistoryScreen;