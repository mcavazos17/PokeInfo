import React, { Component } from 'react';
import {
    SafeAreaView,
    View,
    TextInput,
    Alert,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    StatusBar,
    Text
} from 'react-native';

import axios from 'axios';
import pokemon from 'pokemon';
import Pokemon from './components/Pokemon';

const POKE_API_BASE_URL = 'https://pokeapi.co/api/v2';

export default class Main extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: false, // decides whether to show the activity indicator or not
            searchInput: '', // the currently input text
            name: '', // Pokémon name
            pic: '', // Pokémon image URL
            types: [], // Pokémon types array
            desc: '', // Pokémon description
        };
    }

    render() {
        const { name, pic, types, desc, isLoading } = this.state;
        return (
            <SafeAreaView style={styles.wrapper}>
                <StatusBar
                    backgroundColor="#e94560"
                    barStyle="light-content"
                />
                <View style={styles.container}>
                    <View style={styles.headContainer}>
                        <View style={styles.textInputContainer}>
                            <TextInput
                                style={styles.textInput}
                                onChangeText={(searchInput) => this.setState({ searchInput })}
                                value={this.state.searchInput}
                                placeholder="Search Pokémon"
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                onPress={this.searchPokemon}
                                style={styles.searchButton}
                            >
                                <Text style={styles.searchText}>Search</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.mainContainer}>
                        {isLoading && <ActivityIndicator size="large" color="#e94560" />}

                        {!isLoading && (
                            <Pokemon name={name} pic={pic} types={types} desc={desc} />
                        )}
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    searchPokemon = async () => {
        try {
            const pokemonID = pokemon.getId(this.state.searchInput);

            this.setState({
                isLoading: true,
            });

            const { data: pokemonData } = await axios.get(
                `${POKE_API_BASE_URL}/pokemon/${pokemonID}`
            );
            const { data: pokemonSpecieData } = await axios.get(
                `${POKE_API_BASE_URL}/pokemon-species/${pokemonID}`
            );

            const { name, sprites, types } = pokemonData;
            const { flavor_text_entries } = pokemonSpecieData;

            this.setState({
                name,
                pic: sprites.front_default,
                types: this.getTypes(types),
                desc: this.getDescription(flavor_text_entries),
                isLoading: false,
            });
        } catch (err) {
            Alert.alert('Error', 'Pokémon not found');
        }
    };

    getTypes = (types) =>
        types.map(({ slot, type }) => ({
            id: slot,
            name: type.name,
        }));

    getDescription = (entries) =>
        entries.find((item) => item.language.name === 'en').flavor_text;
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#1a1a2e'
    },
    headContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 100,
    },
    textInputContainer: {
        flex: 2,
    },
    buttonContainer: {
        flex: 1,
    },
    mainContainer: {
        flex: 9,
    },
    textInput: {
        height: 35,
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#eaeaea',
        padding: 5,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    searchButton: {
        height: 35,
        width: 100,
        backgroundColor: '#e94560',
        justifyContent: 'center',
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10
    },
    searchText: {
        color: '#ffffff',
        alignSelf: 'center'
    }
});