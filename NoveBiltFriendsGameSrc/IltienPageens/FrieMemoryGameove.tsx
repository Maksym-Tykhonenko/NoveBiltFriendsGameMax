import React, { useEffect as ZoqtEff, useState as QworpState, useRef as VynkRef } from 'react';
import {
    Dimensions as FrintDims,
    View as XytrView,
    Text as JynkText,
    TouchableOpacity as QwexTouch,
    Image as FynkImg,
    Animated as ZoqtAnim,
    Easing as QworpEasing,
    KeyboardAvoidingView as FrintKAV,
} from 'react-native';
import OvereusblBtnies from '../DneioneOmcompnts/OvereusblBtnies';
import { Milonordiendes } from '../DneioneOmcompnts/Milonordiendes';

const { width: qwopW, height: qwopH } = FrintDims.get('window');

const QWOP_EMOJIS = [
    '⚡️', '🥋', '🏅', '🥇', '🏆', '🎽', '🎯', '🧠', '🎮', '👟', '🏟️', '🏈', '⚽️', '🏀', '🎾', '🏐', '🥊', '🤼‍️', '🤸‍️', '🚴‍️', '🤾‍️', '🏃‍', '🤾‍️', '🤝', '👥', '😄', '😂', '😉', '✅', '❌', '🔁', '🔔', '⭐️', '🎉', '🔥', '📣'
];

function getQwopEmojis(cnt: number) {
    let arr = [...QWOP_EMOJIS];
    let res = [];
    for (let i = 0; i < cnt; i++) {
        const idx = Math.floor(Math.random() * arr.length);
        res.push(arr[idx]);
        arr.splice(idx, 1);
    }
    return res;
}

export default function FrieMemoryGameove() {
    const [step, setStep] = QworpState<'start' | 'show' | 'input' | 'success' | 'fail'>('start');
    const [sequence, setSequence] = QworpState<string[]>([]);
    const [showIdx, setShowIdx] = QworpState(0);
    const [timer, setTimer] = QworpState(7);
    const [input, setInput] = QworpState<string[]>([]);
    const [longestStreak, setLongestStreak] = QworpState(0);
    const [lastLength, setLastLength] = QworpState(0);
    const [streak, setStreak] = QworpState(0);
    const [modalAnim] = QworpState(new ZoqtAnim.Value(0));
    const timerRef = VynkRef<NodeJS.Timeout | null>(null);
    const [failCount, setFailCount] = QworpState(0);

    // Start game
    const startGame = () => {
        const seq = getQwopEmojis(7);
        setSequence(seq);
        setShowIdx(0);
        setTimer(7);
        setInput([]);
        setStep('show');
        setTimeout(() => setShowIdx(1), 700);
    };

    // Show sequence one by one
    ZoqtEff(() => {
        if (step === 'show' && showIdx < 7) {
            const t = setTimeout(() => setShowIdx(showIdx + 1), 700);
            return () => clearTimeout(t);
        }
    }, [showIdx, step]);

    // Timer for show sequence only, transition to input after timer ends
    ZoqtEff(() => {
        if (step === 'show') {
            if (timer === 0) {
                setStep('input');
                return;
            }
            timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(timerRef.current!);
        }
    }, [timer, step]);

    // Modal animation
    const showModal = () => {
        modalAnim.setValue(0);
        ZoqtAnim.timing(modalAnim, {
            toValue: 1,
            duration: 350,
            useNativeDriver: true,
            easing: QworpEasing.out(QworpEasing.ease),
        }).start();
    };

    // Handle emoji input
    const handleEmojiPress = (emoji: string) => {
        if (input.length >= 7) return;
        const newInput = [...input, emoji];
        setInput(newInput);
        if (sequence[newInput.length - 1] !== emoji) {
            setTimeout(() => handleFail(), 200);
        } else if (newInput.length === 7) {
            setTimeout(() => handleSuccess(), 200);
        }
    };

    // Handle fail
    const handleFail = () => {
        const newFailCount = failCount + 1;
        setFailCount(newFailCount);
        setInput([]);
        setStreak(0);
        setLastLength(input.length);
        if (newFailCount < 3) {
            setStep('input');
            showModal();
        } else {
            setStep('fail');
            showModal();
        }
    };

    // Handle success
    const handleSuccess = () => {
        const newStreak = streak + 1;
        setStreak(newStreak);
        setLongestStreak(Math.max(longestStreak, newStreak));
        setLastLength(sequence.length);
        setFailCount(0);
        setStep('success');
        showModal();
    };

    // Modal content
    const renderModal = () => {
        if (step === 'fail' || (step === 'input' && failCount > 0 && failCount < 3)) {
            return (
                <ZoqtAnim.View style={{
                    width: qwopW * 0.88,
                    position: 'absolute',
                    alignSelf: 'center',
                    borderWidth: 1,
                    backgroundColor: '#0a222b',
                    borderColor: '#fff',
                    borderRadius: qwopW * 0.06,
                    padding: qwopW * 0.07,
                    opacity: modalAnim,
                    alignItems: 'center',
                    top: qwopH * 0.32,
                    transform: [{
                        scale: modalAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.8, 1]
                        })
                    }],
                    zIndex: 10,
                }}>
                    <JynkText style={{
                        textAlign: 'center',
                        fontSize: qwopW * 0.07,
                        fontWeight: 'bold',
                        marginBottom: qwopW * 0.03,
                        color: '#fff',
                    }}>
                        {step === 'fail' && failCount >= 3 ? 'Game Over' : 'Mistake!'}
                    </JynkText>
                    <JynkText style={{
                        marginBottom: qwopW * 0.04,
                        fontSize: qwopW * 0.045,
                        color: '#fff',
                        textAlign: 'center',
                    }}>
                        {step === 'fail' && failCount >= 3
                            ? 'Maximum number of incorrect attempts reached.'
                            : 'You made a mistake in the sequence.'}
                    </JynkText>
                    {step === 'fail' ? (
                        <OvereusblBtnies
                            fontSize={qwopW * 0.048}
                            bumiprtext='Home'
                            onPress={() => {
                                setStep('start');
                                setFailCount(0);
                            }}
                            morstlesofbuto={{
                                width: qwopW * 0.7,
                                marginTop: qwopW * 0.01,
                            }}
                        />
                    ) : (
                        <OvereusblBtnies
                            fontSize={qwopW * 0.048}
                            bumiprtext='OK'
                            onPress={() => modalAnim.setValue(0)}
                            morstlesofbuto={{
                                width: qwopW * 0.7,
                                marginTop: qwopW * 0.01,
                            }}
                        />
                    )}
                </ZoqtAnim.View>
            );
        }
        if (step === 'success') {
            return (
                <ZoqtAnim.View style={{
                    top: qwopH * 0.32,
                    alignSelf: 'center',
                    position: 'absolute',
                    width: qwopW * 0.88,
                    borderWidth: 1,
                    opacity: modalAnim,
                    borderRadius: qwopW * 0.06,
                    borderColor: '#fff',
                    padding: qwopW * 0.07,
                    alignItems: 'center',
                    backgroundColor: '#0a222b',
                    transform: [{
                        scale: modalAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.8, 1]
                        })
                    }]
                }}>
                    <JynkText style={{
                        fontWeight: 'bold',
                        fontSize: qwopW * 0.07,
                        textAlign: 'center',
                        marginBottom: qwopW * 0.03,
                        color: '#fff',
                    }}>Nice Memory!</JynkText>
                    <JynkText style={{
                        color: '#fff',
                        fontSize: qwopW * 0.045,
                        textAlign: 'center',
                        marginBottom: qwopW * 0.01
                    }}>Longest streak this session: [{longestStreak}]</JynkText>
                    <JynkText style={{
                        color: '#fff',
                        marginBottom: qwopW * 0.04,
                        fontSize: qwopW * 0.045,
                        textAlign: 'center',
                    }}>Last sequence length: [{lastLength}] emojis</JynkText>
                    <OvereusblBtnies
                        fontSize={qwopW * 0.048}
                        bumiprtext='Home'
                        onPress={() => {
                            setStep('start');
                            setFailCount(0);
                        }}
                        morstlesofbuto={{
                            width: qwopW * 0.7,
                            marginTop: qwopW * 0.01,
                        }}
                    />
                </ZoqtAnim.View>
            );
        }
        return null;
    };

    // Emoji input grid
    const renderEmojiGrid = () => (
        <XytrView style={{
            marginBottom: qwopW * 0.04,
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: qwopW * 0.04,
            flexDirection: 'row',
        }}>
            {QWOP_EMOJIS.map((emoji, idx) => {
                const enteredIdx = input.findIndex((e, i) => e === emoji && input.slice(0, i).filter(x => x === emoji).length === 0);
                const isEntered = enteredIdx !== -1;
                return (
                    <QwexTouch
                        key={emoji + '_' + idx}
                        onPress={() => handleEmojiPress(emoji)}
                        disabled={input.length >= 7}
                        style={{
                            margin: qwopW * 0.012,
                            width: qwopW * 0.14,
                            borderWidth: 1,
                            borderRadius: qwopW * 0.07,
                            backgroundColor: isEntered ? '#1ec6ff' : '#0a222b',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderColor: 'white',
                            overflow: 'hidden',
                            opacity: input.length >= 7 && !isEntered ? 0.5 : 1,
                            height: qwopW * 0.14,
                        }}>
                        {isEntered && <Milonordiendes />}
                        <JynkText style={{
                            fontSize: qwopW * 0.07,
                            color: '#fff'
                        }}>{emoji}</JynkText>
                    </QwexTouch>
                );
            })}
        </XytrView>
    );

    // Бар введених емодзі з градієнтом
    const renderEnteredEmojisBar = () => (
        <XytrView style={{
            overflow: 'hidden',
            alignSelf: 'center',
            width: qwopW * 0.88,
            minHeight: qwopW * 0.16,
            justifyContent: 'center',
            borderRadius: qwopW * 0.059,
            zIndex: 3,
        }}>
            <Milonordiendes style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
            }} />
            <XytrView style={{
                paddingHorizontal: qwopW * 0.04,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: qwopW * 0.03,
            }}>
                {input.length === 0 ? (
                    <JynkText style={{
                        color: '#fff',
                        fontSize: qwopW * 0.05,
                        opacity: 0.7,
                    }}>Your input will appear here</JynkText>
                ) : (
                    input.map((emoji, idx) => (
                        <JynkText key={idx} style={{
                            fontSize: qwopW * 0.09,
                            marginHorizontal: qwopW * 0.018,
                            color: '#fff',
                        }}>{emoji}</JynkText>
                    ))
                )}
            </XytrView>
        </XytrView>
    );

    // Sequence show bar
    const renderSequenceBar = () => (
        <XytrView style={{
            borderRadius: qwopW * 0.09,
            alignSelf: 'center',
            paddingHorizontal: qwopW * 0.02,
            marginBottom: qwopH * 0.08,
            backgroundColor: '#1ec6ff',
            width: qwopW * 0.85,
            minHeight: qwopW * 0.17,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            marginTop: qwopH * 0.13,
        }}>
            <JynkText
                style={{
                    fontSize: qwopW * 0.11,
                    width: '100%',
                    textAlign: 'center',
                }}
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.3}
            >
                {sequence.slice(0, showIdx).join(' ')}
            </JynkText>
        </XytrView>
    );

    // Timer circle
    const renderTimer = () => (
        <XytrView style={{
            justifyContent: 'center',
            bottom: qwopH * 0.09,
            alignSelf: 'center',
            width: qwopW * 0.18,
            position: 'absolute',
            alignItems: 'center',
            height: qwopW * 0.18,
            backgroundColor: '#000',
            borderWidth: 3,
            borderColor: '#1ec6ff',
            borderRadius: qwopW * 0.09,
        }}>
            <JynkText style={{
                color: '#fff',
                fontSize: qwopW * 0.09,
                fontWeight: 'bold'
            }}>{timer}</JynkText>
        </XytrView>
    );

    // Main render
    return (
        <XytrView style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: 'transparent',
        }}>
            {/* Background image */}
            <FynkImg
                source={require('../NoveBiltFriendsGameAssets/RifrensImazobrz/manintelephone.png')}
                style={{
                    width: qwopW,
                    zIndex: 1,
                    height: qwopH * 0.8,
                    bottom: qwopH * 0.05,
                    alignSelf: 'center',
                    opacity: step === 'start' ? 1 : 0,
                    position: 'absolute',
                }}
                resizeMode="stretch"
            />

            {/* Start screen */}
            {step === 'start' && (
                <OvereusblBtnies
                    onPress={startGame}
                    bumiprtext='Start'
                    fontSize={qwopW * 0.048}
                    morstlesofbuto={{
                        bottom: qwopH * 0.04,
                        zIndex: 4,
                        position: 'absolute',
                        width: qwopW * 0.79,
                    }}
                />
            )}

            {/* Show sequence */}
            {step === 'show' && (
                <>
                    {renderSequenceBar()}
                    {renderTimer()}
                </>
            )}

            {/* Input screen */}
            {step === 'input' && (
                <>
                    <FrintKAV style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'space-between', marginBottom: qwopH * 0.05 }} behavior="padding">
                        {renderEnteredEmojisBar()}
                        {renderEmojiGrid()}
                    </FrintKAV>
                </>
            )}

            {/* Modal */}
            {renderModal()}
        </XytrView>
    );
}
