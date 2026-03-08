import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Plus, X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function App() {
  const [stocks, setStocks] = useState([
    { id: 1, symbol: 'AAPL', price: 178.45, change: 2.34, changePercent: 1.33 },
    { id: 2, symbol: 'MSFT', price: 412.78, change: -1.22, changePercent: -0.30 },
    { id: 3, symbol: 'TSLA', price: 242.67, change: 5.89, changePercent: 2.48 },
  ]);
  const [view, setView] = useState('tracker');
  const [newSymbol, setNewSymbol] = useState('');
  const [priceHistory, setPriceHistory] = useState({});

  useEffect(() => {
    const history = {};
    stocks.forEach(item => {
      history[item.symbol] = Array.from({ length: 30 }, (_, i) => ({
        time: `D${i}`,
        price: item.price + (Math.random() - 0.5) * 100,
      }));
    });
    setPriceHistory(history);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prev => prev.map(item => {
        const change = (Math.random() - 0.5) * 2;
        const newPrice = Math.max(item.price + change, item.price * 0.95);
        return { ...item, price: parseFloat(newPrice.toFixed(2)), change: parseFloat(change.toFixed(2)), changePercent: ((change / item.price) * 100).toFixed(2) };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const addStock = () => {
    if (!newSymbol.trim()) return;
    setStocks([...stocks, { id: Date.now(), symbol: newSymbol.toUpperCase(), price: (Math.random() * 1000 + 10).toFixed(2), change: 0, changePercent: 0 }]);
    setNewSymbol('');
  };

  const removeStock = (id) => setStocks(stocks.filter(item => item.id !== id));

  return (
    <div style={{ minHeight: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>MARKET MONITOR PRO</h1>
        
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button onClick={() => setView('tracker')} style={{ padding: '10px 20px', background: view === 'tracker' ? '#3b82f6' : '#475569', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Tracker</button>
          <button onClick={() => setView('charts')} style={{ padding: '10px 20px', background: view === 'charts' ? '#3b82f6' : '#475569', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Charts</button>
        </div>

        {view === 'tracker' && (
          <>
            <div style={{ marginBottom: '20px' }}>
              {stocks.map(stock => (
                <div key={stock.id} style={{ background: '#1e293b', border: '1px solid #475569', padding: '15px', marginBottom: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{stock.symbol}</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', marginTop: '5px' }}>${stock.price}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: parseFloat(stock.changePercent) >= 0 ? '#10b981' : '#ef4444', fontSize: '18px', fontWeight: 'bold' }}>{stock.changePercent >= 0 ? '+' : ''}{stock.changePercent}%</div>
                    <button onClick={() => removeStock(stock.id)} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginTop: '5px' }}>Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <input type="text" value={newSymbol} onChange={(e) => setNewSymbol(e.target.value)} placeholder="Symbol" style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#1e293b', color: 'white' }} onKeyPress={(e) => e.key === 'Enter' && addStock()} />
              <button onClick={addStock} style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Add</button>
            </div>
          </>
        )}

        {view === 'charts' && (
          <div>
            {stocks.slice(0, 2).map(stock => (
              <div key={stock.id} style={{ marginBottom: '30px', background: '#1e293b', padding: '20px', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>{stock.symbol}</h3>
                {priceHistory[stock.symbol] && (
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={priceHistory[stock.symbol]}>
                      <CartesianGrid stroke="#475569" />
                      <XAxis dataKey="time" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #475569', color: 'white' }} />
                      <Line type="monotone" dataKey="price" stroke={parseFloat(stock.changePercent) >= 0 ? '#10b981' : '#ef4444'} dot={false} strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #475569', textAlign: 'center', color: '#94a3b8', fontSize: '14px' }}>
          <p>Market Monitor Pro - Ready for deployment 🚀</p>
        </div>
      </div>
    </div>
  );
}
