import React, { useState } from 'react'
import { Text, View, StyleSheet, ScrollView, RefreshControl } from 'react-native'

export const Navbar = ({terminalValue, fetchHandler}) => {
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
      />}>
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
