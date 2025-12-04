export interface Shipment {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'cancelled' | 'rejected' | 'lost' | 'on-hold';
  origin: string;
  destination: string;
  carrier: string;
  estimatedDelivery: string;
  actualDelivery?: string;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  sender: {
    name: string;
    address: string;
  };
  recipient: {
    name: string;
    address: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    value: number;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export interface ShipmentsResponse {
  shipments: Shipment[];
  total: number;
  page: number;
  limit: number;
}

export interface SearchFilters {
  status?: Shipment['status'];
  carrier?: string;
  dateFrom?: string;
  dateTo?: string;
  origin?: string;
  destination?: string;
}

// Mock data for shipments
const mockShipments: Shipment[] = [
  {
    id: '1',
    trackingNumber: 'FF123456789',
    status: 'in-transit',
    origin: 'New York, NY',
    destination: 'Los Angeles, CA',
    carrier: 'FedEx',
    estimatedDelivery: '2024-12-10',
    weight: 2.5,
    dimensions: { length: 12, width: 8, height: 6 },
    sender: {
      name: 'John Smith',
      address: '123 Main St, New York, NY 10001',
    },
    recipient: {
      name: 'Jane Doe',
      address: '456 Oak Ave, Los Angeles, CA 90210',
    },
    items: [
      { name: 'Laptop', quantity: 1, value: 1200 },
      { name: 'Mouse', quantity: 1, value: 25 },
    ],
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-04T14:30:00Z',
  },
  {
    id: '2',
    trackingNumber: 'FF987654321',
    status: 'delivered',
    origin: 'Chicago, IL',
    destination: 'Miami, FL',
    carrier: 'UPS',
    estimatedDelivery: '2024-12-05',
    actualDelivery: '2024-12-05T09:15:00Z',
    weight: 1.2,
    dimensions: { length: 10, width: 6, height: 4 },
    sender: {
      name: 'Mike Johnson',
      address: '789 Pine St, Chicago, IL 60601',
    },
    recipient: {
      name: 'Sarah Wilson',
      address: '321 Beach Blvd, Miami, FL 33101',
    },
    items: [
      { name: 'Documents', quantity: 1, value: 0 },
    ],
    createdAt: '2024-11-28T08:00:00Z',
    updatedAt: '2024-12-05T09:15:00Z',
  },
  {
    id: '3',
    trackingNumber: 'FF555666777',
    status: 'pending',
    origin: 'Seattle, WA',
    destination: 'Austin, TX',
    carrier: 'DHL',
    estimatedDelivery: '2024-12-15',
    weight: 3.8,
    dimensions: { length: 15, width: 10, height: 8 },
    sender: {
      name: 'Tech Corp',
      address: '999 Tech Park, Seattle, WA 98101',
    },
    recipient: {
      name: 'Logistics Inc',
      address: '555 Industry Rd, Austin, TX 78701',
    },
    items: [
      { name: 'Server Equipment', quantity: 2, value: 5000 },
    ],
    createdAt: '2024-12-03T16:00:00Z',
    updatedAt: '2024-12-03T16:00:00Z',
  },
  {
    id: '4',
    trackingNumber: 'FF111222333',
    status: 'in-transit',
    origin: 'Boston, MA',
    destination: 'Denver, CO',
    carrier: 'USPS',
    estimatedDelivery: '2024-12-12',
    weight: 0.8,
    dimensions: { length: 8, width: 5, height: 3 },
    sender: {
      name: 'Alice Brown',
      address: '147 Elm St, Boston, MA 02101',
    },
    recipient: {
      name: 'Bob Davis',
      address: '258 Mountain View, Denver, CO 80201',
    },
    items: [
      { name: 'Books', quantity: 5, value: 150 },
    ],
    createdAt: '2024-12-02T12:00:00Z',
    updatedAt: '2024-12-04T10:45:00Z',
  },
  {
    id: '5',
    trackingNumber: '41785691423',
    status: 'pending',
    origin: 'Cairo',
    destination: 'Alexandria',
    carrier: 'DHL',
    estimatedDelivery: '2024-12-08',
    weight: 1.5,
    dimensions: { length: 11, width: 7, height: 5 },
    sender: {
      name: 'Store Chain',
      address: '369 Market St, Cairo',
    },
    recipient: {
      name: 'Retail Outlet',
      address: '741 Casino Dr, Alexandria',
    },
    items: [
      { name: 'Merchandise', quantity: 10, value: 750 },
    ],
    createdAt: '2024-11-30T14:00:00Z',
    updatedAt: '2024-12-01T11:20:00Z',
  },
  {
    id: '6',
    trackingNumber: '41785691424',
    status: 'cancelled',
    origin: 'Cairo',
    destination: 'Alexandria',
    carrier: 'UPS',
    estimatedDelivery: '2024-12-09',
    weight: 2.0,
    dimensions: { length: 12, width: 8, height: 6 },
    sender: {
      name: 'John Doe',
      address: '123 Main St, Cairo',
    },
    recipient: {
      name: 'Jane Smith',
      address: '456 Oak Ave, Alexandria',
    },
    items: [
      { name: 'Electronics', quantity: 1, value: 500 },
    ],
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-02T15:30:00Z',
  },
  {
    id: '7',
    trackingNumber: '41785691425',
    status: 'rejected',
    origin: 'Cairo',
    destination: 'Alexandria',
    carrier: 'FedEx',
    estimatedDelivery: '2024-12-10',
    weight: 1.8,
    dimensions: { length: 10, width: 7, height: 5 },
    sender: {
      name: 'Tech Corp',
      address: '789 Tech Park, Cairo',
    },
    recipient: {
      name: 'Business Inc',
      address: '321 Business Rd, Alexandria',
    },
    items: [
      { name: 'Documents', quantity: 1, value: 0 },
    ],
    createdAt: '2024-12-02T08:00:00Z',
    updatedAt: '2024-12-03T12:00:00Z',
  },
  {
    id: '8',
    trackingNumber: '41785691426',
    status: 'delivered',
    origin: 'Cairo',
    destination: 'Alexandria',
    carrier: 'USPS',
    estimatedDelivery: '2024-12-07',
    actualDelivery: '2024-12-07T14:20:00Z',
    weight: 0.5,
    dimensions: { length: 8, width: 5, height: 3 },
    sender: {
      name: 'Alice Brown',
      address: '147 Elm St, Cairo',
    },
    recipient: {
      name: 'Bob Davis',
      address: '258 Beach Blvd, Alexandria',
    },
    items: [
      { name: 'Package', quantity: 1, value: 100 },
    ],
    createdAt: '2024-12-01T12:00:00Z',
    updatedAt: '2024-12-07T14:20:00Z',
  },
  {
    id: '9',
    trackingNumber: '41785691427',
    status: 'lost',
    origin: 'Cairo',
    destination: 'Alexandria',
    carrier: 'DHL',
    estimatedDelivery: '2024-12-06',
    weight: 1.2,
    dimensions: { length: 9, width: 6, height: 4 },
    sender: {
      name: 'Mike Johnson',
      address: '555 Pine St, Cairo',
    },
    recipient: {
      name: 'Sarah Wilson',
      address: '888 Mountain View, Alexandria',
    },
    items: [
      { name: 'Clothing', quantity: 5, value: 200 },
    ],
    createdAt: '2024-11-28T09:00:00Z',
    updatedAt: '2024-12-05T16:00:00Z',
  },
  {
    id: '10',
    trackingNumber: '41785691428',
    status: 'on-hold',
    origin: 'Cairo',
    destination: 'Alexandria',
    carrier: 'UPS',
    estimatedDelivery: '2024-12-12',
    weight: 3.0,
    dimensions: { length: 14, width: 10, height: 8 },
    sender: {
      name: 'Logistics Co',
      address: '999 Warehouse St, Cairo',
    },
    recipient: {
      name: 'Distribution Center',
      address: '777 Industrial Ave, Alexandria',
    },
    items: [
      { name: 'Equipment', quantity: 2, value: 1500 },
    ],
    createdAt: '2024-12-03T11:00:00Z',
    updatedAt: '2024-12-04T09:30:00Z',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Authentication API
export const authAPI = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    await delay(1000); // Simulate network delay

    const validCredentials = [
      { email: 'test@example.com', password: 'password123' },
      { email: 'admin@furforce.com', password: 'admin123' },
      { email: 'user@furforce.com', password: 'user123' },
    ];

    const user = validCredentials.find(
      cred => cred.email === credentials.email && cred.password === credentials.password
    );

    if (user) {
      return {
        success: true,
        message: 'Login successful!',
        user: {
          id: '1',
          email: user.email,
          name: user.email.split('@')[0],
          role: user.email.includes('admin') ? 'admin' : 'user',
        },
      };
    }

    return {
      success: false,
      message: 'Invalid email or password',
    };
  },

  logout: async (): Promise<{ success: boolean; message: string }> => {
    await delay(500);
    return { success: true, message: 'Logged out successfully' };
  },
};

// Shipments API
export const shipmentsAPI = {
  getShipments: async (
    page: number = 1,
    limit: number = 10,
    search?: string,
    filters?: SearchFilters
  ): Promise<ShipmentsResponse> => {
    await delay(800); // Simulate network delay

    let filteredShipments = [...mockShipments];

    // Apply search
    if (search) {
      const searchLower = search.toLowerCase();
      filteredShipments = filteredShipments.filter(shipment =>
        shipment.trackingNumber.toLowerCase().includes(searchLower) ||
        shipment.sender.name.toLowerCase().includes(searchLower) ||
        shipment.recipient.name.toLowerCase().includes(searchLower) ||
        shipment.origin.toLowerCase().includes(searchLower) ||
        shipment.destination.toLowerCase().includes(searchLower) ||
        shipment.carrier.toLowerCase().includes(searchLower)
      );
    }

    // Apply filters
    if (filters) {
      if (filters.status) {
        filteredShipments = filteredShipments.filter(s => s.status === filters.status);
      }
      if (filters.carrier) {
        filteredShipments = filteredShipments.filter(s =>
          s.carrier.toLowerCase().includes(filters.carrier!.toLowerCase())
        );
      }
      if (filters.origin) {
        filteredShipments = filteredShipments.filter(s =>
          s.origin.toLowerCase().includes(filters.origin!.toLowerCase())
        );
      }
      if (filters.destination) {
        filteredShipments = filteredShipments.filter(s =>
          s.destination.toLowerCase().includes(filters.destination!.toLowerCase())
        );
      }
      if (filters.dateFrom) {
        filteredShipments = filteredShipments.filter(s =>
          new Date(s.createdAt) >= new Date(filters.dateFrom!)
        );
      }
      if (filters.dateTo) {
        filteredShipments = filteredShipments.filter(s =>
          new Date(s.createdAt) <= new Date(filters.dateTo!)
        );
      }
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedShipments = filteredShipments.slice(startIndex, endIndex);

    return {
      shipments: paginatedShipments,
      total: filteredShipments.length,
      page,
      limit,
    };
  },

  getShipmentById: async (id: string): Promise<Shipment | null> => {
    await delay(600);
    return mockShipments.find(shipment => shipment.id === id) || null;
  },

  getShipmentByTracking: async (trackingNumber: string): Promise<Shipment | null> => {
    await delay(600);
    return mockShipments.find(shipment =>
      shipment.trackingNumber.toLowerCase() === trackingNumber.toLowerCase()
    ) || null;
  },
};
