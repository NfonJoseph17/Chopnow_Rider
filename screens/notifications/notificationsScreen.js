import React, { useState, useRef } from "react";
import {
  View,
  Dimensions,
  Image,
  Animated,
  StyleSheet,
  Text,
} from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { SwipeListView } from "react-native-swipe-list-view";
import { MaterialIcons } from "@expo/vector-icons";
import { Snackbar } from "react-native-paper";
import MyStatusBar from "../../components/myStatusBar";

const { width } = Dimensions.get("window");

const notificationList = [
  {
    key: "1",
    notificationImage: require("../../assets/images/notification/notification1.png"),
    title: `Hurry!!`,
    description: `You successfully delivered your order.`,
    date: "22 mar",
  },
  {
    key: "2",
    notificationImage: require("../../assets/images/notification/notification2.png"),
    title: `Accepted!!`,
    description: `Order number ART123654 successfully accepted. Start delivery now.`,
    date: "22 mar",
  },
  {
    key: "3",
    notificationImage: require("../../assets/images/notification/notification3.png"),
    title: `Rejected!!`,
    description: `Oops! you reject order.`,
    date: "20 mar",
  },
  {
    key: "4",
    notificationImage: require("../../assets/images/notification/notification1.png"),
    title: `Hurry!!`,
    description: `You successfully delivered your order.`,
    date: "19 mar",
  },
  {
    key: "5",
    notificationImage: require("../../assets/images/notification/notification2.png"),
    title: `Accepted!!`,
    description: `Order number ART123654 successfully accepted. Start delivery now.`,
    date: "19 mar",
  },
];

const rowTranslateAnimatedValues = {};

const NotificationsScreen = ({ navigation }) => {
  const [showSnackBar, setShowSnackBar] = useState(false);

  const [snackBarMsg, setSnackBarMsg] = useState("");

  const [listData, setListData] = useState(notificationList);

  Array(listData.length + 1)
    .fill("")
    .forEach((_, i) => {
      rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });

  const animationIsRunning = useRef(false);

  const onSwipeValueChange = (swipeData) => {
    const { key, value } = swipeData;

    if ((value < -width || value > width) && !animationIsRunning.current) {
      animationIsRunning.current = true;
      Animated.timing(rowTranslateAnimatedValues[key], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => {
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.key === key);
        newData.splice(prevIndex, 1);
        const removedItem = listData.find((item) => item.key === key);

        setSnackBarMsg(
          `${removedItem.title ? removedItem.title : ""} dismissed`
        );

        setListData(newData);

        setShowSnackBar(true);

        animationIsRunning.current = false;
      });
    }
  };

  const renderItem = (data) => (
    <View>
      <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
        <View style={styles.notificationWrapStyle}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.notificationIconWrapStyle}>
              <Image
                source={data.item.notificationImage}
                style={{ width: 35.0, height: 35.0, resizeMode: "contain" }}
              />
            </View>
            <View style={{ marginLeft: Sizes.fixPadding, flex: 1 }}>
              {data.item.title ? (
                <Text
                  numberOfLines={1}
                  style={{ ...Fonts.blackColor11Regular }}
                >
                  {data.item.title}
                </Text>
              ) : null}
              <Text numberOfLines={2} style={{ ...Fonts.blackColor11Regular }}>
                {data.item.description}
              </Text>
            </View>
          </View>
          <Text style={styles.notificationDateWrapStyle}>{data.item.date}</Text>
        </View>
      </View>
    </View>
  );

  const renderHiddenItem = () => <View style={styles.rowBack} />;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        <View style={{ backgroundColor: Colors.bodyBackColor, flex: 1 }}>
          {listData.length == 0 ? (
            noNotification()
          ) : (
            <SwipeListView
              data={listData}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-width}
              leftOpenValue={width}
              onSwipeValueChange={onSwipeValueChange}
              useNativeDriver={false}
              contentContainerStyle={{
                paddingTop: Sizes.fixPadding - 8.0,
                paddingBottom: Sizes.fixPadding,
              }}
              showsVerticalScrollIndicator={false}
            />
          )}
          <Snackbar
            style={styles.snackBarStyle}
            visible={showSnackBar}
            onDismiss={() => setShowSnackBar(false)}
          >
            {snackBarMsg}
          </Snackbar>
        </View>
      </View>
    </View>
  );

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
          Notifications
        </Text>
      </View>
    );
  }

  function noNotification() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <MaterialIcons
          name="notifications-off"
          size={50}
          color={Colors.grayColor}
        />
        <Text
          style={{ ...Fonts.grayColor14Medium, marginTop: Sizes.fixPadding }}
        >
          No new notification
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
  notificationDateWrapStyle: {
    position: "absolute",
    bottom: 2.0,
    right: 10.0,
    alignSelf: "flex-end",
    fontStyle: "italic",
    ...Fonts.primaryColor12Regular,
  },
  notificationWrapStyle: {
    backgroundColor: Colors.whiteColor,
    elevation: 3.0,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding + 5.0,
    borderRadius: Sizes.fixPadding,
    ...CommonStyles.shadow
  },
  rowBack: {
    alignItems: "center",
    backgroundColor: Colors.primaryColor,
    flex: 1,
    marginBottom: Sizes.fixPadding + 8.0,
  },
  snackBarStyle: {
    position: "absolute",
    bottom: -10.0,
    left: -10.0,
    right: -10.0,
    backgroundColor: "#333333",
  },
  notificationIconWrapStyle: {
    width: 55.0,
    height: 55.0,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Sizes.fixPadding,
    backgroundColor: "#E5E5E5",
  },
});

export default NotificationsScreen;
