import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '_styles';

export const GenericButton = (props: {
  text: string;
  secondary?: boolean;
  disabled?: boolean;
  onPress: () => void;
}) => {
  const Primary = () => {
    const enabledColorsScheme = [Colors.GREEN, '#01ab9d'];
    const disableColorsScheme = ['lightgray', 'gray'];
    return (
      <TouchableOpacity style={styles.signIn} onPress={props.onPress} disabled={props.disabled}>
        <LinearGradient colors={props.disabled ? disableColorsScheme : enabledColorsScheme} style={styles.signIn}>
          <Text
            style={[
              styles.textSign,
              {
                color: '#fff',
              },
            ]}
          >
            {props.text}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const Secondary = () => {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          styles.signIn,
          {
            borderColor: Colors.GREEN,
            borderWidth: 1,
            marginTop: 15,
          },
        ]}
      >
        <Text
          style={[
            styles.textSign,
            {
              color: '#009387',
            },
          ]}
        >
          Login
        </Text>
      </TouchableOpacity>
    );
  };

  return !props.secondary ? <Primary /> : <Secondary />;
};

const styles = StyleSheet.create({
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
