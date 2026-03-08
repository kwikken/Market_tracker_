import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Plus, X, Eye, EyeOff, DollarSign, BitcoinIcon, Globe, BarChart3, ShoppingCart, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function App() {
  const [activeTab, setActiveTab] = useState('stocks');
  const [activeView, setActiveView] = useState('tracker');
  const [stocks, setStocks] = useState([
    { id: 1, symbol: 'AAPL', price: 178.45, change: 2.34, changePercent: 1.33, volume: 52300000 },
    { id: 2, symbol: 'MSFT', price: 412.78, change: -1.22, changePercent: -0.30, volume: 18500000 },
    { id: 3, symbol: 'NBTX', price: 245.67, change: 15.89, changePercent: 6.92, volume: 8900000 },
  ]);
  const [cryptos, setCryptos] = useState([
    { id: 1, symbol: 'BTC', price: 68234.50, change: 1245.67, changePercent: 1.86, volume: 28500000000 },
    { id: 2, symbol: 'ETH', price: 3567.89, change: -45.23, changePercent: -1.25, volume: 15200000000 },
    { id: 3, symbol: 'SOL', price: 187.45, change: 8.34, changePercent: 4.66, volume: 2100000000 },
  ]);
  const [forexPairs, setForexPairs] = useState([
    { id: 1, symbol: 'EUR/USD', price: 1.0876, change: 0.0034, changePercent: 0.31, volume: 2500000000000 },
    { id: 2, symbol: 'GBP/USD', price: 1.2678, change: -0.0012, changePercent: -0.09, volume: 1800000000000 },
    { id: 3, symbol: 'XAU/USD', price: 2134.45, change: 45.67, changePercent: 2.19, volume: 150000000000 },
  ]);
  
  const [newItem, setNewItem] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [hiddenAssets, setHiddenAssets] = useState(new Set());
  const [priceHistory, setPriceHistory] = useState({});
  const [paperTrades, setPaperTrades] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(10000);
  const [showTradeForm, setShowTradeForm] = useState(false);
  const [tradeForm, setTradeForm] = useState({ symbol: '', shares: '', price: '', type: 'buy' });

  // Initialize price history
  useEffect(() => {
    const history = {};
    const generateHistory = (items) => {
      items.forEach(item => {
        history[item.symbol] = Array.from({ length: 30 }, (_, i) => ({
          time: `Day ${i - 29}`,
          price: item.price + (Math.random() - 0.5) * 100,
        }));
      });
    };
    generateHistory([...stocks, ...cryptos, ...forexPairs]);
    setPriceHistory(history);
  }, []);

  // Simulate price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const updatePrices = (items) => {
        return items.map(item => {
          const change = (Math.random() - 0.5) * 2;
          const newPrice = Math.max(item.price + change, item.price * 0.95);
          const changePercent = ((change / item.price) * 100).toFixed(2);
          return { ...item, price: parseFloat(newPrice.toFixed(2)), change: parseFloat(change.toFixed(2)), changePercent };
        });
      };
      setStocks(prev => updatePrices(prev));
      setCryptos(prev => updatePrices(prev));
      setForexPairs(prev => updatePrices(prev));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const topPerformers = {
    stocks: [
      { rank: 1, symbol: 'NBTX', name: 'Nanobiotix', roi: '705%', category: 'Biotech' },
      { rank: 2, symbol: 'TERN', name: 'Terns Pharmaceuticals', roi: '629%', category: 'Biotech' },
      { rank: 3, symbol: 'CELC', name: 'Celcuity', roi: '661%', category: 'Biotech' },
      { rank: 4, symbol: 'SNDK', name: 'Sandisk', roi: '570%', category: 'Storage' },
      { rank: 5, symbol: 'RHLD', name: 'Resolute Holdings', roi: '600%', category: 'Management' },
      { rank: 6, symbol: 'MICRON', name: 'Micron Technology', roi: '240%', category: 'Semiconductors' },
      { rank: 7, symbol: 'WDC', name: 'Western Digital', roi: '306%', category: 'Storage' },
      { rank: 8, symbol: 'STX', name: 'Seagate Technology', roi: '225%', category: 'Storage' },
      { rank: 9, symbol: 'GE', name: 'GE Aerospace', roi: '94%', category: 'Aerospace' },
      { rank: 10, symbol: 'RTX', name: 'RTX Corporation', roi: '63%', category: 'Defense' },
    ],
    crypto: [
      { rank: 1, symbol: 'MYX', name: 'MYX Finance', roi: '3,358%', category: 'DeFi' },
      { rank: 2, symbol: 'ZEC', name: 'Zcash', roi: '574%', category: 'Privacy' },
      { rank: 3, symbol: 'RAIN', name: 'Rain Protocol', roi: '185%', category: 'Prediction Markets' },
      { rank: 4, symbol: 'ZBCN', name: 'Zebec Network', roi: '164%', category: 'RWA/Payments' },
      { rank: 5, symbol: 'ZORA', name: 'Zora', roi: '138%', category: 'SocialFi' },
      { rank: 6, symbol: 'XMR', name: 'Monero', roi: '116%', category: 'Privacy' },
      { rank: 7, symbol: 'OKB', name: 'OKX Token', roi: '115%', category: 'Exchange' },
      { rank: 8, symbol: 'XAUT', name: 'Tether Gold', roi: '70%', category: 'Stablecoin' },
      { rank: 9, symbol: 'BCH', name: 'Bitcoin Cash', roi: '30%', category: 'Bitcoin Spinoff' },
      { rank: 10, symbol: 'SOL', name: 'Solana', roi: '317%', category: 'Layer 1' },
    ],
    forex: [
      { rank: 1, symbol: 'XAU/USD', name: 'Gold/USD', roi: '28%', category: 'Precious Metal' },
      { rank: 2, symbol: 'XAG/USD', name: 'Silver/USD', roi: '18%', category: 'Precious Metal' },
      { rank: 3, symbol: 'USD/JPY', name: 'Dollar/Yen', roi: '15%', category: 'Major Pair' },
      { rank: 4, symbol: 'GBP/USD', name: 'Pound/Dollar', roi: '12%', category: 'Major Pair' },
      { rank: 5, symbol: 'EUR/USD', name: 'Euro/Dollar', roi: '8%', category: 'Major Pair' },
      { rank: 6, symbol: 'NZD/USD', name: 'Kiwi/Dollar', roi: '6%', category: 'Major Pair' },
      { rank: 7, symbol: 'AUD/USD', name: 'Aussie/Dollar', roi: '5%', category: 'Major Pair' },
      { rank: 8, symbol: 'USD/CHF', name: 'Dollar/Swiss Franc', roi: '3%', category: 'Major Pair' },
      { rank: 9, symbol: 'USD/CAD', name: 'Dollar/Loonie', roi: '2%', category: 'Major Pair' },
      { rank: 10, symbol: 'EUR/GBP', name: 'Euro/Pound', roi: '1%', category: 'Cross Pair' },
    ],
  };

  const addItem = (symbol) => {
    if (!symbol.trim()) return;
    const newEntry = {
      id: Date.now(),
      symbol: symbol.toUpperCase(),
      price: (Math.random() * 1000 + 10),
      change: (Math.random() - 0.5) * 100,
      changePercent: (Math.random() - 0.5) * 10,
      volume: Math.floor(Math.random() * 100000000),
    };
    if (activeTab === 'stocks') setStocks([...stocks, newEntry]);
    else if (activeTab === 'crypto') setCryptos([...cryptos, newEntry]);
    else setForexPairs([...forexPairs, newEntry]);
    setNewItem('');
    setShowAddForm(false);
  };

  const removeItem = (id) => {
    if (activeTab === 'stocks') setStocks(stocks.filter(item => item.id !== id));
    else if (activeTab === 'crypto') setCryptos(cryptos.filter(item => item.id !== id));
    else setForexPairs(forexPairs.filter(item => item.id !== id));
  };

  const toggleHidden = (id) => {
    const newHidden = new Set(hiddenAssets);
    newHidden.has(id) ? newHidden.delete(id) : newHidden.add(id);
    setHiddenAssets(newHidden);
  };

  const executeTrade = () => {
    if (!tradeForm.symbol || !tradeForm.shares || !tradeForm.price) return;
    const tradeValue = parseFloat(tradeForm.shares) * parseFloat(tradeForm.price);
    if (tradeForm.type === 'buy' && tradeValue > portfolioValue) {
      alert('Insufficient funds!');
      return;
    }
    setPaperTrades([...paperTrades, {
      id: Date.now(),
      ...tradeForm,
      shares: parseFloat(tradeForm.shares),
      price: parseFloat(tradeForm.price),
      value: tradeValue,
      date: new Date().toLocaleString(),
    }]);
    if (tradeForm.type === 'buy') setPortfolioValue(portfolioValue - tradeValue);
    else setPortfolioValue(portfolioValue + tradeValue);
    setTradeForm({ symbol: '', shares: '', price: '', type: 'buy' });
    setShowTradeForm(false);
  };

  const currentData = activeTab === 'stocks' ? stocks : activeTab === 'crypto' ? cryptos : forexPairs;
  const totalChange = currentData.reduce((sum, item) => sum + parseFloat(item.change), 0);
  const totalChangePercent = currentData.length > 0 ? (totalChange / currentData.reduce((sum, item) => sum + parseFloat(item.price), 1)) * 100 : 0;

  const renderTracker = () => (
    <div className="space-y-3">
      {currentData.filter(item => !hiddenAssets.has(item.id)).map((item) => (
        <div key={item.id} className="group bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-4 hover:border-slate-600 transition-all hover:shadow-lg hover:shadow-blue-500/10">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <div className="font-bold text-lg text-white">{item.symbol}</div>
                <div className={`text-sm font-semibold px-3 py-1 rounded-full ${parseFloat(item.changePercent) >= 0 ? 'bg-green-900/40 text-green-400' : 'bg-red-900/40 text-red-400'}`}>
                  {parseFloat(item.changePercent) >= 0 ? '+' : ''}{parseFloat(item.changePercent).toFixed(2)}%
                </div>
              </div>
              <div className="text-2xl font-bold text-white mt-2">
                ${parseFloat(item.price).toFixed(2)}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`text-right ${parseFloat(item.change) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                <div className="text-sm font-semibold">{parseFloat(item.change) >= 0 ? '+' : ''}{parseFloat(item.change).toFixed(2)}</div>
                {parseFloat(item.change) >= 0 ? <TrendingUp className="w-4 h-4 ml-auto" /> : <TrendingDown className="w-4 h-4 ml-auto" />}
              </div>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => toggleHidden(item.id)} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
                  {hiddenAssets.has(item.id) ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                </button>
                <button onClick={() => removeItem(item.id)} className="p-2 hover:bg-red-900/30 rounded-lg transition-colors">
                  <X className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCharts = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {currentData.slice(0, 4).map((item) => (
        <div key={item.id} className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">{item.symbol}</h3>
          {priceHistory[item.symbol] && (
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={priceHistory[item.symbol]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" style={{fontSize: '12px'}} />
                <YAxis stroke="#94a3b8" style={{fontSize: '12px'}} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569', borderRadius: '8px', color: '#fff' }} />
                <Line type="monotone" dataKey="price" stroke={parseFloat(item.changePercent) >= 0 ? '#10b981' : '#ef4444'} dot={false} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      ))}
    </div>
  );

  const renderPaperTrading = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg p-6 text-white">
        <div className="text-sm opacity-90">Portfolio Value</div>
        <div className="text-4xl font-bold mt-2">${portfolioValue.toFixed(2)}</div>
        <div className="mt-4 text-sm opacity-75">Active Trades: {paperTrades.length}</div>
      </div>

      {showTradeForm && (
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Execute Trade</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" value={tradeForm.symbol} onChange={(e) => setTradeForm({...tradeForm, symbol: e.target.value.toUpperCase()})} className="col-span-2 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500" placeholder="Symbol (e.g., AAPL)" />
              <input type="number" value={tradeForm.shares} onChange={(e) => setTradeForm({...tradeForm, shares: e.target.value})} className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500" placeholder="Shares" />
              <input type="number" step="0.01" value={tradeForm.price} onChange={(e) => setTradeForm({...tradeForm, price: e.target.value})} className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white placeholder-slate-500" placeholder="Price" />
              <select value={tradeForm.type} onChange={(e) => setTradeForm({...tradeForm, type: e.target.value})} className="col-span-2 bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white">
                <option>buy</option>
                <option>sell</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={executeTrade} className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded font-bold hover:shadow-lg transition-all">Execute Trade</button>
              <button onClick={() => {setShowTradeForm(false); setTradeForm({symbol: '', shares: '', price: '', type: 'buy'});}} className="px-4 py-2 hover:bg-slate-700 rounded">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {!showTradeForm && (
        <button onClick={() => setShowTradeForm(true)} className="w-full px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-dashed border-slate-700 rounded-lg text-slate-300 hover:text-white transition-all font-semibold flex items-center justify-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Open Trade
        </button>
      )}

      {paperTrades.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Active Trades</h3>
          <div className="space-y-3">
            {paperTrades.map((trade) => (
              <div key={trade.id} className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-white">{trade.symbol} - {trade.shares} shares</div>
                    <div className="text-sm text-slate-400">Entry: ${parseFloat(trade.price).toFixed(2)} | Value: ${parseFloat(trade.value).toFixed(2)}</div>
                    <div className="text-xs text-slate-500 mt-1">{trade.date}</div>
                  </div>
                  <div className={`text-sm font-bold px-3 py-1 rounded ${trade.type === 'buy' ? 'bg-blue-900/40 text-blue-400' : 'bg-green-900/40 text-green-400'}`}>
                    {trade.type.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderTopPerformers = () => (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <Award className="w-6 h-6 text-yellow-400" />
        Top {activeTab === 'stocks' ? 'Stocks' : activeTab === 'crypto' ? 'Cryptocurrencies' : 'Forex Pairs'} by ROI
      </h3>
      <div className="space-y-3">
        {topPerformers[activeTab].map((asset) => (
          <div key={asset.rank} className="bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg p-4 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center font-bold text-slate-900">
                  {asset.rank}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white text-lg">{asset.symbol}</div>
                  <div className="text-sm text-slate-400">{asset.name}</div>
                  <div className="text-xs text-slate-500 mt-1">{asset.category}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {asset.roi}
                </div>
                <div className="text-xs text-slate-400 mt-1">YTD Return</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
        <p className="text-sm text-blue-200">⚠️ <strong>Disclaimer:</strong> Past performance is not indicative of future results. Always conduct thorough research.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="border-b border-slate-800 backdrop-blur-sm bg-slate-950/50 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                MARKET MONITOR PRO
              </h1>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-1">TOTAL ASSETS</div>
                <div className="text-2xl font-bold">{currentData.length}</div>
              </div>
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-1">PORTFOLIO CHANGE</div>
                <div className={`text-2xl font-bold ${totalChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalChange >= 0 ? '+' : ''}{totalChange.toFixed(2)}
                </div>
              </div>
              <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-4">
                <div className="text-sm text-slate-400 mb-1">AVG CHANGE</div>
                <div className={`text-2xl font-bold ${totalChangePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {totalChangePercent >= 0 ? '+' : ''}{totalChangePercent.toFixed(2)}%
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: 'stocks', label: 'STOCKS', icon: DollarSign },
                { id: 'crypto', label: 'CRYPTO', icon: BitcoinIcon },
                { id: 'forex', label: 'FOREX', icon: Globe },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-2 px-4 md:px-6 py-3 rounded-lg font-bold text-sm md:text-base transition-all ${
                    activeTab === id
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-slate-800/50 text-slate-400 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { id: 'tracker', label: 'Tracker' },
                { id: 'charts', label: 'Charts' },
                { id: 'paper-trading', label: 'Paper Trading' },
                { id: 'top-performers', label: 'Top Performers' },
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveView(id)}
                  className={`px-3 md:px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    activeView === id
                      ? 'bg-slate-700 text-white'
                      : 'bg-slate-800/30 text-slate-400 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {activeView === 'tracker' && (
            <>
              <div className="mb-8">{renderTracker()}</div>
              {showAddForm && (
                <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6 mb-6">
                  <div className="flex gap-3 flex-col sm:flex-row">
                    <input
                      type="text"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addItem(newItem)}
                      className="flex-1 bg-slate-700 border border-slate-600 rounded px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                      placeholder={`Enter ${activeTab} symbol`}
                      autoFocus
                    />
                    <button onClick={() => addItem(newItem)} className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded font-bold whitespace-nowrap">Add</button>
                    <button onClick={() => {setShowAddForm(false); setNewItem('');}} className="px-4 py-3 hover:bg-slate-700 rounded"><X className="w-5 h-5" /></button>
                  </div>
                </div>
              )}
              {!showAddForm && (
                <button onClick={() => setShowAddForm(true)} className="flex items-center gap-2 w-full px-6 py-4 bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-dashed border-slate-700 rounded-lg text-slate-300 hover:text-white transition-all font-semibold">
                  <Plus className="w-5 h-5" />
                  Add New {activeTab === 'stocks' ? 'Stock' : activeTab === 'crypto' ? 'Crypto' : 'Forex Pair'}
                </button>
              )}
            </>
          )}

          {activeView === 'charts' && renderCharts()}
          {activeView === 'paper-trading' && renderPaperTrading()}
          {activeView === 'top-performers' && renderTopPerformers()}

          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            <p>Real-time data simulation | Ready for API integration</p>
            <p className="mt-2 text-xs">Data updates every 3 seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
}
