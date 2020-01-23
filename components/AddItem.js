import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Formik } from 'formik';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { globalStyles } from '../styles/global';
import ReactNativePickerModule from "react-native-picker-module";

export default function AddItem(props) {
  const now = new Date().toDateString().slice(4).split(' ').join('-')
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  const [unitPickerVisible, setUnitPickerVisible] = useState(false)
  const unitTypes = [
    "----",
    "Gallon",
    "Fl Oz",
    "Oz",
    "L",
    "mL",
    "g",
    "Count",
    "Container"
  ]

  const showDatePicker = () => {
    setDatePickerVisible(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisible(false)
  }

  // const showUnitPicker = () => {
  //   this.pickerRef.show()
  // }

  // const hideUnitPicker = () => {
  //   setUnitPickerVisible(false)
  // }

  return (
    <View style={{...globalStyles.container}}>
      <Formik style={styles.form}
        initialValues={{name: '', quantity: '', measurementType: 'Unit Type', datePurchased: now, expirationDate: 'Expiration Date', user:'1'}}
        onSubmit={(values) => {
          console.log("submitted:",values)
          props.handleAdd(values)
        }}
      >
        {(props) => (
          <ScrollView 
            contentContainerStyle={{flex: 1, flexDirection: 'column', marginTop: '50%'}}
            keyboardShouldPersistTaps='handled'
          >
            <TextInput style={styles.formInput}
              placeholder='Item Name'
              onChangeText={props.handleChange('name')}
              value={props.values.name}
            />
            <TextInput style={styles.formInput}
              placeholder='Quantity (number)'
              onChangeText={props.handleChange('quantity')}
              value={props.values.quantity}
              keyboardType='numeric'
            />
            <TouchableOpacity 
            onPress={() => props.pickerRef.show()}
            activeOpacity={1}
            style={styles.formInput}
            >
              <Text 
                // style={{fontSize: 18}}
                style={(props.values.measurementType === props.initialValues.measurementType) ? styles.defaultPickerInput : styles.pickerInput}
              >
                {props.values.measurementType}
              </Text>
              <ReactNativePickerModule
                pickerRef={e => props.pickerRef = e}
                title={'Select a unit type'}
                items={unitTypes}
                onValueChange={(value) => {
                  props.setValues({...props.values, 'measurementType': value})
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={() => showDatePicker()}
            activeOpacity={1}
            style={styles.formInput}>
              <Text 
                style={(props.values.expirationDate === props.initialValues.expirationDate) ? styles.defaultPickerInput : styles.pickerInput}
              >
                {props.values.expirationDate}
              </Text>
              <DateTimePickerModal
                isVisible={datePickerVisible}
                onConfirm={(date) => {
                  let dateString = date.toDateString().slice(4)
                  dateString = dateString.split(' ').join('-')
                  props.setValues({...props.values, 'expirationDate': dateString})
                  hideDatePicker()
                }}
                onCancel={hideDatePicker}
                mode='date'
                value={props.values.expirationDate}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={(e) => props.handleSubmit(e)}
              activeOpacity={0.5}
              style={{width: '33%', alignSelf: 'center'}}
            >
              <View style={{
                borderRadius: 8,
                borderColor: 'gainsboro',
                borderWidth: 2,
                backgroundColor: 'teal',
                marginTop: 10,
                // marginHorizontal: 10,
                // marginVertical: 10,
                padding: 3,
                alignSelf: 'center',
                justifyContent: 'center'
              }}>
                <Text style={{color: 'gainsboro', fontSize: 24, fontWeight: '500', textAlign: 'center', justifyContent: 'center' }}> Add Item </Text>
              </View>
            </TouchableOpacity>
            {/* <Button title='Add Item' color='teal' onPress={(e) => props.handleSubmit(e)}/> */}
          </ScrollView>
        )}
      </Formik>
    </View>

    // <View>
    //   <TextInput
    //     style={styles.input}
    //     placeholder='New item...'
    //     onChangeText={nameHandler}
    //   />
    //   <Button onPress={() => props.handleAdd(name)} title='Add Item' color='teal' />
    // </View>
  )
}

const styles = StyleSheet.create({
  formInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'gainsboro',
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
    paddingHorizontal: 8,
    paddingVertical: 6,
    backgroundColor: 'gainsboro'
  },
  defaultPickerInput: {
    // borderWidth: 1,
    // borderRadius: 8,
    // borderColor: 'gainsboro',
    fontSize: 18,
    // marginBottom: 10,
    // paddingHorizontal: 8,
    // paddingVertical: 6,
    color: 'gray',
    backgroundColor: 'gainsboro'
  },
  pickerInput: {
    // borderWidth: 1,
    // borderRadius: 8,
    // borderColor: '#ddd',
    fontSize: 18,
    // marginBottom: 10,
    // paddingHorizontal: 8,
    // paddingVertical: 6,
    color: 'black',
    backgroundColor: 'gainsboro'
  },
  form: {
    alignItems: 'center',
    // padding: 5,
  },
  picker: {
    padding: 5,
    // borderWidth: 2,
    // borderStyle: 'solid',
    // paddingBottom: 20,
    height: 25,
    width: 100,
    backgroundColor: 'orange'
    // justifyContent: 'flex-start'
  }
})
