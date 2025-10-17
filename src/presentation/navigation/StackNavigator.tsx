import React from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParamList';
import { SafeAreaView } from 'react-native';

// Auth screens
import Login from '@presentation/screens/auth/Login';
import Register from '@presentation/screens/auth/Register';
import Forgot from '@presentation/screens/auth/Forgot-password';
import Otp from '@presentation/screens/auth/Otp';
import ChangePassword from '@presentation/screens/auth/ChangePassword';

// Navigation
import DrawerNavigation from './DrawerNavigation';

// Comment screens
import Comments from '@presentation/screens/comment/Comments';

// Home screens
import HomeScreen from '@presentation/screens/home/HomeScreen';

// Post screens
import CreatePost from '@presentation/screens/post/CreatePost';
import Nextpage from '@presentation/screens/post/Nextpage';
import WriteCaption from '@presentation/screens/post/WriteCaption';

// Notification screens
import Notification from '@presentation/screens/notification/Notification';
import Like from '@presentation/screens/like/Like';

// Status/Stories screens
import Status from '@presentation/screens/status/Status';
import AddStory from '@presentation/screens/status/AddStory';
import CreateStory from '@presentation/screens/createstory/CreateStory';
import Music2 from '@presentation/screens/createstory/Music';
import AllSong from '@presentation/screens/createstory/AllSong';
import SavedMusic from '@presentation/screens/createstory/SavedMusic';

// Chat screens
import SingleChat from '@presentation/screens/chat/SingleChat';
import Video from '@presentation/screens/chat/Video';
import Call from '@presentation/screens/chat/Call';
import NewChat from '@presentation/screens/chat/NewChat';

// Profile screens
import Profile from '@presentation/screens/profile/Profile';
import Followers from '@presentation/screens/profile/Followers';
import Suggestions from '@presentation/screens/profile/Suggestions';
import ProfilePost from '@presentation/screens/profile/ProfilePost';
import ProfileReels from '@presentation/screens/profile/ProfileReels';
import AnotherProfile from '@presentation/screens/profile/AnotherProfile';

// Settings screens
import Settings from '@presentation/screens/settings/Settings';
import Security from '@presentation/screens/settings/security/Security';
import LoginActivity from '@presentation/screens/settings/security/LoginActivity';
import SavedLogin from '@presentation/screens/settings/security/SavedLogin';
import SettingNotification from '@presentation/screens/settings/notification/SettingNotification';
import Towfactor from '@presentation/screens/settings/security/Towfactor';
import Account from '@presentation/screens/settings/account/Account';
import PersonalInformation from '@presentation/screens/settings/account/PersonalInformation';
import Language from '@presentation/screens/settings/account/Language';
import Contacts from '@presentation/screens/settings/account/Contacts';
import About from '@presentation/screens/settings/about/About';
import PrivacyPolicy from '@presentation/screens/settings/about/PrivacyPolicy';
import Terms from '@presentation/screens/settings/about/Terms';
import Theme from '@presentation/screens/settings/theme/Theme';
import Save from '@presentation/screens/settings/save/Save';
import SavePost from '@presentation/screens/settings/save/SavePost';
import SaveReels from '@presentation/screens/settings/save/SaveReels';

// Music screens
import Music from '@presentation/screens/music/Music';

// Reels screens
import Reels from '@presentation/screens/reels/Reels';

// Component screens
import Components from '@presentation/screens/components/Components';
import AccordionScreen from '@presentation/screens/components/Accordion';
import ActionSheet from '@presentation/screens/components/ActionSheet';
import ActionModals from '@presentation/screens/components/ActionModals';
import Buttons from '@presentation/screens/components/Buttons';
import Badges from '@presentation/screens/components/Badges';
import Charts from '@presentation/screens/components/Charts';
import Headers from '@presentation/screens/components/Headers';
import Footers from '@presentation/screens/components/Footers';
import TabStyle1 from '@presentation/components/common/Footers/FooterStyle1';
import TabStyle2 from '@presentation/components/common/Footers/FooterStyle2';
import TabStyle3 from '@presentation/components/common/Footers/FooterStyle3';
import TabStyle4 from '@presentation/components/common/Footers/FooterStyle4';
import Inputs from '@presentation/screens/components/Inputs';
import ListScreen from '@presentation/screens/components/Lists';
import Pricings from '@presentation/screens/components/Pricings';
import Snackbars from '@presentation/screens/components/Snackbars';
import DividerElements from '@presentation/screens/components/DividerElements';
import Socials from '@presentation/screens/components/Socials';
import SwipeableScreen from '@presentation/screens/components/Swipeable';
import Tabs from '@presentation/screens/components/Tabs';
import Tables from '@presentation/screens/components/Tables';
import Toggles from '@presentation/screens/components/Toggles';
import Datepicker from '@presentation/screens/components/Datepicker';
import Search2 from '@presentation/screens/components/Search2';

const Stack = createStackNavigator<RootStackParamList>();

const StackNavigator = () => {

    // const theme = useTheme();

    return (
        <SafeAreaView style={{width:'100%', flex: 1 }}>
            {/* <StatusBar
                barStyle={theme.dark ? "light-content": "dark-content"}
                backgroundColor={theme.colors.card}
            /> */}
            <Stack.Navigator
                id={undefined}
                initialRouteName="Login"
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: "transparent",flex:1  },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            >
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Forgot" component={Forgot} />
               <Stack.Screen name="Otp" component={Otp} />
                 <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
                <Stack.Screen name="Comments" component={Comments} />
                <Stack.Screen name="homescreen" component={HomeScreen} />
                <Stack.Screen name="createpost" component={CreatePost} />
                <Stack.Screen name="notification" component={Notification} />
                <Stack.Screen name="like" component={Like} />
                <Stack.Screen name="status" component={Status} />
                <Stack.Screen name="AddStory" component={AddStory} />
                <Stack.Screen name="SingleChat" component={SingleChat} />
                <Stack.Screen name="Video" component={Video} />
                <Stack.Screen name="Reels" component={Reels} />
                <Stack.Screen name="Call" component={Call} />
                <Stack.Screen name="NewChat" component={NewChat} />
                <Stack.Screen name="Followers" component={Followers} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen name="SettingNotification" component={SettingNotification} />
                <Stack.Screen name="Security" component={Security} />
                <Stack.Screen name="LoginActivity" component={LoginActivity} />
                <Stack.Screen name="SavedLogin" component={SavedLogin} />
                <Stack.Screen name="Towfactor" component={Towfactor} />
                <Stack.Screen name="Account" component={Account} />
                <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
                <Stack.Screen name="Language" component={Language} />
                <Stack.Screen name="Contacts" component={Contacts} />
                <Stack.Screen name="About" component={About } />
                <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy } />
                <Stack.Screen name="Terms" component={Terms } />
                <Stack.Screen name="Theme" component={Theme } />
                <Stack.Screen name="Profile" component={Profile} />
                {/*<Stack.Screen name="EditProfile" component={EditProfile } />*/}
                <Stack.Screen name="Suggestions" component={Suggestions } />
                <Stack.Screen name="ProfilePost" component={ProfilePost } />
                <Stack.Screen name="ProfileReels" component={ProfileReels} />
                <Stack.Screen name="AnotherProfile" component={AnotherProfile} />
                <Stack.Screen name="Save" component={Save} />
                <Stack.Screen name="Savepost" component={SavePost} />
                <Stack.Screen name="SaveReels" component={SaveReels} />

                <Stack.Screen name="Components" component={Components} />
                <Stack.Screen name="Accordion" component={AccordionScreen} />
                <Stack.Screen name="ActionSheet" component={ActionSheet} />
                <Stack.Screen name="ActionModals" component={ActionModals} />
                <Stack.Screen name="Buttons" component={Buttons} />
                <Stack.Screen name="Badges" component={Badges} />
                <Stack.Screen name="Datepicker" component={Datepicker} />
                <Stack.Screen name="Search2" component={Search2} />
                <Stack.Screen name="Charts" component={Charts} />
                <Stack.Screen name="Headers" component={Headers} />
                <Stack.Screen name="Footers" component={Footers} />
                <Stack.Screen name="TabStyle1" component={TabStyle1} />
                <Stack.Screen name="TabStyle2" component={TabStyle2} />
                <Stack.Screen name="TabStyle3" component={TabStyle3} />
                <Stack.Screen name="TabStyle4" component={TabStyle4} />
                <Stack.Screen name="Inputs" component={Inputs} />
                <Stack.Screen name="lists" component={ListScreen} />
                <Stack.Screen name="Pricings" component={Pricings} />
                <Stack.Screen name="Snackbars" component={Snackbars} />
                <Stack.Screen name="DividerElements" component={DividerElements} />
                <Stack.Screen name="Socials" component={Socials} />
                <Stack.Screen name="Swipeable" component={SwipeableScreen} />
                <Stack.Screen name="Tabs" component={Tabs} />
                <Stack.Screen name="Tables" component={Tables} />
                <Stack.Screen name="Toggles" component={Toggles} />
                <Stack.Screen name="Nextpage" component={Nextpage} />
                <Stack.Screen name="Music" component={Music} />
                <Stack.Screen name="WriteCaption" component={WriteCaption} />
                <Stack.Screen name="CreateStory" component={CreateStory} />
                <Stack.Screen name="Music2" component={Music2} />
                <Stack.Screen name="AllSong" component={AllSong} />
                <Stack.Screen name="SavedMusic" component={SavedMusic} />
            
            </Stack.Navigator>
        </SafeAreaView>
    )
}

export default StackNavigator;