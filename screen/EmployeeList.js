import React from 'react'
import {
    ScrollView, SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
} from 'react-native'
import {ListItem, Button} from 'react-native-elements'
import Icon from 'react-native-vector-icons/AntDesign'
import Store from '../store/Store'
import MyDialog from '../components/MyDialog'

class EmployeeList extends React.Component {
    constructor(props) {
        super(props)

        this.store = new Store()

        this.state = {
            employeeList: [],
            filters: [],
            visible: false,
            id: '',
        }
    }

    async componentDidMount() {
        this.setState({
            employeeList: await this.store.getEmployeeList(),
        })
    }

    createEmployee = async (employeeData) => {
        await this.setState({
            employeeList: await this.store.createEmployee(employeeData),
        })
    }

    editEmployee = async (id, employeeData) => {
        await this.setState({
            employeeList: await this.store.editEmployee(id, employeeData),
        })
    }

    removeEmployee = async (id) => {
        await this.setState({
            employeeList: await this.store.removeEmployee(id),
        })
    }

    filterEmployee = (filter) => {
        this.setState({
            employeeList: this.store.setFilters(filter),
        })
    }

    createEmployeeHandler = () => {
        this.props.navigation.navigate('File', {
            createEmployee: this.createEmployee,
            isEdit: false,
            title: 'New document',
        })
    }

    clickEmployeeHandler = (employee) => {
        this.props.navigation.navigate('File', {
            editEmployee: this.editEmployee,
            removeEmployee: this.removeEmployee,
            employee,
            isEdit: true,
        })
    }

    openFiltersHandler = () => {
        this.props.navigation.navigate('Filters', {
            filterEmployee: this.filterEmployee,
            filters: this.store.filters,
        })
    }

    removeEmployeeHandler = async () => {
        await this.removeEmployee(this.state.id)
        this.interactWithDialog('')
    }

    interactWithDialog = (id = '') => {
        this.setState({
            visible: !this.state.visible,
            id,
        })
    }

    renderFilterPanel = () => {
        const filters = this.store.filters
        const length = filters.length

        return (
            <View style={{flexDirection: 'row', backgroundColor: 'rgb(134, 147, 158)'}}>
                {
                    length > 0 &&
                    <Text
                        style={{fontSize: 12, marginLeft: 5, color: 'white'}}>
                        Filters:
                    </Text>
                }

                {
                    filters.map((filter, i) => {
                        const {value, type} = filter
                        let label = ''

                        if(type === 'accordance') {
                            label = value
                        } else if (type === 'ageInterval') {
                            label = 'from ' + value.lowerBorder + ' to ' + value.upperBorder + ' yo'
                        }

                        return (
                                <Text
                                    key={`filter-${i}`}
                                    style={{fontSize: 12, marginLeft: 5, color: 'white'}}>
                                    {label}{i+1 === length ? '' : ','}
                                </Text>
                            )
                    })
                }
            </View>
        )
    }


    render() {
        const {employeeList, visible} = this.state
        return (
            <SafeAreaView style={styles.container}>
                {this.renderFilterPanel()}
                <ScrollView>
                    {
                        employeeList.length > 0
                            ? employeeList.map((employee, index) => {
                                const {id, firstname, patronymic, lastname, post} = employee

                                return (
                                    <ListItem
                                        key={id || `employee-${index}`}
                                        onPress={() => this.clickEmployeeHandler(employee)} bottomDivider>
                                        <Icon name="user" size={20} color="black"/>
                                        <ListItem.Content>
                                            <ListItem.Title>{lastname} {firstname} {patronymic}</ListItem.Title>
                                            <ListItem.Subtitle>{post}</ListItem.Subtitle>
                                        </ListItem.Content>
                                        <Icon name="close" size={20} color="black"
                                              onPress={() => this.interactWithDialog(id)}/>
                                    </ListItem>
                                )
                            })
                            : <Text style={styles.textStyle}>No users :(</Text>
                    }
                </ScrollView>
                <View style={styles.container}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={this.createEmployeeHandler}
                        style={styles.touchableOpacityStyle}>
                        <Icon
                            name={'pluscircle'}
                            style={styles.floatingButtonStyle}
                            size={50} color="#1E90FF"
                        />
                    </TouchableOpacity>
                </View>
                <Button
                    onPress={this.openFiltersHandler}
                    icon={{
                        name: 'filter',
                        size: 15,
                        color: 'white',
                        type: 'font-awesome',
                    }}
                    iconLeft
                    title="Filters"
                />
                <MyDialog
                    removeEmployee={this.removeEmployeeHandler}
                    interactWithDialog={this.interactWithDialog}
                    visible={visible}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
    },
    textStyle: {
        fontSize: 18,
        textAlign: 'center',
        padding: 10,
    },
    touchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 10,
        bottom: 20,
    },
    floatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
})

export default EmployeeList