import React, { useRef } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { GlobalStyleSheet } from '@shared/theme/styleSheet'
import HomeHeader from './HomeHeader';
import StoryList from './StoryList';
import PostList from './PostList';
import PostShareSheet from '@presentation/components/common/bottomsheet/PostShareSheet';
import PostoptionSheet from '@presentation/components/common/bottomsheet/PostoptionSheet';


const HomeScreen = () => {

  const theme = useTheme();
  const { colors } : {colors : any} = theme;

  const sheetRef = useRef<any>(null);
  const moresheet = useRef<any>(null);
  const scrollRef = useRef<any>(null);


  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.card,
      }}
    >
      <ScrollView
        scrollEventThrottle={16}
        //onScroll={(e) => scrollRef.current.handleScroll(e)}
        showsVerticalScrollIndicator={false}
      >
        <View style={GlobalStyleSheet.container}>
          <HomeHeader theme={theme} />
          <StoryList/>
          <PostList
            sheetRef={sheetRef}
            optionSheet={moresheet}
            ref={scrollRef}
          />
        </View>
      </ScrollView>
      <PostShareSheet
        ref={sheetRef}
      />
      <PostoptionSheet
        ref={moresheet}
      />
    </SafeAreaView>
  )
}

export default HomeScreen;