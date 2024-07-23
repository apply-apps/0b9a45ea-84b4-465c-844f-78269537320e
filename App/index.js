// Filename: index.js
// Combined code from all files

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, ScrollView, ActivityIndicator, View, FlatList, Button } from 'react-native';
import axios from 'axios';

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sports Betting</Text>
            <ScrollView>
                <MatchList />
            </ScrollView>
        </SafeAreaView>
    );
};

const MatchItem = ({ match }) => (
    <View style={styles.matchContainer}>
        <Text style={styles.matchText}>{match.team1} vs {match.team2}</Text>
        <View style={styles.buttonContainer}>
            <Button title="Bet on Team 1" />
            <Button title="Bet on Team 2" />
        </View>
    </View>
);

const MatchList = () => {
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMatches() {
            try {
                const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant. Please provide match data for sports betting."
                        },
                        {
                            role: "user",
                            content: "Please provide upcoming sports matches data."
                        }
                    ],
                    model: "gpt-4o"
                });
                const { data } = response;
                const result = data.response;
                const matchData = JSON.parse(result);
                setMatches(matchData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        fetchMatches();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <FlatList
            data={matches}
            renderItem={({ item }) => <MatchItem match={item} />}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
    matchContainer: {
        padding: 15,
        margin: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    matchText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});

export default App;