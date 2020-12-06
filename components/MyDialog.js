import Dialog from 'react-native-dialog'

import React from 'react'

const MyDialog = props => {
    return (
        <Dialog.Container visible={props.visible}>
            <Dialog.Title>Employee delete</Dialog.Title>
            <Dialog.Description>
                Do you want to delete this employee?
            </Dialog.Description>
            <Dialog.Button label="Cancel" onPress={() => props.interactWithDialog('')}/>
            <Dialog.Button label="Delete" onPress={props.removeEmployee}/>
        </Dialog.Container>
    )
}

export default MyDialog