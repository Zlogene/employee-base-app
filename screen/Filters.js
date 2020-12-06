import React from 'react'
import {StyleSheet, View, TextInput} from 'react-native'
import {Button, Text} from 'react-native-elements'
import MyPicker from '../components/MyPicker'
import {departmentsList, educationsList} from '../data/appData'
import MyAgeRange from '../components/MyAgeRange'

export default class Filters extends React.Component {
    constructor(props) {
        super(props)

        this.activeFilters = []

        this.state = {
            education: '',
            department: '',
            defaultRange: null,
        }
    }

    componentDidMount() {
        const {navigation: {state: {params}}} = this.props
        const {filters} = params
        if (filters.length > 0) {
            for (const element of filters) {
                const {type, filter, value} = element
                if (type === 'accordance') {
                    this.state[filter] = value
                } else if (type === 'ageInterval') {
                    this.state.defaultRange = value
                }

                this.activeFilters.push({
                    filter, value, type,
                })
            }
            this.setState(this.state)
        }
    }

    applyHandler = () => {
        const {navigation: {goBack, state: {params}}} = this.props
        const {filterEmployee} = params
        filterEmployee(this.activeFilters)
        goBack()
    }

    resetHandler = () => {
        const {navigation: {goBack, state: {params}}} = this.props
        const {filterEmployee} = params
        this.activeFilters = []
        filterEmployee(this.activeFilters)
        goBack()
    }

    changePicker = (value, name) => {
        this.state[name] = value
        this.setState(this.state)

        const index = this.getFilter(name)

        if (value === '' && index !== -1) {
            this.activeFilters.splice(index, 1)
        } else if (index !== -1) {
            this.activeFilters[index].value = value
        } else {
            this.activeFilters.push({
                filter: name, value, type: 'accordance',
            })
        }
    }

    changeAgeRange = (lowerBorder, upperBorder, incorrectInterval) => {
        const index = this.getFilter('birthDate')
        if (index === -1) {
            this.activeFilters.push({
                filter: 'birthDate', value: {
                    lowerBorder, upperBorder, incorrectInterval,
                }, type: 'ageInterval',
            })
        } else {
            this.activeFilters[index].value = {
                lowerBorder, upperBorder, incorrectInterval,
            }
        }
    }

    getFilter(filter) {
        return this.activeFilters.findIndex(x => x.filter === filter)
    }

    render() {
        const {navigation: {state: {params}}} = this.props
        const {filters} = params
        const {education, department, defaultRange} = this.state

        return (
            <View style={styles.container}>
                <Text style={{fontWeight: 'bold', marginBottom: '20px', marginLeft: '10px'}} h4>
                    Filters
                </Text>

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

                <MyAgeRange
                    defaultRange={defaultRange}
                    changeAgeRange={this.changeAgeRange}
                />

                <Button
                    style={{marginTop: 20}}
                    onPress={this.applyHandler}
                    title="Apply"
                />
                {
                    filters.length > 0 && <Button
                        buttonStyle={{backgroundColor: '#DC143C', marginTop: 10}}
                        onPress={this.resetHandler}
                        title="Reset the filters"
                    />
                }
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