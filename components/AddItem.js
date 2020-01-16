import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { Formik } from 'formik';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default function AddItem(props) {
  const now = new Date().toDateString().slice(4)
  const [datePickerVisible, setDatePickerVisible] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisible(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisible(false)
  }

  return (
    <View style={styles.form}>
      <Formik style={styles.form}
        initialValues={{name: '', quantity: '', measurementType: '', datePurchased: now, expirationDate: 'select expiration date'}}
        onSubmit={(values) => {
          console.log("submitted:",values)
        }}
      >
        {(props) => (
          <View>
            <TextInput style={styles.form}
              placeholder='Name'
              onChangeText={props.handleChange('name')}
              value={props.values.name}
            />
            <TextInput style={styles.form}
              placeholder='Quantity'
              onChangeText={props.handleChange('quantity')}
              value={props.values.quantity}
            />
            <TextInput style={styles.form}
              placeholder='Unit Type'
              onChangeText={props.handleChange('measurementType')}
              value={props.values.measurementType}
            />
            <Button title={props.values.expirationDate} onPress={() => showDatePicker()} />
            <DateTimePickerModal
              isVisible={datePickerVisible}
              onConfirm={(date) => {
                let dateString = date.toDateString().slice(4)
                props.setValues({...props.values, 'expirationDate': dateString})
                hideDatePicker()
              }}
              onCancel={hideDatePicker}
              mode='date'
              value={props.values.expirationDate}
            />
            <Button title='Add Item' onPress={(e) => props.handleSubmit(e)}/>
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
  input: {
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
