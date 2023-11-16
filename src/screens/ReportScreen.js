import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons"


const ReportScreen = ({navigation}) => {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState('');
    const addReview = () => {
        if (newReview) {
            setReviews([...reviews, newReview]);
            setNewReview('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Ionicons
                    name="arrow-back-outline" size={30}
                    onPress={() => navigation.goBack()}
                />
                <Text style={{paddingLeft: 10, fontSize: 20, fontWeight: 700}}>Đánh giá</Text>
            </View>

            {/* Input for new review */}
            <TextInput
                style={styles.input}
                placeholder="đánh giá ý kiến của bạn"
                value={newReview}
                onChangeText={(text) => setNewReview(text)}
            />

            {/* Button to add a new review */}
            <Button title="Đánh giá" onPress={addReview} />

            {/* Display list of reviews */}
            <FlatList
                data={reviews}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.reviewItem}>
                        <Text>{item}</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        paddingTop: 8
    },
    input: {
        height: 80,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 20
    },
    reviewItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        marginBottom: 8,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 3,
    },
});

export default ReportScreen

