import { Text, TextInput, View, StyleSheet } from "react-native"
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "../../contants";

const InputField = ({ value, className, nameFeather, classNameInput, nameKey, placeholder, classNameContainer,
    invalidFields, setInvalidFields, onChangeText, keyboardType, placeholderTextColor, selectionColor, editable }) => {
    return (
        <>
            <View style={classNameContainer}>
                <View style={className}>
                    {nameFeather && (
                        <Feather name={nameFeather}
                            size={22}
                            color={Colors.DEFAULT_GREY}
                            style={{ marginRight: 10 }}
                        />
                    )}
                    <TextInput
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}
                        selectionColor={selectionColor}
                        style={classNameInput}
                        keyboardType={keyboardType}
                        value={value}
                        onChangeText={onChangeText}
                        onFocus={() => setInvalidFields([])}
                        editable={editable}
                    />
                </View>
            </View>
            {invalidFields?.some(el => el.name === nameKey) && (
                <Text style={styles.errMessage}>
                    {invalidFields.find(el => el.name === nameKey)?.mes}
                </Text>
            )}
        </>
    )
}

export default InputField

const styles = StyleSheet.create({
    errMessage: {
        fontSize: 14,
        fontStyle: 'italic',
        color: 'red',
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginTop: 5
    },
})