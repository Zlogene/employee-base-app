import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Employee from './screen/Employee'
import EmployeeList from './screen/EmployeeList'
import Filters from './screen/Filters'
import AboutTheApp from './components/AboutTheApp'
import Icon from 'react-native-vector-icons/Entypo'

// navigation.navigate('Notifications')

function HomeScreen({navigation}) {
    const Stack = createStackNavigator({
            FIleList: {
                screen: EmployeeList,
                navigationOptions: {
                    title: 'List of employees',
                    headerStyle: {backgroundColor: '#1E90FF'},
                    headerTitleStyle: {color: 'white'},
                    headerLeft: () => (
                        <Icon
                            onPress={() => navigation.openDrawer()}
                            name={'menu'}
                            style={{color: 'white', fontSize: 34, marginLeft: 10}}
                        />

                    ),
                },
            },
            File: {
                screen: Employee,
                navigationOptions: ({navigation}) => {
                    return {
                        title: navigation.state.params.isEdit ? 'Editing' : 'Creating',
                        headerStyle: {backgroundColor: '#1E90FF'},
                        headerTitleStyle: {color: 'white'},
                    }
                },
            },
            Filters: {
                screen: Filters,
                navigationOptions: {
                    title: 'Filters',
                    headerStyle: {backgroundColor: '#1E90FF'},
                    headerTitleStyle: {color: 'white'},
                },
            },
        },
        {
            initialRouteName: 'FIleList',
        })

    const Navigation = createAppContainer(Stack)

    return <Navigation/>
}

const Drawer = createDrawerNavigator()

export default function App() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="List of employees" component={HomeScreen}/>
                <Drawer.Screen name="About the app" component={AboutTheApp}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}
