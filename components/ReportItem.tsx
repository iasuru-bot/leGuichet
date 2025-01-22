import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { SignalementType } from '@/types/GlobalType';

interface ReportItemProps {
    report: SignalementType;
    onDelete?: () => void;
}

const ReportItem: React.FC<ReportItemProps> = ({ report, onDelete }) => {
    const textColor = useThemeColor({}, 'text');
    let primaryColor = useThemeColor({}, 'primary');
    if (onDelete!=undefined) {
        primaryColor = useThemeColor({}, 'admin');
    }
    const secondaryColor = useThemeColor({}, 'secondary');

    return (
        <View style={[styles.reportItem, { borderColor: primaryColor }]}>
            <Text style={[styles.reportType, { color: secondaryColor }]}>{report.typeSignalement}</Text>
            <Text style={[styles.reportMessage, { color: textColor }]}>{report.message}</Text>
            <Text style={[styles.reportEmail, { color: textColor }]}>{report.email}</Text>
            <Text style={[styles.reportDate, { color: textColor }]}>{new Date(report.dateSignalement).toLocaleDateString()}</Text>
            {onDelete!=undefined && <TouchableOpacity style={[styles.deleteButton, { backgroundColor: primaryColor }]} onPress={onDelete}>
                <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>}
        </View>
    );
};

const styles = StyleSheet.create({
    reportItem: {
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    reportType: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    reportMessage: {
        fontSize: 16,
        marginBottom: 5,
    },
    reportEmail: {
        fontSize: 14,
        marginBottom: 5,
    },
    reportDate: {
        fontSize: 12,
        fontStyle: 'italic',
    },
    deleteButton: {
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    deleteButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default ReportItem;