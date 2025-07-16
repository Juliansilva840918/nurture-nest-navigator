import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';

type Order = Tables<'orders'>;
type OrderItem = Tables<'order_items'>;

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData: {
    items: Array<{ product_id: string; cantidad: number; precio_unitario: number }>;
    direccion_envio: string;
    total: number;
  }) => {
    try {
      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([{
          user_id: user?.id,
          direccion_envio: orderData.direccion_envio,
          total: orderData.total,
          estado: 'pendiente',
          fecha_pedido: new Date().toISOString()
        }])
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = orderData.items.map(item => ({
        ...item,
        order_id: order.id
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      setOrders(prev => [order, ...prev]);
      return { data: order, error: null };
    } catch (error) {
      console.error('Error creating order:', error);
      return { data: null, error };
    }
  };

  const getOrderItems = async (orderId: string) => {
    try {
      const { data, error } = await supabase
        .from('order_items')
        .select(`
          *,
          products (
            nombre,
            descripcion,
            foto_url
          )
        `)
        .eq('order_id', orderId);

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      console.error('Error fetching order items:', error);
      return { data: null, error };
    }
  };

  return {
    orders,
    loading,
    createOrder,
    getOrderItems,
    refetch: fetchOrders
  };
};