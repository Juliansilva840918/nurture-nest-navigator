import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';

type Memory = Tables<'memories'>;

export const useMemories = (babyId?: string) => {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchMemories();
    }
  }, [user, babyId]);

  const fetchMemories = async () => {
    try {
      let query = supabase
        .from('memories')
        .select('*')
        .eq('user_id', user?.id);

      if (babyId) {
        query = query.eq('baby_id', babyId);
      }

      const { data, error } = await query
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMemories(data || []);
    } catch (error) {
      console.error('Error fetching memories:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMemory = async (memory: Omit<Memory, 'id' | 'created_at' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .insert([{ ...memory, user_id: user?.id }])
        .select()
        .single();

      if (error) throw error;
      setMemories(prev => [data, ...prev]);
      return { data, error: null };
    } catch (error) {
      console.error('Error adding memory:', error);
      return { data: null, error };
    }
  };

  const updateMemory = async (id: string, updates: Partial<Memory>) => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (error) throw error;
      setMemories(prev => prev.map(memory => memory.id === id ? data : memory));
      return { data, error: null };
    } catch (error) {
      console.error('Error updating memory:', error);
      return { data: null, error };
    }
  };

  const deleteMemory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('memories')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) throw error;
      setMemories(prev => prev.filter(memory => memory.id !== id));
      return { error: null };
    } catch (error) {
      console.error('Error deleting memory:', error);
      return { error };
    }
  };

  const getMemoriesByType = (type: string) => {
    return memories.filter(memory => memory.tipo_contenido === type);
  };

  const getMemoriesStats = () => {
    const thisMonth = new Date().toISOString().slice(0, 7);
    const thisMonthMemories = memories.filter(memory => 
      memory.created_at.startsWith(thisMonth)
    );

    return {
      fotos: thisMonthMemories.filter(m => m.tipo_contenido === 'foto').length,
      videos: thisMonthMemories.filter(m => m.tipo_contenido === 'video').length,
      audios: thisMonthMemories.filter(m => m.tipo_contenido === 'audio').length,
      notas: thisMonthMemories.filter(m => m.tipo_contenido === 'nota').length,
      total: thisMonthMemories.length
    };
  };

  return {
    memories,
    loading,
    addMemory,
    updateMemory,
    deleteMemory,
    getMemoriesByType,
    getMemoriesStats,
    refetch: fetchMemories
  };
};