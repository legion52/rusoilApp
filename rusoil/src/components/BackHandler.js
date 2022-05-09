import React, { useEffect } from "react";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";

const ExitApp = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Вы действительно хотите выйти из приложения?", "", [
        {
          text: "ОТМЕНА",
          onPress: () => null,
          style: "cancel"
        },
        { text: "ВЫЙТИ", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Click Back button!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default ExitApp;
