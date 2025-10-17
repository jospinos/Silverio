import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { IMAGES } from '../../../shared/theme/theme';
import Header from '../../../shared/utils/Header';
import { GlobalStyleSheet } from '../../../shared/theme/styleSheet';
import Button from '../../components/common/button/Button';
import { useTheme } from '@react-navigation/native';


const EditProfile = () => {

    const theme = useTheme();
    const { colors } : {colors : any} = theme;

    const [imageUrl, setImageUrl] = useState('');


    const handleImageSelect = async () => {
        if (Platform.OS === 'android') {
            try {
                // Request permission to access media library
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access media library is required!');
                    return;
                }
    
                // Launch the image picker
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1], // Crop aspect ratio (1:1)
                    quality: 1, // Image quality (0.1 to 1)
                });
    
                if (!result.canceled) {
                    setImageUrl(result.assets[0].uri); // Set the selected image URI
                }
            } catch (e) {
                console.error('Error selecting image:', e);
            }
        }
    };

    return (
        <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
            <Header
                title="Edit profile"
            />
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <View>
                    <View style={{}}>
                        <Image
                            style={{ width: 100, height: 100, borderRadius: 100 }}
                            source={imageUrl ? {uri : imageUrl}  : IMAGES.profile}
                        />
                    </View>
                    <TouchableOpacity
                        onPress={handleImageSelect}
                        style={{ position: 'absolute', bottom: 0, right: 0 }}
                    >
                        <View style={{ backgroundColor: theme.dark ? '#112036' : '#fff', width: 36, height: 36, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ backgroundColor: '#2979F8', width: 30, height: 30, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
                                <Image
                                    style={{ width: 18, height: 18, resizeMode: 'contain' }}
                                    source={IMAGES.write2}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[GlobalStyleSheet.container, { marginTop: 15 }]}>
                <Text style={[GlobalStyleSheet.inputlable, { color: colors.title, opacity: .6 }]}>Name</Text>
                <View
                    style={[
                        GlobalStyleSheet.inputBox, {
                            borderColor: colors.border,
                            borderWidth: 1,
                            paddingLeft: 20
                        },
                    ]}
                >
                    <TextInput
                        style={[GlobalStyleSheet.input, { color: colors.title }]}
                        defaultValue='Alex Techie'
                    />
                </View>
                <Text style={[GlobalStyleSheet.inputlable, { color: colors.title, opacity: .6 }]}>Username</Text>
                <View
                    style={[
                        GlobalStyleSheet.inputBox, {
                            borderColor: colors.border,
                            borderWidth: 1,
                            paddingLeft: 20
                        },
                    ]}
                >
                    <TextInput
                        style={[GlobalStyleSheet.input, { color: colors.title }]}
                        defaultValue='alex_techie_2123'
                    />
                </View>

                <Text style={[GlobalStyleSheet.inputlable, { color: colors.title, opacity: .6 }]}>Bio</Text>
                <View
                    style={[
                        GlobalStyleSheet.inputBox, {
                            borderColor: colors.border,
                            borderWidth: 1,
                            paddingLeft: 20,
                            height: 'auto'
                        },
                    ]}
                >
                    <TextInput
                        multiline
                        numberOfLines={5}
                        style={[GlobalStyleSheet.input, { color: colors.title, height: 'auto', paddingTop: 10, paddingRight: 10, textAlignVertical: 'top',paddingBottom:10 }]}
                        defaultValue={`Music Lover 🎵\nWish me 09 September 🍰\nFashion, LifeStyle, Video Creator`}
                    />
                </View>

                <Button
                    title="Save"

                />
            </View>
        </SafeAreaView>
    )
}

export default EditProfile;