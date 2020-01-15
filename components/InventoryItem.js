import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function InventoryItem(props) {
  console.log(props)
  // const [ingredient, setIngredient] = useState(props.ingredient)

  return (
    <TouchableOpacity onPress={props.handlePress}>
      <Text style={styles.item}>
        {props.ingredient.name}, {props.ingredient.quantity} {props.ingredient.measurement_type}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: '#bbb',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 10,
    fontSize: 20,
    fontWeight: 'bold'
  }
})