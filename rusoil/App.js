import { useEffect, useState, useCallback, useRef,  } from 'react';
import { Button, RefreshControl, StyleSheet, Text, View, Picker, DrawerLayoutAndroid, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navbar } from './src/components/Navbar';
import TodoList from './src/components/TodoList';
import ExitApp from './src/components/BackHandler';
import Menu from './src/components/Menu';

export default function App() {

  const [todos, setTodos] = useState([])
  const [terminalValue, setTerminalValue] = useState([])
  


  useEffect(()=>{
    try {
      AsyncStorage.getItem('@terminal_Key')
      .then(res=> {
        console.log(res);
        if(res.length){
          setTerminalValue(res.json())
        }
      })
    } catch(e) {
      setTerminalValue(['Rusoil 11', 1647788006225])
    }

  }, [terminalValue])

  const fetchHandler = () =>{

    const now = new Date();
    now.setHours(now.getHours() + 3);
    const endDate = now.toJSON().replace("T", " ").replace("Z", "");
    const dateOffset = (24*60*60*1000) * 7;
    const myDate = new Date();
    const startDate = new Date(myDate.setTime(myDate.getTime() - dateOffset)) ;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      "TerminalKey": terminalValue[1],
      "startdDate": startDate,
      "endDate": endDate,
      "istopaz": "false"
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    if(terminalValue[0] !== undefined){
      fetch("http://rusoilperevody.rusoil.keenetic.link/", requestOptions)
      .then(response => response.json())
      .then(res => setTodos(res.reverse()))
      .catch(() =>setTodos())
    }
    
  }
  const drawer = useRef(null);

  const terminal = [['Rusoil 11', 1647788006225], ['Rusoil 12', 1646488774183], ['Rusoil 2', 1646488910428], ['Rusoil 3', 1646488994888]]
  const navigationView = () => (
    <View style={[styles.wrap, styles.navigationContainer]}>
      <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop:50 }}>{terminalValue[0] !== undefined?`${terminalValue[0]}`:`Заправка не выбрана`}</Text>
        <Picker
        selectedValue=''
        style={{ height: 50, width: 150, marginBottom:150 }}
        onValueChange={(itemValue, itemIndex) => {
          try {
            const jsonValue = JSON.stringify(terminal[itemIndex])
            AsyncStorage.setItem('@storage_Key', jsonValue)
            .then(setTerminalValue(terminal[itemIndex]))
          } catch (e) {
            // saving error
          }
        }}
      >
        {terminal.map(el => <Picker.Item label={`${el[0]}`} value={`${el[1]}`} />)}
        
      </Picker>
      <Button
        title="Закрыть меню"
        onPress={() => drawer.current.closeDrawer()}
      /> 
    </View>);

  return (
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={navigationView}
      >
    <View style={styles.container}>
      
      <ExitApp/>
      {/* <Button
          title="Open drawer"
          onPress={() => drawer.current.openDrawer()}
        /> */}
      <Navbar setTerminalValue={setTerminalValue} terminalValue={terminalValue} todos={todos} setTodos={setTodos} fetchHandler={fetchHandler}/>
      <TodoList terminalValue={terminalValue} todos={todos} setTodos={setTodos} fetchHandler={fetchHandler} />
    </View>
    </DrawerLayoutAndroid>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  navigationContainer: {
    backgroundColor: "#ecf0f1",
    // backgroundColor: "white"
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: "center"
  },
  wrap: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    padding: 16,
  },
 

});
