import { createContext, useState, useContext, useCallback, ReactNode } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface WalletContextType {
  isConnected: boolean;
  walletType: string | null;
  address: string | null;
  connectWallet: (type: string, address: string) => Promise<void>;
  disconnectWallet: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const WalletContext = createContext<WalletContextType>({
  isConnected: false,
  walletType: null,
  address: null,
  connectWallet: async () => {},
  disconnectWallet: async () => {},
  error: null,
  loading: false
});

export const useWallet = () => useContext(WalletContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletType, setWalletType] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const connectWallet = useCallback(async (type: string, walletAddress: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: dbError } = await supabase
        .from('user_wallets')
        .upsert(
          { 
            wallet_type: type,
            address: walletAddress,
            joined_at: new Date().toISOString()
          },
          { onConflict: 'address' }
        )
        .select()
        .single();

      if (dbError) throw dbError;

      setWalletType(type);
      setAddress(walletAddress);
      setIsConnected(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    setLoading(true);
    try {
      if (address) {
        await supabase
          .from('user_wallets')
          .delete()
          .eq('address', address);
      }
      setIsConnected(false);
      setWalletType(null);
      setAddress(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Disconnection failed');
    } finally {
      setLoading(false);
    }
  }, [address]);

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        walletType,
        address,
        connectWallet,
        disconnectWallet,
        error,
        loading
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext;
