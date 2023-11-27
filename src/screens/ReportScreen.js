import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';
import { AnimatedIcon, ModalAddReport, ModalFeedback } from '../components';
import { fetchReport } from '../store/reportSlice';
import { Table, Row } from 'react-native-table-component';
import moment from 'moment';
import { Dimensions } from 'react-native';

const ReportScreen = ({ navigation }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openModalF, setOpenModalF] = useState(false);
    const listReport = useSelector((state) => state.report.list);
    const dispatch = useDispatch();

    const fetchData = useCallback(() => {
        try {
            dispatch(fetchReport());
        } catch (error) {
            console.error('Error fetching report data:', error);
        }
    }, [dispatch]);

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    const handleUpdateData = () => {
        fetchData();
    };

    const handleFeedback = () => {
        setOpenModalF(true)
    }

    const tableHead = [
        'PURPOSE', 'CREATEDATE', 'STATUS', 'PROCESSDATE', 'Feedback'
    ]

    const renderButton = () => {
        return (
            <TouchableOpacity
                style={styles.btnCommon}
                onPress={handleFeedback}
            >
                <Ionicons
                    name="send-outline" size={22}
                />
            </TouchableOpacity>
        )
    }

    const renderItem = ({ item }) => {
        // Assuming each item in the listReport has reportId, name, and age properties
        return (
            <Table borderStyle={{ borderWidth: 1 }}>
                <Row
                    data={[
                        item.content,
                        moment(item.createDate).format("DD/MM/YYYY"),
                        item.processingStatus === 1 ? 'completed' : 'processing',
                        item.processingDate !== null ? moment(item.processingDate).format("DD/MM/YYYY, h:mm:ss A") : '',
                        renderButton()
                    ]}
                    style={styles.tableRowBody}
                    textStyle={styles.tableRowBodyText}
                />
            </Table>
        );
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.containerTopHearder}>
                    <View style={styles.headerContainer}>
                        <Ionicons
                            name="arrow-back-outline" size={22}
                            onPress={() => navigation.goBack()}
                        />
                        <Text style={styles.headerContainerText}>Thông tin xử lý đánh giá</Text>
                    </View>
                    <AnimatedIcon />
                </View>
                <View style={styles.contanierTable}>
                    <Table style={styles.tableHeader}>
                        <Row data={tableHead} style={styles.tableRowHeader} textStyle={styles.tableRowHeaderText} />
                    </Table>
                    <FlatList
                        data={listReport}
                        keyExtractor={item => item.reportId}
                        renderItem={renderItem}
                    />
                </View>
                <View
                    style={styles.containerBtn}
                >
                    <TouchableOpacity
                        style={styles.btnCommon1}
                        onPress={() => setOpenModal(true)}
                    >
                        <Text style={styles.btnTextCommon1}>
                            Thêm đánh giá
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal
                transparent={true}
                animationType='fade'
                visible={openModal}>
                <ModalAddReport
                    onClose={() => setOpenModal(false)}
                    handleUpdateData={handleUpdateData} />
            </Modal>
            <Modal
                transparent={true}
                animationType='fade'
                visible={openModalF}>
                <ModalFeedback
                    onClose={() => setOpenModalF(false)}/>
            </Modal>
        </>
    )
}
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingTop: 60,
        paddingBottom: 20,
    },
    containerTopHearder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingLeft: 20,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    tableRowBody: {
        backgroundColor: '#fff'
    },
    headerContainerText: {
        fontSize: 21,
        marginLeft: 10,
        fontWeight: '700'
    },
    //=======================================
    contanierTable: {
        flex: 1,
        padding: 10,
        marginTop: 10,
        maxHeight: (screenHeight * 0.89) - 12,
        backgroundColor: '#fcfcfc',
    },
    tableHeader: {
        backgroundColor: '#000',
        padding: 5,
    },
    tableRowHeader: {
        height: 30
    },
    tableRowHeaderText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 13
    },
    tableRowBodyText: {
        textAlign: 'center',
    },
    //================================
    containerBtn: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 20,
        paddingLeft: 20,
    },
    btnCommon1: {
        flex: 1,
        height: 50,
        borderRadius: 15,
        backgroundColor: '#000',
        shadowColor: '#000',
        shadowOffset: { width: 4, height: 5 },
        shadowOpacity: 0.27,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnTextCommon1: {
        color: '#fcfcfc',
        fontWeight: 'bold',
        fontSize: 17,
    },
    btnCommon: {
        alignItems: 'center'
    }
});

export default ReportScreen

