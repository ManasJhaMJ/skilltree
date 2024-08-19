import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';

export default function AddPlantScreen() {
    const [plantName, setPlantName] = useState('');
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        // Load plants from local storage
        const loadPlants = async () => {
            try {
                const storedPlants = await AsyncStorage.getItem('plants');
                if (storedPlants !== null) {
                    setPlants(JSON.parse(storedPlants));
                }
            } catch (error) {
                console.error("Failed to load plants from storage", error);
            }
        };

        loadPlants();
    }, []);

    const handleAddPlant = async () => {
        if (plantName.trim()) {
            const newPlant = { name: plantName, id: Date.now().toString() };
            const updatedPlants = [...plants, newPlant];
            setPlants(updatedPlants);
            setPlantName('');

            // Save updated list to local storage
            await AsyncStorage.setItem('plants', JSON.stringify(updatedPlants));
        }
    };

    return (
        <View className="flex justify-center items-center h-full p-4">
            <Text className="text-md mb-4">Enter name to create a new Skill or See Previous.</Text>
            <View className='flex flex-row justify-between items-center w-full'>
                <TextInput
                    className="border p-2 w-[70%] mb-4"
                    placeholder="Add Skill"
                    value={plantName}
                    onChangeText={setPlantName}
                />
                <Button title="Add Plant" onPress={handleAddPlant} />
            </View>

            <Text className="text-xl mt-4">Your Plants:</Text>
            <FlatList
                data={plants}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity className="p-2 border-b">
                        <Link href={`../pages/${item.id}`} asChild>
                            <Text className="text-lg">{item.name}</Text>
                        </Link>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
