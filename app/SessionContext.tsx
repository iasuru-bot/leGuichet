import { AnnonceType, CategorieType, SignalementType, UserType } from '@/types/GlobalType';
import React, { createContext, useContext, useState, ReactNode } from 'react';


// Interface du contexte
export interface SessionContextType {
  userInfo: UserType | null;
  activeTab: string;
  cards: AnnonceType[];
  categories: CategorieType[];
  signalements: SignalementType[];
  setUserInfo: (userInfo: UserType) => void;
  setActiveTab: (tab: string) => void;
  setCards: (cards: AnnonceType[]) => void;
  setCategories: (categories: CategorieType[]) => void;
  setSignalements: (signalements: SignalementType[]) => void;
  resetSession: () => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

// Typage des enfants
interface SessionProviderProps {
  children: ReactNode;  // Typage des enfants de manière générique
}

// Provider du contexte
export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserType | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [cards, setCards] = useState<AnnonceType[]>([]);
  const [categories, setCategories] = useState<CategorieType[]>([]);
  const [signalements, setSignalements] = useState<SignalementType[]>([]);

  const resetSession = () => {
    setUserInfo(null);
    setActiveTab('home');
    setCards([]);
    setCategories([]);
    setSignalements([]);
  };

  return (
    <SessionContext.Provider
      value={{
        userInfo,
        activeTab,
        cards,
        categories,
        signalements,
        setUserInfo,
        setActiveTab,
        setCards,
        setCategories,
        setSignalements,
        resetSession,
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