import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import {
  clearSelection,
  clearStatusFilters,
  fetchShipments,
  setSearchQuery,
  toggleMarkAll,
  toggleShipmentSelection,
  toggleStatusFilter,
} from '@/src/store/slices/shipmentsSlice';
import { useEffect } from 'react';

type FilterStatus = 'received' | 'putaway' | 'delivered' | 'canceled' | 'rejected' | 'lost' | 'on-hold';

export const useShipmentsViewModel = () => {
  const dispatch = useAppDispatch();
  const {
    shipments,
    filteredShipments,
    selectedShipments,
    searchQuery,
    selectedStatusFilters,
    isLoading,
    error,
    markAll,
  } = useAppSelector((state) => state.shipments);

  // Fetch shipments on mount
  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(setSearchQuery(query));
  };

  const handleToggleStatusFilter = (status: FilterStatus) => {
    dispatch(toggleStatusFilter(status));
  };

  const handleClearStatusFilters = () => {
    dispatch(clearStatusFilters());
  };

  const handleToggleShipmentSelection = (id: string) => {
    dispatch(toggleShipmentSelection(id));
  };

  const handleToggleMarkAll = () => {
    dispatch(toggleMarkAll());
  };

  const handleClearSelection = () => {
    dispatch(clearSelection());
  };

  const refreshShipments = () => {
    dispatch(fetchShipments());
  };

  const isShipmentSelected = (id: string) => {
    return selectedShipments.includes(id);
  };

  const getSelectedCount = () => {
    return selectedShipments.length;
  };

  return {
    // State
    shipments,
    filteredShipments,
    selectedShipments,
    searchQuery,
    selectedStatusFilters,
    isLoading,
    error,
    markAll,
    
    // Actions
    handleSearch,
    handleToggleStatusFilter,
    handleClearStatusFilters,
    handleToggleShipmentSelection,
    handleToggleMarkAll,
    handleClearSelection,
    refreshShipments,
    
    // Helpers
    isShipmentSelected,
    getSelectedCount,
  };
};



