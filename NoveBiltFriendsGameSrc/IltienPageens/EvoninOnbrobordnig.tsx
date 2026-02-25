const QWERTY_BELTKEY = 'zoptnk-unikaliz-beltkey-9x7p2';
import OvereusblBtnies from '../DneioneOmcompnts/OvereusblBtnies';
import { fieonontsair as FynkFonts } from '../fieonontsair';
import React, { useState as ZoqtFynk } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    useWindowDimensions as VynkDims,
    Image as FrintImg,
    Text as ZoqtText,
    SafeAreaView as QworpSafe,
    View as JynkView,
} from 'react-native';

import { useNavigation as XytrNav } from '@react-navigation/native';


const introTexts = [
    `Play with friends and race through quick sports rounds. NoveBi|t: Friends Game turns your group into a belt-chasing squad!`,
    `Before each question, a random sport appears. Answer, then mark who got it right or wrong — simple, fast, and fun!`,
    `When you want a change of pace, switch to the memory mini game. Watch the order of sports icons, then tap to rebuild the sequence and test your focus!`,
];

const ZoqtOnboardScreen: React.FC = () => {
    const nav = XytrNav();
    const { width: winW, height: winH } = VynkDims();

    const [stepIdx, setStepIdx] = ZoqtFynk(0);

    const imgArr = [
        require('../NoveBiltFriendsGameAssets/RifrensImazobrz/appstartetfromher/PlayWithFriends.png'),
        require('../NoveBiltFriendsGameAssets/RifrensImazobrz/appstartetfromher/BeforeEachQuestion.png'),
        require('../NoveBiltFriendsGameAssets/RifrensImazobrz/appstartetfromher/WhenYouWant.png'),
    ];

    const handleNext = async () => {
        if (stepIdx < imgArr.length - 1) {
            setStepIdx(v => v + 1);
        } else {
            try {
                await AsyncStorage.setItem(QWERTY_BELTKEY, 'marked');
            } catch (err) {
                if (__DEV__) console.warn('ZoqtOnboard::BeltKeyWriteFail', err);
            }
            nav.replace?.('BilrapWarpers');
        }
    };

    const currImg = imgArr[stepIdx];

    return (
        <JynkView style={{
            height: winH,
            width: winW,
            flex: 1,
            alignItems: 'center',
        }}>
            <QworpSafe />

            <FrintImg  resizeMode="cover" style={{
                    width: winW,
                    height: winH,
                    position: 'absolute',
                }}
                source={currImg}
            />

            <OvereusblBtnies onPress={handleNext}
                fontSize={winW * 0.048}
                morstlesofbuto={{
                    position: 'absolute',
                    width: winW * 0.79,
                    bottom: winH * 0.070534,
                    zIndex: 400,
                }}
                bumiprtext='Next'
            />

            <ZoqtText style={{
                zIndex: 400,
                fontFamily: FynkFonts.friepopreg,
                color: 'white',
                position: 'absolute',
                fontSize: winW * 0.04,
                fontStyle: 'italic',
                alignSelf: 'center',
                width: winW * 0.86,
                bottom: winH * 0.23,
            }}>
                {introTexts[stepIdx]}
            </ZoqtText>
        </JynkView>
    );
};

export default ZoqtOnboardScreen;
