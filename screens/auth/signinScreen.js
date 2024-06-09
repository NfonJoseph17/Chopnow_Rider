import React, { useState, createRef } from "react";
import { View, ScrollView, TouchableOpacity, Image, StyleSheet, Text, TextInput, Platform } from "react-native";
import { Colors, Fonts, Sizes, CommonStyles } from "../../constants/styles";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import MyStatusBar from "../../components/myStatusBar";

const SigninScreen = ({ navigation }) => {

    const [state, setState] = useState({
        userName: null,
        password: null,
        passwordSecure: true,
    })

    const updateState = (data) => setState((state) => ({ ...state, ...data }))

    const {
        userName,
        password,
        passwordSecure,
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
                    {signinTitle()}
                    {userNameTextField()}
                    {passwordTextField()}
                    {forgetPasswordText()}
                    {signinButton()}
                   
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

    
    function signinButton() {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.push('BottomTabBar')}
                style={styles.signinButtonStyle}
            >
                <Text style={{ ...Fonts.whiteColor18Bold }}>
                    Sign In
                </Text>
            </TouchableOpacity>
        )
    }

    function forgetPasswordText() {
        return (
            <Text style={styles.forgetPasswordTextStyle}>
                Forget Password?
            </Text>
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

    function userNameTextField() {
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
                    value={userName}
                    onChangeText={(text) => updateState({ userName: text })}
                    style={{ ...Fonts.blackColor15Medium, marginLeft: Sizes.fixPadding - 2.0, flex: 1 }}
                />
            </View>
        )
    }

    function signinTitle() {
        return (
            <Text style={{ marginVertical: Sizes.fixPadding, marginHorizontal: Sizes.fixPadding * 2.0, ...Fonts.blackColor20Bold }}>
                Sign In
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
    forgetPasswordTextStyle: {
        marginTop: Sizes.fixPadding + 2.0,
        marginHorizontal: Sizes.fixPadding * 2.0,
        alignSelf: 'flex-end',
        ...Fonts.grayColor11Medium
    },
    signinButtonStyle: {
        backgroundColor: Colors.primaryColor,
        paddingVertical: Sizes.fixPadding + 2.0,
        margin: Sizes.fixPadding * 2.0,
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
    }
});

export default SigninScreen;