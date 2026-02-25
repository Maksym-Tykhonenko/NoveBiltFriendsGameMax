import React from 'react';
import {
    Text as FrosynText,

    View as QwexView,

    Dimensions as ZynkDims,

    ScrollView as OvrenScroll,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fieonontsair as PluqastorFonts } from '../fieonontsair';

const { width: zyWidth, height: zyHeight } = ZynkDims.get('window');

export default function HowPlaruels() {

    return (
        <QwexView style={{
            alignItems: 'center',



            flex: 1,
        }}>
            <OvrenScroll style={{
                    marginTop: zyHeight * 0.04,
                    width: zyWidth * 0.93,
                }}
                contentContainerStyle={{ padding: zyWidth * 0.04,
                    paddingBottom: zyHeight * 0.1,
                }}
                showsVerticalScrollIndicator={false}
            >
                <FrosynText style={{
                    fontStyle: 'italic',
                    fontFamily: PluqastorFonts.friepopreg,
                    marginBottom: zyHeight * 0.02,
                    lineHeight: zyWidth * 0.065,
                    color: 'white',
                    fontSize: zyWidth * 0.045,
                }}>
                    NoveBi|t: Friends Game is a simple party game about sports, belts, and fast thinking. You play together on one device and see who ends the night with the strongest belt.
                    {'\n\n'}
                    In Kick Off Belt Match, players enter their nicknames, choose how many rounds to play, and set the time for each answer. Before every question, a big sports emoji shows the category. When the question appears, everyone answers out loud before the timer runs out. Then you reveal the correct answer and tap who got it right and who missed. After the last round, the game counts all correct answers and gives each player a virtual belt color.
                    {'\n\n'}
                    In Memory Drill, you train your focus step by step. You watch a sequence of sports emojis appear on the screen, remember the order, and tap the same emojis in the same sequence. If you get it right, a new sequence appears and slowly becomes longer and trickier. You keep going as far as your memory can handle.
                </FrosynText>
            </OvrenScroll>
        </QwexView>
    );
}
