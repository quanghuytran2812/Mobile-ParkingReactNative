import { Text, TextInput, View, StyleSheet } from "react-native"
import Feather from "react-native-vector-icons/Feather";
import { Colors } from "../../contants";

const InputFormPass = ({ value, className, classNameInput, nameKey, placeholder, classNameContainer,
    invalidFields, setInvalidFields, onChangeText, keyboardType, placeholderTextColor, secureTextEntry,
    selectionColor, onPress, nameFeatherPass }) => {
    return (
        <>
            <View style={classNameContainer}>
                <View style={className}>
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
                {invalidFields?.some(el => el.name === nameKey) && (
                    <Text style={styles.errMessage}>
                        {invalidFields.find(el => el.name === nameKey)?.mes}
                    </Text>
                )}
            </View>
        </>
    )
}

export default InputFormPass

const styles = StyleSheet.create({
    errMessage: {
        fontSize: 14,
        fontStyle: 'italic',
        color: 'red',
    },
})