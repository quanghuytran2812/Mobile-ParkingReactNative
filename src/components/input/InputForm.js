import { Text, TextInput, View, StyleSheet } from "react-native"

const InputForm = ({ value, className, classNameInput, nameKey, placeholder,
    invalidFields, setInvalidFields, onChangeText, keyboardType }) => {
    return (
        <>
            <View style={className}>
                <TextInput
                    placeholder={placeholder}
                    style={classNameInput}
                    keyboardType={keyboardType}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setInvalidFields([])}
                />
            </View>
            {invalidFields?.some(el => el.name === nameKey) && (
                <Text style={styles.errMessage}>
                    {invalidFields.find(el => el.name === nameKey)?.mes}
                </Text>
            )}
        </>
    )
}

export default InputForm

const styles = StyleSheet.create({
    errMessage: {
        fontSize: 14,
        fontStyle: 'italic',
        color: 'red',
    },
})