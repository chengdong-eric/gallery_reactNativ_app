import {
  ActivityIndicator,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from '../theme/styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';

const log = console.log;
export function DetailPage({ route }) {
  const [loading, setLoading] = useState(false);
  const { data } = route.params;
  log(data);
  /* {
    culture: 'Tibet',
    dimensions: '2 1/2 x 2 1/16 in. (6.3 x 5.2 cm)',
    medium: 'Clay',
    objectDate: 'ca. 8th century or later',
    objectID: 38851,
    objectURL: 'https://www.metmuseum.org/art/collection/search/38851',
    primaryImageSmall:
      'https://images.metmuseum.org/CRDImages/as/web-large/38_80_8_O1.jpg',
    title: 'Votive Plaque with Amitāyus',
  } */

  const handlePress = () => {
    Linking.openURL(data.objectURL).catch((err) => {
      console.error('Failed to open URL: ', err);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={[styles.title]}>{data.title}</Text>

        {loading && (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" style={{ marginVertical: 16 }} />
          </View>
        )}

        {data.primaryImage ? (
          <Image
            style={styles.fullImage}
            source={{ uri: data.primaryImage }}
            resizeMode="contain"
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onError={() => setLoading(false)}
          />
        ) : (
          <View
            style={{
              height: 120,
              width: 150,
              alignSelf: 'center',
              justifyContent: 'center',
              flexShrink: 1,
            }}>
            <Text style={styles.detailText}>
              There is no image for this artwork. Check it out on Met Museum
              website!
            </Text>
          </View>
        )}

        <View
          style={[
            styles.detailsContainer,
            {
              borderRadius: 16,
              backgroundColor: '#efefefff',
              paddingBlock: 16,
              paddingInline: 24,
            },
          ]}>
          <Text style={[styles.detailText, { paddingBlock: 4 }]}>
            <Text style={{ fontWeight: 'bold' }}>Culture: </Text>
            {data.culture}
          </Text>
          <Text style={[styles.detailText, { paddingBlock: 4 }]}>
            <Text style={{ fontWeight: 'bold' }}>Date: </Text> {data.objectDate}
          </Text>
          <Text style={[styles.detailText, { paddingBlock: 4 }]}>
            <Text style={{ fontWeight: 'bold' }}>Medium: </Text> {data.medium}
          </Text>
          <Text style={[styles.detailText, { paddingBlock: 4 }]}>
            <Text style={{ fontWeight: 'bold' }}>Dimensions: </Text>
            {data.dimensions}
          </Text>
          <Text style={styles.link} onPress={handlePress}>
            View on Met Museum website
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
