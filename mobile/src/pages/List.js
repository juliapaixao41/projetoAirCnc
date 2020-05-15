import React, { useState, useEffect } from 'react';
import {SafeAreaView, ScrollView , StyleSheet, Image, AsyncStorage, Text} from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png'

export default function List(){
    const[tecnologia, setTecnologias] = useState([]);

   useEffect(() => {
    AsyncStorage.getItem('tecnologia').then(storagedTecnologia => {
            const tecnologiasArray = storagedTecnologia.split(',').map(tecnologia => tecnologia.trim());

           setTecnologias(tecnologiasArray);
        })
    }, []); 
    
    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={logo} />
           
            <ScrollView>
                {tecnologia.map(tecnologia => <SpotList key={tecnologia} tecnologia={tecnologia}/>)}
            </ScrollView>
            
        </SafeAreaView>
    ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logo: {
        height: 32,
        resizeMode: "contain",
        alignSelf: 'center',
        marginTop: 10
    },

});