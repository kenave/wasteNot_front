import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal } from "react-native";
import { globalStyles } from '../styles/global'
import Card from '../shared/card'
import { Ionicons } from '@expo/vector-icons'
import AddItem from '../components/AddItem';
import { ngrok } from "../shared/ngrok";

export default function Inventory({ navigation }){
  const [modalOpen, setModalOpen] = useState(false)
  const [inventory, setInventory] = useState([
    {"id": "1", "name": "server loading", "quantity": "please wait...", "measurement_type": ""}
  ])
  const [user, setUser] = useState('1')

  useEffect(() => {
    const fetchInventory = async () => {
      const result = await fetch(`${ngrok}/api/v1/user/${user}/ingredients`)
      .then(resp => resp.json())
      // .then(data => setInventory(data))
      // .then(data => console.log(data))
      .then(data => generateCombinedInventory(data))
    }
    fetchInventory()
  }, [])

  const handleAdd = (item) => {
    setModalOpen(false)
    fetch(`${ngrok}/api/v1/user/1/ingredients`, {
      method: 'POST',  
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({"ingredient": item})
    })
    .then(resp => resp.json())
    // .then(data => console.log(data))
    .then(data => generateCombinedInventory(data))
  }

  const generateCombinedInventory = (fetchedInventory) => {
    let combinedInventory = []
    let key = 0
    let ingredients = Object.keys(fetchedInventory)
    console.log("generate inventory",ingredients)
    if (ingredients.length > 0){
      ingredients.forEach(i => {
        let instances = []
        let totalQuantity = 0 // total quantity for this ingredient
        let measurementType = fetchedInventory[i][0].measurement_type // measurement type for this ingredient, using first instance as base
        let ingredientName = fetchedInventory[i][0].name
        let plural = true
        fetchedInventory[i].forEach(instance => {
          // console.log(instance.name, instance)
          totalQuantity = totalQuantity + instance.quantity
          instances.push({...instance, generateCombinedInventory: generateCombinedInventory, user: user})
        })
        if (totalQuantity == 1 || measurementType.toLowerCase() == 'oz' || measurementType.toLowerCase() == 'fl oz') {
          plural = false
        }
        combinedInventory.push({
          id: key.toString(),
          name: ingredientName,
          quantity: totalQuantity,
          measurementType: plural ? (measurementType + 's') : measurementType,
          instances: instances
        })
        key++
      })
      setInventory(combinedInventory)
    }
  }

  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen} animationType='slide'>
        <View style={globalStyles.modalContent}>
          <Ionicons
            name='ios-close'
            size={24}
            style={{...globalStyles.modalToggle, ...globalStyles.modalClose}}
            onPress={() => setModalOpen(false)}
          />
          <AddItem handleAdd={handleAdd}/>
        </View>
      </Modal>
      <Ionicons 
        name='ios-add'
        size={24}
        style={globalStyles.modalToggle}
        onPress={() => setModalOpen(true)}
      />
      {/* {console.log("INVENTORY:", inventory)} */}
      <FlatList
        keyExtractor={(item) => item.id}
        data={inventory}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            // console.log('item:', item)
            navigation.navigate('ItemDetails', item)
          }}>
            <Card>
              <Text style={globalStyles.titleTextName}>{item.name}</Text>
              <Text style={globalStyles.titleTextQuantity}>{item.quantity} {item.measurementType}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}