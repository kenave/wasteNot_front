import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import InventoryItem from './InventoryItem'

function Inventory() {
  const [inventory, setInventory] = useState([
    {"id": 1, "name": "test1", "quantity": "", "measurement_type": ""},
    {"id": 2, "name": "test2", "quantity": "", "measurement_type": ""}
  ])

  useEffect(() => {
    const fetchInventory = async () => {
      let id = 1 // hard coded ID for testing, user creation on to-do list
      const result = await fetch(`http://localhost:3000/api/v1/user/${id}/ingredients`)
        .then(resp => resp.json())
        .then(data => setInventory(data))
    }

    fetchInventory()
  }, [])

  return (
    <View style={styles.listContainer}>
      {console.log('Console Log', inventory)}
      <FlatList
        keyExtractor={(item) => item.id}
        data={inventory}
        renderItem={({ item }) => (
          // console.log('item:', item)
          // <Text style={styles.list}>
          //   Ingredient: {item.name} Quantity: {item.quantity} {item.measurement_type}
          // </Text>
          <InventoryItem ingredient={item}/>
        )}
      />

    </View>
  )

}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 65
  },
  list: {
    paddingLeft: 40,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold'
  }
})

export default Inventory