import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors, Common, Typography } from '_styles';
import { AuthContext } from '_contexts';
const LandingScreen = ({ navigation }: any) => {
  const { loginState } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[Common.card, { borderRadius: 100 }]}>
          {!!loginState.firstName?.charAt(0) && (
            <Animatable.View
              animation="pulse"
              iterationCount="infinite"
              style={[styles.logo, { justifyContent: 'center', alignItems: 'center' }]}
            >
              <Text
                style={{ fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 58 }}
              >{`${loginState.firstName?.charAt(0)} ${loginState.lastName?.charAt(0)}`}</Text>
            </Animatable.View>
          )}
        </View>
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: Colors.WHITE,
          },
        ]}
        animation="fadeInUpBig"
      >
        <Text
          style={[
            styles.title,
            {
              color: Colors.BLACK,
            },
          ]}
        >
          {`Bine ai venit ${loginState.firstName} ${loginState.lastName}!`}
        </Text>
        <Text style={styles.text}>{''}</Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <LinearGradient colors={[Colors.GREEN, '#01ab9d']} style={styles.signIn}>
              <Text style={styles.textSign}>Continuă</Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default LandingScreen;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GREEN,
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 100,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
