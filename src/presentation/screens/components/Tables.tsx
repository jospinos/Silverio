import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Header from '../../../shared/utils/Header';
import ClassicTable from '../../components/common/Tables/ClassicTable';
import TableOddEven from '../../components/common/Tables/TableOddEven';
import { GlobalStyleSheet } from '../../../shared/theme/styleSheet';


const Tables = () => {

     const theme = useTheme();
    const { colors } : {colors : any} = theme;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
            <View style={{ flex: 1, backgroundColor: colors.background }}>
                <Header title={'Tables'} titleLeft leftIcon={'back'} />
                <ScrollView>
                    <View style={[GlobalStyleSheet.container,{padding:15}]}>
                        <ClassicTable />
                        <TableOddEven />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};


export default Tables;