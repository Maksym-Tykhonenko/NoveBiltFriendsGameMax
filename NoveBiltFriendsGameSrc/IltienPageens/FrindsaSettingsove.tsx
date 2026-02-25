import React, { useEffect as ZoqtEff, useState as QworpState, useCallback as VynkCb } from 'react';
import {
    Linking as FrintLink,
    Dimensions as FrintDims,
    Switch as QwexSwitch,
    View as XytrView,
    TouchableOpacity as FynkTouch,
    Share as VroptShare,
    Image as ZoqtImg,
    Text as JynkText,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: qwopW, height: qwopH } = FrintDims.get('window');
const CAD_OVE_SIZ = qwopW * 0.42;
const CARD_RADIUS = qwopW * 0.07;
const ICON_SIZE = qwopW * 0.18;
const SWITCH_WIDTH = qwopW * 0.18;
const SWITCH_HEIGHT = qwopH * 0.045;
const GAP = qwopW * 0.06;

const OVIL_SETSIN = [
    {
        key: 'NoveBi|t:FriendsGame:Notifications',
        type: 'switch',
        label: '',
        icon: require('../NoveBiltFriendsGameAssets/RifrensImazobrz/notif.png'),
    },
    {
        key: 'NoveBi|t:FriendsGame:Share',
        type: 'button',
        label: 'Share the App',
        icon: require('../NoveBiltFriendsGameAssets/RifrensImazobrz/bluegrdshr.png'),
    },
    {
        key: 'NoveBi|t:FriendsGame:Music',
        type: 'switch',
        label: '',
        icon: require('../NoveBiltFriendsGameAssets/RifrensImazobrz/musonc.png'),
    },
    {
        key: 'NoveBi|t:FriendsGame:Terms',
        type: 'button',
        label: 'Terms of Use',
        icon: require('../NoveBiltFriendsGameAssets/RifrensImazobrz/btotoetemrs.png'),
    },
];

export default function FrindsaSettingsove() {
    const [switchStates, setSwitchStates] = QworpState<{ [key: string]: boolean }>({});

    ZoqtEff(() => {
        (async () => {
            const newStates: { [key: string]: boolean } = {};
            for (const item of OVIL_SETSIN) {
                if (item.type === 'switch') {
                    const val = await AsyncStorage.getItem(item.key);
                    newStates[item.key] = val === null ? true : val === 'true';
                }
            }
            setSwitchStates(newStates);
        })();
    }, []);

    const onSwitchChange = VynkCb(async (key: string, value: boolean) => {
        setSwitchStates(prev => ({ ...prev, [key]: value }));
        await AsyncStorage.setItem(key, value ? 'true' : 'false');
    }, []);

    const handleButtonPress = VynkCb((key: string) => {
        if (key.includes('Share')) {
            VroptShare.share({
                message: `Do you want to try this awesome game? Download NoveBi|t: Friends Game now!`,
            })
        } else if (key.includes('Terms')) {
            FrintLink.openURL('https://www.termsfeed.com/live/d96690da-09cd-4b87-b55c-f8423cef682e');
        }
    }, []);

    return (
        <XytrView style={{ alignItems: 'center', flex: 1, }}>
            <XytrView style={{
                width: qwopW * 0.92,
                flexWrap: 'wrap',

                flexDirection: 'row',

                justifyContent: 'space-between',

            }}>
                {OVIL_SETSIN.map((item, idx) => (
                    <FynkTouch
                        activeOpacity={0.93}
                        disabled={item.type === 'switch'}
                        key={item.key}
                        onPress={() => handleButtonPress(item.key)}
                        style={{
                            borderColor: '#fff',
                            height: CAD_OVE_SIZ,
                            borderRadius: CARD_RADIUS,
                            backgroundColor: '#00242B',
                            alignItems: 'center',
                            width: CAD_OVE_SIZ,
                            justifyContent: 'center',
                            borderWidth: 1,
                            marginBottom: GAP,
                        }}
                    >
                        <ZoqtImg source={item.icon}
                            style={{
                                height: ICON_SIZE,
                                resizeMode: 'contain',
                                marginBottom: item.type === 'switch' ? GAP * 0.3 : GAP * 0.6,
                                width: ICON_SIZE,
                            }}
                        />
                        {item.type === 'switch' ? (
                            <QwexSwitch
                                onValueChange={val => onSwitchChange(item.key, val)}
                                thumbColor={'#fff'}
                                trackColor={{ false: '#767577', true: '#34C759' }}
                                value={!!switchStates[item.key]}
                                style={{
                                    width: SWITCH_WIDTH,
                                    height: SWITCH_HEIGHT,
                                    alignSelf: 'center',
                                    marginTop: qwopH * 0.019,
                                }}
                            />
                        ) : (
                            <FynkTouch
                                onPress={() => handleButtonPress(item.key)}
                                style={{
                                    marginTop: 0,
                                }}
                                activeOpacity={0.7}
                            >
                                <JynkText style={{
                                    marginTop: qwopH * 0.019,
                                    color: '#fff',
                                    textAlign: 'center',
                                    fontWeight: '500',
                                    fontSize: qwopW * 0.045,
                                }}>
                                    {item.label}
                                </JynkText>
                            </FynkTouch>
                        )}
                    </FynkTouch>
                ))}
            </XytrView>
        </XytrView>
    );
}
