import React, { useState } from 'react';
import { StyleSheet, View, Button, Text, TextInput, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { globalStyles } from '../styles/global';

export default function AddItem(props) {
  const now = new Date().toDateString().slice(4).split(' ').join('-')
  const [datePickerVisible, setDatePickerVisible] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisible(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisible(false)
  }

  return (
    <View style={globalStyles.container}>
      <Formik style={styles.form}
        initialValues={{name: '', quantity: '', measurementType: '', datePurchased: now, expirationDate: 'Expiration Date', user:'1'}}
        onSubmit={(values) => {
          console.log("submitted:",values)
          props.handleAdd(values)
        }}
      >
        {(props) => (
          <View>
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
            <TextInput style={styles.formInput}
              placeholder='Unit Type (oz, gallons, L, count, container, etc.)'
              onChangeText={props.handleChange('measurementType')}
              value={props.values.measurementType}
            />
            <TouchableOpacity onPress={() => showDatePicker()}>
              <Text 
                style={(props.values.expirationDate === props.initialValues.expirationDate) ? styles.defaultExpirationDateInput : styles.expirationDateInput}
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
                // contentContainerStyleIOS={{color: 'black', backgroundColor: 'black'}}
              />
            </TouchableOpacity>
            {/* <Button title={props.values.expirationDate} onPress={() => showDatePicker()} /> */}
            <Button title='Add Item' color='green' onPress={(e) => props.handleSubmit(e)}/>
          </View>
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
    borderColor: '#ddd',
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  defaultExpirationDateInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6,
    color: 'gray'
  },
  expirationDateInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 8,
    paddingVertical: 6
  },
  form: {
    alignItems: 'center',
    padding: 5,
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
