import React from 'react';
import { View } from 'react-native';
import { globalStyles } from '../styles/global';

export default function Card(props){

  return (
    <View 
      style={ props.expiration ?
        {...globalStyles.card, backgroundColor: props.expiration} :
        globalStyles.card }
    >
      <View style={props.itemDetails ? globalStyles.itemCardContent : globalStyles.cardContent}>
        { props.children }
      </View>
    </View>
  )
}