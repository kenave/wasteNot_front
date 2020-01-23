import React from 'react';
import Navigator from './routes/homeStack';

export default function App() {

  return (
    <Navigator />
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