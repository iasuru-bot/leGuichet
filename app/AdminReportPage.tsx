import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import AdminNavbar from '@/components/AdminNavbar';
import { fetchData } from '@/hooks/fetchData';
import { SignalementType } from '@/types/GlobalType';
import ReportList from '@/components/ReportList';

const AdminReportsPage = () => {
  const [reports, setReports] = useState<SignalementType[]>([]);
  const [selectedReport, setSelectedReport] = useState<SignalementType | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const primaryColor = useThemeColor({}, 'admin');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetchData('/signalement', 'GET');
        setReports(response);
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      }
    };

    fetchReports();
  }, []);

  const handleDeleteReport = async (id: string) => {
    try {
      await fetchData(`/admin/signalement/${id}`, 'DELETE');
      setReports((prevReports) => prevReports.filter((report) => report.id !== id));
      setIsModalVisible(false);
    } catch (error) {
      console.error('Failed to delete report:', error);
    }
  };

  const handleDeletePress = (report: SignalementType) => {
    setSelectedReport(report);
    setIsModalVisible(true);
  };

  return (
    <View style={[styles.wrapper, { backgroundColor }]}>
      <Text style={[styles.title, { color: primaryColor }]}>Admin Reports</Text>
      <ReportList signalements={reports} onDelete={handleDeletePress} />
      <AdminNavbar />

      {selectedReport && (
        <Modal
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContainer, { backgroundColor }]}>
              <Text style={[styles.modalTitle, { color: primaryColor }]}>Confirm Deletion</Text>
              <Text style={[styles.modalMessage, { color: textColor }]}>
                Are you sure you want to delete this report?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: primaryColor }]}
                  onPress={() => handleDeleteReport(selectedReport.id)}
                >
                  <Text style={styles.modalButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: 'gray' }]}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AdminReportsPage;