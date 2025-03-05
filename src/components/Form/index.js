import React, { useState } from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Vibration,
    Pressable,
    FlatList,
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
    const [imcList, setImcList] = useState([])

    function imcCalculator() {
        const heightNumber = parseFloat(height.replace(',', '.'));
        const weightNumber = parseFloat(weight);

        if (!isNaN(heightNumber) && !isNaN(weightNumber) && heightNumber > 0) {
            let totalImc = (weightNumber / (heightNumber * heightNumber)).toFixed(2);
            setImcList((arr) => [...arr, {id: new Date().getTime(), imc: totalImc}]);
            setImc(totalImc);
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
        if (imc) {
            setImc(null);
            setHeight(null);
            setWeight(null);
            setMessageImc('Preencha o peso e a altura');
            setTextButton('Calcular');
            return;
        }

        if (weight && height) {
            const calculatedImc = imcCalculator();

            if (calculatedImc) {
                setImc(calculatedImc);
                setMessageImc('Seu IMC é igual a: ');
                setTextButton('Calcular novamente');
                setErrorMessage(null)
            } else {
                setMessageImc('Valores inválidos');
                setTextButton('Calcular');
            }
        } else {
            verificationImc()
            setTextButton('Calcular');
            setMessageImc('Preencha o peso e a altura');
        }
    }

    return (
        <Pressable onPress = {Keyboard.dismiss} style={styles.formContext}>
        { !imc ? (
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                <TextInput 
                    style={styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder="Ex: 1.75"
                    keyboardType="numeric"
                />

                <Text style={styles.formLabel}>Peso</Text>
                {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                <TextInput 
                    style={styles.input}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder="Ex: 75.365"
                    keyboardType="numeric"
                />
            </View>
            ) : (
                <View style={styles.exibitionResultImc}>
                    <ResultImc messageResultImc={messageImc} resultImc={imc} />
                </View>
            )}
            <TouchableOpacity 
                style={styles.buttonCalculator}
                onPress={validationImc} >
                <Text style={styles.textButtonCalculator}>{textButton}</Text>
            </TouchableOpacity>
            <View>
                <FlatList
                    style = {styles.listImc}
                    contentContainerStyle={{ flexGrow: 1 }}
                    nestedScrollEnabled={true}
                    data = {imcList.slice().reverse()} 
                    renderItem = {({item}) => {
                        return(
                            <Text style = {styles.resultImcItem}>
                                <Text style = {styles.textResultItemList}>Resultado IMC = </Text> 
                                {item.imc}
                            </Text>
                            )
                    }}
                    keyExtractor = {(item) => item.id.toString()}
                />
            </View>
        </Pressable>

    );
}