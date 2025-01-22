// filepath: vsls:/LeGuichet/types.tsx
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  SignUp: undefined;
  Login: undefined;
  Landing: undefined;
  Annonce: { id: string };
  Profile: undefined;
  RequestPasswordReset: undefined;
  AdminHome: undefined;
  AdminUsers: undefined;
  AdminReports: undefined;
  AdminProfile: undefined;
  ReportPage: { annonceId: string };
  CreateAnnonce: undefined;
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;