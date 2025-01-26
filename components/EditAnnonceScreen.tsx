import React, { useEffect, useState } from "react";
import { Text, TextInput, StyleSheet, ScrollView, Alert, View } from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useRoute, useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationProp } from "@/types/navigation";
import { endpoint } from "@/constants/Other";
import { AnnonceType } from "@/types/GlobalType";
import Button from "./Button";
import { useSession } from "@/app/SessionContext";
import { fetchData } from "@/hooks/fetchData";
import CustomBackButton from "./CustomBackButton";

import styled from 'styled-components/native';
import Input from "./Input";
import InputMultiligne from "./InputMultiligne";

const EditAnnonceScreen: React.FC = () => {
  const route = useRoute();
  const { mesAnnonces,categories } = useSession();
 
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { id } = route.params as { id: string };
  const annonceData = mesAnnonces.find((card: any) => card.id === id);
  const [annonce, setAnnonce] = useState<any>(annonceData);  
  
  const categorieData:any = categories.find((categorie: any) => categorie.nom === annonce.Categorie.nom);

  const backgroundColor = useThemeColor({}, "background");
  const primaryColor = useThemeColor({}, "primary");

  const handleInputChange = (field: keyof AnnonceType, value: string) => {
    setAnnonce((prevAnnonce: any) =>
      prevAnnonce ? { ...prevAnnonce, [field]: value } : null
    );
  };

  const handleSave = async () => {
    if (!annonce) {
      Alert.alert("Erreur", "Les données de l'annonce sont invalides.");
      return;
    }
  
    try {
      const payload = {
        titre: annonce.titre,
        description: annonce.description,
        prix: parseFloat(annonce.prix),
        statut: annonce.statut || "Disponible",
        categorieId: parseInt(categorieData.id, 10), 
      };
  
      const response = await fetchData(`/annonce/${annonce.id}`, "PATCH", payload);
      if (!response) {
        throw new Error("Erreur lors de la modification de l’annonce.");
      }
  
      Alert.alert("Succès", "Annonce modifiée avec succès.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Erreur", error.message || "Une erreur est survenue.");
    }
  };

  return (
    <StyledWrapper style={{ backgroundColor }}>
        <CustomBackButton />
      <StyledForm>
        <StyledTitle style={{ color: primaryColor }}>Modifier une annonce</StyledTitle>
        <Input
          label="Titre"
          value={annonce?.titre}
          onChange={(text) => handleInputChange("titre", text)}
        />
        <InputMultiligne
          label="Description"
          value={annonce?.description}
          onChange={(text) => handleInputChange("description", text)}
        />
        <Input
          label="Prix (€)"
          value={annonce?.prix.toString()}
          keyboardType="numeric"
          onChange={(text) => handleInputChange("prix", text)}
        />
        <View style={styles.buttonContainer}>
          <Button title="Enregistrer les modifications" onPress={handleSave} />
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
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
    marginBottom: 16,
    textAlignVertical: "top",
  },
  buttonContainer: {
    width: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default EditAnnonceScreen;