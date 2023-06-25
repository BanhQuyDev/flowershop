import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { truncate } from "../util/truncate";
import { GlobalStyles } from "../constants/styles";
import * as Animatable from "react-native-animatable";
export default function ListFlower({ item }) {
    const navigation = useNavigation();

    function onClickScreenDetailHandler() {
        navigation.navigate("Product", {
            ...item
        });
    }
    return (
        <Animatable.View animation="slideInRight" duration={1000}>
            <TouchableHighlight
                onPress={onClickScreenDetailHandler}
                underlayColor={"#ccc"}
                style={styles.touchContainer}
            >
                <View style={styles.orchidItem}>
                    <View style={[styles.imageContainer]}>
                        <Image
                            source={item.image }
                            style={styles.image}
                        />
                    </View>
                    <View style={styles.textContainer}>
                        <View style={{ flex: 1 }}>
                            <Text style={[styles.textBase, styles.title]}>
                                {truncate(item.name, 20)}
                            </Text>
                        </View>
                        <View style={{ flex: 2 }}>
                            <Text style={[styles.textBase, styles.description]}>
                                {truncate(item.desc, 50)}
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        </Animatable.View>
    )
}
const styles = StyleSheet.create({
    touchContainer: {
        borderRadius: 8,
        marginVertical: 8,
        marginHorizontal: 4,
    },
    orchidItem: {
        padding: 14,
        backgroundColor: GlobalStyles.colors.primary800,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        elevation: 3,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.5,
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    textContainer: {
        flex: 1,
        justifyContent: "space-between",
        flexDirection: "column",
    },
    title: {
        fontSize: 18,
        marginBottom: 4,
        fontWeight: "bold",
        color: GlobalStyles.colors.primary200,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
    },
    imageContainer: {
        marginRight: 20,
        borderRadius: 4,
        overflow: "hidden",
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 4,
    },
});