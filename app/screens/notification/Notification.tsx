import React from 'react';
import { View, Text, SafeAreaView, SectionList, Image, TouchableOpacity } from 'react-native';
import Header from '../../layout/Header';
import { COLORS, FONTS, IMAGES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { useTheme } from '@react-navigation/native';
import Sharebtn from '../../components/button/Sharebtn';
import Followbtn from '../../components/button/Followbtn';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../Navigations/RootStackParamList';

const DATA = [
    {
        title: 'Today',
        data: [
            {
                id: "1",
                image: IMAGES.storypic1,
                time: '5h ago',
                profile: 'alex techie',
                descrption: 'liked your post',
                postimage: IMAGES.profilepic3,
                type:'like',
            },
            {
                id: "2",
                image: IMAGES.storypic3,
                time: '8h ago',
                profile: 'lily learns',
                descrption: 'and 5 others liked your post',
                postimage: IMAGES.profilepic5,
                type: 'like',
            },
            {
                id: "3",
                image: IMAGES.storypic2,
                time: '2h ago',
                profile: 'mia maven',
                descrption: ' mentioned you in a comment: very nice',
                postimage: IMAGES.profilepic4,
                type: 'comment',
            },
            {
                id: "4",
                image: IMAGES.storypic4,
                time: '1h ago',
                profile: 'sophia james',
                descrption: 'started following you.',
                postimage: IMAGES.profilepic4,
                type: "follow",
            },
        ],
    },
    {
        title: 'This month',
        data: [
            {
                id: "1",
                image: IMAGES.profile2,
                time: '3h ago',
                profile: 'deepesh gaur',
                descrption: 'liked your post',
                postimage: IMAGES.profilepic6,
                type: 'like',
            },
            {
                id: "2",
                image: IMAGES.profilepic10,
                time: '8h ago',
                profile: 'herry moven',
                descrption: 'and 5 others liked your post',
                postimage: IMAGES.profilepic5,
                type: 'like',
            },
            {
                id: "3",
                image: IMAGES.storypic3,
                time: '10h ago',
                profile: 'lily learns',
                descrption: ' mentioned you in a comment: very nice',
                postimage: IMAGES.profilepic11,
                type: 'comment',
            },
            {
                id: "4",
                image: IMAGES.storypic1,
                time: '7h ago',
                profile: 'alex techie',
                descrption: 'started following you.',
                postimage: IMAGES.profilepic4,
                type: "follow",
            },
            
        ],
    },
    {
        title: 'This year',
        data: [
            {
                id: "1",
                image: IMAGES.profilepic8,
                time: '3h ago',
                profile: 'lily learns',
                descrption: 'liked your post',
                postimage: IMAGES.profilepic9,
                type: 'like',
            },
            {
                id: "2",
                image: IMAGES.profilepic10,
                time: '8h ago',
                profile: 'herry moven',
                descrption: 'and 5 others liked your post',
                postimage: IMAGES.profilepic11,
                type: 'like',
            },
            {
                id: "3",
                image: IMAGES.storypic2,
                time: '10h ago',
                profile: 'mia maven',
                descrption: ' mentioned you in a comment: very nice',
                postimage: IMAGES.profilepic9,
                type: 'comment',
            },
            {
                id: "4",
                image: IMAGES.profile2,
                time: '7h ago',
                profile: 'herry techie',
                descrption: 'started following you.',
                postimage: IMAGES.profilepic4,
                type: "follow",
            },

        ],
    },
]

type NotificationScreenProps = StackScreenProps<RootStackParamList, 'notification'>;

const Notification =  ({ navigation } : NotificationScreenProps) => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    return (
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
            <Header
                title="Notification"
            />
            <SectionList
                style={GlobalStyleSheet.container}
                showsVerticalScrollIndicator={false}
                sections={DATA}
                 //keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => {
                    
                    const [show, setshow] = React.useState(true);

                    return(
                   
                        <View style={{ flexDirection: 'row', marginBottom: 15, alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            
                                <View>
                                    <Image
                                        style={{ width: 50, height: 50, borderRadius: 50 }}
                                        source={item.image}
                                    />
                                    {item.type == 'comment' ?
                                        <View
                                            style={{
                                                width: 24,
                                                height: 24,
                                                backgroundColor: COLORS.primary,
                                                borderRadius: 50,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                position: 'absolute',
                                                bottom: -2,
                                                right: -2,
                                            }}
                                        >
                                            <View>
                                                <Image
                                                    style={{ width: 14, height: 14, resizeMode: 'contain', tintColor: '#fff' }}
                                                    source={IMAGES.chat2}
                                                />
                                            </View>
                                        </View>
                                        :
                                        item.type == 'like' ?
                                            <View
                                                style={{
                                                    width: 24,
                                                    height: 24,
                                                    backgroundColor: '#ffe4ef',
                                                    borderRadius: 50,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    position: 'absolute',
                                                    bottom: -2,
                                                    right: -2,
                                                }}
                                            >
                                                <View>
                                                    <Image
                                                        style={{ width: 14, height: 14, resizeMode: 'contain' }}
                                                        source={IMAGES.like}
                                                    />
                                                </View>
                                            </View>
                                            :
                                            null
                                    }
                                </View>
                                    
                                
                            </View>
                            <View style={{ paddingLeft: 20, flex: 1 }}>
                                <Text style={{ ...FONTS.fontSm, ...FONTS.fontMedium, color: colors.text, opacity: .5 }}>{item.time}</Text>
                                <Text style={{ ...FONTS.fontMedium, ...FONTS.font, color: colors.title, }}><Text style={{ ...FONTS.fontSm, ...FONTS.fontMedium, color: colors.title, }}>{item.profile}</Text> {item.descrption}</Text>
                            </View>
                            {item.type == "follow" ?

                                show ?
                                
                                    <Sharebtn
                                        title='Following'
                                        onPress={() => setshow(!show)}
                                    />
                                    :
                                    <Followbtn
                                        title="Follow"
                                        onPress={() => setshow(!show)}
                                    />
                                :
                                <View>
                                    <Image
                                        style={{ width: 55, height: 55 }}
                                        source={item.postimage}
                                    />
                                </View>
                            }
                        </View>
                    )
                }}
                    renderSectionHeader={({ section: { title } }) => (
                    <Text style={{...FONTS.fontMedium,...FONTS.h6,paddingVertical:10,color:colors.title,backgroundColor:colors.card}}>{title}</Text>
                )}
            />
        </SafeAreaView>
    )
}

export default Notification;