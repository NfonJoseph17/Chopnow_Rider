import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
} from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import Dialog from "react-native-dialog";
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get("window");

const newDeliveriesList = [
  {
    id: "1",
    orderId: "ACR148856",
    paymentMethod: "MTN Mobile Money",
    // totalPayment: 32.0,
    orderTime: "1 min ago",
    deliveryAddress: "Room 24, Standard lodge, Bambili",
    pickupAddress: "Las Vegas Complext",
  },
  {
    id: "2",
    orderId: "AWQ145698",
    paymentMethod: "MTN Mobile Money",
    // totalPayment: 35.0,
    orderTime: "2 min ago",
    deliveryAddress: "Carlson's Lodge, Bambili",
    pickupAddress: "legacy restaurant ENS street, Bambili",
  },
  {
    id: "3",
    orderId: "TRE123654",
    paymentMethod: "MTN Mobile money",
    // totalPayment: 40.0,
    orderTime: "25 min ago",
    deliveryAddress: "Standard Lodge, Bambili",
    pickupAddress: "Crush in Black Rose Restaurant, Bambili",
  },
  
];

const activeDeliveriesList = [
  {
    id: "1",
    orderId: "ACR148856",
    paymentMethod: "Online",
    totalPayment: 32.0,
    orderTime: "1 min ago",
    deliveryAddress: "48, Hunters Road, Vepery",
    pickupAddress: "Great Western, Mcc Lane, Fort",
  },
  {
    id: "2",
    orderId: "AWQ145698",
    paymentMethod: "Cash on delivery",
    totalPayment: 35.0,
    orderTime: "20 min ago",
    deliveryAddress: "491, Sai Section, Ambernath",
    pickupAddress: "21, 5th Cross Doble Road...",
  },
  {
    id: "3",
    orderId: "TRE123654",
    paymentMethod: "Online",
    totalPayment: 40.0,
    orderTime: "45 min ago",
    deliveryAddress: "175, Jawahar Ngr, Amizara",
    pickupAddress: "Jaina Tower Distt Centre...",
  },
  {
    id: "4",
    orderId: "TSA123698",
    paymentMethod: "Online",
    totalPayment: 40.0,
    orderTime: "55 min ago",
    deliveryAddress: "48, Hunters Road, Vepery",
    pickupAddress: "Great Western, Mcc Lane, Fort",
  },
  {
    id: "5",
    orderId: "TSA123698",
    paymentMethod: "Online",
    totalPayment: 40.0,
    orderTime: "1h ago",
    deliveryAddress: "48, Hunters Road, Vepery",
    pickupAddress: "Great Western, Mcc Lane, Fort",
  },
];

const AvailableDeliveriesScreen = ({ navigation }) => {
  const [state, setState] = useState({
    selectedTabIndex: 1,
    showActiveDeliveryOrderDialog: false,
    rejectReson: null,
  });

  const [showNewDeliveryOrderDialog, setShowNewDeliveryOrderDialog] =
    useState(false);
  const [showRejectOrderDialog, setShowRejectOrderDialog] = useState(false);

  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const {
    selectedTabIndex,
    showActiveDeliveryOrderDialog,
    rejectReson,
  } = state;

  const dialogItem = {
    id: "1",
    orderId: "ACR147852",
    paymentMethod: "MTN Mobile Money",
    totalPayment: 500.0,
    deliveryAddress: "Room 24 Standard Lodge, Bambili",
    pickupAddress: "Las Vegas Complext",
    orderItems: [
      {
        item: "Deal 1",
        amount: 28.0,
      },
      {
        item: "7up Regular 250ml",
        amount: 2.5,
      },
    ],
    customerName: "Jeannoel",
    customerMobileNo: "+237 680787547",
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {newAndActiveDeliveriesTab()}
        {state.selectedTabIndex == 1 ? (
          <>
            {newDeliveries()}
            {newDeliveryOrderDialog()}
            {rejectOrderDialog()}
          </>
        ) : (
          <>
            {activeDeliveries()}
            {activeDeliveryOrderDialog()}
          </>
        )}
      </View>
    </View>
  );

  function activeDeliveryOrderDialog() {
    return (
      <Dialog.Container
        visible={showActiveDeliveryOrderDialog}
        contentStyle={styles.dialogContainerStyle}
        onBackdropPress={() =>
          updateState({ showActiveDeliveryOrderDialog: false })
        }
        headerStyle={{ padding: 0.0, margin: 0.0 }}
      >
        <View style={styles.dialogOredrIdWrapStyle}>
          <Text style={{ ...Fonts.whiteColor14SemiBold }}>
            Order ID: {dialogItem.orderId}
          </Text>
        </View>

        <View style={{ margin: Sizes.fixPadding + 10.0 }}>
          <View
            style={{
              backgroundColor: Colors.whiteColor,
              elevation: 2.0,
              paddingVertical: Sizes.fixPadding - 5.0,
            }}
          >
            <Text
              style={{ textAlign: "center", ...Fonts.primaryColor14SemiBold }}
            >
              Order
            </Text>

            <View style={styles.dialogDividerStyle} />

            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
              {dialogItem.orderItems.map((item, index) => (
                <View key={`${index}`} style={styles.dialogCommonStyle}>
                  <Text style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                    {item.item}
                  </Text>
                  <Text style={{ ...Fonts.blackColor14Medium }}>
                    {`$`}
                    {item.amount}
                  </Text>
                </View>
              ))}

              <View style={styles.dialogCommonStyle}>
                <Text style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                  Delivery Charge
                </Text>
                <Text style={{ ...Fonts.blackColor14Medium }}>$1.50</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ flex: 1, ...Fonts.primaryColor14SemiBold }}>
                  Total
                </Text>
                <Text style={{ ...Fonts.primaryColor14SemiBold }}>$32.00</Text>
              </View>
            </View>
          </View>

          <View style={styles.dialogLocationInfoWrapStyle}>
            <Text
              style={{ textAlign: "center", ...Fonts.primaryColor14SemiBold }}
            >
              Location
            </Text>
            <View style={styles.dialogDividerStyle} />
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="location-on"
                  color={Colors.primaryColor}
                  size={15}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    marginLeft: Sizes.fixPadding - 5.0,
                    ...Fonts.blackColor13SemiBold,
                  }}
                >
                  delivery: {dialogItem.deliveryAddress}
                </Text>
              </View>
              <View style={{ width: 15.0, alignItems: "center" }}>
                <View
                  style={{
                    marginBottom: Sizes.fixPadding - 8.0,
                    ...styles.addressIndicatorStyle,
                  }}
                />
                <View
                  style={{
                    marginBottom: Sizes.fixPadding - 8.0,
                    ...styles.addressIndicatorStyle,
                  }}
                />
                <View
                  style={{
                    marginBottom: Sizes.fixPadding - 8.0,
                    ...styles.addressIndicatorStyle,
                  }}
                />
                <View style={styles.addressIndicatorStyle} />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../assets/images/icons/direaction.png")}
                  style={{
                    width: 15.0,
                    height: 12.0,
                    resizeMode: "contain",
                    tintColor: Colors.primaryColor,
                  }}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    marginLeft: Sizes.fixPadding - 5.0,
                    ...Fonts.blackColor13SemiBold,
                  }}
                >
                  Pickup: {dialogItem.pickupAddress}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: Colors.whiteColor,
              elevation: 2.0,
              paddingVertical: Sizes.fixPadding - 5.0,
            }}
          >
            <Text
              style={{ textAlign: "center", ...Fonts.primaryColor14SemiBold }}
            >
              Customer
            </Text>
            <View style={styles.dialogDividerStyle} />
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
              <View
                style={{
                  marginBottom: Sizes.fixPadding - 5.0,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                  Name
                </Text>
                <Text style={{ ...Fonts.blackColor14Medium }}>
                  {dialogItem.customerName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
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
            <Text
              style={{ textAlign: "center", ...Fonts.primaryColor14SemiBold }}
            >
              Payment
            </Text>
            <View style={styles.dialogDividerStyle} />
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
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
            onPress={() => {
              updateState({ showActiveDeliveryOrderDialog: false });
              navigation.push("DeliveryDetailWithMap");
            }}
            style={styles.startButtonStyle}
          >
            <Text style={{ ...Fonts.whiteColor15Bold }}>Start</Text>
          </TouchableOpacity>
        </View>
      </Dialog.Container>
    );
  }

  function activeDeliveries() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => updateState({ showActiveDeliveryOrderDialog: true })}
        style={styles.deliveriesInfoWrapStyle}
      >
        <View style={styles.orderInfoWrapStyle}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image
              source={require("../../assets/images/icons/order_food.png")}
              style={{
                width: 32.0,
                height: 32.0,
                resizeMode: "contain",
                tintColor: Colors.blackColor,
              }}
            />
            <View
              style={{
                flex: 1,
                marginTop: Sizes.fixPadding - 15.0,
                marginLeft: Sizes.fixPadding,
              }}
            >
              <Text numberOfLines={1}>
                <Text style={{ ...Fonts.grayColor12Medium }}>Order ID: { }</Text>
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
                  {`$`}
                  {item.totalPayment.toFixed(2)}
                </Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              width: 7.5,
              height: 7.5,
              borderRadius: 3.75,
              backgroundColor: Colors.greenColor,
            }}
          />
        </View>
        <View style={styles.addressInfoWrapStyle}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="location-on"
              color={Colors.primaryColor}
              size={15}
            />
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                marginLeft: Sizes.fixPadding - 5.0,
                ...Fonts.blackColor13SemiBold,
              }}
            >
              Delivery: {item.deliveryAddress}
            </Text>
          </View>
          <View style={{ width: 15.0, alignItems: "center" }}>
            <View
              style={{
                marginBottom: Sizes.fixPadding - 8.0,
                ...styles.addressIndicatorStyle,
              }}
            />
            <View
              style={{
                marginBottom: Sizes.fixPadding - 8.0,
                ...styles.addressIndicatorStyle,
              }}
            />
            <View
              style={{
                marginBottom: Sizes.fixPadding - 8.0,
                ...styles.addressIndicatorStyle,
              }}
            />
            <View style={styles.addressIndicatorStyle} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                paddingBottom: Sizes.fixPadding - 5.0,
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/icons/direaction.png")}
                style={{
                  width: 15.0,
                  height: 12.0,
                  resizeMode: "contain",
                  tintColor: Colors.primaryColor,
                }}
              />
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  marginLeft: Sizes.fixPadding - 5.0,
                  ...Fonts.blackColor13SemiBold,
                }}
              >
                Pickup: {item.pickupAddress}
              </Text>
            </View>
            <View style={styles.arrowForwardIconWrapStyle}>
              <MaterialIcons
                name="arrow-forward"
                color={Colors.whiteColor}
                size={20}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={activeDeliveriesList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0 }}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function rejectOrderDialog() {
    return (
      <Dialog.Container
        visible={showRejectOrderDialog}
        contentStyle={styles.rejectDialogContainerStyle}
        onBackdropPress={() => setShowRejectOrderDialog(false)}
        headerStyle={{ padding: 0.0, margin: 0.0 }}
      >
        <View
          style={{
            backgroundColor: Colors.whiteColor,
            padding: Platform.OS == "ios" ? Sizes.fixPadding * 2.0 : 0,
          }}
        >
          <Text style={{ textAlign: "center", ...Fonts.blackColor14SemiBold }}>
            Write a specific reson to reject order.
          </Text>
          <TextInput
            placeholder="Write here..."
            placeholderTextColor={Colors.grayColor}
            value={rejectReson}
            onChangeText={(value) => updateState({ rejectReson: value })}
            selectionColor={Colors.primaryColor}
            style={styles.rejectResonTextFieldStyle}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setShowRejectOrderDialog(false)}
              style={{
                ...styles.cancelAndSendButtonStyle,
                marginRight: Sizes.fixPadding,
              }}
            >
              <Text style={{ ...Fonts.primaryColor15Bold }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setShowRejectOrderDialog(false)}
              style={{
                marginLeft: Sizes.fixPadding,
                backgroundColor: Colors.primaryColor,
                ...styles.cancelAndSendButtonStyle,
              }}
            >
              <Text style={{ ...Fonts.whiteColor15Bold }}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>
    );
  }

  function newDeliveryOrderDialog() {
    return (
      <Dialog.Container
        visible={showNewDeliveryOrderDialog}
        contentStyle={styles.dialogContainerStyle}
        onBackdropPress={() => setShowNewDeliveryOrderDialog(false)}
        headerStyle={{ padding: 0.0, margin: 0.0 }}
      >
        <View style={styles.dialogOredrIdWrapStyle}>
          <Text style={{ ...Fonts.whiteColor14SemiBold }}>
            Order ID: {dialogItem.orderId}
          </Text>
        </View>

        <View style={{ margin: Sizes.fixPadding + 10.0 }}>
          <View
            style={{
              backgroundColor: Colors.whiteColor,
              elevation: 2.0,
              paddingVertical: Sizes.fixPadding - 5.0,
            }}
          >
            <Text
              style={{ textAlign: "center", ...Fonts.primaryColor14SemiBold }}
            >
              Order
            </Text>

            <View style={styles.dialogDividerStyle} />

            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
              {dialogItem.orderItems.map((item, index) => (
                <View key={`${index}`} style={styles.dialogCommonStyle}>
                  {/* <Text style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                    {item.item}
                  </Text> */}
                  {/* <Text style={{ ...Fonts.blackColor14Medium }}>
                    {`$`}
                    {item.amount}
                  </Text> */}
                </View>
              ))}

              <View style={styles.dialogCommonStyle}>
                <Text style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                  Delivery Charge
                </Text>
                <Text style={{ ...Fonts.blackColor14Medium }}>500.0</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ flex: 1, ...Fonts.primaryColor14SemiBold }}>
                  Total
                </Text>
                <Text style={{ ...Fonts.primaryColor14SemiBold }}>500.0 XAF</Text>
              </View>
            </View>
          </View>

          <View style={styles.dialogLocationInfoWrapStyle}>
            <Text
              style={{ textAlign: "center", ...Fonts.primaryColor14SemiBold }}
            >
              Location
            </Text>
            <View style={styles.dialogDividerStyle} />
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialIcons
                  name="location-on"
                  color={Colors.primaryColor}
                  size={15}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    marginLeft: Sizes.fixPadding - 5.0,
                    ...Fonts.blackColor13SemiBold,
                  }}
                >
                  Delivery: {dialogItem.deliveryAddress}
                </Text>
              </View>
              <View style={{ width: 15.0, alignItems: "center" }}>
                <View
                  style={{
                    marginBottom: Sizes.fixPadding - 8.0,
                    ...styles.addressIndicatorStyle,
                  }}
                />
                <View
                  style={{
                    marginBottom: Sizes.fixPadding - 8.0,
                    ...styles.addressIndicatorStyle,
                  }}
                />
                <View
                  style={{
                    marginBottom: Sizes.fixPadding - 8.0,
                    ...styles.addressIndicatorStyle,
                  }}
                />
                <View style={styles.addressIndicatorStyle} />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../assets/images/icons/direaction.png")}
                  style={{
                    width: 15.0,
                    height: 12.0,
                    resizeMode: "contain",
                    tintColor: Colors.primaryColor,
                  }}
                />
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    marginLeft: Sizes.fixPadding - 5.0,
                    ...Fonts.blackColor13SemiBold,
                  }}
                >
                  Pickup: {dialogItem.pickupAddress}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              backgroundColor: Colors.whiteColor,
              elevation: 2.0,
              paddingVertical: Sizes.fixPadding - 5.0,
            }}
          >
            <Text
              style={{ textAlign: "center", ...Fonts.primaryColor14SemiBold }}
            >
              Customer
            </Text>
            <View style={styles.dialogDividerStyle} />
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
              <View
                style={{
                  marginBottom: Sizes.fixPadding - 5.0,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                  Name
                </Text>
                <Text style={{ ...Fonts.blackColor14Medium }}>
                  {dialogItem.customerName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
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
            <Text
              style={{ textAlign: "center", ...Fonts.primaryColor14SemiBold }}
            >
              Payment
            </Text>
            <View style={styles.dialogDividerStyle} />
            <View style={{ paddingHorizontal: Sizes.fixPadding }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ flex: 1, ...Fonts.blackColor14Medium }}>
                  payment Method
                </Text>
                <Text style={{ ...Fonts.blackColor14Medium }}>
                  {dialogItem.paymentMethod}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.acceptAndRejectButtonWrapStyle}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setShowNewDeliveryOrderDialog(false);
                setTimeout(() => {
                  setShowRejectOrderDialog(true);
                }, 500);
              }}
              style={{ ...styles.acceptAndRejectButtonStyle }}
            >
              <Text style={{ ...Fonts.primaryColor15Bold }}>Reject</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                setShowNewDeliveryOrderDialog(false);
                navigation.push("DeliveryDetailWithMap");
              }}
              style={{
                backgroundColor: Colors.primaryColor,
                ...styles.acceptAndRejectButtonStyle,
              }}
            >
              <Text style={{ ...Fonts.whiteColor15Bold }}>Accept</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Dialog.Container>
    );
  }

  function newDeliveries() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setShowNewDeliveryOrderDialog(true)}
        style={styles.deliveriesInfoWrapStyle}
      >
        <View style={styles.orderInfoWrapStyle}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image
              source={require("../../assets/images/icons/order_food.png")}
              style={{
                width: 32.0,
                height: 32.0,
                resizeMode: "contain",
                tintColor: Colors.blackColor,
              }}
            />
            <View
              style={{
                flex: 1,
                marginTop: Sizes.fixPadding - 15.0,
                marginLeft: Sizes.fixPadding,
              }}
            >
              <Text numberOfLines={1}>
                <Text style={{ ...Fonts.grayColor12Medium }}>Order ID: { }</Text>
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
              {/* <Text numberOfLines={1}>
                <Text style={{ ...Fonts.grayColor12Medium }}>
                  Total Payment: { }
                </Text>
                <Text style={{ ...Fonts.blackColor14SemiBold }}>
                  {`$`}
                  {item.totalPayment.toFixed(2)}
                </Text>
              </Text> */}
            </View>
          </View>
          <Text
            style={{
              marginTop: Sizes.fixPadding - 15.0,
              ...Fonts.grayColor9Medium,
            }}
          >
            {item.orderTime}
          </Text>
        </View>
        <View style={styles.addressInfoWrapStyle}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialIcons
              name="location-on"
              color={Colors.primaryColor}
              size={15}
            />
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                marginLeft: Sizes.fixPadding - 5.0,
                ...Fonts.blackColor13SemiBold,
              }}
            >
              Delivery: {item.deliveryAddress}
            </Text>
          </View>
          <View style={{ width: 15.0, alignItems: "center" }}>
            <View
              style={{
                marginBottom: Sizes.fixPadding - 8.0,
                ...styles.addressIndicatorStyle,
              }}
            />
            <View
              style={{
                marginBottom: Sizes.fixPadding - 8.0,
                ...styles.addressIndicatorStyle,
              }}
            />
            <View
              style={{
                marginBottom: Sizes.fixPadding - 8.0,
                ...styles.addressIndicatorStyle,
              }}
            />
            <View style={styles.addressIndicatorStyle} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                paddingBottom: Sizes.fixPadding - 5.0,
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/icons/direaction.png")}
                style={{
                  width: 15.0,
                  height: 12.0,
                  resizeMode: "contain",
                  tintColor: Colors.primaryColor,
                }}
              />
              <Text
                numberOfLines={1}
                style={{
                  flex: 1,
                  marginLeft: Sizes.fixPadding - 5.0,
                  ...Fonts.blackColor13SemiBold,
                }}
              >
                Pickup: {item.pickupAddress}
              </Text>
            </View>
            <View style={styles.arrowForwardIconWrapStyle}>
              <MaterialIcons
                name="arrow-forward"
                color={Colors.whiteColor}
                size={20}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={newDeliveriesList}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{ paddingTop: Sizes.fixPadding * 2.0 }}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function newAndActiveDeliveriesTab() {
    return (
      <View style={styles.newAndActiveDeliveriesTabStyle}>
        {tabBarOptions({ index: 1, option: "New Deliveries" })}
        {tabBarOptions({ index: 2, option: "Active Deliveries" })}
      </View>
    );
  }

  function tabBarOptions({ index, option }) {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => updateState({ selectedTabIndex: index })}
        style={{ flex: 1 }}
      >
        <Text
          style={{
            paddingVertical: Sizes.fixPadding,
            textAlign: "center",
            ...Fonts.blackColor14SemiBold,
          }}
        >
          {option}
        </Text>
        <View
          style={{
            backgroundColor:
              selectedTabIndex == index ? Colors.blackColor : "transparent",
            height: 1.0,
          }}
        />
      </TouchableOpacity>
    );
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
        <Text
          style={{
            marginLeft: Sizes.fixPadding - 5.0,
            flex: 1,
            ...Fonts.blackColor18SemiBold,
          }}
        >
          Available Deliveries
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  headerWrapStyle: {
    margin: Sizes.fixPadding * 2.0,
    flexDirection: "row",
    alignItems: "center",
  },
  newAndActiveDeliveriesTabStyle: {
    backgroundColor: Colors.lightGrayColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Sizes.fixPadding * 3.0,
  },
  deliveriesInfoWrapStyle: {
    borderRadius: Sizes.fixPadding,
    elevation: 2.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    backgroundColor: Colors.whiteColor,
    marginBottom: Sizes.fixPadding * 2.0,
    ...CommonStyles.shadow
  },
  orderInfoWrapStyle: {
    paddingHorizontal: Sizes.fixPadding - 5.0,
    paddingTop: Sizes.fixPadding,
    paddingBottom: Sizes.fixPadding - 5.0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addressInfoWrapStyle: {
    paddingLeft: Sizes.fixPadding,
    paddingTop: Sizes.fixPadding - 5.0,
    backgroundColor: Colors.lightGrayColor,
    borderBottomLeftRadius: Sizes.fixPadding,
    borderBottomRightRadius: Sizes.fixPadding,
  },
  addressIndicatorStyle: {
    width: 3.0,
    height: 3.0,
    borderRadius: 2.0,
    backgroundColor: Colors.blackColor,
  },
  arrowForwardIconWrapStyle: {
    backgroundColor: Colors.primaryColor,
    borderBottomRightRadius: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Sizes.fixPadding - 6.0,
    marginBottom: -2.0,
  },
  dialogContainerStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 40,
    backgroundColor: Colors.bodyBackColor,
    padding: 0.0,
  },
  rejectDialogContainerStyle: {
    borderRadius: Sizes.fixPadding,
    width: width - 80,
    backgroundColor: Colors.whiteColor,
  },
  dialogDividerStyle: {
    backgroundColor: Colors.blackColor,
    height: 1.5,
    marginVertical: Sizes.fixPadding - 5.0,
  },
  dialogOredrIdWrapStyle: {
    backgroundColor: Colors.blackColor,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Sizes.fixPadding,
  },
  dialogLocationInfoWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 2.0,
    paddingVertical: Sizes.fixPadding - 5.0,
    marginVertical: Sizes.fixPadding,
  },
  acceptAndRejectButtonStyle: {
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: Sizes.fixPadding,
  },
  acceptAndRejectButtonWrapStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding * 2.0,
  },
  dialogCommonStyle: {
    marginBottom: Sizes.fixPadding - 5.0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cancelAndSendButtonStyle: {
    borderColor: Colors.primaryColor,
    borderWidth: 1.0,
    borderRadius: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  rejectResonTextFieldStyle: {
    ...Fonts.blackColor12Medium,
    borderBottomColor: Colors.grayColor,
    borderBottomWidth: 1.0,
    marginTop: Sizes.fixPadding - 5.0,
    marginBottom: Sizes.fixPadding * 2.0,
    marginTop: Sizes.fixPadding,
    paddingBottom: Platform.OS == 'ios' ? Sizes.fixPadding - 5.0 : 0,
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
    alignItems: "center",
    justifyContent: "center",
    marginTop: Sizes.fixPadding * 2.0,
  },
});

export default AvailableDeliveriesScreen;
