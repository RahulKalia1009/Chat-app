<template>
    <div class="chat-app">
      <h1>Chat App</h1>
  
      <!-- Message Display -->
      <div class="messages">
        <div v-if="messages.length">
          <div v-for="msg in messages" :key="msg.id" class="message">
            <strong>{{ msg.user }}:</strong> {{ msg.message }}
          </div>
        </div>
        <div v-else>
          <p>No messages yet. Start the conversation!</p>
        </div>
      </div>
  
      <!-- Input for Sending Messages -->
      <div class="message-input">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Type your message..."
          class="message-box"
        />
        <button @click="sendMessage" :disabled="!newMessage.trim()">Send</button>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from "../firebase"; // Import Firestore instance
  import {
    collection,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    serverTimestamp,
  } from "firebase/firestore";
  
  export default {
    name: "ChatApp", // Multi-word name to avoid lint errors
    data() {
      return {
        messages: [], // List of chat messages
        newMessage: "", // New message input
        user: "User" + Math.floor(Math.random() * 1000), // Generate random username
      };
    },
    methods: {
      async sendMessage() {
        // Prevent empty messages
        if (!this.newMessage.trim()) return;
  
        try {
          // Add new message to Firestore
          await addDoc(collection(db, "messages"), {
            message: this.newMessage,
            user: this.user,
            timestamp: serverTimestamp(),
          });
          this.newMessage = ""; // Clear input field
        } catch (error) {
          console.error("Error sending message: ", error);
        }
      },
    },
    created() {
      // Set up real-time listener for messages
      const messagesQuery = query(collection(db, "messages"), orderBy("timestamp"));
  
      onSnapshot(messagesQuery, (snapshot) => {
        this.messages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      });
    },
  };
  </script>
  
  <style scoped>
  .chat-app {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  .messages {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
  }
  
  .message {
    padding: 5px 0;
  }
  
  .message-input {
    display: flex;
    gap: 10px;
  }
  
  .message-box {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
  </style>
  