import { createClient } from '@supabase/supabasejs';
import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Load environment variables
config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// Database functions
const db = {
  async getUserByWallet(walletAddress: string) {
    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('wallet_address', walletAddress)
      .single();
    if (error) throw error;
    return data;
  },
  async createPrediction(predictionData: any) {
    const { data, error } = await supabase
      .from('prediction')
      .insert(predictionData)
      .select();
    if (error) throw error;
    return data;
  }
};

// API Routes
app.get('/api/user/:walletAddress', async (req, res) => {
  try {
    const user = await db.getUserByWallet(req.params.walletAddress);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/prediction', async (req, res) => {
  try {
    const prediction = await db.createPrediction(req.body);
    res.status(201).json(prediction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`API base URL: http://localhost:${port}/api`);
});

export default app;
