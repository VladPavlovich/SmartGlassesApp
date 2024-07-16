// src/api.js

import axios from 'axios';

const API_URL = 'http://18.118.28.169:8000'; // Corrected URL

export const getNames = async () => {
    try {
        const response = await axios.get(`${API_URL}/names/`);
        console.log("Fetched names:", response.data);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the names!", error);
        console.error("Error details:", error.toJSON());
        return [];
    }
};

export const addName = async (name) => {
    try {
        const response = await axios.post(`${API_URL}/names/`, { name });
        console.log("Added name:", response.data);
        return response.data;
    } catch (error) {
        console.error("There was an error adding the name!", error);
        console.error("Error details:", error.toJSON());
    }
};

export const getTranscriptions = async () => {
    try {
        const response = await axios.get(`${API_URL}/transcriptions/`);
        console.log("Fetched transcriptions:", response.data);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the transcriptions!", error);
        console.error("Error details:", error.toJSON());
        return [];
    }
};

export const addTranscription = async (transcription) => {
    try {
        const response = await axios.post(`${API_URL}/transcriptions/`, { transcription });
        console.log("Added transcription:", response.data);
        return response.data;
    } catch (error) {
        console.error("There was an error adding the transcription!", error);
        console.error("Error details:", error.toJSON());
    }
};
