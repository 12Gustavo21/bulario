import { createContext, useState, useEffect, ReactNode } from 'react';

// axios
import axios from 'axios';

// Define a interface para os medicamentos
interface Medicine {
  id: string;
  name: string;
  published_at: string;
  company: string;
}

// Define a interface para o contexto da API
interface ApiContextProps {
  medicines: Medicine[];
  loading: boolean;
}

// Cria o contexto da API
const ApiContext = createContext<ApiContextProps>({
  medicines: [],
  loading: true,
});

// Define as propriedades do provedor da API
interface ApiProviderProps {
  children: ReactNode;
}

// Cria o provedor da API
const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  // Define os estados para os medicamentos e status de carregamento
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Medicine[]>('http://localhost:3000/data');
        setMedicines(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

  }, []);

  return (
    <ApiContext.Provider value={{ medicines, loading }}>
      {children}
    </ApiContext.Provider>
  );
};

export { ApiContext, ApiProvider };
