import { RefreshControl, ScrollView, ScrollViewComponent, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import TodoItem from './TodoItem'



export default function TodoList({terminalValue,  todos, fetchHandler}) {

  

  useEffect(() => {
    const now = new Date();
    now.setHours(now.getHours() + 3);
    const endDate = now.toJSON().replace("T", " ").replace("Z", "");
    const dateOffset = (24*60*60*1000) * 7;
    const myDate = new Date();
    const startDate = new Date(myDate.setTime(myDate.getTime() - dateOffset)) ;
    console.log('startDate------->',startDate);
    console.log('endDate------->',endDate);
    
    fetchHandler(startDate, endDate)
  }, [terminalValue] )
  // ⚠️ Проверьте подключение!

  return (
    <View style={styles.list} >
      <View style={{ alignItems: 'center' }}><Text style={{ fontSize: 25, fontWeight: 'bold' }}>Переводы</Text></View>
      <ScrollView style={styles.todolist}>
        
        {todos.length > 0 ? todos.map(todo => <TodoItem key={todo["date"]} todo={todo} />) : <View style={{ alignItems: 'center' }}><Text style={{ marginTop: 100, fontSize: 20, fontWeight: 'bold'}}>⚠️ Проверьте подключение!</Text></View>}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  todolist: {
    paddingHorizontal: 15,
  },
  list:{
    // marginTop: 1,
    height: 700,
   
  }
})
