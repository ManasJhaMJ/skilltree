import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';

// Import plant images
import plant0 from '../../assets/plants/plant0.png';
import plant1 from '../../assets/plants/plant1.png';
import plant2 from '../../assets/plants/plant2.png';
import plant3 from '../../assets/plants/plant3.png';
import plant4 from '../../assets/plants/plant4.png';
import plant5 from '../../assets/plants/plant5.png';
import plant6 from '../../assets/plants/plant6.png';
import plant7 from '../../assets/plants/plant7.png';


function PlantTrackerScreen() {
    const { id } = useLocalSearchParams(); // useLocalSearchParams is better suited for dynamic routes
    const [uploads, setUploads] = useState([]);
    const [plantName, setPlantName] = useState('');
    const [plantImage, setPlantImage] = useState(plant0);

    const plantImages = [plant0, plant1, plant2, plant3, plant4, plant5, plant6, plant7];

    useEffect(() => {
        const loadPlantData = async () => {
            try {
                const storedPlants = await AsyncStorage.getItem('plants');
                if (storedPlants !== null) {
                    const plants = JSON.parse(storedPlants);
                    const plant = plants.find(p => p.id === id);
                    if (plant) {
                        setPlantName(plant.name);
                    }

                    const storedUploads = await AsyncStorage.getItem(id);
                    if (storedUploads !== null) {
                        const parsedUploads = JSON.parse(storedUploads);
                        setUploads(parsedUploads);

                        const nextPlantImageIndex = Math.floor(parsedUploads.length / 2) % plantImages.length;
                        setPlantImage(plantImages[nextPlantImageIndex]);
                    }
                }
            } catch (error) {
                console.error("Failed to load plant data from storage", error);
            }
        };

        if (id) {
            loadPlantData();
        }
    }, [id]);

    const saveUploadsToStorage = async (newUploads) => {
        try {
            await AsyncStorage.setItem(id, JSON.stringify(newUploads));
        } catch (error) {
            console.error("Failed to save uploads to storage", error);
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const newUploads = [...uploads, result.uri];
            setUploads(newUploads);

            saveUploadsToStorage(newUploads);

            if (newUploads.length % 2 === 0) {
                const nextPlantImageIndex = Math.floor(newUploads.length / 2) % plantImages.length;
                setPlantImage(plantImages[nextPlantImageIndex]);
            }
        }
    };

    return (
        <View className="flex justify-center items-center h-full p-4">
            <Text className="text-2xl font-bold mb-4">Tracking: {plantName}</Text>
            <Image source={plantImage} style={{ width: 200, height: 200, marginBottom: 20 }} />
            <Button title="Upload Image/Video" onPress={pickImage} />

            <FlatList
                data={uploads}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                    <View className="flex-row justify-start items-center mt-2">
                        <Text className="text-base mr-2">Upload {index + 1}:</Text>
                        <Image source={{ uri: item }} style={{ width: 50, height: 50, marginLeft: 10 }} />
                    </View>
                )}
            />
        </View>
    );
}

export default PlantTrackerScreen;
