import express, { Request, Response } from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import WebSocket, { WebSocketServer } from 'ws';
import http from 'http';


const app = express();
const port = 3000;

const server = http.createServer(app);

const wss = new WebSocketServer({ server });

app.use(cors({
	origin: 'http://localhost:5173'
}));

const path = require('path');
const db = new sqlite3.Database(path.resolve(__dirname, './database/HouseSalesSeattle.db'), (err) => {
	if (err) {
		console.error('Error opening database:', err.message);
	}
	else {
		console.log('Connected to the SQlite database');
	}
});

// Route to get SalesID:s with pagination
app.get('/SalesData', (req, res) => {
	// Set default page and limit
	const limit = parseInt(req.query.limit as string) || 10000;  // Get 10 records at a time

	const query = 'SELECT * FROM HouseSalesSeattle';

	db.all(query, [], (err, rows) => {
		if (err) {
			res.status(500).send('Error reading data from database');
			console.error(err);
			return;
		}

		if (!rows || rows.length === 0) {
			console.warn('No data found for this query');
		}

		res.json({ SalesData: rows });
	});
});

function getQueryString(value: unknown): string | undefined {
	if (Array.isArray(value)) return value[0];
	if (typeof value === 'string') return value;
	return undefined;
}

app.get('/FilterData', (req, res) => {
	const page = parseInt(req.query.page as string) || 1;
	const limit = parseInt(req.query.limit as string) || 10;  // Get 10 records at a time
	const offset = (page - 1) * limit;

	const {
		singleFamily,
		multiplex,
		townhouse,
		minRooms,
		maxRooms,
		minLivingArea,
		maxLivingArea,
		minPrice,
		maxPrice,
	} = req.query;

	let query = `
		SELECT 
			SalesID AS SalesID,
			PropertyID AS PropertyID,
			Image AS Image,
			zip_code AS zip_code,
			SalePrice AS SalePrice,
			SqMTotLiving AS SqMTotLiving,
			Bedrooms AS Bedrooms,
			PropertyType AS PropertyType,
			YrBuilt AS YrBuilt,
			SqMLot AS SqMLot
        FROM HouseSalesSeattle
	`;

	const conditions = [];
	const parameters = [];

	
	const propertyTypes = [];
	if (singleFamily === 'true') propertyTypes.push('Single Family');
	if (townhouse === 'true') propertyTypes.push('Townhouse');
	if (multiplex === 'true') propertyTypes.push('Multiplex');
	if (propertyTypes.length > 0) {
		conditions.push(`PropertyType IN (${propertyTypes.map(() => '?').join(', ')})`);
		parameters.push(...propertyTypes);
	}

	if (minRooms) {
		conditions.push('Bedrooms >= ?')
		parameters.push(getQueryString(minRooms));
	}

	if (maxRooms) {
		conditions.push('Bedrooms <= ?')
		parameters.push(getQueryString(maxRooms));
	}

	if (minLivingArea) {
		conditions.push('SqMLot >= ?')
		parameters.push(getQueryString(minLivingArea));
	}

	if (maxLivingArea) {
		conditions.push('SqMLot <= ?')
		parameters.push(getQueryString(maxLivingArea));
	}

	if (minPrice) {
		conditions.push('SalePrice >= ?')
		parameters.push(getQueryString(minPrice));
	}

	if (maxPrice) {
		conditions.push('SalePrice <= ?')
		parameters.push(getQueryString(maxPrice));
	}

	if (conditions.length > 0) {
		query += ' WHERE ' + conditions.join(' AND ');
	}

	query += ' LIMIT ? OFFSET ?';

	parameters.push(limit);
	parameters.push(offset);

	db.all(query, parameters, (err, rows) => {
		if (err) {
			console.error(err);
			res.status(500).send('Error reading data from database');
			return;
		}

		if (!rows || rows.length === 0) {
			console.warn('No data found for this query');
		}
		res.status(200).json({ FilterData: rows });
	});
});

interface Bid {
  name: string;
  email: string;
  propertyID: number;
  amount: number;
}

let currentBid = 0;

let bidHistory: Bid[] = [];

wss.on('connection', (ws) => {
	console.log('Client connected via WebSocket');
	
	ws.send(JSON.stringify({ type: 'history', bids: bidHistory }));

	ws.on('message', (message: WebSocket.RawData) => {
		console.log('Received: ', message.toString());
		
		const messageStr = typeof message === 'string' ? message : message.toString();

		try {
			const bidData = JSON.parse(messageStr);
			const newBidAmount = parseInt(bidData.amount);
			

			const currentMax = bidHistory
				.filter(b => b.propertyID === bidData.propertyID)
				.reduce((max, b) => Math.max(max, b.amount), 0);

			if(newBidAmount > currentMax) {
				bidHistory.push(bidData);
			}
			
			

			const broadcastData = JSON.stringify({ type: 'history', bids: bidHistory });

			wss.clients.forEach(client => {
				if (client.readyState === WebSocket.OPEN)
				{
					client.send(broadcastData);
				}
			});

		} catch (e) {
			console.error('Failed to parse JSON message:', e);
			// Optionally send error message back to sender
			ws.send(JSON.stringify({ type: 'error', message: 'Invalid JSON' }));
		}
	});

	ws.on('close', () => {
		console.log('Client disconnected');
	})
});


server.listen(port, () => {
	console.log(`HTTP + WebSocket server is running at http://localhost:${port}`);
});