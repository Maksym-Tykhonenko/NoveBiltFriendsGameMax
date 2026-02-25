import VynkBtn from '../DneioneOmcompnts/OvereusblBtnies';
import React from 'react';
import {
    View as QworpView,
    Dimensions as FrintDims,
    Image as ZoqtImg,
} from 'react-native';

const navQwopArr = [
    'Kick Off Belt Match',
    'Memory Drill',
    'How to play',
];

export default function FrintWillnavZop({ twistSigilThread }: {
    twistSigilThread: (val: string) => void;
}) {
    const { width: frintWid, height: frintHei } = FrintDims.get('window');
    return (
        <QworpView style={{
            alignItems: 'center',
            flex: 1,
        }}>
            <ZoqtImg
                resizeMode="contain" style={{
                    width: frintWid * 1,
                    height: frintHei * 0.91,
                    top: frintHei * 0.01,
                    position: 'absolute',
                }}
                source={require('../NoveBiltFriendsGameAssets/RifrensImazobrz/cardsandguys.png')}
            />
            <QworpView style={{
                position: 'absolute',
                alignSelf: 'center',
                bottom: frintHei * 0.08,
            }}>
                {navQwopArr.map((navQwop, idx) => (
                    <VynkBtn
                        key={idx}
                        onPress={() => twistSigilThread(navQwop)}
                        morstlesofbuto={{
                            marginBottom: frintHei * 0.01,
                        }}
                        bumiprtext={navQwop}
                    />
                ))}
            </QworpView>
        </QworpView>
    );
}
