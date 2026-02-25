import {
    Dimensions,
    Share,
    View,
    Text,
    KeyboardAvoidingView,
    TextInput,
    ScrollView,
    Animated,
    Image,
    TouchableOpacity,
} from 'react-native';
import OvereusblBtnies from '../DneioneOmcompnts/OvereusblBtnies';
import React, { useState, useEffect } from 'react';
import { fieonontsair } from '../fieonontsair';
// --- import categories/questions from new file ---
import { CATEGORIES, QUESTIONS } from '../RendsDatavaame/categoriesAndQuestions';

const { width, height } = Dimensions.get('window');

const getRandomQuestion = (catIdx: number) => {
    const filtered = QUESTIONS.filter(q => q.category === catIdx);
    if (filtered.length === 0) return QUESTIONS[0];
    return filtered[Math.floor(Math.random() * filtered.length)];
};

// --- Кнопка плюс/мінус через OvereusblBtnies ---
const RoundTimeButton = ({ onPress, icon }: { onPress: () => void, icon: 'plus' | 'minus' }) => (
    <TouchableOpacity onPress={onPress}>
        <Image
            source={icon === 'plus'
                ? require('../NoveBiltFriendsGameAssets/RifrensImazobrz/pluocise.png')
                : require('../NoveBiltFriendsGameAssets/RifrensImazobrz/miunovis.png')}
            style={{
                width: width * 0.14,
                height: width * 0.14,
                resizeMode: 'contain',
            }}
        />
    </TouchableOpacity>
);

export default function KikbeltofMatch() {
    // Етапи: setup, category, question, answer, results
    const [stage, setStage] = useState<'setup' | 'category' | 'question' | 'answer' | 'results'>('setup');
    const [players, setPlayers] = useState([{ name: '', score: 0 }, { name: '', score: 0 }]);
    // ДОДАЙ ЦЕЙ СТЕЙТ:
    const [playerRounds, setPlayerRounds] = useState<number[][]>([[0], [0]]);
    const [rounds, setRounds] = useState(2);
    const [timePerAnswer, setTimePerAnswer] = useState(30); // seconds
    const [currentRound, setCurrentRound] = useState(1);
    const [currentPlayerIdx, setCurrentPlayerIdx] = useState(0);
    const [categoryIdx, setCategoryIdx] = useState(0);
    const [categoryAnim] = useState(new Animated.Value(0));
    const [question, setQuestion] = useState<{ question: string, answer: string, category: number } | null>(null);
    const [timer, setTimer] = useState(5);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    // --- SETUP STAGE ---
    const handlePlayerNameChange = (idx: number, name: string) => {
        setPlayers(prev => {
            const updated = [...prev];
            updated[idx].name = name;
            return updated;
        });
    };
    const handleAddPlayer = () => {
        setPlayers(prev => [...prev, { name: '', score: 0 }]);
        setPlayerRounds(prev => [...prev, Array(rounds).fill(0)]);
    };
    const handleRemovePlayer = (idx: number) => {
        if (players.length > 2) {
            setPlayers(prev => prev.filter((_, i) => i !== idx));
            setPlayerRounds(prev => prev.filter((_, i) => i !== idx));
        }
    };

    // --- RESET rounds array on rounds change or player count change ---
    useEffect(() => {
        setPlayerRounds(prev => {
            // Ensure each player has an array of length rounds, filled with 0 if missing
            return players.map((_, idx) => {
                const arr = prev[idx] || [];
                if (arr.length < rounds) return [...arr, ...Array(rounds - arr.length).fill(0)];
                if (arr.length > rounds) return arr.slice(0, rounds);
                return arr;
            });
        });
        // ДОДАЙТЕ players.length до залежностей!
    }, [rounds, players.length]);

    // --- CATEGORY STAGE ---
    useEffect(() => {
        if (stage === 'category') {
            Animated.loop(
                Animated.timing(categoryAnim, {
                    toValue: 1,
                    duration: 700,
                    useNativeDriver: false,
                })
            ).start();
            const interval = setInterval(() => {
                setCategoryIdx(prev => (prev + 1) % CATEGORIES.length);
            }, 700);
            return () => clearInterval(interval);
        } else {
            categoryAnim.stopAnimation();
        }
    }, [stage]);

    // --- QUESTION+ANSWER STAGE ---
    useEffect(() => {
        if (stage === 'question') {
            setShowAnswer(false);
            setShowButtons(false);
            setTimer(5);
            const interval = setInterval(() => {
                setTimer(prev => {
                    if (prev === 1) {
                        clearInterval(interval);
                        setShowButtons(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [stage, question]);

    // --- NEXT PLAYER/ROUND LOGIC ---
    const nextTurn = () => {
        if (currentPlayerIdx + 1 < players.length) {
            setCurrentPlayerIdx(currentPlayerIdx + 1);
            setStage('category');
        } else if (currentRound < rounds) {
            setCurrentRound(currentRound + 1);
            setCurrentPlayerIdx(0);
            setStage('category');
        } else {
            setStage('results');
        }
        setShowAnswer(false);
    };

    // --- CATEGORY TAP ---
    const handleCategoryTap = () => {
        const q = getRandomQuestion(categoryIdx);
        setQuestion(q);
        setTimeout(() => setStage('question'), 300);
    };

    // --- ANSWER BUTTONS ---
    const handleGotIt = () => {
        setPlayers(prev => {
            const updated = [...prev];
            updated[currentPlayerIdx].score += 1;
            return updated;
        });
        setPlayerRounds(prev => {
            const updated = prev.map(arr => [...arr]);
            updated[currentPlayerIdx][currentRound - 1] = (updated[currentPlayerIdx][currentRound - 1] || 0) + 1;
            return updated;
        });
        nextTurn();
    };
    const handleMissed = () => {
        nextTurn();
    };

    // --- SETUP SCREEN ---
    if (stage === 'setup') {
        return (
            <KeyboardAvoidingView
                style={{ flex: 1, alignItems: 'center', paddingTop: height * 0.01, backgroundColor: 'transparent' }}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ alignItems: 'center', paddingBottom: height * 0.1 }}
                    style={{ width: '100%' }}
                >
                    <Text style={{
                        color: '#fff',
                        fontWeight: '600',
                        lineHeight: width * 0.08,
                        marginBottom: height * 0.04,
                        textAlign: 'center',
                        width: width * 0.9,
                        fontSize: width * 0.06,
                    }}>
                        Add players, choose rounds, and set the time limit. Then your belt match begins
                    </Text>
                    {players.map((p, idx) => (
                        <View key={idx} style={{
                            flexDirection: 'row',
                            marginBottom: height * 0.018,
                            alignItems: 'center',
                            width: width * 0.88,
                        }}>
                            <TextInput
                                placeholder={`PLAYER ${idx + 1}`}
                                placeholderTextColor="#B0B0B0"
                                value={p.name}
                                onChangeText={text => handlePlayerNameChange(idx, text)}
                                style={{
                                    borderRadius: width * 0.09,
                                    height: height * 0.065,
                                    backgroundColor: '#00242B',
                                    borderColor: '#fff',
                                    color: '#fff',
                                    paddingHorizontal: width * 0.06,
                                    flex: 1,
                                    fontSize: width * 0.048,
                                    borderWidth: 2,
                                }}
                            />
                            {players.length > 2 && (
                                <TouchableOpacity
                                    onPress={() => handleRemovePlayer(idx)}
                                    style={{
                                        marginLeft: width * 0.02,
                                        padding: width * 0.01,
                                    }}
                                >
                                    <Text style={{ color: '#fff', fontSize: width * 0.07 }}>×</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                    <OvereusblBtnies
                        bumiprtext="+ ADD ANOTHER PLAYER"
                        fontSize={width * 0.048}
                        onPress={handleAddPlayer}
                        morstlesofbuto={{
                            height: height * 0.07,
                            backgroundColor: 'transparent',
                            width: width * 0.88,
                            marginBottom: height * 0.04,
                            borderRadius: width * 0.09,
                        }}
                    />

                    {/* Number of rounds */}
                    <Text style={{
                        fontWeight: '600',
                        fontSize: width * 0.05,
                        alignSelf: 'flex-start',
                        marginBottom: height * 0.01,
                        marginLeft: width * 0.06,
                        color: '#fff',
                    }}>
                        Number of rounds
                    </Text>
                    <View style={{
                        width: width * 0.88,
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: height * 0.04,
                        flexDirection: 'row',
                    }}>
                        <RoundTimeButton onPress={() => setRounds(Math.max(1, rounds - 1))} icon="minus" />
                        <View style={{
                            borderColor: '#fff',
                            justifyContent: 'center',
                            width: width * 0.55,
                            borderRadius: width * 0.09,
                            borderWidth: 2,
                            backgroundColor: '#00242B',
                            alignItems: 'center',
                            height: height * 0.065,
                        }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: width * 0.05,
                                fontWeight: 'bold',
                            }}>{rounds}</Text>
                        </View>
                        <RoundTimeButton onPress={() => setRounds(rounds + 1)} icon="plus" />
                    </View>

                    {/* Time per answer */}
                    <Text style={{
                        fontWeight: '600',
                        fontSize: width * 0.05,
                        marginBottom: height * 0.01,
                        alignSelf: 'flex-start',
                        marginLeft: width * 0.06,
                        color: '#fff',
                    }}>
                        Time per answer
                    </Text>
                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        marginBottom: height * 0.04,
                        width: width * 0.88,
                    }}>
                        <RoundTimeButton onPress={() => setTimePerAnswer(Math.max(5, timePerAnswer - 5))} icon="minus" />
                        <View style={{
                            alignItems: 'center',
                            width: width * 0.55,
                            justifyContent: 'center',
                            height: height * 0.065,
                            borderWidth: 2,
                            borderColor: '#fff',
                            backgroundColor: '#00242B',
                            borderRadius: width * 0.09,
                        }}>
                            <Text style={{
                                color: '#fff',
                                fontSize: width * 0.05,
                                fontWeight: 'bold',
                            }}>{timePerAnswer} s</Text>
                        </View>
                        <RoundTimeButton onPress={() => setTimePerAnswer(Math.min(60, timePerAnswer + 5))} icon="plus" />
                    </View>

                    <View style={{ width: width, alignItems: 'center', marginTop: height * 0.01 }}>
                        <OvereusblBtnies
                            fontSize={width * 0.048}
                            bumiprtext="START BELT MATCH"
                            morstlesofbuto={{
                                width: width * 0.88,
                                height: height * 0.07,
                                borderRadius: width * 0.09,
                            }}
                            onPress={() => setStage('category')}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

    // --- CATEGORY SCREEN ---
    if (stage === 'category') {
        return (
            <View style={{
                backgroundColor: 'transparent',
                flex: 1,
                alignItems: 'center',
            }}>
                <TouchableOpacity onPress={handleCategoryTap} style={{
                    shadowRadius: width * 0.07,
                    shadowColor: '#07E5FF',
                    width: width * 0.94,
                    height: height * 0.7,
                    borderWidth: 3,
                    borderColor: '#07E5FF',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    shadowOpacity: 0.18,
                    borderRadius: width * 0.07,
                    shadowOffset: { width: 0, height: 4 },
                    backgroundColor: '#045C66',
                }}>
                    {/* Player name oval */}
                    <View style={{

                        justifyContent: 'center',
                        height: height * 0.07,

                        backgroundColor: '#00242B',
                        width: width * 0.7,
                        borderRadius: width * 0.035,
                        alignItems: 'center',

                        top: height * 0.04,
                        position: 'absolute',
                        left: (width * 0.94 - width * 0.7) / 2,
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: width * 0.055,
                            fontFamily: 'System',
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            letterSpacing: 1,
                        }}>
                            {players[currentPlayerIdx].name || `PLAYER ${currentPlayerIdx + 1}`}
                        </Text>
                    </View>
                    {/* Category card */}
                    <View style={{
                        alignItems: 'center',
                        flex: 1,
                        justifyContent: 'center',
                    }}>
                        <OvereusblBtnies
                            onPress={handleCategoryTap}
                            morstlesofbuto={{
                                shadowOpacity: 0.18,
                                width: width * 0.5,
                                justifyContent: 'center',
                                shadowColor: '#07E5FF',
                                borderRadius: width * 0.073,
                                height: height * 0.1,
                                alignItems: 'center',
                                shadowRadius: width * 0.07,
                                shadowOffset: { width: 0, height: 4 },
                            }}
                            fontSize={width * 0.13}
                            content={
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    flexDirection: 'row',
                                    height: '100%',
                                }}>
                                    {CATEGORIES[categoryIdx].map((emoji, idx) => (
                                        <Text key={idx} style={{
                                            fontSize: width * 0.1,
                                            marginHorizontal: width * 0.01,
                                        }}>
                                            {emoji}
                                        </Text>
                                    ))}
                                </View>
                            }
                            bumiprtext=""
                        />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    // --- QUESTION+ANSWER SCREEN ---
    if (stage === 'question' && question) {
        return (
            <View style={{
                flex: 1,
                alignItems: 'center',
                // justifyContent: 'center',
                backgroundColor: 'transparent',
            }}>
                <View style={{
                    borderRadius: width * 0.07,
                    shadowOpacity: 0.18,
                    shadowOffset: { width: 0, height: 4 },
                    height: height * 0.64,
                    borderColor: '#07E5FF',
                    borderWidth: 3,
                    backgroundColor: '#045C66',
                    justifyContent: 'flex-start',
                    shadowColor: '#07E5FF',
                    alignItems: 'center',
                    shadowRadius: width * 0.07,
                    position: 'relative',
                    width: width * 0.94,
                }}>
                    {/* Player name oval */}
                    <View style={{
                        borderRadius: width * 0.035,
                        height: height * 0.07,
                        top: height * 0.04,
                        width: width * 0.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        left: (width * 0.94 - width * 0.7) / 2,
                        zIndex: 2,
                        backgroundColor: '#00242B',
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: width * 0.055,
                            fontFamily: 'System',
                            fontWeight: 'bold',
                            fontStyle: 'italic',
                            letterSpacing: 1,
                        }}>
                            {players[currentPlayerIdx].name || `PLAYER ${currentPlayerIdx + 1}`}
                        </Text>
                    </View>
                    {/* Category card */}
                    <View style={{
                        marginTop: height * 0.13,
                        marginBottom: height * 0.03,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <OvereusblBtnies
                            onPress={() => { }}
                            morstlesofbuto={{
                                width: width * 0.5,
                                shadowRadius: width * 0.07,
                                alignItems: 'center',
                                borderRadius: width * 0.073,
                                justifyContent: 'center',
                                height: height * 0.1,
                                shadowOpacity: 0.18,
                                shadowColor: '#07E5FF',
                                shadowOffset: { width: 0, height: 4 },
                            }}
                            fontSize={width * 0.1}
                            content={
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: '100%',
                                }}>
                                    {CATEGORIES[question.category].map((emoji, idx) => (
                                        <Text key={idx} style={{
                                            fontSize: width * 0.1,
                                            marginHorizontal: width * 0.01,
                                        }}>
                                            {emoji}
                                        </Text>
                                    ))}
                                </View>
                            }
                            bumiprtext=""
                        />
                    </View>
                    {/* Question */}
                    <View style={{
                        alignItems: 'center',
                        marginBottom: height * 0.03,
                        width: '90%',
                    }}>
                        <Text style={{
                            fontSize: width * 0.052,
                            fontStyle: 'italic',
                            fontWeight: 'bold',
                            color: '#fff',
                            textAlign: 'center',
                        }}>
                            {question.question}
                        </Text>
                    </View>
                    {/* Answer stars or answer */}
                    <View style={{
                        alignItems: 'center',
                        height: height * 0.07,
                        marginBottom: height * 0.03,
                        borderRadius: width * 0.035,
                        width: width * 0.7,
                        justifyContent: 'center',
                        backgroundColor: '#00242B',
                    }}>
                        <Text style={{
                            color: '#fff',
                            fontSize: width * 0.06,
                            letterSpacing: 2,
                        }}>
                            {showAnswer ? question.answer : '*'.repeat(question.answer.length)}
                        </Text>
                    </View>
                    {/* Timer */}
                    {!showButtons && (
                        <View style={{
                            position: 'absolute',
                            bottom: height * 0.07,
                            alignSelf: 'center',
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                height: width * 0.18,
                                borderRadius: width * 0.09,
                                width: width * 0.18,
                                borderWidth: 3,
                                alignItems: 'center',
                                borderColor: '#07E5FF',
                                backgroundColor: '#00242B',
                            }}>
                                <Text style={{
                                    color: '#fff',
                                    fontSize: width * 0.09,
                                    fontWeight: 'bold',
                                }}>{timer}</Text>
                            </View>
                        </View>
                    )}
                </View>
                {/* Show Answer Button */}
                {showButtons && !showAnswer && (
                    <View style={{
                        width: width * 0.9,
                        alignItems: 'center',
                        marginTop: height * 0.03,
                    }}>
                        <OvereusblBtnies
                            bumiprtext='SHOW ANSWER'
                            onPress={() => setShowAnswer(true)}
                            morstlesofbuto={{
                                width: width * 0.9,
                                height: height * 0.075,
                                borderRadius: width * 0.09,
                                marginBottom: height * 0.025,
                            }}
                            fontSize={width * 0.052}
                        />
                    </View>
                )}
                {/* Missed / Got It Buttons */}
                {showButtons && showAnswer && (
                    <View style={{
                        width: width * 0.9,
                        justifyContent: 'space-between',
                        marginTop: height * 0.03,
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity
                            onPress={handleMissed}
                            style={{
                                height: height * 0.075,
                                flex: 1,
                                borderRadius: width * 0.09,
                                backgroundColor: '#E53935',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: width * 0.03,
                            }}>
                            <Text style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: width * 0.052,
                                fontStyle: 'italic',
                            }}>MISSED</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={handleGotIt}
                            style={{
                                justifyContent: 'center',
                                backgroundColor: '#1DBA3B',
                                borderRadius: width * 0.09,
                                alignItems: 'center',
                                height: height * 0.075,
                                flex: 1,
                                marginLeft: width * 0.03,
                            }}>
                            <Text style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: width * 0.052,
                                fontStyle: 'italic',
                            }}>GOT IT</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }

    // --- RESULTS SCREEN ---
    if (stage === 'results') {
        // Find winner(s)
        const maxScore = Math.max(...players.map(p => p.score));
        const winners = players.filter(p => p.score === maxScore);
        const winnerNames = winners.map((p, idx) => p.name || `Player ${players.indexOf(p) + 1}`).join(', ');

        return (
            <View style={{ flex: 1, alignItems: 'center', paddingTop: height * 0.01 }}>
                <View style={{
                    width: width * 0.93,
                    backgroundColor: '#00242B',
                    paddingVertical: height * 0.021,
                    marginBottom: height * 0.03,
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#fff',
                    borderRadius: width * 0.1,
                }}>
                    <Text style={{
                        fontFamily: fieonontsair.friepopseibl,
                        fontSize: width * 0.055,
                        color: '#fff',
                    }}>
                        Match Over 🏆
                    </Text>
                    <Text style={{
                        fontSize: width * 0.048,
                        fontFamily: fieonontsair.friepopmmed,
                        color: '#07E5FF',
                        marginTop: height * 0.01,
                        textAlign: 'center',
                    }}>
                        Winner{winners.length > 1 ? 's' : ''}: {winnerNames}
                    </Text>
                </View>
                <ScrollView style={{
                    width: '100%',
                    alignSelf: 'center',

                }} showsVerticalScrollIndicator={false} contentContainerStyle={{
                    paddingBottom: height * 0.230435,
                    alignItems: 'center',
                }}>
                    {[...Array(rounds)].map((_, roundIdx) => (
                        <View key={roundIdx} style={{ width: width * 0.9, marginBottom: height * 0.02 }}>
                            <Text style={{
                                color: '#fff',
                                fontFamily: fieonontsair.friepopseibl,
                                fontSize: width * 0.05,
                                marginBottom: height * 0.01,
                            }}>
                                Round {roundIdx + 1}
                            </Text>
                            {players.map((p, idx) => (
                                <View key={idx} style={{
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                    borderWidth: 1,
                                    backgroundColor: '#00242B',
                                    padding: width * 0.04,
                                    marginBottom: height * 0.01,
                                    alignItems: 'center',
                                    borderColor: '#fff',
                                    borderRadius: width * 0.05,
                                }}>
                                    <View>
                                        <Text style={{
                                            color: '#fff',
                                            fontSize: width * 0.045,
                                            fontFamily: fieonontsair.friepopmmed,
                                        }}>
                                            {p.name || `Player ${idx + 1}`}
                                        </Text>
                                    </View>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: width * 0.045,
                                        fontFamily: fieonontsair.friepopmmed,
                                    }}>
                                        {playerRounds[idx]?.[roundIdx] || 0} points
                                    </Text>
                                </View>
                            ))}
                        </View>
                    ))}

                </ScrollView>
                <View style={{
                    marginTop: height * 0.04,
                    flexDirection: 'row',
                    bottom: height * 0.025,
                    width: width * 0.91,
                    justifyContent: 'space-between',
                    position: 'absolute',
                    alignSelf: 'center',
                }}>
                    <TouchableOpacity onPress={() => {
                        // Share all rounds and winner
                        let roundsText = '';
                        for (let r = 0; r < rounds; r++) {
                            roundsText += `Round ${r + 1}:\n` +
                                players.map((p, idx) =>
                                    `  ${p.name || `Player ${idx + 1}`}: ${playerRounds[idx]?.[r] || 0} points`
                                ).join('\n') + '\n';
                        }
                        Share.share({
                            message:
                                `🏆 NoveBilt Friends Game Results 🏆\n\n` +
                                roundsText +
                                `\nWinner${winners.length > 1 ? 's' : ''}: ${winnerNames}\n\nTry to beat us in the next match!`
                        })
                    }}>
                        <Image
                            source={require('../NoveBiltFriendsGameAssets/RifrensImazobrz/shaitrin.png')}
                            style={{
                                width: width * 0.14,
                                height: width * 0.14,
                                resizeMode: 'contain',
                            }}
                        />
                    </TouchableOpacity>
                    <OvereusblBtnies
                        morstlesofbuto={{
                            flex: 1,
                            marginLeft: width * 0.03,
                        }}
                        fontSize={width * 0.048}
                        onPress={() => {
                            setCurrentPlayerIdx(0);
                            setPlayers([{ name: '', score: 0 }, { name: '', score: 0 }]);
                            setPlayerRounds([[0], [0]]);
                            setCurrentRound(1);
                            setStage('setup');
                        }}
                        bumiprtext='HOME'
                    />
                </View>
            </View>
        );
    }

    return <View style={{ flex: 1, backgroundColor: '#000' }} />;
}
