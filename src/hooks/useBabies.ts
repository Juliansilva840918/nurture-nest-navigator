import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';

type Baby = Tables<'babies'>;

export const useBabies = () => {
  const [babies, setBabies] = useState<Baby[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchBabies();
    }
  }, [user]);

  const fetchBabies = async () => {
    try {
      const { data, error } = await supabase
        .from('babies')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBabies(data || []);
    } catch (error) {
      console.error('Error fetching babies:', error);
    } finally {
      setLoading(false);
    }
  };

  const addBaby = async (baby: Omit<Baby, 'id' | 'created_at' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('babies')
        .insert([{ ...baby, user_id: user?.id }])
        .select()
        .single();

      if (error) throw error;
      setBabies(prev => [data, ...prev]);
      return { data, error: null };
    } catch (error) {
      console.error('Error adding baby:', error);
      return { data: null, error };
    }
  };

  const updateBaby = async (id: string, updates: Partial<Baby>) => {
    try {
      const { data, error } = await supabase
        .from('babies')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (error) throw error;
      setBabies(prev => prev.map(baby => baby.id === id ? data : baby));
      return { data, error: null };
    } catch (error) {
      console.error('Error updating baby:', error);
      return { data: null, error };
    }
  };

  const deleteBaby = async (id: string) => {
    try {
      const { error } = await supabase
        .from('babies')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;
      setBabies(prev => prev.filter(baby => baby.id !== id));
      return { error: null };
    } catch (error) {
      console.error('Error deleting baby:', error);
      return { error };
    }
  };

  return {
    babies,
    loading,
    addBaby,
    updateBaby,
    deleteBaby,
    refetch: fetchBabies
  };
};