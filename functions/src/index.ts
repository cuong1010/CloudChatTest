/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.database();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

// Cloud Function to push chat message
export const pushChat = onRequest(async (req, res) => {
  try {
    const { gameId, userAddress, content } = req.body;

    // Validate input
    if (!gameId || !userAddress || !content) {
      res.status(400).send({
        error: 'Missing required fields: gameId, userAddress, or content.',
      });
    }

    // Create chat message
    const chatMessage = {
      userAddress,
      content,
      timestamp: Date.now(),
    };

    // Write chat message to Realtime Database
    await db.ref(`game_chats/${gameId}`).push(chatMessage);

    res.status(200).send({ message: 'Chat message pushed successfully.' });
  } catch (error) {
    console.error('Error pushing chat message:', error);
    res.status(500).send({ error: 'Internal server error.' });
  }
});

// Cloud Function to get chat messages by gameId
export const getChatMessages = onRequest(async (req, res) => {
  try {
    const { gameId } = req.query;

    // Validate input
    if (!gameId) {
      res
        .status(400)
        .send({ error: 'Missing required query parameter: gameId.' });
    }

    // Retrieve chat messages for the given gameId
    const chatSnapshot = await db.ref(`game_chats/${gameId}`).once('value');

    if (!chatSnapshot.exists()) {
      res
        .status(404)
        .send({ error: 'No messages found for the specified gameId.' });
    }

    const messages = chatSnapshot.val();

    res.status(200).send({ messages });
  } catch (error) {
    console.error('Error getting chat messages:', error);
    res.status(500).send({ error: 'Internal server error.' });
  }
});
