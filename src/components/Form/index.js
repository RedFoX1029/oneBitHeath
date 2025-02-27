import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import ResultImc from './ResultImc';
import styles from './style'

export default function Form() {
    const [height, setHeight] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState('Preencha o peso e a altura');
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState('Calcular');

    function imcCalculator() {
        const heightNumber = parseFloat(height);
        const weightNumber = parseFloat(weight);

        if (!isNaN(heightNumber) && !isNaN(weightNumber) && heightNumber > 0) {
            return (weightNumber / (heightNumber * heightNumber)).toFixed(2);
        }
        return null;
    }

    function validationImc() {
        if (weight && height) {
            const calculatedImc = imcCalculator();

            if (calculatedImc) {
                setImc(calculatedImc);
                setMessageImc('Seu IMC é igual a: ');
                setTextButton('Calcular novamente');
            } else {
                setImc(null);
                setMessageImc('Valores inválidos');
                setTextButton('Calcular');
            }
            return;
        }

        setImc(null);
        setTextButton('Calcular');
        setMessageImc('Preencha o peso e a altura');
    }

    return (
        <View style = {styles.formContext}>
            <View style = {styles.form}>
                <Text style = {styles.formLabel}>Altura</Text>
                <TextInput style = {styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder='Ex: 1.75'
                    keyboardType='numeric'
                />

                <Text style = {styles.formLabel}>Peso</Text>
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
        </View>
    );
}
