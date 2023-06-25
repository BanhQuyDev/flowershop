import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Platform, Pressable, Alert, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar';
import { flowerItems } from '../constants';
import { Bars3Icon } from 'react-native-heroicons/outline'
import ListFlower from '../components/listFlowerFav';
import { GlobalStyles } from "../constants/styles";
import { SwipeListView } from "react-native-swipe-list-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
/**
 * Home FavoriteScreen
 * @returns 
 */
export default function FavoriteScreen({ navigation }) {
    const [favoriteOrchidsList, setFavoriteOrchidsList] = useState([]);
    const isFocused = useIsFocused();
    const getFromStorage = async () => {
        if (isFocused) {
            const fetchData = async () => {
                try {
                    const data = await AsyncStorage.getItem("favorite");
                    if (data != undefined) {
                        const parsedData = JSON.parse(data);
                        const filterOrchids = flowerItems.filter((orchid) => {
                            const check = parsedData.find(item => item.id === orchid.id)
                            if (check) {
                                return orchid
                            }
                        }
                        );
                        setFavoriteOrchidsList(filterOrchids);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData()
        }
    };
    function handleDeleteItem(id) {
        Alert.alert(
            "Are you sure?",
            "Will you not be able to recover this favorite",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                },
                {
                    text: "Yes, delete it",
                    onPress: async () => {
                        const list = favoriteOrchidsList.filter((item) => item.id !== id);
                        await AsyncStorage.setItem("favorite", JSON.stringify(list));
                        setFavoriteOrchidsList(list);
                    },
                },
            ]
        );
    }
    useEffect(() => {
        getFromStorage();
    }, [isFocused]);
    return (
        <View className="flex-1 relative bg-white">
            <StatusBar />
            <Image
                source={require('../assets/images/beansBackground1.png')}
                style={{ height: height * 0.23 }}
                className="w-full absolute -top-5" />
            <SafeAreaView className={ios ? '-mb-8' : ''}>
                {/* bar and avartar  */}
                <View className="mx-4 flex-row justify-between items-center">
                    <Pressable
                        onPress={() => { navigation.openDrawer() }}
                    >
                        <Bars3Icon size="27" color="white" />
                    </Pressable>
                    <View className="flex-row items-center space-x-2">
                    </View>
                    <Image source={require('../assets/images/avatar.png')}
                        className="h-9 w-9 rounded-full" />
                </View>
                {/* search bar */}
                <View className="mx-5 shadow" style={{ marginTop: height * 0.06 }}>
                    <View className="flex-row items-center rounded-full p-1 bg-[#8dc572]">
                        <Text className="p-4 flex-1 font-semibold text-gray-700 text-center text-white text-xl">My Favorite </Text>
                    </View>
                </View>
            </SafeAreaView>
            {/* flower  list */}
            <View className={`overflow-visible flex flex-1 ${ios ? 'mt-10' : ''}`}>
                <View>{favoriteOrchidsList.length !== 0 ? <SwipeListView
                    data={favoriteOrchidsList}
                    renderItem={({ item }) => {
                        return <ListFlower item={item} />
                    }}
                    keyExtractor={(item) => item.id}
                    renderHiddenItem={({ item }) => (
                        <View style={styles.hiddenItemContainer}>
                            <Animatable.View animation="slideInRight" duration={1000}>
                                {/* Component hiển thị nút xoá */}
                                <TouchableOpacity
                                    onPress={() => handleDeleteItem(item.id)}
                                    style={styles.deleteButton}
                                >
                                    <Ionicons name="trash" size={20} color="white" />
                                </TouchableOpacity>
                            </Animatable.View>
                        </View>
                    )}
                    leftOpenValue={70}
                    disableLeftSwipe={false}
                    rightOpenValue={-70}
                    disableRightSwipe={true}
                    showsVerticalScrollIndicator={false}
                    previewRowKey={"1"}
                    previewOpenValue={80}
                /> : (
                    <View style={styles.emptyContainer} className={`flex flex-start`}>
                        <Image
                            style={styles.emptyImage}
                            source={require("../assets/images/EmptyBox.png")}
                        />
                        <Text style={styles.emptyText}>You don't have favorite flower list</Text>
                    </View>
                )}
                </View>
            </View>
        </View >
    )
}
const styles = StyleSheet.create({
    hiddenItemContainer: {
        flex: 1,
        marginTop: 50,
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    noListContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        color: "black",
    },
    emptyImage: {
        width: "70%",
    },
    emptyContainer: {
        alignItems: "center",
    },
    emptyText: {
        color: "black",
        fontSize: 20
    },
});
