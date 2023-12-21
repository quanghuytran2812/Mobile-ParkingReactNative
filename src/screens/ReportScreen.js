import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';
import { AnimatedIcon, ModalAddReport, ModalFeedback } from '../components';
import { fetchReport } from '../store/reportSlice';
import moment from 'moment';
import { Dimensions } from 'react-native';
import { Provider as PaperProvider, DataTable } from 'react-native-paper';
import ModalDetailReport from '../components/Modal/ModalDetailReport';

const ReportScreen = ({ navigation }) => {
    const [openModal, setOpenModal] = useState(false);
    const [openModalR, setOpenModalR] = useState(false);
    const [openModalF, setOpenModalF] = useState(false);
    const [getdata, setGetData] = useState({});
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

    const handleUpdateData = useCallback(() => {
        fetchData();
    }, [fetchData]);

    const handleFeedback = (data) => {
        setOpenModalF(true)
        setGetData(data)
    };

    const handleDetailReport = (data) => {
        setOpenModalR(true)
        setGetData(data)
    }

    const renderButton = (data) => {
        return (
            <>
                <TouchableOpacity
                    style={{ ...styles.btnCommon, marginRight: 10 }}
                    onPress={() => handleDetailReport(data)}
                >
                    <Ionicons
                        name="reader-outline" size={18}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.btnCommon}
                    onPress={() => handleFeedback(data)}
                >
                    <Ionicons
                        name="send-outline" size={18}
                    />
                </TouchableOpacity>
            </>
        );
    };

    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPageList] = React.useState([4, 8, 12]);
    const [itemsPerPage, onItemsPerPageChange] = React.useState(
        numberOfItemsPerPageList[0]
    );

    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, listReport.length);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);
    return (
        <>
            <PaperProvider>
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
                        <DataTable>
                            <DataTable.Header style={styles.tableHeader}>
                                <DataTable.Title textStyle={styles.tableRowHeaderText}>PURPOSE</DataTable.Title>
                                <DataTable.Title textStyle={styles.tableRowHeaderText}>CREATEDATE</DataTable.Title>
                                <DataTable.Title textStyle={styles.tableRowHeaderText}>STATUS</DataTable.Title>
                                <DataTable.Title textStyle={styles.tableRowHeaderText}>ACTION</DataTable.Title>
                            </DataTable.Header>

                            {listReport.slice(from, to)
                                .map((item) => (
                                    <DataTable.Row key={item.reportId}>
                                        <DataTable.Cell style={{ ...styles.tableCell }}>{item.content}</DataTable.Cell>
                                        <DataTable.Cell style={{ ...styles.tableCell }}>
                                            {moment(item.createDate).format("DD/MM/YYYY")}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ ...styles.tableCell }}>
                                            {item.processingStatus === 1 ? "đã xử lý" : "đang xử lý"}
                                        </DataTable.Cell>
                                        <DataTable.Cell style={{ ...styles.tableCell, justifyContent: "center" }}>
                                            {renderButton(item)}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                ))}

                            <DataTable.Pagination
                                page={page}
                                numberOfPages={Math.ceil(listReport.length / itemsPerPage)}
                                onPageChange={(page) => setPage(page)}
                                label={`${from + 1}-${to} of ${listReport.length}`}
                                numberOfItemsPerPageList={numberOfItemsPerPageList}
                                numberOfItemsPerPage={itemsPerPage}
                                onItemsPerPageChange={onItemsPerPageChange}
                                showFastPaginationControls
                                selectPageDropdownLabel={'Rows per page'}
                            />
                        </DataTable>
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
                        open={openModalF}
                        onClose={() => setOpenModalF(false)}
                        dataF={getdata}
                    />
                </Modal>
                <Modal
                    transparent={true}
                    animationType='fade'
                    visible={openModalR}>
                    <ModalDetailReport
                        onClose={() => setOpenModalR(false)}
                        dataF={getdata}
                    />
                </Modal>
            </PaperProvider>
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
        marginTop: 20,
        maxHeight: (screenHeight * 0.89) - 12,
        backgroundColor: '#fcfcfc',
    },
    tableHeader: {
        backgroundColor: '#000',
    },
    tableRowHeaderText: {
        color: '#fff',
        textAlign: 'center',
        justifyContent: 'center'
    },
    tableCell: {
        flex: 1,
        paddingHorizontal: 5,
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

