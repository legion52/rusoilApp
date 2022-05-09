import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TodoItem = ({todo}) => {

  return (
    <View style={styles.todoit}>
      <Text style={styles.text}>{todo['date'].replace(/[a-zа-яё ]/gi, '   ').slice(0, -10)}</Text>
      <Text style={styles.price}>{todo['Amount'].slice(0, -5)}₽</Text>
    </View>
  )
}

export default TodoItem

const styles = StyleSheet.create({
  todoit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderStyle: 'solid',
    borderBottomWidth: 0.8,
    borderBottomColor: 'black',
    height: 30,
    marginVertical: 10,
  },
  text:{
    fontSize: 18
  },
  price:{
    fontWeight: 'bold',
    fontSize: 18

  }
})
