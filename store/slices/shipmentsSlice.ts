import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { shipmentsAPI, Shipment, SearchFilters } from '@/services/api';

type FilterStatus = 'received' | 'putaway' | 'delivered' | 'canceled' | 'rejected' | 'lost' | 'on-hold';

interface ShipmentsState {
  shipments: Shipment[];
  filteredShipments: Shipment[];
  selectedShipments: string[];
  searchQuery: string;
  filters: SearchFilters;
  selectedStatusFilters: FilterStatus[];
  isLoading: boolean;
  error: string | null;
  markAll: boolean;
}

const initialState: ShipmentsState = {
  shipments: [],
  filteredShipments: [],
  selectedShipments: [],
  searchQuery: '',
  filters: {},
  selectedStatusFilters: [],
  isLoading: false,
  error: null,
  markAll: false,
};

// Async thunk for fetching shipments
export const fetchShipments = createAsyncThunk<
  Shipment[],
  void,
  { rejectValue: string }
>(
  'shipments/fetchShipments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await shipmentsAPI.getShipments();
      return response.shipments;
    } catch (error) {
      return rejectWithValue('Failed to load shipments');
    }
  }
);

const shipmentsSlice = createSlice({
  name: 'shipments',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.filteredShipments = applyFilters(state);
    },
    toggleStatusFilter: (state, action: PayloadAction<FilterStatus>) => {
      const index = state.selectedStatusFilters.indexOf(action.payload);
      if (index === -1) {
        state.selectedStatusFilters.push(action.payload);
      } else {
        state.selectedStatusFilters.splice(index, 1);
      }
      state.filteredShipments = applyFilters(state);
    },
    clearStatusFilters: (state) => {
      state.selectedStatusFilters = [];
      state.filteredShipments = applyFilters(state);
    },
    toggleShipmentSelection: (state, action: PayloadAction<string>) => {
      const index = state.selectedShipments.indexOf(action.payload);
      if (index === -1) {
        state.selectedShipments.push(action.payload);
      } else {
        state.selectedShipments.splice(index, 1);
      }
      state.markAll = state.selectedShipments.length === state.shipments.length;
    },
    toggleMarkAll: (state) => {
      if (state.markAll) {
        state.selectedShipments = [];
      } else {
        state.selectedShipments = state.shipments.map(s => s.id);
      }
      state.markAll = !state.markAll;
    },
    clearSelection: (state) => {
      state.selectedShipments = [];
      state.markAll = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShipments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shipments = action.payload;
        state.filteredShipments = applyFilters(state);
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to load shipments';
      });
  },
});

// Helper function to apply filters
function applyFilters(state: ShipmentsState): Shipment[] {
  let filtered = [...state.shipments];

  // Apply search query
  if (state.searchQuery.trim()) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(shipment =>
      shipment.trackingNumber.toLowerCase().includes(query) ||
      shipment.sender.name.toLowerCase().includes(query) ||
      shipment.recipient.name.toLowerCase().includes(query) ||
      shipment.origin.toLowerCase().includes(query) ||
      shipment.destination.toLowerCase().includes(query) ||
      shipment.carrier.toLowerCase().includes(query)
    );
  }

  // Apply status filters
  if (state.selectedStatusFilters.length > 0) {
    const statusMap: Record<Shipment['status'], FilterStatus> = {
      'pending': 'received',
      'in-transit': 'putaway',
      'delivered': 'delivered',
      'cancelled': 'canceled',
      'rejected': 'rejected',
      'lost': 'lost',
      'on-hold': 'on-hold',
    };

    filtered = filtered.filter(shipment => {
      const filterStatus = statusMap[shipment.status];
      return filterStatus && state.selectedStatusFilters.includes(filterStatus);
    });
  }

  return filtered;
}

export const {
  setSearchQuery,
  toggleStatusFilter,
  clearStatusFilters,
  toggleShipmentSelection,
  toggleMarkAll,
  clearSelection,
} = shipmentsSlice.actions;

export default shipmentsSlice.reducer;



