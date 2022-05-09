import React, { useState, useCallback } from 'react'
import { Text, View, StyleSheet, Button, ScrollView, RefreshControl } from 'react-native'

export const Navbar = ({setTerminalValue, terminalValue, fetchHandler}) => {
  const terminal = [[],['Rusoil 11', 1647788006225], ['Rusoil 12', 1646488774183], ['Rusoil 2', 1646488910428], ['Rusoil 3', 1646488994888]]
  const [value, setValue] = useState(1)
  const [refreshing, setRefreshing] = useState(false)
  const nextState = () => {
    if (value !== 4){
      setValue((prev) => ++prev)
      setTerminalValue(terminal[value])
      console.log(terminalValue, value);
    }
    else{
      setValue(1)
      setTerminalValue(terminal[value])
    }
  }

  const prevState = () => {
      setValue((prev) => --prev)
      if (value !== 1){
      setTerminalValue(terminal[value])
    }
    else{
      setValue(4)
      setTerminalValue(terminal[value])
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const now = new Date();
    const myDate = new Date();
    now.setHours(now.getHours() + 3);
    const endDate = now.toJSON().replace("T", " ").replace("Z", "");
    const dateOffset = (24*60*60*1000) * 7;
    const startDate = new Date(myDate.setTime(myDate.getTime() - dateOffset)) ;
    console.log('startDate------->',startDate);
    console.log('endDate------->',endDate);
    console.log('terminalValue>',terminalValue);
    
    fetchHandler(startDate, endDate)
    setRefreshing(false)
      
  }, []);

  return (
    <ScrollView 
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}
      >
    <View style={styles.navbar} >
      <Button style={styles.button} title='<'color="black" onPress={prevState} />
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{`${terminalValue[0]}`}</Text>
      <Button style={styles.button} title='>' onPress={nextState}
      color="black"/>
    </View>
    <View></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height:170,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 40,
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  text: {
    color: 'black'
  },

})
