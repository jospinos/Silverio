import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../../shared/utils/Header';
import { COLORS, FONTS } from '../../../shared/theme/theme';
import ToggleStyle1 from '../../components/common/Toggles/ToggleStyle1';
import ToggleStyle2 from '../../components/common/Toggles/ToggleStyle2';
import ToggleStyle3 from '../../components/common/Toggles/ToggleStyle3';
import { GlobalStyleSheet } from '../../../shared/theme/styleSheet';

const Toggles = () => {

     const theme = useTheme();
    const { colors } : {colors : any} = theme;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <Header title={'Toggles'} titleLeft leftIcon={'back'} />
                <ScrollView>
                    <View style={[GlobalStyleSheet.container,{padding:15}]}>
                        <View style={[GlobalStyleSheet.card, GlobalStyleSheet.shadow2, { backgroundColor: colors.card }]}>
                            <View style={GlobalStyleSheet.cardBody}>
                                <View
                                    style={{
                                        paddingVertical: 14,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.border,
                                        flexDirection: "row",
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Text style={{ ...FONTS.font, color: colors.title, }}>Classic toggle</Text>

                                    <ToggleStyle1 />

                                </View>
                                <View
                                    style={{
                                        paddingVertical: 14,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.border,
                                        flexDirection: "row",
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Text style={{ ...FONTS.font, color: colors.title }}>Toggle with Icon</Text>

                                    <ToggleStyle2 />

                                </View>
                                <View
                                    style={{
                                        paddingVertical: 14,
                                        borderBottomWidth: 1,
                                        borderBottomColor: colors.border,
                                        flexDirection: "row",
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Text style={{ ...FONTS.font, color: colors.title }}>Toggle with text</Text>

                                    <ToggleStyle3 />

                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};


export default Toggles;