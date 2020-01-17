import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Modal } from "react-native";
import { globalStyles } from '../styles/global'
import Card from '../shared/card'
import { Ionicons } from '@expo/vector-icons'
import AddItem from '../components/AddItem';

export default function Inventory({ navigation }){
  const [modalOpen, setModalOpen] = useState(false)
  const [inventory, setInventory] = useState([
    {"id": "1", "name": "server loading", "quantity": "please wait...", "measurement_type": ""}
  ])
  const [user, setUser] = useState('1')

  useEffect(() => {
    const fetchInventory = async () => {
      const result = await fetch(`http://localhost:3000/api/v1/user/${user}/ingredients`)
      .then(resp => resp.json())
      // .then(data => setInventory(data))
      .then(data => console.log(data))
      // .then(data => generateCombinedInventory(data))
    }
    fetchInventory()
  }, [])

  const handleAdd = (item) => {
    setModalOpen(false)
    fetch('http://localhost:3000/api/v1/user/1/ingredients', {
      method: 'POST',  
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({"ingredient": item})
    })
    .then(resp => resp.json())
    // .then(data => console.log(data))
    .then(data => setInventory(data))
  }

  const generateCombinedInventory = (fetchedInventory) => {
    ingredients = Object.keys(fetchedInventory)
    console.log("generate inventory",ingredients)
    let totalQuantity = 0
    if (ingredients.length > 0){
      ingredients.forEach(i => {
        console.log("fetchedInventory", fetchedInventory[i])
      });
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
      {console.log("INVENTORY:", inventory)}
      <FlatList
        keyExtractor={(item) => item.id}
        data={inventory}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            console.log('item:', item)
            navigation.navigate('ItemDetails', item)
          }}>
            <Card>
              <Text style={globalStyles.titleTextName}>{item.name}</Text>
              <Text style={globalStyles.titleTextQuantity}>{item.quantity} {item.measurement_type}</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}