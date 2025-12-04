import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  Modal,
  Animated,
  Dimensions,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { shipmentsAPI, Shipment } from '@/services/api';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type FilterStatus = 'received' | 'putaway' | 'delivered' | 'canceled' | 'rejected' | 'lost' | 'on-hold';

const STATUS_MAP: Record<Shipment['status'], FilterStatus> = {
  'pending': 'received',
  'in-transit': 'putaway',
  'delivered': 'delivered',
  'cancelled': 'canceled',
  'rejected': 'rejected',
  'lost': 'lost',
  'on-hold': 'on-hold',
};

const STATUS_LABELS: Record<FilterStatus, string> = {
  'received': 'RECEIVED',
  'putaway': 'PUTAWAY',
  'delivered': 'DELIVERED',
  'canceled': 'CANCELED',
  'rejected': 'REJECTED',
  'lost': 'LOST',
  'on-hold': 'ON HOLD',
};

const STATUS_COLORS: Record<string, string> = {
  'RECEIVED': '#2196F3',
  'PUTAWAY': '#FF9800',
  'DELIVERED': '#4CAF50',
  'CANCELED': '#9E9E9E',
  'REJECTED': '#F44336',
  'LOST': '#FF5722',
  'ON HOLD': '#FFC107',
  'ERROR': '#F44336',
};

export default function HomeScreen() {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [selectedShipments, setSelectedShipments] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [markAll, setMarkAll] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<Set<FilterStatus>>(new Set());
  const [slideAnim] = useState(new Animated.Value(SCREEN_HEIGHT));

  useEffect(() => {
    loadShipments();
  }, []);

  useEffect(() => {
    if (showFilters) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [showFilters]);

  const loadShipments = async () => {
    try {
      const response = await shipmentsAPI.getShipments();
      setShipments(response.shipments);
    } catch (error) {
      Alert.alert('Error', 'Failed to load shipments');
    }
  };

  const toggleShipmentSelection = (id: string) => {
    const newSelected = new Set(selectedShipments);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedShipments(newSelected);
    setMarkAll(newSelected.size === shipments.length);
  };

  const toggleMarkAll = () => {
    if (markAll) {
      setSelectedShipments(new Set());
    } else {
      setSelectedShipments(new Set(shipments.map(s => s.id)));
    }
    setMarkAll(!markAll);
  };

  const toggleFilter = (status: FilterStatus) => {
    const newFilters = new Set(selectedFilters);
    if (newFilters.has(status)) {
      newFilters.delete(status);
    } else {
      newFilters.add(status);
    }
    setSelectedFilters(newFilters);
  };

  const applyFilters = () => {
    setShowFilters(false);
  };

  const cancelFilters = () => {
    setShowFilters(false);
  };

  const getStatusText = (status: Shipment['status']) => {
    const filterStatus = STATUS_MAP[status];
    if (filterStatus) {
      return STATUS_LABELS[filterStatus];
    }
    return 'RECEIVED';
  };

  const getStatusColor = (status: Shipment['status']) => {
    const statusText = getStatusText(status);
    return STATUS_COLORS[statusText] || '#9E9E9E';
  };

  const filteredShipments = shipments.filter(shipment => {
    // Search filter
    const matchesSearch = 
      shipment.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const shipmentFilterStatus = STATUS_MAP[shipment.status] || 'received';
    const matchesStatus = selectedFilters.size === 0 || selectedFilters.has(shipmentFilterStatus);

    return matchesSearch && matchesStatus;
  });

  const renderShipmentItem = ({ item }: { item: Shipment }) => (
    <TouchableOpacity
      style={styles.shipmentItem}
      onPress={() => toggleShipmentSelection(item.id)}
    >
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => toggleShipmentSelection(item.id)}
      >
        {selectedShipments.has(item.id) && (
          <View style={styles.checkboxChecked} />
        )}
      </TouchableOpacity>

      <View style={styles.packageIcon}>
        <IconSymbol name="shippingbox.fill" size={24} color="#FFC107" />
      </View>

      <View style={styles.shipmentContent}>
        <View style={styles.shipmentHeader}>
          <ThemedText style={styles.awbText}>
            AWB {item.trackingNumber}
          </ThemedText>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <ThemedText style={styles.statusText}>
              {getStatusText(item.status)}
            </ThemedText>
          </View>
        </View>
        <ThemedText style={styles.routeText}>
          {item.origin} → {item.destination}
        </ThemedText>
      </View>

      <IconSymbol name="arrow.up.right" size={20} color="#999" />
    </TouchableOpacity>
  );

  const filterOptions: FilterStatus[] = [
    'received',
    'putaway',
    'delivered',
    'canceled',
    'rejected',
    'lost',
    'on-hold',
  ];

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileIcon}>
            <ThemedText style={styles.profileIconText}>I</ThemedText>
          </View>
        </TouchableOpacity>

        <ThemedText style={styles.logoText}>SHIPPEX</ThemedText>

        <TouchableOpacity style={styles.bellButton}>
          <IconSymbol name="bell.fill" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Greeting */}
        <ThemedText style={styles.greeting}>Hello, Ibrahim Shaker</ThemedText>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <IconSymbol name="magnifyingglass" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowFilters(true)}
          >
            <IconSymbol name="slider.horizontal.3" size={20} color="#666" />
            <ThemedText style={styles.filterButtonText}>Filters</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity style={styles.scanButton}>
            <IconSymbol name="qrcode.viewfinder" size={20} color="#FFFFFF" />
            <ThemedText style={styles.scanButtonText}>Add Scan</ThemedText>
          </TouchableOpacity>
        </View>

        {/* Shipments Section */}
        <View style={styles.shipmentsSection}>
          <View style={styles.shipmentsHeader}>
            <ThemedText style={styles.shipmentsTitle}>Shipments</ThemedText>
            <TouchableOpacity onPress={toggleMarkAll} style={styles.markAllContainer}>
              <View style={styles.checkbox}>
                {markAll && <View style={styles.checkboxChecked} />}
              </View>
              <ThemedText style={styles.markAllText}>Mark All</ThemedText>
            </TouchableOpacity>
          </View>

          {/* Shipments List */}
          <FlatList
            data={filteredShipments}
            renderItem={renderShipmentItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ListEmptyComponent={
              <ThemedView style={styles.emptyContainer}>
                <ThemedText style={styles.emptyText}>No shipments found</ThemedText>
              </ThemedView>
            }
          />
        </View>
      </ScrollView>

      {/* Filter Modal Bottom Sheet */}
      <Modal
        visible={showFilters}
        transparent
        animationType="none"
        onRequestClose={cancelFilters}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={cancelFilters}
        >
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <TouchableOpacity activeOpacity={1}>
              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={cancelFilters}>
                  <ThemedText style={styles.modalCancelText}>Cancel</ThemedText>
                </TouchableOpacity>
                <ThemedText style={styles.modalTitle}>Filters</ThemedText>
                <TouchableOpacity onPress={applyFilters}>
                  <ThemedText style={[
                    styles.modalDoneText,
                    selectedFilters.size > 0 && styles.modalDoneTextActive
                  ]}>
                    Done
                  </ThemedText>
                </TouchableOpacity>
              </View>

              {/* Filter Options */}
              <View style={styles.filterSection}>
                <ThemedText style={styles.filterSectionTitle}>SHIPMENT STATUS</ThemedText>
                <View style={styles.filterOptions}>
                  {filterOptions.map((status) => {
                    const isSelected = selectedFilters.has(status);
                    return (
                      <TouchableOpacity
                        key={status}
                        style={[
                          styles.filterOption,
                          isSelected && styles.filterOptionSelected,
                        ]}
                        onPress={() => toggleFilter(status)}
                      >
                        <ThemedText
                          style={[
                            styles.filterOptionText,
                            isSelected && styles.filterOptionTextSelected,
                          ]}
                        >
                          {STATUS_LABELS[status]}
                        </ThemedText>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  profileButton: {
    width: 40,
    height: 40,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: 1,
  },
  bellButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
    marginTop: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingVertical: 12,
    gap: 8,
  },
  filterButtonText: {
    color: '#666666',
    fontSize: 16,
    fontWeight: '500',
  },
  scanButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A237E',
    borderRadius: 8,
    paddingVertical: 12,
    gap: 8,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  shipmentsSection: {
    marginBottom: 20,
  },
  shipmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  shipmentsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
  },
  markAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  markAllText: {
    fontSize: 14,
    color: '#007AFF',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    width: 12,
    height: 12,
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
  shipmentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    gap: 12,
  },
  packageIcon: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shipmentContent: {
    flex: 1,
  },
  shipmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  awbText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  routeText: {
    fontSize: 14,
    color: '#666666',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
    maxHeight: SCREEN_HEIGHT * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalCancelText: {
    fontSize: 16,
    color: '#007AFF',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  modalDoneText: {
    fontSize: 16,
    color: '#999999',
  },
  modalDoneTextActive: {
    color: '#007AFF',
    fontWeight: '600',
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  filterSectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  filterOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterOptionSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#007AFF',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#666666',
  },
  filterOptionTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
});