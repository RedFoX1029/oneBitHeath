import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Vibration,
    Pressable,
    Keyboard
    } from 'react-native';
import ResultImc from './ResultImc';
import styles from './style'

export default function Form(props) {
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState('Preencha o peso e a altura');
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState('Calcular');
    const [errorMessage, setErrorMessage] = useState(null)

    function imcCalculator() {
        const heightNumber = parseFloat(height.replace(',', '.'));
        const weightNumber = parseFloat(weight);

        if (!isNaN(heightNumber) && !isNaN(weightNumber) && heightNumber > 0) {
            return (weightNumber / (heightNumber * heightNumber)).toFixed(2);
        }
        return null;
    }

    function verificationImc() {
        if (imc == null) {
            Vibration.vibrate(20);
            setErrorMessage('Campo obrigatório*')
        }
    }

    function validationImc() {
        if (weight && height) {
            const calculatedImc = imcCalculator();

            if (calculatedImc) {
                setImc(calculatedImc);
                setMessageImc('Seu IMC é igual a: ');
                setTextButton('Calcular novamente');
                setErrorMessage(null)
            } else {
                setImc(null);
                setMessageImc('Valores inválidos');
                setTextButton('Calcular');
            }
            return;
        }
        verificationImc()
        setImc(null);
        setTextButton('Calcular');
        setMessageImc('Preencha o peso e a altura');
    }

    return (
        <Pressable onPress = {Keyboard.dismiss} style = {styles.formContext}>
            <View style = {styles.form}>
                <Text style = {styles.formLabel}>Altura</Text>
                <Text style = {styles.errorMessage}>{errorMessage}</Text>
                <TextInput style = {styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder='Ex: 1.75'
                    keyboardType='numeric'
                />

                <Text style = {styles.formLabel}>Peso</Text>
                <Text style = {styles.errorMessage}>{errorMessage}</Text>
                <TextInput style = {styles.input}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder='Ex: 75.365'
                    keyboardType='numeric'
                />
            <TouchableOpacity 
                style = {styles.buttonCalculator}
                onPress = {() => {
                    validationImc()
                    }} >
                <Text style = {styles.textButtonCalculator}>{textButton}</Text>
            </TouchableOpacity>
            </View>
            <ResultImc messageResultImc={messageImc} resultImc={imc} />

        </Pressable>
    );
}