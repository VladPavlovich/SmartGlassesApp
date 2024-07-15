// src/api.js

import axios from 'axios';

const API_URL = 'http://<your-aws-endpoint>'; //replace with your AWS endpoint

export const getNames = async () => {
    try {
        const response = await axios.get(`${API_URL}/names/`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the names!", error);
        return [];
    }
};

export const addName = async (name) => {
    try {
        const response = await axios.post(`${API_URL}/names/`, { name });
        return response.data;
    } catch (error) {
        console.error("There was an error adding the name!", error);
    }
};

export const getTranscriptions = async () => {
    try {
        const response = await axios.get(`${API_URL}/transcriptions/`);
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the transcriptions!", error);
        return [];
    }
};

export const addTranscription = async (transcription) => {
    try {
        const response = await axios.post(`${API_URL}/transcriptions/`, { transcription });
        return response.data;
    } catch (error) {
        console.error("There was an error adding the transcription!", error);
    }
};
