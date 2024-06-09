import React, { useState, createRef } from "react";
import { View, ScrollView, TouchableOpacity, TextInput, Image, StyleSheet, Text, Platform } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";

const SignupScreen = ({ navigation }) => {

    const [state, setState] = useState({
        fullName: null,
        password: null,
        passwordSecure: true,
        email: null,
        phoneNumber: null,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        fullName,
        password,
        passwordSecure,
        email,
        phoneNumber,
    } = state;

    return (
        <View style={{ flex: 1, backgroundColor: Colors.bodyBackColor }}>
            <MyStatusBar />
            <View style={{ flex: 1 }}>
                {header()}
                {foodLogo()}
                <ScrollView
                    automaticallyAdjustKeyboardInsets={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: Sizes.fixPadding, }}
                >
                    {signupTitle()}
                    {fullNameTextField()}
                    {emailTextField()}
                    {phoneNumberTextField()}
                    {passwordTextField()}
                    {signupButton()}
                    {orConnectWithDivider()}
                    {socialMediaOptions()}
                    {alreadyAccountInfo()}
                </ScrollView>
            </View>
        </View>
    )

    function foodLogo() {
        return (
            <Image
                source={require('../../assets/images/bg1.png')}
                style={styles.foodLogoStyle}
            />
        )
    }

    function alreadyAccountInfo() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ ...Fonts.grayColor15Medium }}>
                    Already have an account?
                </Text>
                <Text
                    onPress={() => navigation.push('Signin')}
                    style={{ marginLeft: Sizes.fixPadding - 5.0, ...Fonts.blackColor15Medium }}
                >
                    Sign In
                </Text>
            </View>
        )
    }

    function socialMediaOptions() {
        return (
            <View style={styles.socialMediaOptionsWrapStyle}>
                {socialMediaOptionsSort({
                    icon: require('../../assets/images/icons/twitter_icon.png'),
                    bgColor: '#1DA1F2',
                })}
                {socialMediaOptionsSort({
                    icon: require('../../assets/images/icons/google_icon.png'),
                    bgColor: '#EA4335',
                })}
                {socialMediaOptionsSort({
                    icon: require('../../assets/images/icons/facebook_icon.png'),
                    bgColor: '#4267B2',
                })}
            </View>
        )
    }

    function socialMediaOptionsSort({ icon, bgColor }) {
        return (
            <View style={{
                ...styles.socialMediaIconWrapstStyle,
                backgroundColor: bgColor,
            }}>
                <Image
                    source={icon}
                    style={{ width: 18.0, height: 18.0, resizeMode: 'contain' }}
                />
            </View>
        )
    }

    function orConnectWithDivider() {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ backgroundColor: Colors.grayColor, height: 1.0, flex: 1, }} />
                <Text style={{ marginHorizontal: Sizes.fixPadding, ...Fonts.grayColor15Medium }}>
                    Or Connect with
                </Text>
                <View style={{ backgroundColor: Colors.grayColor, height: 1.0, flex: 1, }} />
            </View>
        )
    }

    function signupButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('Verification')}
                style={styles.signupButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Sign Up
                </Text>
            </TouchableOpacity>
        )
    }

    function passwordTextField() {
        const input = createRef();
        return (
            <View style={{ ...styles.textFieldWrapStyle }}>
                <MaterialIcons
                    name="lock-outline"
                    color={Colors.grayColor}
                    size={20}
                    onPress={() => { input.current.focus() }}
                />
                <TextInput
                    ref={input}
                    value={password}
                    onChangeText={(text) => updateState({ password: text })}
                    selectionColor={Colors.primaryColor}
                    placeholder='Password'
                    placeholderTextColor={Colors.grayColor}
                    secureTextEntry={passwordSecure}
                    style={{ ...Fonts.blackColor15Medium, marginHorizontal: Sizes.fixPadding - 2.0, flex: 1 }}
                />
                <MaterialCommunityIcons
                    name={passwordSecure ? 'eye-off-outline' : 'eye-outline'}
                    color={Colors.grayColor}
                    size={16}
                    onPress={() => { updateState({ passwordSecure: !passwordSecure }) }}
                />
            </View>
        )
    }

    function phoneNumberTextField() {
        const input = createRef();
        return (
            <View style={{
                marginBottom: Sizes.fixPadding * 3.0,
                ...styles.textFieldWrapStyle,
            }}>
                <MaterialCommunityIcons
                    name="cellphone"
                    color={Colors.grayColor}
                    size={20}
                    onPress={() => { input.current.focus() }}
                />
                <TextInput
                    ref={input}
                    value={phoneNumber}
                    onChangeText={(text) => updateState({ phoneNumber: text })}
                    selectionColor={Colors.primaryColor}
                    placeholder='Phone Number'
                    placeholderTextColor={Colors.grayColor}
                    keyboardType="numeric"
                    style={{ ...Fonts.blackColor15Medium, marginLeft: Sizes.fixPadding - 2.0, flex: 1 }}
                />
            </View>
        )
    }

    function emailTextField() {
        const input = createRef();
        return (
            <View style={{
                marginBottom: Sizes.fixPadding * 3.0,
                ...styles.textFieldWrapStyle,
            }}>
                <MaterialCommunityIcons
                    name="email-outline"
                    color={Colors.grayColor}
                    size={20}
                    onPress={() => { input.current.focus() }}
                />
                <TextInput
                    ref={input}
                    value={email}
                    onChangeText={(text) => updateState({ email: text })}
                    selectionColor={Colors.primaryColor}
                    placeholder='Email Address'
                    placeholderTextColor={Colors.grayColor}
                    keyboardType="email-address"
                    style={{ ...Fonts.blackColor15Medium, marginLeft: Sizes.fixPadding - 2.0, flex: 1 }}
                />
            </View>
        )
    }

    function fullNameTextField() {
        const input = createRef();
        return (
            <View style={{
                marginBottom: Sizes.fixPadding * 3.0,
                marginTop: Sizes.fixPadding * 2.0,
                ...styles.textFieldWrapStyle,
            }}>
                <MaterialIcons
                    name="person-outline"
                    color={Colors.grayColor}
                    size={20}
                    onPress={() => { input.current.focus() }}
                />
                <TextInput
                    ref={input}
                    selectionColor={Colors.primaryColor}
                    placeholder='User Name'
                    placeholderTextColor={Colors.grayColor}
                    value={fullName}
                    onChangeText={(text) => updateState({ fullName: text })}
                    style={{ ...Fonts.blackColor15Medium, marginLeft: Sizes.fixPadding - 2.0, flex: 1 }}
                />
            </View>
        )
    }

    function signupTitle() {
        return (
            <Text style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor20Bold }}>
                Sign Up
            </Text>
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
                    style={{ alignSelf: 'flex-start' }}
                />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    headerWrapStyle: {
        margin: Sizes.fixPadding * 2.0,
    },
    signupButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        marginBottom: Sizes.fixPadding * 2.0,
        marginTop: Sizes.fixPadding * 4.0,
        borderRadius: Sizes.fixPadding,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'rgba(255, 66, 0, 0.3)',
        borderWidth: 1.0,
        elevation: 1.0,
        shadowColor: Colors.primaryColor,
    },
    socialMediaOptionsWrapStyle: {
        marginVertical: Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    socialMediaIconWrapstStyle: {
        width: 38.0,
        height: 38.0,
        borderRadius: 19.0,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: Sizes.fixPadding - 5.0,
    },
    foodLogoStyle: {
        width: 160,
        height: 160,
        position: 'absolute',
        bottom: 0.0,
        left: 0.0,
    },
    textFieldWrapStyle: {
        marginHorizontal: Sizes.fixPadding * 2.0,
        paddingVertical: Platform.OS == 'ios' ? Sizes.fixPadding + 2.0 : Sizes.fixPadding,
        flexDirection: 'row',
        alignItems: 'center',
        ...CommonStyles.shadow,
        borderRadius: Sizes.fixPadding,
        elevation: 2.0,
        paddingHorizontal: Sizes.fixPadding,
        backgroundColor: Colors.whiteColor,
    },
});

export default SignupScreen;