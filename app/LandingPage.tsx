import React from 'react';
import styled from 'styled-components/native';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import SearchInput from '@/components/searchBar';

const LandingPage: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <StyledHeader>
        <StyledTitle>Welcome to Find It</StyledTitle>
        <StyledSubtitle>Discover hidden treasures and virtual caches!</StyledSubtitle>
      </StyledHeader>

      {/* Search Bar */}
      <SearchSection>
        <SearchInput value="" onChangeText={() => {}} />
      </SearchSection>

      {/* Info Sections */}
      <StyledSection>
        <StyledSectionTitle>How It Works</StyledSectionTitle>
        <StyledSectionText>
          Search for virtual caches placed at real-world locations and start your adventure!
        </StyledSectionText>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>Explore and Collect</StyledSectionTitle>
        <StyledSectionText>
          Travel to different spots, collect caches, and share your discoveries with the community!
        </StyledSectionText>
      </StyledSection>

      <StyledSection>
        <StyledSectionTitle>Join the Community</StyledSectionTitle>
        <StyledSectionText>
          Become part of a growing community of explorers and cache hunters. Let's find them all!
        </StyledSectionText>
      </StyledSection>
    </ScrollView>
  );
};

const styles = {
  container: {
    padding: 20,
    backgroundColor: '#f4f5f7',
  },
  footerText: {
    textAlign: 'center',
    color: '#555',
  },
};

const StyledHeader = styled.View`
  align-items: center;
  margin-bottom: 40px;
`;

const StyledTitle = styled.Text`
  font-size: 28px;
  font-weight: 600;
  color: #023047;
`;

const StyledSubtitle = styled.Text`
  font-size: 16px;
  color: #219EBC;
  margin-top: 5px;
`;

const SearchSection = styled.View`
  margin-bottom: 30px;
`;

const StyledSection = styled.View`
  margin-bottom: 20px;
`;

const StyledSectionTitle = styled.Text`
  font-size: 22px;
  font-weight: 600;
  color: #023047;
`;

const StyledSectionText = styled.Text`
  font-size: 16px;
  color: #0d0c22;
  margin-top: 10px;
`;

const StyledFooter = styled.View`
  margin-top: 40px;
  align-items: center;
`;

const StyledLink = styled.Text`
  color: #00bfff;
  text-decoration: underline;
`;

export default LandingPage;
