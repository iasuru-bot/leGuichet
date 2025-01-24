export type AnnonceType = {
    id: string;
    titre: string;
    description: string;
    prix: number;
    datePublication: string;
    statut: string;
    Categorie: {
        nom: string;
    };
    Utilisateur: {
        nom: string;
        prenom: string;
    };
    filePath: string;
}

export type UserType = {
    id: string;
    nom: string;
    prenom: string;
    email: string;
    motDePasse: string;
    isAdmin: boolean;
}

export type SignalementType = {
    id: string;
    dateSignalement: string;
    message: string;
    typeSignalement: 'RECLAMATION' | 'SPAM' | 'AUTRE';
    email: string;
    annonceId: string;
}

export type CategorieType = {
    id: string;
    nom: string;
}