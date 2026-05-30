/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const PORT = 3000;
const STORE_FILE_PATH = path.join(process.cwd(), 'data-store.json');

// Initialize default store if it doesn't exist
try {
  if (!fs.existsSync(STORE_FILE_PATH)) {
    fs.writeFileSync(STORE_FILE_PATH, JSON.stringify({ goals: [], events: [] }, null, 2), 'utf-8');
  }
} catch (err) {
  console.error('Failed to initialize data-store.json', err);
}

// Helper to read data store
function readDataStore() {
  try {
    if (fs.existsSync(STORE_FILE_PATH)) {
      const content = fs.readFileSync(STORE_FILE_PATH, 'utf-8');
      const store = JSON.parse(content);
      // Ensure goals list exists
      if (!Array.isArray(store.goals)) {
        if (store.goal) {
          store.goals = [{ ...store.goal, id: store.goal.id || 'goal-1' }];
        } else {
          store.goals = [];
        }
      }
      return store;
    }
  } catch (err) {
    console.error('Error reading data-store.json', err);
  }
  return { goals: [], events: [] };
}

// Helper to write data store
function writeDataStore(data: any) {
  try {
    fs.writeFileSync(STORE_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing to data-store.json', err);
    return false;
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Route: Get all app data (Goals & Events)
  app.get('/api/data', (req, res) => {
    const data = readDataStore();
    res.json(data);
  });

  // API Route: Save and update the list of goals (up to 3 goals)
  app.post('/api/goals', (req, res) => {
    const { goals } = req.body;
    const store = readDataStore();

    if (Array.isArray(goals)) {
      // Keep up to 3 goals, fill missing fields
      store.goals = goals.slice(0, 3).map((g: any) => ({
        id: g.id || Math.random().toString(36).substring(2, 9).toUpperCase(),
        title: (g.title || '').trim(),
        targetMonth: Number(g.targetMonth) || 12,
        targetDay: Number(g.targetDay) || 29,
        createdAt: Number(g.createdAt) || Date.now(),
        crossedDays: Array.isArray(g.crossedDays) ? g.crossedDays : []
      }));
      // Symmetrically write single "goal" for old versions backup, or delete if empty
      store.goal = store.goals[0] || null;
    }

    writeDataStore(store);
    res.json({ success: true, goals: store.goals });
  });

  // API Route: Update the single goal (backward compatible)
  app.post('/api/goal', (req, res) => {
    const { title, targetMonth, targetDay, crossedDays } = req.body;
    const store = readDataStore();
    
    if (title === null || title === undefined || title.trim() === '') {
      store.goal = null;
      store.goals = store.goals.filter((g: any) => g.id !== 'goal-1');
    } else {
      const g = {
        id: 'goal-1',
        title: title.trim(),
        targetMonth: Number(targetMonth) || 12,
        targetDay: Number(targetDay) || 29,
        createdAt: (store.goals[0] && store.goals[0].id === 'goal-1') ? store.goals[0].createdAt : Date.now(),
        crossedDays: Array.isArray(crossedDays) ? crossedDays : (store.goals[0]?.crossedDays || [])
      };
      store.goal = g;
      const idx = store.goals.findIndex((item: any) => item.id === 'goal-1');
      if (idx !== -1) {
        store.goals[idx] = g;
      } else {
        store.goals.unshift(g);
      }
    }
    
    writeDataStore(store);
    res.json({ success: true, goal: store.goal, goals: store.goals });
  });

  // API Route: Add an event
  app.post('/api/events', (req, res) => {
    const { dateKey, title, description, time } = req.body;
    if (!title || !dateKey) {
      return res.status(400).json({ error: 'Title and dateKey are required' });
    }

    const store = readDataStore();
    const newEvent = {
      id: Math.random().toString(36).substring(2, 9).toUpperCase(),
      dateKey,
      title: title.trim(),
      description: (description || '').trim(),
      time: (time || '').trim(),
      createdAt: Date.now()
    };

    store.events.push(newEvent);
    writeDataStore(store);
    res.json({ success: true, event: newEvent });
  });

  // API Route: Delete an event
  app.delete('/api/events/:id', (req, res) => {
    const { id } = req.params;
    const store = readDataStore();
    const initialLength = store.events.length;
    store.events = store.events.filter((e: any) => e.id !== id);

    if (store.events.length === initialLength) {
      return res.status(404).json({ error: 'Event not found' });
    }

    writeDataStore(store);
    res.json({ success: true });
  });

  // Serve Vite assets or compiled bundle
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
