import { View, Text, Image, TouchableOpacity, Pressable, Dimensions, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native'
import { StarIcon } from 'react-native-heroicons/solid';
import { PlusIcon } from 'react-native-heroicons/outline';
const { width, height } = Dimensions.get('window');
import AsyncStorage from "@react-native-async-storage/async-storage";
import { HeartIcon as HeartOutline } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
const ios = Platform.OS == 'ios';
import { useIsFocused } from "@react-navigation/native";
export default function FlowerCard({ item }) {
  const navigation = useNavigation();
  const [dataFav, setDataFav] = useState([])
  const isFocused = useIsFocused();
  useEffect(() => {
    getFromStorage();
  }, [isFocused]);
  //Get data from storage
  const getFromStorage = async () => {
    const data = await AsyncStorage.getItem("favorite");
    setDataFav(data != null ? JSON.parse(data) : []);
  };
  //Set data from storage
  const setDataToStorage = async () => {
    let list;
    if (dataFav == []) {
      list = [item];
      await AsyncStorage.setItem("favorite", JSON.stringify(list));
    } else {
      list = [...dataFav, item];
      await AsyncStorage.setItem("favorite", JSON.stringify(list));
    }
    setDataFav(list);
  };
  //Remove data from storage
  const removeDataFromStorage = async () => {
    const list = dataFav.filter((itemStorage) => itemStorage.id !== item.id);
    await AsyncStorage.setItem("favorite", JSON.stringify(list));
    setDataFav(list);
  };
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Product', { ...item })} >
      <View
        style={{
          borderRadius: 40,
          backgroundColor: themeColors.bgDark,
          height: ios ? height * 0.4 : height * 0.50,
          width: width * 0.65,
        }}
      >
        <View
          style={{
            shadowColor: 'black',
            shadowRadius: 30,
            shadowOffset: { width: 0, height: 40 },
            shadowOpacity: 0.8,
            marginTop: ios ? -(height * 0.08) : 15,
          }}
          className="flex-row justify-center">
          <Image
            source={item.image}
            className="h-40 w-40"
            style={{ borderRadius: 50 }}
          />
        </View>
        <View className={`px-5 flex-1 justify-between ${ios ? 'mt-5' : ''}`}>
          <View className="space-y-3 mt-3">
            <Text className="text-3xl text-white font-semibold z-10">
              {item.name}
            </Text>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              className="flex-row items-center rounded-3xl p-1 px-2 space-x-1 w-16">
              <StarIcon size="15" color="white" />
              <Text className="text-base font-semibold text-white">{item.stars}</Text>
            </View>
            <View className="flex-row space-x-1 z-10 mb-6">
              <Text className="text-base text-white font-semibold opacity-60">
                Quantity
              </Text>
              <Text className="text-base text-white font-semibold"> {item.quantity}</Text>
            </View>
          </View>

          <View style={{
            backgroundColor: ios ? themeColors.bgDark : 'transparent',
            shadowColor: themeColors.bgDark,
            shadowRadius: 25,
            shadowOffset: { width: 0, height: 40 },
            shadowOpacity: 0.8,
          }} className="flex-row justify-between items-center mb-5">
            <Text className="text-white font-bold text-lg">$ {item.price}</Text>
            <TouchableOpacity
              onPress={() => {
                const check = dataFav.find(itemStorage => itemStorage.id === item.id)
                console.log("Check:", check);
                if (check) {
                  removeDataFromStorage();
                } else {
                  setDataToStorage();
                }
              }}
              style={{
                shadowColor: 'black',
                shadowRadius: 40,
                shadowOffset: { width: -20, height: -10 },
                shadowOpacity: 1,
              }} className="p-4 bg-white rounded-full">
              {dataFav.find(itemStorage => itemStorage.id === item.id) ? <HeartIcon size="25" strokeWidth={2} color="red" /> : <HeartOutline size="24" color="black" />}
            </TouchableOpacity>
          </View>


        </View>

      </View>
    </TouchableOpacity >
  )
}