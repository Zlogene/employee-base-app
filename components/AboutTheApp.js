import {Button, StyleSheet, Text, View} from 'react-native'
import React from 'react'

export default function AboutTheApp({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Employee base app</Text>
            <Text style={styles.text}>
                This application is designed to store, edit, and save information about employees of a certain
                institution. All data is stored in the firebase database.
            </Text>
            <Text style={styles.text}>
                This application was developed as part of the training course "development of multi-platform
                applications", as an individual project.
            </Text>
            <Text style={styles.text}>
                <b>Author: Dmitriev Nikita Sergeyevich, student of the IT-41</b>
            </Text>
            <Button style={styles.button} onPress={() => navigation.goBack()} title="Go to home page"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        alignItems: 'center', justifyContent: 'center',textAlignVertical: 'center',
        fontSize: 16,
        marginBottom: 10,
    },
    button: {},
})