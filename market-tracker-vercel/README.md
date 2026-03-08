# Market Monitor Pro 📊

A professional, real-time market tracking application for stocks, cryptocurrencies, and forex with interactive charts and paper trading capabilities.

## Features ✨

- **Real-Time Market Tracking**: Monitor stocks, crypto, and forex with live price updates
- **Interactive Charts**: 30-day price movement visualization using Recharts
- **Paper Trading**: Practice trading with virtual $10,000 portfolio
- **Top Performers List**: View the 10 highest ROI assets in each market category
- **Professional UI**: Dark theme with smooth animations and responsive design
- **Asset Management**: Add, remove, and hide assets from your watchlist
- **Portfolio Stats**: Track total assets, portfolio changes, and averages

## Tech Stack 🛠️

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Deployment**: Vercel

## Quick Start 🚀

### Prerequisites
- Node.js 14+ and npm
- Git account (for GitHub)
- Vercel account (free)

### Local Development

1. **Clone the repository** (or download the files)
```bash
git clone <your-repo-url>
cd market-tracker
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm start
```

The app will open at `http://localhost:3000`

### Deploy to Vercel ✨

#### Option 1: Using GitHub (Recommended)

1. **Create a GitHub Repository**
   - Go to github.com
   - Click "New Repository"
   - Name it: `market-tracker`
   - Choose "Public" (for free deployment)
   - Create repository

2. **Push Your Code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/market-tracker.git
   git push -u origin main
   ```

3. **Deploy with Vercel**
   - Go to vercel.com
   - Sign up/Login with GitHub
   - Click "New Project"
   - Select your `market-tracker` repository
   - Click "Import"
   - Vercel will auto-detect React setup
   - Click "Deploy"
   - **Wait 2-3 minutes...**
   - Your app is LIVE! 🎉

#### Option 2: Direct Vercel Import

1. Go to vercel.com/new
2. Select "Continue with GitHub"
3. Paste your GitHub repository URL
4. Click "Import"
5. Deploy!

### Your Live App URL
After deployment, you'll get a URL like:
```
https://market-tracker-abc123.vercel.app
```

Share this URL with anyone to show off your app!

## Usage 📱

### Market Tabs
- **STOCKS**: Track individual stocks (AAPL, MSFT, NBTX, etc.)
- **CRYPTO**: Monitor cryptocurrencies (BTC, ETH, SOL, etc.)
- **FOREX**: Watch currency pairs (EUR/USD, GBP/USD, XAU/USD, etc.)

### View Tabs
1. **Tracker**: See all your tracked assets with real-time prices
2. **Charts**: Interactive 30-day price charts for assets
3. **Paper Trading**: Practice trading with virtual money
4. **Top Performers**: View highest ROI assets by category

### Adding Assets
1. Click "Add New [Asset Type]"
2. Enter the symbol (e.g., AAPL, BTC, EUR/USD)
3. Click "Add"

### Paper Trading
1. Go to "Paper Trading" tab
2. Click "Open Trade"
3. Enter:
   - Symbol (what you want to trade)
   - Shares/Contracts (quantity)
   - Price (entry price)
   - Type (Buy or Sell)
4. Click "Execute Trade"
5. Track your trades in the "Active Trades" section

## Adding Real Market Data 🔌

The app currently uses simulated data that updates every 3 seconds. To add REAL market data:

### For Stocks (Finnhub)
```javascript
// 1. Get free API key: finnhub.io
// 2. In src/App.jsx, add:
const FINNHUB_KEY = 'YOUR_KEY_HERE';

async function fetchRealStocks() {
  const response = await fetch(
    `https://finnhub.io/api/v1/quote?symbol=AAPL&token=${FINNHUB_KEY}`
  );
  const data = await response.json();
  return { price: data.c, change: data.d };
}
```

### For Crypto (CoinGecko - No API Key!)
```javascript
// CoinGecko is FREE and needs NO API KEY
async function fetchCrypto() {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd'
  );
  const data = await response.json();
  return data;
}
```

### For Forex (ExchangeRate-API)
```javascript
// 1. Get free API key: exchangerate-api.com
// 2. Use in your code:
const FOREX_KEY = 'YOUR_KEY_HERE';

async function fetchForex() {
  const response = await fetch(
    `https://v6.exchangerate-api.com/v6/${FOREX_KEY}/latest/USD`
  );
  const data = await response.json();
  return data.conversion_rates;
}
```

See `API_INTEGRATION_GUIDE.md` for complete setup instructions.

## Top Performers Data 🏆

### Highest ROI Stocks (2025-2026)
1. NBTX (Nanobiotix) - 705%
2. TERN (Terns Pharma) - 629%
3. CELC (Celcuity) - 661%

### Highest ROI Cryptocurrencies
1. MYX Finance - 3,358%
2. ZEC (Zcash) - 574%
3. SOL (Solana) - 317%

### Highest ROI Forex Pairs
1. XAU/USD (Gold) - 28%
2. XAG/USD (Silver) - 18%
3. USD/JPY (Dollar/Yen) - 15%

⚠️ **Disclaimer**: Past performance is NOT indicative of future results. Trade responsibly!

## Project Structure

```
market-tracker/
├── public/
│   └── index.html
├── src/
│   ├── App.jsx           # Main component
│   ├── index.js          # React entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS configuration
└── README.md            # This file
```

## Customization 🎨

### Change Colors
Edit `tailwind.config.js` to customize the color scheme

### Change Home Stock/Crypto/Forex
Edit `src/App.jsx` and modify the initial state arrays:
```javascript
const [stocks, setStocks] = useState([
  { id: 1, symbol: 'AAPL', price: 178.45, ... },
  // Add your own stocks here
]);
```

### Change Chart Colors
In `App.jsx`, find the chart rendering and modify the `stroke` color:
```javascript
<Line 
  type="monotone" 
  dataKey="price" 
  stroke="#10b981"  // Change this color
  dot={false} 
  strokeWidth={2} 
/>
```

## Performance Tips ⚡

- App updates prices every 3 seconds (changeable in useEffect)
- Charts show 30 days of data
- Paper trades stored in React state (lost on refresh - use localStorage if needed)
- Fully responsive on mobile/tablet/desktop

## Troubleshooting 🔧

### "npm install" fails
```bash
# Try deleting node_modules and reinstalling
rm -rf node_modules package-lock.json
npm install
```

### Deployment fails on Vercel
- Check that package.json is in the root directory
- Ensure all files are properly pushed to GitHub
- Check build logs on Vercel dashboard

### Charts not showing
- Make sure recharts is installed: `npm install recharts`
- Check browser console for errors

## Next Steps 🚀

1. ✅ Deploy to Vercel (you're doing this!)
2. Add real market data APIs
3. Add user authentication (Firebase/Auth0)
4. Save trades to database (Firebase/Supabase)
5. Add portfolio analytics
6. Mobile app version (React Native)

## Resources 📚

- [Finnhub API](https://finnhub.io) - Stock market data
- [CoinGecko API](https://coingecko.com) - Crypto data (FREE!)
- [ExchangeRate-API](https://exchangerate-api.com) - Forex data
- [Tailwind CSS](https://tailwindcss.com) - Styling docs
- [Recharts](https://recharts.org) - Chart documentation
- [Vercel Docs](https://vercel.com/docs) - Deployment help

## License

This project is open source and available under the MIT License.

## Support

Have questions or issues? 
- Check the troubleshooting section above
- Review the API Integration Guide
- Check Vercel deployment logs

---

**Happy Trading!** 📈

Built with React, Tailwind CSS, and deployed on Vercel.
