import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity, Modal } from "react-native";
import { globalStyles } from '../styles/global'
import Card from '../shared/card'
import { Ionicons } from '@expo/vector-icons'
import AddItem from '../components/AddItem';

export default function Inventory({ navigation }){
  const [modalOpen, setModalOpen] = useState(false)
  const [inventory, setInventory] = useState([
    {"id": "1", "name": "test1", "quantity": "", "measurement_type": ""},
    {"id": "2", "name": "test2", "quantity": "", "measurement_type": ""}
  ])

  useEffect(() => {
    const fetchInventory = async () => {
      let id = 1
      const result = await fetch(`http://localhost:3000/api/v1/user/${id}/ingredients`)
        .then(resp => resp.json())
        .then(data => setInventory(data))
    }

    fetchInventory()
  }, [])

  // const pressHandler = () => {
  //   navigation.navigate('ItemDetails')
  // }

  return (
    <View style={globalStyles.container}>
      <Modal visible={modalOpen}>
        <View style={globalStyles.modalContent} animationType='slide'>
          <Ionicons
            name='ios-close'
            size={24}
            style={{...globalStyles.modalToggle, ...globalStyles.modalClose}}
            onPress={() => setModalOpen(false)}
          />
          <AddItem />
        </View>
      </Modal>
      <Ionicons 
        name='ios-add'
        size={24}
        style={globalStyles.modalToggle}
        onPress={() => setModalOpen(true)}
      />
      {/* {console.log('Console Log', inventory)} */}
      <FlatList
        keyExtractor={(item) => item.id}
        data={inventory}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            console.log('item:', item)
            navigation.navigate('ItemDetails', item)
          }}>
            <Card>
              <Text style={globalStyles.titleText}>{item.name}, {item.quantity} {item.measurement_type}</Text>
            </Card>
          </TouchableOpacity>
          // <InventoryItem ingredient={item}/>
        )}
      />
    </View>
  )
}