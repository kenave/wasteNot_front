import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import Inventory from "./components/Inventory";
// import Navbar from "./components/Navbar";
// import AddItem from './components/AddItem';
import Navigator from './routes/homeStack';
import { Appearance, AppearanceProvider, useColorScheme } from 'react-native-appearance';

export default function App() {
  let colorScheme = Appearance.getColorScheme()

  return (
    <AppearanceProvider>
      <Navigator />
    </AppearanceProvider>
  )

  // -------------------- BEFORE SCREENS IMPLEMENTED ------------------------ //

  // const [user, setUser] = useState(1)

  // const checkUser = () => {
  //   if (!user) {
  //     return <Button title='log in' onPress={logIn}/>
  //   }
  // }

  // const logIn = () => {
  //   fetch('http://localhost:3000/api/v1/user/1')
  //     .then(resp => (resp.json()))
  //     .then(data => {setUser(data.name)})
  // }

  // const handleAdd = (val) => {
  //   fetch('http://localhost:3000/api/v1/user/1/ingredients', {
  //     method: 'POST',  
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accepts": "application/json"
  //     },
  //     body: JSON.stringify({
  //       "name": val.toLowerCase()
  //     })
  //   })
  // }
  
  // return (
  //   <View>
  //     <Navbar/>
  //     <View>
  //       <AddItem style={styles.container} handleAdd={handleAdd}></AddItem>
  //       {/* <Inventory user={user} ></Inventory> */}
  //     </View>
  //   </View>
  // );
}