import React, { useState } from 'react';
import { View, Text, FlatList, Modal, Image } from "react-native";
import { globalStyles } from '../styles/global'
import Card from '../shared/card'
import { TouchableOpacity } from 'react-native-gesture-handler';
import VerticalSlider from 'rn-vertical-slider';
// import  Slider  from '@react-native-community/slider'

export default function ItemDetails({ navigation }){
  const [modalOpen, setModalOpen] = useState(false)
  let plural = false
  return (
    <View style={globalStyles.container}>
      <FlatList
        data={navigation.getParam('instances')}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onLongPress={() => setModalOpen(true)}>
            <Modal visible={modalOpen} animationType='fade'>
              <View style={globalStyles.sliderContainer}>
                <VerticalSlider
                  value={25}
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
                  onComplete={() => setModalOpen(false)}
                  step={25}
                />
                <Text style={{...globalStyles.titleText, marginTop: 25, color: 'gainsboro', fontWeight: 'bold'}}>How much of the original container is left?</Text>
              </View>
            </Modal>
            <Card itemDetails>
              {plural = checkPlural(item)}
              <Text style={globalStyles.titleText}>Ingredient: {item.name}</Text>
              <Text style={globalStyles.titleText}>
                Quantity: {item.quantity} {item.measurement_type}{plural ? 's' : null}
              </Text>
              <Text style={globalStyles.titleText}>Purchase Date: {item.date_purchased}</Text>
              <Text style={globalStyles.titleText}>Expiration Date: { item.expiration_date }</Text>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const barGraphWhite = () => {
  return <Image source={require('../assets/bar_graph_white.png')}/>
}

const barGraphGray = () => {
  return <Image source={require('../assets/bar_graph_gray.png')}/>
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