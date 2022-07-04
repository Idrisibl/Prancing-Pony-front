import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:3042' });

export const userChats = (id) => API.get(`/chat/${id}`)

export const getUser = (userId) => API.get(`users/${userId}`)

export const getMessages = (id) => API.get(`messages/${id}`)

export const addMessage = (data) => API.post('/messages', data)