import { Text, TextInput, View, StyleSheet } from "react-native"
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "../../contants";

const InputFieldPass = ({ value, className, nameFeather, classNameInput, nameKey, placeholder, classNameContainer,
    invalidFields, setInvalidFields, onChangeText, keyboardType, placeholderTextColor, secureTextEntry,
    selectionColor, onPress, nameFeatherPass }) => {
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
                        secureTextEntry={secureTextEntry}
                        placeholder={placeholder}
                        placeholderTextColor={placeholderTextColor}
                        selectionColor={selectionColor}
                        style={classNameInput}
                        keyboardType={keyboardType}
                        value={value}
                        onChangeText={onChangeText}
                        onFocus={() => setInvalidFields([])}
                    />
                    <Feather
                        name={nameFeatherPass}
                        size={22}
                        color={Colors.DEFAULT_GREY}
                        style={{ marginRight: 10 }}
                        onPress={onPress}
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

export default InputFieldPass

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