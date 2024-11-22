import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, ImageBackground } from "react-native";
import { auth } from "../firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
 
export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState(null);
 
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user);
            if (initializing) setInitializing(false);
        });
 
        return unsubscribe; 
    }, [initializing]);
 
    function logar() {
        signInWithEmailAndPassword(auth, email, senha)
            // .then(() => {
            //    // navigation.navigate('Rotas', { email });
            // })
            .catch((error) => {
                let message = 'Erro ao realizar login. Tente novamente!';
                if (error.code === 'auth/invalid-email') {
                    message = 'O email informado é inválido. Verifique e tente novamente!';
                } else if (error.code === 'auth/wrong-password') {
                    message = 'Senha incorreta. Por favor, verifique sua senha!';
                } else if (error.code === 'auth/user-not-found') {
                    message = 'Nenhum usuário encontrado com esse email!';
                }
                
                Alert.alert("Erro", message, [{ text: "OK", style: "default" }]);
            });
    }
 
    return (
    <ImageBackground 
      source={require('./../assets/login.jpg')} 
      style={estilo.backgroundImage}
    >
        <View style={estilo.container}>
            
            <TextInput
                style={estilo.input}
                onChangeText={setEmail}
                value={email}
                placeholder="Digite o email"
            />
            <TextInput
                style={estilo.input}
                secureTextEntry={true}
                onChangeText={setSenha}
                placeholder="Digite a senha"
            />
            <TouchableOpacity style={estilo.botaoLogar} onPress={logar}>
                <Text style={estilo.textoBotaoLogar}>Logar</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    );
}
 
const estilo = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        alignItems: 'center',
        justifyContent: 'center',
      },
    container:{
        alignItems:'center',
        marginTop: 500
        },
    input: {
        width: 250,
        height: 30,
        backgroundColor: '#5f5c',
        marginVertical: 10,
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: 25,
    },
    botaoLogar: {
        width: 200,
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00008B',
        marginVertical: 40,
    },
    textoBotaoLogar: {
        fontSize: 25,
        color: '#fff',
    },
});