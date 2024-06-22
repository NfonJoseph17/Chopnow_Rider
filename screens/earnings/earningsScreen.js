import React from "react";
import {  View,  FlatList, StyleSheet, Text } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";

const todaysEarningsList = [
    {
        id: '1',
        orderId: 'ACR147852',
        date: '22-06-2024',
        amount: 500.00,
    },
    {
        id: '2',
        orderId: 'FTR159874',
        date: '22-06-2024',
        amount: 500.00,
    },
    {
        id: '3',
        orderId: 'BHT123698',
        date: '22-06-2024',
        amount: 500.00,
    },
    {
        id: '4',
        orderId: 'NHJ159856',
        date: '22-06-2024',
        amount: 500.00,
    },
];

const yesterdaysEarningsList = [
    {
        id: '1',
        orderId: 'GTS123654',
        date: '21-06-2024',
        amount: 500.00,
    },
    {
        id: '2',
        orderId: 'FST123698',
        date: '21-06-2024',
        amount: 500.00,
    },
    {
        id: '3',
        orderId: 'BHT123698',
        date: '21-06-2024',
        amount: 500.00,
    },
    {
        id: '4',
        orderId: 'NHJ159856',
        date: '21-06-2024',
        amount: 500.00,
    },
];

const EarningsScreen = ({ navigation }) => {
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
            <View style={styles.earningOrderInfoWrapStyle}>
                <Text>
                    <Text style={{ ...Fonts.grayColor12Medium }}>
                        Order ID: { }
                    </Text>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        {item.orderId}
                    </Text>
                </Text>
                <Text>
                    <Text style={{ ...Fonts.grayColor12Medium }}>
                        Date: { }
                    </Text>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        {item.date}
                    </Text>
                </Text>
                <Text style={{ alignSelf: 'flex-end', ...Fonts.primaryColor14SemiBold }}>
                    {item.amount.toFixed(2)}{` XAF`}
                </Text>
            </View>
        )
        return (
            <View>
                <View style={{
                    backgroundColor: Colors.lightGrayColor,
                    paddingHorizontal: Sizes.fixPadding * 2.0,
                    paddingVertical: Sizes.fixPadding,
                }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        Yesterday
                    </Text>
                </View>
                <View style={styles.totalEarningWithDateWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor12SemiBold }}>
                        Yesterday
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.whiteColor15SemiBold }}>
                        2000.00 XAF
                    </Text>
                    <Text style={{ ...Fonts.whiteColor12Medium }}>
                        21 Jun, 2024
                    </Text>
                </View>
                <FlatList
                    listKey="yesterdaysList"
                    data={yesterdaysEarningsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                />
            </View>
        )
    }

    function todaysInfo() {

        const renderItem = ({ item }) => (
            <View style={styles.earningOrderInfoWrapStyle}>
                <Text>
                    <Text style={{ ...Fonts.grayColor12Medium }}>
                        Order ID: { }
                    </Text>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        {item.orderId}
                    </Text>
                </Text>
                <Text>
                    <Text style={{ ...Fonts.grayColor12Medium }}>
                        Date: { }
                    </Text>
                    <Text style={{ ...Fonts.blackColor14SemiBold }}>
                        {item.date}
                    </Text>
                </Text>
                <Text style={{ alignSelf: 'flex-end', ...Fonts.primaryColor14SemiBold }}>
                    {item.amount.toFixed(2)}{` XAF`}
                </Text>
            </View>
        )
        return (
            <View>
                <View style={{
                    backgroundColor: Colors.lightGrayColor,
                    paddingHorizontal: Sizes.fixPadding * 2.0,
                    paddingVertical: Sizes.fixPadding,
                }}>
                    <Text style={{ ...Fonts.blackColor16SemiBold }}>
                        Today
                    </Text>
                </View>
                <View style={styles.totalEarningWithDateWrapStyle}>
                    <Text style={{ ...Fonts.whiteColor12SemiBold }}>
                        Today
                    </Text>
                    <Text style={{ marginTop: Sizes.fixPadding - 5.0, ...Fonts.whiteColor15SemiBold }}>
                        2000.00 XAF
                    </Text>
                    <Text style={{ ...Fonts.whiteColor12Medium }}>
                        22 Jun, 2024
                    </Text>
                </View>
                <FlatList
                    data={todaysEarningsList}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={renderItem}
                    scrollEnabled={false}
                    listKey="todaysList"
                />
            </View>
        )
    }

    function header() {
        return (
            <Text style={{ margin: Sizes.fixPadding * 2.0, ...Fonts.blackColor18SemiBold }}>
                Earnings
            </Text>
        )
    }
}

const styles = StyleSheet.create({
    earningOrderInfoWrapStyle: {
        backgroundColor: Colors.whiteColor,
        elevation: 2.0,
        borderRadius: Sizes.fixPadding,
        marginHorizontal: Sizes.fixPadding * 2.0,
        padding: Sizes.fixPadding - 5.0,
        marginBottom: Sizes.fixPadding * 2.0,
        ...CommonStyles.shadow
    },
    totalEarningWithDateWrapStyle: {
        backgroundColor: Colors.blackColor,
        borderRadius: Sizes.fixPadding,
        alignSelf: 'flex-start',
        margin: Sizes.fixPadding * 2.0,
        paddingLeft: Sizes.fixPadding,
        paddingVertical: Sizes.fixPadding - 5.0,
        paddingRight: Sizes.fixPadding * 3.0,
    }
});

export default EarningsScreen;