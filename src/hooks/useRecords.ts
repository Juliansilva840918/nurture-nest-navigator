import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';

type Record = Tables<'records'>;

export const useRecords = (babyId?: string) => {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchRecords();
    }
  }, [user, babyId]);

  const fetchRecords = async () => {
    try {
      let query = supabase
        .from('records')
        .select('*')
        .eq('user_id', user?.id);

      if (babyId) {
        query = query.eq('baby_id', babyId);
      }

      const { data, error } = await query
        .order('fecha_hora', { ascending: false });

      if (error) throw error;
      setRecords(data || []);
    } catch (error) {
      console.error('Error fetching records:', error);
    } finally {
      setLoading(false);
    }
  };

  const addRecord = async (record: Omit<Record, 'id' | 'created_at' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('records')
        .insert([{ ...record, user_id: user?.id }])
        .select()
        .single();

      if (error) throw error;
      setRecords(prev => [data, ...prev]);
      return { data, error: null };
    } catch (error) {
      console.error('Error adding record:', error);
      return { data: null, error };
    }
  };

  const updateRecord = async (id: string, updates: Partial<Record>) => {
    try {
      const { data, error } = await supabase
        .from('records')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (error) throw error;
      setRecords(prev => prev.map(record => record.id === id ? data : record));
      return { data, error: null };
    } catch (error) {
      console.error('Error updating record:', error);
      return { data: null, error };
    }
  };

  const deleteRecord = async (id: string) => {
    try {
      const { error } = await supabase
        .from('records')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;
      setRecords(prev => prev.filter(record => record.id !== id));
      return { error: null };
    } catch (error) {
      console.error('Error deleting record:', error);
      return { error };
    }
  };

  const getTodaysSummary = () => {
    const today = new Date().toISOString().split('T')[0];
    const todaysRecords = records.filter(record => 
      record.fecha_hora.startsWith(today)
    );

    return {
      comidas: todaysRecords.filter(r => r.tipo === 'comida').length,
      sueño: todaysRecords.filter(r => r.tipo === 'sueño').length,
      pañales: todaysRecords.filter(r => r.tipo === 'pañal').length,
      otros: todaysRecords.filter(r => !['comida', 'sueño', 'pañal'].includes(r.tipo)).length
    };
  };

  return {
    records,
    loading,
    addRecord,
    updateRecord,
    deleteRecord,
    getTodaysSummary,
    refetch: fetchRecords
  };
};