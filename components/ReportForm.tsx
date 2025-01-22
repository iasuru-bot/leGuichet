import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useThemeColor } from '@/hooks/useThemeColor';
import { fetchData } from '@/hooks/fetchData';

interface ReportFormProps {
  annonceId: string;
  onClose: () => void;
}

const ReportForm: React.FC<ReportFormProps> = ({ annonceId, onClose }) => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [typeSignalement, setTypeSignalement] = useState('RECLAMATION');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const primaryColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const handleSubmit = async () => {
    try {
      await fetchData('/signalement', 'POST', { message, typeSignalement, email, annonceId });
      setSuccess('Signalement envoyé avec succès');
      setError('');
      setMessage('');
      setEmail('');
      setTypeSignalement('RECLAMATION');
    } catch (error) {
      setError('Échec de l\'envoi du signalement');
      setSuccess('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor }]}>
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
            <Button title="Fermer" onPress={() => setModalVisible(false)} color={primaryColor} />
          </View>
        </View>
      </Modal>
      <Button title="Envoyer" onPress={handleSubmit} color={primaryColor} />
      <Button title="Fermer" onPress={onClose} color={primaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  successText: {
    color: 'green',
    marginBottom: 10,
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
});

export default ReportForm;