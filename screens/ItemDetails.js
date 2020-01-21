import React, { useState } from 'react';
import { View, FlatList } from "react-native";
import { globalStyles } from '../styles/global'
import InventoryItem from '../components/InventoryItem'
// import  Slider  from '@react-native-community/slider'

export default function ItemDetails({ navigation }){

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={navigation.getParam('instances')}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <InventoryItem item={item}/>
        )}
      />
    </View>
  )
}