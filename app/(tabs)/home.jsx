import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Chart Configuration
const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(255, 87, 34, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

export default function HomeScreen() {
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

    // Data for the PieChart
    const data = [
        {
            name: 'Plants Added',
            population: plants.length,
            color: '#FF6384',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        },
        {
            name: 'Remaining Space',
            population: 10 - plants.length,
            color: '#E7E9EB',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15
        }
    ];

    return (
        <View className="flex justify-center items-center h-full p-4">
            <Text className="text-2xl font-bold mb-4">Welcome to SkillTree</Text>
            <Link href="/addplant">
                <Button title="Add a New Plant" />
            </Link>

            {/* PieChart to display the number of plants */}
            <View style={{ marginTop: 20 }}>
                <PieChart
                    data={data}
                    width={300}
                    height={200}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                />
                <Text className="text-lg mt-4">Total Plants Added: {plants.length}</Text>
            </View>
        </View>
    );
}
