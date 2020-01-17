import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// NOT IN USE

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <Text style={styles.title}>My Inventory</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 80,
    paddingTop: 42,
    backgroundColor: 'teal'
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  }
})