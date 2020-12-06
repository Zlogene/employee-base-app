import React, {Component} from 'react'
import {Text} from 'react-native-elements'
import {TextInput, View} from 'react-native'

export default class MyAgeRange extends Component {
    state = {
        lowerBorder: '',
        upperBorder: '',
        incorrectInterval: false,
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if(this.props.defaultRange !== nextProps.defaultRange) {
            const {lowerBorder, upperBorder, incorrectInterval} = nextProps.defaultRange
            this.setState({
                lowerBorder, upperBorder, incorrectInterval
            })
        }
        return true
    }

    onChangeUpperBorder = (text) => {
        const value = text.replace(/[^0-9]/g, '')
        let {lowerBorder, upperBorder, incorrectInterval} = this.state

        if (value !== upperBorder) {
            incorrectInterval = lowerBorder !== '' && value < lowerBorder
            upperBorder = value !== '' ? parseInt(value) : ''
            this.setState({
                upperBorder, incorrectInterval,
            })
            this.props.changeAgeRange(lowerBorder, upperBorder, incorrectInterval)
        }
    }

    onChangeLowerBorder = (text) => {
        const value = text.replace(/[^0-9]/g, '')
        let {lowerBorder, upperBorder, incorrectInterval} = this.state

        if (value !== lowerBorder) {
            incorrectInterval = upperBorder !== '' && value > upperBorder
            lowerBorder = value !== '' ? parseInt(value) : '',
                this.setState({
                    lowerBorder,
                    incorrectInterval,
                })
            this.props.changeAgeRange(lowerBorder, upperBorder, incorrectInterval)
        }
    }


    render() {
        const {lowerBorder, upperBorder, incorrectInterval} = this.state

        return (
            <>
                <Text style={{fontWeight: 'bold', color: 'rgb(134, 147, 158)', marginLeft: '10px'}}>
                    Set the age range
                </Text>
                <View style={{
                    flexDirection: 'row',
                    marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10,
                }}>
                    <View style={{flex: 1, borderBottom: '1px solid gray', marginRight: 5}}>
                        <TextInput
                            value={lowerBorder}
                            placeholder={'from'}
                            style={{marginBottom: 10, fontSize: 16, height: 30}}
                            keyboardType='numeric'
                            onChangeText={this.onChangeLowerBorder}
                        />
                    </View>
                    <View style={{flex: 1, borderBottom: '1px solid gray'}}>
                        <TextInput
                            value={upperBorder}
                            placeholder={'to'}
                            style={{marginBottom: 10, fontSize: 16, height: 30}}
                            keyboardType='numeric'
                            onChangeText={this.onChangeUpperBorder}
                        />
                    </View>
                </View>
                {
                    incorrectInterval &&
                    <Text style={{fontWeight: 'bold', color: '#DC143C', marginLeft: '10px'}}>
                        You specified an incorrect interval!
                    </Text>
                }

            </>
        )
    }
}