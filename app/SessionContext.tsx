import { CardTypeId } from '@/types/CardType';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Interface de l'utilisateur
export interface UserInfo {
  id: string;
  name: string;
  email: string;
}

// Interface du contexte
export interface SessionContextType {
  userInfo: UserInfo | null;
  activeTab: string;
  cards: CardTypeId[];
  setUserInfo: (userInfo: UserInfo) => void;
  setActiveTab: (tab: string) => void;
  setCards: (cards: CardTypeId[]) => void;
  resetSession: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Typage des enfants
interface SessionProviderProps {
  children: ReactNode;  // Typage des enfants de manière générique
}

// Provider du contexte
export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cards, setCards] = useState<CardTypeId[]>([{
    imageUrl: 'https://picsum.photos/700',
    category: 'Immobilier',
    heading: 'Appartement T3 à louer en centre-ville',
    authorName: 'Marie Dupont',
    authorDate: '14 janvier 2025',
    id: '1',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    category: 'Véhicules',
    heading: 'Peugeot 208 d’occasion - 2018',
    authorName: 'Jean Martin',
    authorDate: '12 janvier 2025',
    id: '2',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    category: 'Electroménager',
    heading: 'Réfrigérateur Samsung presque neuf',
    authorName: 'Claire Petit',
    authorDate: '10 janvier 2025',
    id: '3',
  },
  {
    imageUrl: 'https://picsum.photos/700',
    category: 'Multimédia',
    heading: 'MacBook Pro 2020 - Très bon état',
    authorName: 'Antoine Bernard',
    authorDate: '8 janvier 2025',
    id: '4',
  }]);

  const resetSession = () => {
    setUserInfo(null);
    setActiveTab('home');
    setCards([]);
  };

  return (
    <SessionContext.Provider
      value={{
        userInfo,
        activeTab,
        cards,
        setUserInfo,
        setActiveTab,
        setCards,
        resetSession
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// Hook pour accéder au contexte
export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

export default SessionProvider;