import React, {Component} from 'react'
import {Picker, View} from 'react-native'
import {Text} from 'react-native-elements'

export default class MyPicker extends Component {
    render() {
        const {name, list, value, onChangeItem, label} = this.props
        return (
            <>
                <Text style={{fontWeight: 'bold', color: 'rgb(134, 147, 158)', marginLeft: '10px'}}>
                    {label}
                </Text>
                <View style={{
                    borderBottom: '1px solid gray', marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10,
                }}>
                    <Picker
                        style={{
                            marginBottom: 10, border: 0, position: 'relative',
                            left: -4,
                        }}
                        selectedValue={value} onValueChange={(value) => onChangeItem(value, name)}>
                        {
                            list.map((department) =>
                                <Picker.Item
                                    label={department.label}
                                    value={department.value}
                                    key={department.value}
                                />,
                            )
                        }
                    </Picker>
                </View>
            </>
        )
    }
}