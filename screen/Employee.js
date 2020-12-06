import React from 'react'
import {View, StyleSheet, Picker} from 'react-native'
import {Text, Input, Button} from 'react-native-elements'
import {departmentsList, educationsList} from '../data/appData'
import MyDialog from '../components/MyDialog'
import BirthdayPicker from '../components/BirthdayPicker'
import {MessageBar, showMessage} from 'react-native-messages'
import MyPicker from '../components/MyPicker'

export default class Employee extends React.Component {
    constructor(props) {
        super(props)

        this.employeeData = {}

        this.state = {
            departmentIsOpen: false,
            educationIsOpen: false,
            department: '',
            education: '',
            dateIsChanged: false,
            birthDate: {
                year: 2020, day: 1, month: 0,
            },
            visible: false,
        }
    }

    applyHandler = () => {
        if (Object.keys(this.employeeData).length > 0) {
            const {navigation: {goBack, state: {params}}} = this.props
            const {isEdit, editEmployee, createEmployee, employee} = params
            if (isEdit) {
                editEmployee(employee.id, this.employeeData)
            } else {
                createEmployee(this.employeeData)
            }
            goBack()
        } else showMessage('Fill in the employee information!')
    }

    removeHandler = () => {
        const {navigation: {goBack, state: {params}}} = this.props
        const {employee, removeEmployee} = params
        removeEmployee(employee.id)
        this.interactWithDialog('')
        goBack()
    }

    changePicker = (value, name) => {
        this.state[name] = value
        this.setState(this.state)
        this.employeeData[name] = value
    }

    interactWithDialog = () => {
        this.setState({
            visible: !this.state.visible,
        })
    }

    setDate = (value, type) => {
        let {birthDate} = this.state
        birthDate[type] = parseInt(value)
        this.setState({
            birthDate, dateIsChanged: true,
        })
        this.employeeData.birthDate = birthDate
    }

    render() {
        const {navigation: {state: {params}}} = this.props
        const {employee, isEdit} = params
        const {visible, birthDate, dateIsChanged} = this.state
        const department = isEdit && this.state.department === '' ? employee.department : this.state.department
        const education = isEdit && this.state.education === '' ? employee.education : this.state.education

        let {year, day, month} = birthDate

        if (isEdit && !dateIsChanged) {
            year = employee.birthDate.year
            day = employee.birthDate.day
            month = employee.birthDate.month
        }

        return (
            <View style={styles.container}>
                <MessageBar
                    duration={2000}
                />
                <Text style={{fontWeight: 'bold', marginBottom: '20px', marginLeft: '10px'}} h4>
                    {isEdit ? 'Editing an employee' : 'Creating an employee'}
                </Text>


                <Input
                    onChangeText={value => {
                        this.firstname = value
                        this.employeeData.firstname = value
                    }}
                    label={'Firstname'}
                    defaultValue={isEdit ? employee.firstname : ''}
                />

                <Input
                    onChangeText={value => {
                        this.lastname = value
                        this.employeeData.lastname = value
                    }}
                    label={'Lastname'}
                    defaultValue={isEdit ? employee.lastname : ''}
                />

                <Input
                    onChangeText={value => {
                        this.patronymic = value
                        this.employeeData.patronymic = value
                    }}
                    label={'Patronymic'}
                    defaultValue={isEdit ? employee.patronymic : ''}
                />

                <Text style={{fontWeight: 'bold', color: 'rgb(134, 147, 158)', fontSize: '16px', marginLeft: '10px'}}>
                    Birth date
                </Text>

                <View style={{
                    marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10,
                    fontSize: '16px', borderBottom: '1px solid gray',
                }}>
                    <BirthdayPicker
                        selectedYear={year}
                        selectedMonth={month}
                        selectedDay={day}
                        yearsBack={100}
                        onYearValueChange={year => this.setDate(year, 'year')}
                        onMonthValueChange={month => this.setDate(month, 'month')}
                        onDayValueChange={day => this.setDate(day, 'day')}
                    />
                </View>

                <MyPicker
                    label={'Education'}
                    name={'education'}
                    list={educationsList}
                    value={education}
                    onChangeItem={this.changePicker}
                />

                <MyPicker
                    label={'Department'}
                    name={'department'}
                    list={departmentsList}
                    value={department}
                    onChangeItem={this.changePicker}
                />

                <Input
                    onChangeText={value => {
                        this.post = value
                        this.employeeData.post = value
                    }}
                    label={'Post'}
                    defaultValue={isEdit ? employee.post : ''}
                />

                <Button
                    style={{marginTop: 20}}
                    onPress={this.applyHandler}
                    title="Apply"
                />
                {
                    isEdit
                        ? <Button
                            buttonStyle={{backgroundColor: '#DC143C', marginTop: 10}}
                            onPress={this.interactWithDialog}
                            title="Remove this employee"
                        />
                        : null
                }
                <MyDialog
                    removeEmployee={this.removeHandler}
                    interactWithDialog={this.interactWithDialog}
                    visible={visible}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
})