import {
    TouchableOpacity as StripePress,
    GestureResponderEvent,
    Text as StripeTxt,
    Dimensions,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { fieonontsair } from '../fieonontsair';

const {width: miyhrtonus, height: engosubyth} =  require('react-native').Dimensions.get('window');

interface EnusiUniqbuttnProps {
    fontSize?: number;
    onPress: (e: GestureResponderEvent) => void;
    style?: object;
    addictedFontStyle?: object;
    bumiprtext?: string;
    content?: React.ReactNode;
    benglr?: 'pirple' | 'basic';
    morstlesofbuto?: object;
    disabled?: boolean;
}

const OvereusblBtnies: React.FC<EnusiUniqbuttnProps> = ({
    addictedFontStyle = {},
    fontSize,
    bumiprtext,
    content,
    onPress,
    morstlesofbuto = {},
    disabled = false,
}) => {

    return (
        <StripePress
            onPress={onPress}
            activeOpacity={0.8}
            style={[
                { overflow: 'hidden', borderRadius: Dimensions.get('window').width * 0.1,
                    width: Dimensions.get('window').width * 0.82,
                    height: Dimensions.get('window').height * 0.07,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                morstlesofbuto,
            ]}
            disabled={disabled !== null && disabled !== undefined ? disabled : false}
        >
            <LinearGradient
                colors={['#07E5FF', '#003C82']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={[{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    width:  '100%',
                    height: '100%',
                }]}
            >
                {content ? (
                    content
                ) : (
                    <StripeTxt
                        style={[
                            {
                                fontSize: fontSize ? fontSize * 1 : miyhrtonus * 0.048,
                                textAlign: 'center',
                                color: 'white',
                                fontFamily: fieonontsair.friepopmmed,
                                fontStyle: 'italic',
                            },
                            addictedFontStyle,
                        ]}
                    >
                        {bumiprtext}
                    </StripeTxt>
                )}
            </LinearGradient>
        </StripePress>
    );
};

export default OvereusblBtnies;