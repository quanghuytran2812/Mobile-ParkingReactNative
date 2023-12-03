import React, { memo, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, SafeAreaView, Pressable, Keyboard } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import InputForm from '../input/InputForm';
import { fetchFeedback, updateFeedback } from '../../store/feedbackSlice';
import { validate } from '../../utils/helpers';
import { AirbnbRating } from 'react-native-ratings';
import { ScrollView } from 'react-native-gesture-handler';

const ModalFeedback = ({ open, onClose, dataF }) => {
    const [invalidFields, setInvalidFields] = useState([]);
    const [payload, setPayload] = useState({
        content: ''
    })
    const [rankStar, setRankStar] = useState(0);
    const dispatch = useDispatch();
    const getFeedbackbyId = useSelector((state) => state.feedback.list);
    const handleClick = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        dispatch(fetchFeedback(dataF.reportId));
    }, [dispatch, dataF]);

    useEffect(() => {
        if (open) {
            setPayload({ content: getFeedbackbyId !== null ? getFeedbackbyId[0].content : ""});
            setRankStar(getFeedbackbyId !== null ? getFeedbackbyId[0].rankStar : 0)
        }
    }, [open, getFeedbackbyId]);

    const handleFeedback = () => {
        const invalids = validate(payload, setInvalidFields);

        if (invalids === 0) {
            const feedbackUpdate = {
                feedBackId: dataF.reportId,
                content: payload.content,
                rankStar: rankStar,
            };
            dispatch(updateFeedback(feedbackUpdate))
                .then((result) => {
                    onClose();
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    return (
        <SafeAreaView style={styles.ModalCommonoverlay}>
            <Pressable
                style={{ height: '100%' }}
                onPress={Keyboard.dismiss}
            >
                <View onTouchStart={handleClick} style={styles.ModalCommonmodalContainer}>
                    <View style={styles.ModalCommonForm}>
                        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
                            <Ionicons name="close-outline" size={22} />
                        </TouchableOpacity>
                        <ScrollView pagingEnabled>
                            <Text style={styles.modalformHeading}>Phản hồi</Text>
                            <View style={styles.inputFieldDiv}>
                                <AirbnbRating
                                    count={5}
                                    reviews={["Very Bad", "Bad", "Good", "Very Good", "Excellent"]}
                                    defaultRating={rankStar}
                                    size={30}
                                    onFinishRating={(rating) => setRankStar(rating)}
                                />
                            </View>
                            <View style={styles.inputFieldDiv}>
                                <InputForm
                                    className={styles.inputGroupText}
                                    nameKey="content"
                                    classNameInput={styles.modalGroupinputText}
                                    value={payload.content}
                                    onChangeText={(value) =>
                                        setPayload((prev) => ({ ...prev, content: value }))
                                    }
                                    placeholder="Nội dung"
                                    multiline={true}
                                    numberOfLines={4}
                                    invalidFields={invalidFields}
                                    setInvalidFields={setInvalidFields}
                                />
                            </View>
                            <TouchableOpacity style={styles.btnCommon1} onPress={handleFeedback}>
                                <Text style={styles.btnTextCommon1}>Lưu thay đổi</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    ModalCommonoverlay: {
        backgroundColor: 'rgba(49, 49, 49, 0.8)',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    ModalCommonmodalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100%',
        margin: 0,
    },
    ModalCommonForm: {
        width: 320,
        paddingVertical: 50,
        paddingHorizontal: 30,
        borderRadius: 15,
        backgroundColor: 'white',
        elevation: 4,
    },
    closeBtn: {
        position: 'absolute',
        top: 8,
        right: 8,
        zIndex: 1,
    },
    modalformHeading: {
        textTransform: 'uppercase',
        fontSize: 16,
        letterSpacing: 1,
        fontWeight: '700',
        lineHeight: 20,
        color: '#333',
        marginBottom: 20,
    },
    btnCommon1: {
        height: 40,
        borderRadius: 5,
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.27,
        shadowRadius: -3,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTextCommon1: {
        color: '#fcfcfc',
        fontWeight: 'bold',
        fontSize: 17,
    },
    inputGroup: {
        marginBottom: 5,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
    },
    inputGroupText: {
        marginBottom: 5,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
    },
    modalGroupinputText: {
        borderWidth: 1,
        borderColor: 'red',
        width: '100%',
        height: 90,
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 10,
        fontSize: 15,
        fontWeight: '600',
        color: '#323232',
        textAlignVertical: 'top'
    },
    modalGroupinput: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
        borderWidth: 0,
        padding: 10,
        fontSize: 15,
        fontWeight: '600',
        color: '#323232',
    },
    inputFieldDiv: {
        marginBottom: 20,
    },
})

export default memo(ModalFeedback)
