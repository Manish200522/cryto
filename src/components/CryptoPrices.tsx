import { TrendingUp, TrendingDown, ArrowRight, Sparkles, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";

interface CryptoData {
  name: string;
  symbol: string;
  price: string;
  change: string;
  changeValue: string;
  isPositive: boolean;
  logo: string;
  chartData: number[];
}

const cryptoData: CryptoData[] = [
  {
    name: "Bitcoin",
    symbol: "BTC",
    price: "$43,256.78",
    change: "+2.45%",
    changeValue: "+$1,032.45",
    isPositive: true,
    logo: "₿",
    chartData: [42000, 42500, 42200, 42800, 43000, 43256]
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    price: "$2,687.92",
    change: "+1.87%",
    changeValue: "+$49.23",
    isPositive: true,
    logo: "Ξ",
    chartData: [2600, 2650, 2620, 2670, 2680, 2687]
  },
  {
    name: "Cardano",
    symbol: "ADA",
    price: "$0.52",
    change: "-0.95%",
    changeValue: "-$0.005",
    isPositive: false,
    logo: "₳",
    chartData: [0.53, 0.525, 0.52, 0.515, 0.518, 0.52]
  },
  {
    name: "Solana",
    symbol: "SOL",
    price: "$98.45",
    change: "+5.67%",
    changeValue: "+$5.28",
    isPositive: true,
    logo: "◎",
    chartData: [92, 94, 96, 95, 97, 98.45]
  },
  {
    name: "Polkadot",
    symbol: "DOT",
    price: "$7.89",
    change: "+3.21%",
    changeValue: "+$0.25",
    isPositive: true,
    logo: "●",
    chartData: [7.6, 7.7, 7.75, 7.8, 7.85, 7.89]
  }
];

// Additional data for the second chart
const tradingPairsData = [
  {
    pair: "BTC/USDT",
    price: "$43,256.78",
    change: "+2.45%",
    volume: "$28.4B",
    high: "$43,500.00",
    low: "$42,100.00",
    isPositive: true,
    chartData: [42100, 42300, 42500, 42700, 42900, 43256]
  },
  {
    pair: "ETH/USDT",
    price: "$2,687.92",
    change: "+1.87%",
    volume: "$14.2B",
    high: "$2,710.50",
    low: "$2,620.75",
    isPositive: true,
    chartData: [2620, 2640, 2660, 2675, 2680, 2687]
  },
  {
    pair: "SOL/USDC",
    price: "$98.45",
    change: "+5.67%",
    volume: "$3.8B",
    high: "$99.20",
    low: "$92.10",
    isPositive: true,
    chartData: [92, 93, 95, 96, 97, 98.45]
  },
  {
    pair: "XRP/USDT",
    price: "$0.62",
    change: "-1.25%",
    volume: "$2.1B",
    high: "$0.64",
    low: "$0.61",
    isPositive: false,
    chartData: [0.63, 0.625, 0.62, 0.615, 0.618, 0.62]
  },
  {
    pair: "ADA/BTC",
    price: "0.000012",
    change: "+0.85%",
    volume: "$450M",
    high: "0.0000122",
    low: "0.0000118",
    isPositive: true,
    chartData: [0.0000118, 0.0000119, 0.0000120, 0.0000121, 0.0000121, 0.0000120]
  }
];

const CryptoPrices = () => {
  const [data, setData] = useState<CryptoData[]>(cryptoData);
  const [tradingData, setTradingData] = useState(tradingPairsData);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isRefreshingTrading, setIsRefreshingTrading] = useState(false);
  const [activeCrypto, setActiveCrypto] = useState<number | null>(null);
  const [activeTrading, setActiveTrading] = useState<number | null>(null);

  // Simulate data refresh for cryptocurrencies
  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(prevData => 
        prevData.map(item => ({
          ...item,
          price: `$${(parseFloat(item.price.replace('$', '').replace(',', '')) + (Math.random() - 0.5) * 100).toFixed(2)}`,
          change: `${Math.random() > 0.5 ? '+' : ''}${(Math.random() * 5).toFixed(2)}%`,
          isPositive: Math.random() > 0.5
        }))
      );
      setIsRefreshing(false);
    }, 1000);
  };

  // Simulate data refresh for trading pairs
  const refreshTradingData = () => {
    setIsRefreshingTrading(true);
    setTimeout(() => {
      setTradingData(prevData => 
        prevData.map(item => ({
          ...item,
          price: item.pair.includes('$') 
            ? `$${(parseFloat(item.price.replace('$', '').replace(',', '')) + (Math.random() - 0.5) * (item.pair === 'BTC/USDT' ? 100 : item.pair === 'ETH/USDT' ? 10 : 1)).toFixed(item.pair === 'BTC/USDT' ? 2 : 2)}`
            : `${(parseFloat(item.price) + (Math.random() - 0.5) * 0.0000005).toFixed(7)}`,
          change: `${Math.random() > 0.5 ? '+' : ''}${(Math.random() * 3).toFixed(2)}%`,
          volume: `$${(parseFloat(item.volume.replace('$', '').replace('B', '').replace('M', '')) * (0.9 + Math.random() * 0.2)).toFixed(1)}${item.volume.includes('B') ? 'B' : 'M'}`,
          isPositive: Math.random() > 0.5
        }))
      );
      setIsRefreshingTrading(false);
    }, 1000);
  };

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshData, 30000);
    const tradingInterval = setInterval(refreshTradingData, 30000);
    return () => {
      clearInterval(interval);
      clearInterval(tradingInterval);
    };
  }, []);

  return (
    <section id="markets" className="py-20 bg-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Live Markets</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Real-Time <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Crypto Prices</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track the latest cryptocurrency prices and market movements in real-time
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
            {/* Table header with refresh button */}
            <div className="p-6 border-b border-border/50 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-foreground">Top Cryptocurrencies</h3>
              <button 
                onClick={refreshData}
                disabled={isRefreshing}
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Updating...' : 'Refresh'}</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left p-4 text-muted-foreground font-medium">Asset</th>
                    <th className="text-right p-4 text-muted-foreground font-medium">Price</th>
                    <th className="text-right p-4 text-muted-foreground font-medium">24h Change</th>
                    <th className="text-right p-4 text-muted-foreground font-medium">Chart</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((crypto, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-border/30 hover:bg-muted/20 transition-all duration-300 ${
                        activeCrypto === index ? 'bg-muted/40' : ''
                      }`}
                      onMouseEnter={() => setActiveCrypto(index)}
                      onMouseLeave={() => setActiveCrypto(null)}
                    >
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center text-primary font-bold text-xl">
                            {crypto.logo}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground">{crypto.name}</div>
                            <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-semibold text-foreground">{crypto.price}</div>
                      </td>
                      <td className="p-4 text-right">
                        <div className={`flex items-center justify-end space-x-1 ${
                          crypto.isPositive ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {crypto.isPositive ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="font-medium">{crypto.change}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">{crypto.changeValue}</div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end">
                          <div className="w-20 h-10 relative">
                            {/* Mini chart */}
                            <svg viewBox="0 0 100 40" className="w-full h-full">
                              <polyline
                                fill="none"
                                stroke={crypto.isPositive ? "#10b981" : "#ef4444"}
                                strokeWidth="2"
                                points={crypto.chartData.map((value, i) => {
                                  const x = (i / (crypto.chartData.length - 1)) * 100;
                                  const max = Math.max(...crypto.chartData);
                                  const min = Math.min(...crypto.chartData);
                                  const y = 40 - ((value - min) / (max - min)) * 40;
                                  return `${x},${y}`;
                                }).join(" ")}
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 text-center border-t border-border/30">
              <button className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-colors group">
                <span>View All Cryptocurrencies</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Second chart for trading pairs */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-card to-card/80 border border-border/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
            <div className="p-6 border-b border-border/50 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-foreground">Top Trading Pairs</h3>
              <button 
                onClick={refreshTradingData}
                disabled={isRefreshingTrading}
                className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${isRefreshingTrading ? 'animate-spin' : ''}`} />
                <span>{isRefreshingTrading ? 'Updating...' : 'Refresh'}</span>
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="text-left p-4 text-muted-foreground font-medium">Pair</th>
                    <th className="text-right p-4 text-muted-foreground font-medium">Price</th>
                    <th className="text-right p-4 text-muted-foreground font-medium">24h Change</th>
                    <th className="text-right p-4 text-muted-foreground font-medium">24h Volume</th>
                    <th className="text-right p-4 text-muted-foreground font-medium">Chart</th>
                  </tr>
                </thead>
                <tbody>
                  {tradingData.map((pair, index) => (
                    <tr 
                      key={index} 
                      className={`border-b border-border/30 hover:bg-muted/20 transition-all duration-300 ${
                        activeTrading === index ? 'bg-muted/40' : ''
                      }`}
                      onMouseEnter={() => setActiveTrading(index)}
                      onMouseLeave={() => setActiveTrading(null)}
                    >
                      <td className="p-4">
                        <div className="font-semibold text-foreground">{pair.pair}</div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="font-semibold text-foreground">{pair.price}</div>
                      </td>
                      <td className="p-4 text-right">
                        <div className={`flex items-center justify-end space-x-1 ${
                          pair.isPositive ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {pair.isPositive ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="font-medium">{pair.change}</span>
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="text-muted-foreground">{pair.volume}</div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end">
                          <div className="w-20 h-10 relative">
                            <svg viewBox="0 0 100 40" className="w-full h-full">
                              <polyline
                                fill="none"
                                stroke={pair.isPositive ? "#10b981" : "#ef4444"}
                                strokeWidth="2"
                                points={pair.chartData.map((value, i) => {
                                  const x = (i / (pair.chartData.length - 1)) * 100;
                                  const max = Math.max(...pair.chartData);
                                  const min = Math.min(...pair.chartData);
                                  const y = 40 - ((value - min) / (max - min)) * 40;
                                  return `${x},${y}`;
                                }).join(" ")}
                              />
                            </svg>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 text-center border-t border-border/30">
              <button className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-colors group">
                <span>View All Trading Pairs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Market stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-500/10 to-green-700/5 border border-green-500/20 rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-green-500 mb-2">$2.1T</div>
            <div className="text-muted-foreground">Total Market Cap</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-700/5 border border-blue-500/20 rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-blue-500 mb-2">$98.4B</div>
            <div className="text-muted-foreground">24h Volume</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-700/5 border border-purple-500/20 rounded-2xl p-6 text-center">
            <div className="text-2xl font-bold text-purple-500 mb-2">+4.2%</div>
            <div className="text-muted-foreground">Market Sentiment</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoPrices;