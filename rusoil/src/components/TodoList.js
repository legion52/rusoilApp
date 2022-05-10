import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import TodoItem from './TodoItem'



export default function TodoList({terminalValue,  todos, fetchHandler}) {

  

  useEffect(() => {
  
    fetchHandler()
  }, [terminalValue] )

  return (
    <View style={styles.list} >
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{terminalValue[0] !== undefined?`Переводы`:''}</Text>
      </View>
      <ScrollView style={styles.todolist}>
        {todos !== undefined && todos.length ? todos.map(todo => <TodoItem key={todo["date"]} todo={todo} />) : <View style={{ alignItems: 'center'}}><Text style={{ fontSize: 20, fontWeight: 'bold'}}>{terminalValue[0] !== undefined?`⚠️ Проверьте подключение!`:`Выберите заправку`}</Text></View>}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  todolist: {
    paddingHorizontal: 15,
  },
  list:{
    height: 700,
   
  }
})
