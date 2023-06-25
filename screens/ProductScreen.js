import { View, Text, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, HeartIcon as HeartOutline } from 'react-native-heroicons/outline';
import { HeartIcon, StarIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { ShoppingBag } from 'react-native-feather';
import AsyncStorage from "@react-native-async-storage/async-storage";
const ios = Platform.OS == 'ios';

/**
 * ProductScreen
 * @param {*} props 
 * @returns 
 */
export default function ProductScreen(props) {
  const flower = props.route.params;
  const navigation = useNavigation();
  const [dataFav, setDataFav] = useState([])
  useEffect(() => {
    getFromStorage();

  }, []);
  //Get data from storage
  const getFromStorage = async () => {
    const data = await AsyncStorage.getItem("favorite");
    setDataFav(data != null ? JSON.parse(data) : []);
  };
  //Set data from storage
  const setDataToStorage = async () => {
    let list;
    if (dataFav == []) {
      list = [flower];
      await AsyncStorage.setItem("favorite", JSON.stringify(list));
    } else {
      list = [...dataFav, flower];
      await AsyncStorage.setItem("favorite", JSON.stringify(list));
    }
    setDataFav(list);
  };
  //Remove data from storage
  const removeDataFromStorage = async () => {
    const list = dataFav.filter((item) => item.id !== flower.id);
    await AsyncStorage.setItem("favorite", JSON.stringify(list));
    setDataFav(list);
  };
  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <SafeAreaView className="space-y-4 flex-1">
        <View className="mx-4 flex-row justify-between items-center">
          <TouchableOpacity className="rounded-full" onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size="30" strokeWidth={1.2} color="black" />
          </TouchableOpacity>
          <TouchableOpacity className=" rounded-full p-2" onPress={() => {
            const check = dataFav.find(item => item.id === flower.id)
            console.log("Check:", check);
            if (check) {
              removeDataFromStorage();
            } else {
              setDataToStorage();
            }
          }}>
            {dataFav.find(item => item.id === flower.id) ? <HeartIcon size="24" color="red" /> : <HeartOutline size="24" color="black" />}
          </TouchableOpacity>
        </View>
        <View
          style={{
            shadowColor: themeColors.bgDark,
            shadowRadius: 30,
            shadowOffset: { width: 0, height: 30 },
            shadowOpacity: 0.9,
          }}
          className="flex-row justify-center">
          <Image source={flower.image} className="h-60 w-60" style={{ marginTop: ios ? 0 : 40 }} />
        </View>
        <View
          style={{ backgroundColor: themeColors.bgLight }}
          className="flex-row justify-center items-center mx-4 rounded-3xl p-1 px-2 space-x-1 opacity-90 w-16">
          <StarIcon size="15" color="white" />
          <Text className="text-base font-semibold text-white">{flower.stars}</Text>
        </View>
        <View className="px-4 flex-row justify-between items-center">
          <Text style={{ color: themeColors.text }} className="text-3xl font-semibold">
            {flower.name}
          </Text>
          <Text style={{ color: themeColors.text }} className="text-lg font-semibold">
            $ {flower.price}
          </Text>

        </View>
        <View className="px-4 space-y-2">
          <Text style={{ color: themeColors.text }} className="text-lg font-bold">About</Text>
          <Text style={{ fontSize: 20 }} className="text-gray-600">
            {flower.desc}
          </Text>
        </View>
      </SafeAreaView>
      <View className={`space-y-3 ${ios ? 'mb-6' : 'mb-3'}`}>
        <View className="flex-row justify-between items-center px-4 mb-2">
          <View className="flex-row items-center space-x-1">
            <Text className="text-base text-gray-700 font-semibold opacity-60">
              Quantity
            </Text>
            <Text className="text-base text-black font-semibold"> {flower.quantity}</Text>
          </View>
        </View>
        {/* buy now button */}
        <View className="flex-row justify-between px-4">
          <TouchableOpacity className="p-4 rounded-full border border-gray-400">
            <ShoppingBag size="30" color="gray" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: themeColors.bgLight }}
            className="p-4 rounded-full flex-1 ml-4">
            <Text className="text-center text-white text-base font-semibold">Buy now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}