import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';

const Pokemon = ({ name, pic, types, desc }) => {
    if (!name) {
        return null;
    }

    return (
        <View style={styles.mainDetails}>
            <Image source={{ uri: pic }} style={styles.image} resizeMode="contain" />
            <Text style={styles.mainText}>{name}</Text>

            <FlatList
                columnWrapperStyle={styles.types}
                data={types}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={[styles[item.name], styles.type]}>
                        <Text style={styles.typeText}>{item.name}</Text>
                    </View>
                )}
            />

            <View style={styles.description}>
                <Text>{desc}</Text>
            </View>
        </View>
    );
};

//
const styles = StyleSheet.create({
    mainDetails: {
        padding: 30,
        alignItems: 'center',
        color: '#ffffff'
    },
    image: {
        width: 100,
        height: 100,
    },
    mainText: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#ffffff'
    },
    description: {
        marginTop: 20,
        color: '#ffffff'
    },
    types: {
        flexDirection: 'row',
        marginTop: 20,
        color: '#ffffff'
    },
    type: {
        padding: 5,
        width: 100,
        alignItems: 'center',
        color: '#ffffff'
    },
    typeText: {
        color: '#ffffff',
    },
    normal: {
        backgroundColor: '#8a8a59',
    },
    fire: {
        backgroundColor: '#f08030',
    },
    water: {
        backgroundColor: '#6890f0',
    },
    electric: {
        backgroundColor: '#f8d030',
    },
    grass: {
        backgroundColor: '#78c850',
    },
    ice: {
        backgroundColor: '#98d8d8',
    },
    fighting: {
        backgroundColor: '#c03028',
    },
    poison: {
        backgroundColor: '#a040a0',
    },
    ground: {
        backgroundColor: '#e0c068',
    },
    flying: {
        backgroundColor: '#a890f0',
    },
    psychic: {
        backgroundColor: '#f85888',
    },
    bug: {
        backgroundColor: '#a8b820',
    },
    rock: {
        backgroundColor: '#b8a038',
    },
    ghost: {
        backgroundColor: '#705898',
    },
    dragon: {
        backgroundColor: '#7038f8',
    },
    dark: {
        backgroundColor: '#705848',
    },
    steel: {
        backgroundColor: '#b8b8d0',
    },
    fairy: {
        backgroundColor: '#e898e8',
    },
});

export default Pokemon;