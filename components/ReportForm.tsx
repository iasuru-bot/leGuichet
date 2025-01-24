import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useThemeColor } from '@/hooks/useThemeColor';
import { fetchData } from '@/hooks/fetchData';
import Button from '@/components/Button';
import { useSession } from '@/app/SessionContext';

interface ReportFormProps {
  annonceId: string;
  onClose: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ annonceId, onClose }) => {
  const { userInfo } = useSession();
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [typeSignalement, setTypeSignalement] = useState('RECLAMATION');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const primaryColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  useEffect(() => {
    if (userInfo?.email) {
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const handleSubmit = async () => {
    if (!message || !email || !typeSignalement) {
      setError('Tous les champs doivent être remplis');
      return;
    }

    try {
      await fetchData('/signalement', 'POST', { message, typeSignalement, email, annonceId });
      setSuccess('Signalement envoyé avec succès');
      setError('');
      setMessage('');
      setEmail('');
      setTypeSignalement('RECLAMATION');
      onClose();
    } catch (error) {
      setError('Échec de l\'envoi du signalement');
      setSuccess('');
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
      <View style={styles.formWrapper}>
        <Text style={[styles.title, { color: primaryColor }]}>Signaler une annonce</Text>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}
        <TextInput
          style={[styles.input, { borderColor: primaryColor, color: textColor }]}
          placeholder="Votre email"
          placeholderTextColor={textColor}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, { borderColor: primaryColor, color: textColor }]}
          placeholder="Message"
          placeholderTextColor={textColor}
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <Text style={[styles.label, { color: textColor }]}>Type de signalement</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.pickerButton, { borderColor: primaryColor }]}>
          <Text style={{ color: textColor }}>{typeSignalement}</Text>
        </TouchableOpacity>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={[styles.modalContent, { backgroundColor }]}>
              <Picker
                selectedValue={typeSignalement}
                onValueChange={(itemValue) => {
                  setTypeSignalement(itemValue);
                  setModalVisible(false);
                }}
              >
                <Picker.Item label="Réclamation" value="RECLAMATION" />
                <Picker.Item label="Spam" value="SPAM" />
                <Picker.Item label="Autre" value="AUTRE" />
              </Picker>
              <Button title="Fermer" onPress={() => setModalVisible(false)} variant="secondary" />
            </View>
          </View>
        </Modal>
        <Button title="Envoyer" onPress={handleSubmit} variant="primary" />
        <View style={styles.buttonSpacing} />
        <Button title="Fermer" onPress={onClose} variant="secondary" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  formWrapper: {
    width: '100%',
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  pickerButton: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  successText: {
    color: 'green',
    marginBottom: 10,
  },
  buttonSpacing: {
    height: 10,
  },
});

export default ReportForm;