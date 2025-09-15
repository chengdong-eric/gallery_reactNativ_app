import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Use expo install expo/vector-icons

const VehicleCard = () => (
  <View style={styles.card}>
    {/* Angled Banner */}
    <View style={styles.bannerContainer}>
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Vehicle Details</Text>
      </View>
    </View>

    {/* Top Right Title */}
    <Text style={styles.title}>Toyota Sequoia 2025</Text>

    {/* Date and Location */}
    <Text style={styles.subheading}>Jan. 5 - Jan. 12</Text>
    <Text style={styles.subheading}>Ottawa Center</Text>

    {/* Vehicle Image */}
    <Image
      style={styles.image}
      source={{ uri: 'https://www.toyota.com/imgix/responsive/images/mlp/colorizer/2025/sequoia/2182/2182_40_01.png' }}
      resizeMode="contain"
    />

    {/* Icons & Details */}
    <View style={styles.detailsContainer}>
      <DetailRow icon="engine" text="Engine: 3.4-Litre Twin Turbo V6" />
      <DetailRow icon="map-marker-distance" text="Distance Travelled: 1221 Miles" />
      <DetailRow icon="car-4x4" text="Off-road Capability: 4-Wheel Drive" />
      <DetailRow icon="account-group" text="Passenger space: 7" />
      <DetailRow icon="fuel" text="Fuel Efficiency: 12.6 L/100 km" />
    </View>
  </View>
);

const DetailRow = ({ icon, text }) => (
  <View style={styles.detailRow}>
    <MaterialCommunityIcons name={icon} size={24} color="#111" style={styles.detailIcon} />
    <Text style={styles.detailText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 16,
    padding: 16,
    elevation: 5,
    shadowColor: '#111',
    shadowOpacity: 0.15,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    position: 'relative',
  },
  bannerContainer: {
    position: 'absolute',
    left: 0, top: 0,
  },
  banner: {
    backgroundColor: '#447A59',
    height: 50,
    width: 180,
    justifyContent: 'center',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 24,
    transform: [{ skewX: '-15deg' }],
    zIndex: 2,
  },
  bannerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    marginLeft: 18,
    transform: [{ skewX: '15deg' }],
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111',
    marginTop: 16,
    marginLeft: 120,
  },
  subheading: {
    fontSize: 16,
    color: '#222',
    marginTop: 5,
    marginLeft: 4,
  },
  image: {
    width: '100%',
    height: 140,
    marginVertical: 14,
    alignSelf: 'center',
  },
  detailsContainer: {
    marginTop: 8,
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailIcon: {
    marginRight: 12,
  },
  detailText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
});

export default VehicleCard;
