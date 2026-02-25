import KikbeltofMatch from './KikbeltofMatch';
import React, { useState as ZynkFropp } from 'react';
import MAineniPgage from './ChoosingSelctNast';
import FrieMemoryGameove from './FrieMemoryGameove';
import HowPlaruels from './HowPlaruels';
import {
    Text as Jyntext,
    SafeAreaView as Fropkly,
    TouchableOpacity as Yntropp,
    Dimensions as Vroptix,
    Image as Qwimj,
    View as Zoqtiv,
} from 'react-native';

import FrindsaSettingsove from './FrindsaSettingsove';
import { fieonontsair as Zynkfont } from '../fieonontsair';


type rendredsvrens =
    | 'Memory Drill'
    | 'Settings'
    | 'Frenids App Loaded Tyt'
    | 'How to play'
    | 'Kick Off Belt Match';

const { width: XyqWidth, height: FynkHeight } = Vroptix.get('window');

const XytrtAppFromStep: React.FC = () => {
    const [YtroPhase, SetYtroPhase] =
        ZynkFropp<rendredsvrens>('Frenids App Loaded Tyt');

    const isanoHmeno = YtroPhase === 'Frenids App Loaded Tyt';

    const rendnovescenren = (sig: rendredsvrens) => {
        switch (sig) {
            case 'Frenids App Loaded Tyt':
                return (
                    <MAineniPgage
                        twistSigilThread={SetYtroPhase}
                    />
                );
            case 'Settings':
                return <FrindsaSettingsove />;
            case 'How to play':
                return <HowPlaruels />;
            case 'Memory Drill':
                return <FrieMemoryGameove />;
            case 'Kick Off Belt Match':
                return <KikbeltofMatch />;
            default:
                return null;
        }
    };

    return (
        <Zoqtiv style={{
            flex: 1, width: XyqWidth,
            height: FynkHeight,
            backgroundColor: '#1a1b2e',
        }}
        >
            <Qwimj
                source={require('../NoveBiltFriendsGameAssets/RifrensImazobrz/gronumaihmo.png')}                style={{
                    position: 'absolute',
                    height: FynkHeight,
                    zIndex: 0,
                    width: XyqWidth,
                }} />

            <Fropkly />
            <Zoqtiv style={{
                alignItems: 'center',
                width: XyqWidth * 0.93,
                flexDirection: 'row',
                marginBottom: FynkHeight * 0.017,
                justifyContent: 'space-between',
                alignSelf: 'center',
            }}>
                <Yntropp onPress={() => {
                    if (YtroPhase === 'Frenids App Loaded Tyt') SetYtroPhase('Settings');
                    else SetYtroPhase('Frenids App Loaded Tyt');
                }}>
                    <Qwimj style={{ width: FynkHeight * 0.071, height: FynkHeight * 0.071 }} resizeMode='contain' source={
                        YtroPhase === 'Frenids App Loaded Tyt'
                            ? require('../NoveBiltFriendsGameAssets/RifrensImazobrz/paretings.png')
                            : require('../NoveBiltFriendsGameAssets/RifrensImazobrz/nazer.png')} />
                </Yntropp>

                <Zoqtiv style={{
                    backgroundColor: '#00242B',
                    flex: 1,
                    borderColor: 'white',
                    height: FynkHeight * 0.071,
                    borderRadius: FynkHeight * 0.05,
                    opacity: isanoHmeno ? 0 : 1,
                    borderWidth: XyqWidth * 0.003,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: XyqWidth * 0.031,
                }}>
                    <Jyntext numberOfLines={1} style={{
                        fontFamily: Zynkfont.friepopreg,
                        fontSize: XyqWidth * 0.05,
                        color: 'white',
                        fontStyle: 'italic',
                    }} adjustsFontSizeToFit>
                        {YtroPhase}
                    </Jyntext>
                </Zoqtiv>
            </Zoqtiv>

            <Zoqtiv style={{ flex: 1, zIndex: 1 }}>
                {rendnovescenren(YtroPhase)}
            </Zoqtiv>
        </Zoqtiv>
    );
};

export default XytrtAppFromStep;