import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from "react-native";
import { globalStyles } from '../styles/global'
import { ngrok } from "../shared/ngrok";
import { Ionicons } from '@expo/vector-icons';

export default function Incrementer(props) {

  const [itemQuantity, setItemQuantity] = useState(props.item.quantity)
  const [maxLimitAchieved, setMaxLimitAchieved] = useState(props.item.quantity === props.item.original_quantity)
  const [minLimitAchieved, setMinLimitAchieved] = useState(false)

  const changeQuantity = (quantity) => {
    let newQuantity = itemQuantity + quantity
    // console.log(newQuantity)
    if (newQuantity > 0) {
      if (newQuantity >= props.item.original_quantity) { // new quantity is higher than or equal to original
        // console.log('max limit achieved')
        setMaxLimitAchieved(true)
        setMinLimitAchieved(false)
        setItemQuantity(props.item.original_quantity)
      } else { // new quantity is lower than original, but higher than 0
        // console.log('in range')
        setMaxLimitAchieved(false)
        setMinLimitAchieved(false)
        setItemQuantity(newQuantity)
      }
    } else { // new quantity is 0 or less
      // console.log('min limit achieved')
      setMinLimitAchieved(true)
      setMaxLimitAchieved(false)
      setItemQuantity(0)
    }
  }

  const handleConfirm = (quantity, item) => {
    props.handleConfirm(quantity, item)
  }

  return (
    <View style={globalStyles.sliderContainer}>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
        <Text style={{ color: 'gainsboro', fontWeight: '500', fontSize: 24 }}>How many are left?</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity>
            <Ionicons
              name='ios-remove-circle-outline'
              size={64}
              style={{
                marginTop: 5,
                borderWidth: 0,
                color: minLimitAchieved ? 'darkgray' : 'gainsboro',
                alignSelf: 'center'
              }}
              onPress={() => changeQuantity(-1)}
            />
          </TouchableOpacity>
          <Text style={{
            color: 'gainsboro',
            fontSize: 72,
            fontWeight: '300',
            textAlign: 'center',
            width: '40%',
          }}
          >
            {itemQuantity}
          </Text>
          <TouchableOpacity>
            <Ionicons
              name='ios-add-circle-outline'
              size={64}
              style={{
                marginTop: 5,
                borderWidth: 0,
                color: maxLimitAchieved ? 'darkgray' : 'gainsboro',
                justifyContent: 'center',
                alignSelf: 'center'
              }}
              onPress={() => changeQuantity(1)}
            />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => handleConfirm(itemQuantity, props.item)}>
        <View style={{
          borderRadius: 16,
          borderColor: 'gainsboro',
          borderWidth: 2,
          backgroundColor: 'teal',
          marginHorizontal: 10,
          marginVertical: 20,
          padding: 5
        }}>
          <Text style={{ ...globalStyles.titleText, color: 'gainsboro', fontSize: 24, fontWeight: '500' }}> Confirm </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}