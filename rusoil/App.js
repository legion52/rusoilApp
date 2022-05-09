import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useCallback } from 'react';
import { Alert, RefreshControl, StyleSheet, Text, View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navbar } from './src/components/Navbar';
import TodoList from './src/components/TodoList';

export default function App() {

  const [terminalValue, setTerminalValue] = useState(['Rusoil 11', 1647788006225])
  const [todos, setTodos] = useState([])
 
  
  useEffect(()=>{
    try {
      AsyncStorage.getItem('@terminal_Key')
      .then(res=> {
        if(res){
          setTerminalValue(res)
        }
      })
    } catch(e) {
      setTerminalValue(['Rusoil 11', 1647788006225])
    }

  }, [])

  const fetchHandler = (startDay, endDay) =>{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
 
    const raw = JSON.stringify({
      "TerminalKey": terminalValue[1],
      "startdDate": startDay,
      "endDate": endDay,
      "istopaz": "false"
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    fetch("http://rusoilperevody.rusoil.keenetic.link/", requestOptions)
      .then(response => response.json())
      .then(res => setTodos(res.reverse()))
      // .then(console.log(todos))
  }

  

  return (
    <View style={styles.container}>
      <Navbar setTerminalValue={setTerminalValue} terminalValue={terminalValue} todos={todos} setTodos={setTodos} fetchHandler={fetchHandler}/>
      <TodoList terminalValue={terminalValue} todos={todos} setTodos={setTodos} fetchHandler={fetchHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
 

});
