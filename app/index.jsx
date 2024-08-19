import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router'

function App() {

    return (
        <View className="flex justify-center items-center h-full p-4">
            <StatusBar style="auto" />
            <Text className="text-3xl text-center font-bold mb-4">Welcome to Growth Tracker</Text>
            <Text>Easily see the growth of your skill plant.</Text>
            <Link
                href='/home'
                className='py-3 px-6 bg-green-400 m-4 rounded-md'
            >
                Start Growing
            </Link>
        </View>
    );
}

export default App;
