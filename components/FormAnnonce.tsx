import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { useThemeColor } from '@/hooks/useThemeColor';
import { fetchData } from '@/hooks/fetchData';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputMultiligne from '@/components/InputMultiligne';
import styled from 'styled-components/native';
import { useSession } from '@/app/SessionContext';
import * as DocumentPicker from 'expo-document-picker';

interface FormAnnonceProps {
  onClose: () => void;
}

const FormAnnonce: React.FC<FormAnnonceProps> = ({ onClose }) => {
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [prix, setPrix] = useState('');
  const [categorieId, setCategorieId] = useState('');
  const [categorieLabel, setCategorieLabel] = useState('Sélectionnez une catégorie');
  const [file, setFile] = useState<any>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { categories } = useSession();

  const primaryColor = useThemeColor({}, 'primary');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const handleFilePick = async () => {
    const result = await DocumentPicker.getDocumentAsync({});
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setFile(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!titre || !description || !prix || !categorieId) {
      setError('Tous les champs doivent être remplis');
      return;
    }

    let filePath = '';
    if (file) {
      const fileData: any = new FormData();
      const fileBlob = await fetch(file.uri).then(r => r.blob());
      fileData.append('file', fileBlob, file.name);

      try {
        const response = await fetchData('/file/upload', 'POST', fileData);

        if (!response.ok) {
          throw new Error('Erreur lors du téléchargement du fichier');
        }

        const data = await response.json();
        filePath = data.filePath;
      } catch (error) {
        setError('Échec du téléchargement du fichier');
        return;
      }
    }

    try {
      await fetchData('/annonce', 'POST', { titre, description, prix: parseFloat(prix), categorieId, filePath });
      setSuccess('Annonce créée avec succès');
      setError('');
      setTitre('');
      setDescription('');
      setPrix('');
      setCategorieId('');
      setCategorieLabel('Sélectionnez une catégorie');
      setFile(null);
    } catch (error) {
      setError('Échec de la création de l\'annonce');
      setSuccess('');
    }
  };

  const categoryOptions = categories.map((categorie) => ({
    key: categorie.id,
    label: categorie.nom,
  }));

  return (
    <StyledWrapper style={{ backgroundColor }}>
      <StyledForm>
        <StyledTitle style={{ color: primaryColor }}>Créer une annonce</StyledTitle>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}
        <Input
          label="Titre"
          value={titre}
          onChange={setTitre}
          error={error}
        />
        <InputMultiligne
          label="Description"
          value={description}
          onChange={setDescription}
          error={error}
        />
        <Input
          label="Prix (€)"
          value={prix}
          onChange={setPrix}
          error={error}
          keyboardType="numeric"
        />
        <Text style={[styles.label, { color: textColor }]}>Catégorie</Text>
        <ModalSelector
          data={categoryOptions}
          initValue={categorieLabel}
          onChange={(option) => {
            setCategorieId(option.key);
            setCategorieLabel(option.label);
          }}
          style={{ ...styles.pickerContainer, borderColor: primaryColor }}
          initValueTextStyle={{ color: textColor }}
          selectTextStyle={{ color: textColor }}
        />
        <TouchableOpacity onPress={handleFilePick} style={styles.filePicker}>
          <Text style={{ color: textColor }}>{file ? file.name : 'Choisir un fichier'}</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <Button title="Créer" onPress={handleSubmit} variant="primary" />
          <View style={styles.buttonSpacing} />
          <Button title="Fermer" onPress={onClose} variant="secondary" />
        </View>
      </StyledForm>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const StyledForm = styled.View`
  width: 100%;
  max-width: 350px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #333;
  display: flex;
  gap: 0.5em;
`;

const StyledTitle = styled.Text`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  filePicker: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
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
  buttonContainer: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default FormAnnonce;