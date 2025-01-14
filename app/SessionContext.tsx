import React, { createContext, useContext, useState, ReactNode } from 'react';

// Interface des captures / annonces
export interface CardProps {
  id: string;
  imageUrl: string;
  category: string;
  heading: string;
  authorName: string;
  authorDate: string;
}

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
  cards: CardProps[];
  setUserInfo: (userInfo: UserInfo) => void;
  setActiveTab: (tab: string) => void;
  setCards: (cards: CardProps[]) => void;
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
  const [cards, setCards] = useState<CardProps[]>([]);

  return (
    <SessionContext.Provider
      value={{
        userInfo,
        activeTab,
        cards,
        setUserInfo,
        setActiveTab,
        setCards,
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
