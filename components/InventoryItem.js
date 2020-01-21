import React, { useState } from 'react';
import { View, Text, Modal } from 'react-native';
import Card from '../shared/card';
import { TouchableOpacity } from 'react-native-gesture-handler';
import VerticalSlider from 'rn-vertical-slider';
import { globalStyles } from '../styles/global';
import { ngrok } from "../shared/ngrok";

export default function InventoryItem(props) {

const [modalOpen, setModalOpen] = useState(false)

const handleSlider = (value, item) => {
  setModalOpen(false)
  if (value > 0) {
    console.log("ITEM Quantity:", item.quantity)
    item.quantity = ((value / 100) * (item.original_quantity))
    fetch(`${ngrok}/api/v1/user/${item.user}/ingredients/${item.id}`, {
      method: 'PATCH',  
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({"quantity": value})
    })
    .then(resp => resp.json())
    // .then(data => console.log(data))
    .then(data => item.generateCombinedInventory(data))
  } else {
    deleteItem(item)
  }
}

const deleteItem = (item) => {
  item.quantity = 0
  fetch(`${ngrok}/api/v1/user/${item.user}/ingredients/${item.id}`, {
    method: 'DELETE',  
    headers: {
      "Content-Type": "application/json",
      "Accepts": "application/json"
    }
  })
  .then(resp => resp.json())
  // .then(data => console.log(data))
  .then(data => item.generateCombinedInventory(data))
}

const checkExpiry = (item) => {
  let now = new Date()
  now.setHours(0,0,0,0)
  let expiration_date = new Date(item.expiration_date)
  // console.log("now:", now)
  // console.log("expiration_date:", expiration_date)
  if (expiration_date - now < 604800000) { // 7 days
    if (expiration_date - now < 259200000) { // 3 days
      if (expiration_date - now < 0) { // past due
        return '#FF5C5C'
      }
      return '#FFCF73'
    }
    return '#FFFF73'
  }
  else {
    return null
  }
}

  return (
    (props.item.quantity > 0) ?
      <TouchableOpacity onLongPress={() => setModalOpen(true)}>
        <Modal visible={modalOpen} animationType='fade'>
          <View style={globalStyles.sliderContainer}>
            <VerticalSlider
              value={Math.floor(100.0 * (parseFloat(props.item.quantity) / parseFloat(props.item.original_quantity)))}
              width={100}
              height={400}
              borderRadius={5}
              minimumTrackTintColor={'gainsboro'}
              maximumTrackTintColor={'#004646'}
              disabled={false}
              min={0}
              max={100}
              showBallIndicator={true}
              ballIndicatorColor={'#004646'}
              ballIndicatorTextColor={'gainsboro'}
              onChange={null}
              // onComplete={(val) => console.log(val)}
              onComplete={(val) => handleSlider(val, props.item)}
              step={25}
            />
            <Text style={{ ...globalStyles.titleText, marginTop: 25, color: 'gainsboro', fontWeight: 'bold' }}>How much of the original container is left?</Text>
          </View>
        </Modal>
        <Card itemDetails expiration={checkExpiry(props.item)}>
          {/* {console.log(props.item)} */}
          {plural = checkPlural(props.item)}
          <Text style={globalStyles.titleText}>Ingredient: {props.item.name}</Text>
          <Text style={globalStyles.titleText}>
            Quantity: {props.item.quantity} {props.item.measurement_type}{plural ? 's' : null}
          </Text>
          <Text style={globalStyles.titleText}>Purchase Date: {props.item.date_purchased}</Text>
          <Text style={globalStyles.titleText}>Expiration Date: {props.item.expiration_date}</Text>
        </Card>
      </TouchableOpacity>
    :
      null
  )
}

const checkPlural = (item) => {
  if (item.quantity == '1' || 
  item.measurement_type.toLowerCase() === 'oz' ||
  item.measurement_type.toLowerCase() === 'fl oz' ||
  item.measurement_type.toLowerCase() === 'l' ||
  item.measurement_type.toLowerCase() === 'g') {
    return false
  }
  else { return true }
}