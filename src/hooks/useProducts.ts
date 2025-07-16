import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';

type Product = Tables<'products'>;

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = (category: string) => {
    if (category === 'todos') return products;
    return products.filter(product => product.categoria === category);
  };

  const searchProducts = (query: string) => {
    return products.filter(product => 
      product.nombre.toLowerCase().includes(query.toLowerCase()) ||
      product.descripcion?.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    products,
    loading,
    getProductsByCategory,
    searchProducts,
    refetch: fetchProducts
  };
};