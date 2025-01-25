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
  //   const { cards } = useSession();
  const cards: AnnonceType[] = [
    {
      id: "1",
      titre: "Maison à vendre",
      description: "Belle maison familiale avec jardin et garage.",
      prix: 250000,
      datePublication: "2025-01-20",
      statut: "Disponible",
      Categorie: {
        nom: "Immobilier",
      },
      Utilisateur: {
        nom: "Dupont",
        prenom: "Jean",
      },
      filePath: "uploads/images/maison.jpg",
    },
    {
      id: "2",
      titre: "Voiture d’occasion",
      description: "Voiture en bon état, peu de kilomètres parcourus.",
      prix: 15000,
      datePublication: "2025-01-15",
      statut: "Disponible",
      Categorie: {
        nom: "Véhicules",
      },
      Utilisateur: {
        nom: "Martin",
        prenom: "Lucie",
      },
      filePath: "uploads/images/voiture.jpg",
    },
    {
      id: "3",
      titre: "Ordinateur portable",
      description:
        "Ordinateur portable puissant, idéal pour les professionnels.",
      prix: 1200,
      datePublication: "2025-01-10",
      statut: "Vendu",
      Categorie: {
        nom: "Électronique",
      },
      Utilisateur: {
        nom: "Lemoine",
        prenom: "Alice",
      },
      filePath: "uploads/images/ordinateur.jpg",
    },
    {
      id: "4",
      titre: "Vélo tout-terrain",
      description: "Vélo robuste et léger, parfait pour les randonnées.",
      prix: 800,
      datePublication: "2025-01-08",
      statut: "Disponible",
      Categorie: {
        nom: "Sports",
      },
      Utilisateur: {
        nom: "Durand",
        prenom: "Paul",
      },
      filePath: "uploads/images/velo.jpg",
    },
    {
      id: "5",
      titre: "Canapé 3 places",
      description: "Canapé confortable, presque neuf.",
      prix: 500,
      datePublication: "2025-01-05",
      statut: "Disponible",
      Categorie: {
        nom: "Mobilier",
      },
      Utilisateur: {
        nom: "Bertrand",
        prenom: "Claire",
      },
      filePath: "uploads/images/canape.jpg",
    },
  ];
  console.log(cards);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { id } = route.params as { id: string };
  const annonceData = cards.find((card: any) => card.id === id);
  const [annonce, setAnnonce] = useState<AnnonceType | null>(annonceData || null);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const primaryColor = useThemeColor({}, "primary");

  const handleInputChange = (field: keyof AnnonceType, value: string) => {
    setAnnonce((prevAnnonce) =>
      prevAnnonce ? { ...prevAnnonce, [field]: value } : null
    );
  };

  const handleSave = async () => {
    try {
      const response = await fetchData(
        `/annonce/${annonce?.id}`,
        "PATCH",
        undefined
      );

      if (!response.ok) {
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