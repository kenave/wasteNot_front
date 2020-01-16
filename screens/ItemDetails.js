import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { globalStyles } from '../styles/global'
import Card from '../shared/card'

export default function ItemDetails({ navigation }){
  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>Ingredient: { navigation.getParam('name') }</Text>
        <Text style={globalStyles.titleText}>Quantity: { navigation.getParam('quantity') } {navigation.getParam('measurement_type')}</Text>
        <Text style={globalStyles.titleText}>Purchase Date: { navigation.getParam('date_purchased') }</Text>
        <Text style={globalStyles.titleText}>Expiration Date: { navigation.getParam('expiration_date') }</Text>
      </Card>
    </View>
  )
}