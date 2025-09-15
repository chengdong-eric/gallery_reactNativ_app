import { View, Text, Image, StyleSheet } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../theme/styles';
const ArtCard = ({
  title,
  culture,
  objectDate,
  primaryImageSmall,
  pressed,
}) => (
  <View style={[styles.card, pressed && styles.cardPressed]}>
    <Text style={styles.title}>{title}</Text>
    {primaryImageSmall ? (
      <Image
        style={styles.image}
        source={{
          uri: primaryImageSmall,
        }}
        resizeMode="contain"
      />
    ) : (
      <Text style={{ alignSelf: 'center', height: 80 }}>
        Missing preview image from Metmuseum API
      </Text>
    )}
    <View style={styles.detailsContainer}>
      <DetailRow icon="globe-model" text={culture} />
      <DetailRow icon="calendar-text" text={objectDate} />
    </View>
  </View>
);

const DetailRow = ({ icon, text }) => (
  <View style={styles.detailRow}>
    <MaterialCommunityIcons
      name={icon}
      size={24}
      color="#111"
      style={styles.detailIcon}
    />
    <Text style={styles.detailText}>{text}</Text>
  </View>
);

/* const styles = StyleSheet.create({
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
    left: 0,
    top: 0,
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
    alignSelf: 'center',
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
    flexShrink: 1,
  },
}); */

export default ArtCard;
