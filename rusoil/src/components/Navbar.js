import React, { useState, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, Button, ScrollView, RefreshControl, Picker } from 'react-native'

export const Navbar = ({terminalValue, fetchHandler}) => {
  const terminal = [['Rusoil 11', 1647788006225], ['Rusoil 12', 1646488774183], ['Rusoil 2', 1646488910428], ['Rusoil 3', 1646488994888]]
  const [value, setValue] = useState(1)
  const [refreshing, setRefreshing] = useState(false)
  

  const onRefresh = () => {
    setRefreshing(true);
    fetchHandler()
    setRefreshing(false)
      
  };

  return (
    <ScrollView 
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />}
      >
    <View style={styles.navbar} >
    
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{terminalValue[0] !== undefined?`${terminalValue[0]}`:`Заправка не выбрана`}</Text>
  
   
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
    justifyContent: 'center',
    paddingBottom: 10,
  },
  text: {
    color: 'black'
  },
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: "center",
    fontSize: 25, 
    fontWeight: 'bold'
  }

})
