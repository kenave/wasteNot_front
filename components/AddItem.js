import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import { Formik } from 'formik';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddItem(props) {
  const now = new Date()
  const [datePickerVisible, setDatePickerVisible] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisible(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisible(false)
  }

  const handleDatePicked = date => {
    console.log("A date has been picked: ", date)
    hideDatePicker()
  }

  return (
    <View style={styles.form}>
      <Formik style={styles.form}
        initialValues={{name: '', quantity: '', measurementType: '', datePurchased: now, expirationDate: ''}}
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
            <>
              <Button title="Show DatePicker" onPress={() => showDatePicker()} />
              {/* {console.log("date picker:", datePickerVisible)} */}
              {/* {console.log("props:", props)} */}
              <DateTimePicker
                isVisible={false}
                onConfirm={handleDatePicked}
                onCancel={hideDatePicker}
                date={props.values.expirationDate}
                mode='date'
                value={now}
              />
            </>
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
    padding: 0,
    backgroundColor: 'pink'
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
