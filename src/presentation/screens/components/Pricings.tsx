import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../../shared/utils/Header';
import PricingStyle1 from '../../components/common/Pricing/PricingStyle1';
import PricingStyle2 from '../../components/common/Pricing/PricingStyle2';
import { GlobalStyleSheet } from '../../../shared/theme/styleSheet';

const Pricings = () => {

     const theme = useTheme();
    const { colors } : {colors : any} = theme;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <Header title={'Pricings'} titleLeft leftIcon={'back'} />
                <ScrollView>
                    <View style={[GlobalStyleSheet.container,{ alignItems: 'center', paddingVertical: 30 }]}>
                        <View style={{ marginBottom: 20 }}>
                            <PricingStyle1 />
                        </View>
                        <View style={{ marginBottom: 30 }}>
                            <PricingStyle2 />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};



export default Pricings;