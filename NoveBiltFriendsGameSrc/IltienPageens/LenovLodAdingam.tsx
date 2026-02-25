import { Image as VynkImg, Text as QworpText, Dimensions as JynkDims, } from 'react-native';
import { useNavigation as FrintNav } from '@react-navigation/native';
import { fieonontsair as FynkFonts } from '../fieonontsair';
import React, { useEffect as ZoqtSpin } from 'react';
const QWOP_ZynkStorvex = 'unikaliz-novebilt-qwop-zynkstorvex-4g7k1';
import { SafeAreaView as ZoqtSafe } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LenovLodAdingam = (): React.ReactElement => {
    const navQwop = FrintNav();
    const { width: qwopW, height: qwopH } = JynkDims.get('window');

    ZoqtSpin(() => {
        let isActive = true;
        const randDelay = Math.floor(Math.random() * 900);

        const bootQwop = async () => {
            try {
                const flag = await AsyncStorage.getItem(QWOP_ZynkStorvex);
                if (!flag) {
                    await AsyncStorage.setItem(QWOP_ZynkStorvex, 'etched');
                }

                
            } catch (err) {
                if (__DEV__) console.warn('QwopBoot::fail', err);
            }
        };

        bootQwop();

        return () => {
            isActive = false;
        };
    }, [navQwop, qwopW]);

    return (
        <ZoqtSafe style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: qwopW, height: qwopH, flex: 1,
            paddingBottom: qwopH * 0.1,
        }}>
            <VynkImg resizeMode="cover" style={{
                width: qwopW,
                position: 'absolute',
                zIndex: 0,
                height: qwopH,
            }} source={require('../NoveBiltFriendsGameAssets/RifrensImazobrz/gronumaihmo.png')}
            />

            <QworpText style={{
                fontFamily: FynkFonts.friepopseibl,
                position: 'absolute',
                fontSize: qwopW * 0.08,
                alignSelf: 'flex-start',
                marginLeft: qwopW * 0.1,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                bottom: qwopH * 0.1,
                fontStyle: 'italic',
            }}>
                NoveBi|t:{'\n'}
                Friends Game:
            </QworpText>
        </ZoqtSafe>
    );
};

export default LenovLodAdingam;
