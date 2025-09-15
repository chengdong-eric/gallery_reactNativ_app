import styles from '../theme/styles';
import { useNavigation } from '@react-navigation/native';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailPage } from './DetailPage';
import { useEffect, useState } from 'react';
import ArtCard from '../components/artCard';
const Stack = createNativeStackNavigator();
const artSearchURL =
  'https://collectionapi.metmuseum.org/public/collection/v1/';

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home Page">
      <Stack.Screen
        name="Home Page"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={DetailPage} />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const onRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const renderItem = ({ item }) => {
    return (
      <View style={[{ marginVertical: 16 }]}>
        <Pressable
          onPress={() => {
            console.log('pressed', item.objectID);
            navigation.navigate('Detail', { data: item });
          }}>
          {({ pressed }) => {
            return (
              <ArtCard
                title={item.title}
                culture={item.culture}
                objectDate={item.objectDate}
                primaryImageSmall={item.primaryImageSmall}
                pressed={pressed}
              />
            );
          }}
        </Pressable>
      </View>
    );
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    let url = new URL(artSearchURL + 'objects');
    const queryParams = {
      departmentIds: '6',
    };
    url.search = new URLSearchParams(queryParams).toString();

    try {
      const resp = await fetch(url);
      if (!resp.ok)
        throw new Error('Failed to get art objects from Met museum');

      const data = await resp.json();
      let artIdArray = shuffle(data.objectIDs).slice(0, 20);

      const fetchPromises = artIdArray.map((id) => fetchArtDetails(id));
      const results = await Promise.all(fetchPromises);
      setData(results);
    } catch (error) {
      console.error('Fetch error', error);
      setError(error.message);
    } finally {
      console.log(data[0]);
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <ActivityIndicator size="large" />
          <Text>Loading....</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (error !== null) {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 20 }}>
            Unable to load artworks
          </Text>
          <Text
            style={{
              color: 'red',
              textAlign: 'center',
              margin: 16,
              fontSize: 16,
            }}>
            Error: {error}. Pull to refresh to try again.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item, index) =>
          item.objectID?.toString() || `fallback-${index}`
        }
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <Text style={{ alignSelf: 'center' }}>
            For Steve: Scroll up to refresh to get more art!
          </Text>
        }
      />
    </SafeAreaView>
  );
}

async function fetchArtDetails(id) {
  let url = new URL(artSearchURL + 'objects' + `/${id}`);
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Fetching art with id: ${id} failed`);
    const data = await resp.json();

    const {
      objectID,
      primaryImageSmall,
      primaryImage,
      title,
      objectDate,
      medium,
      dimensions,
      culture,
      objectURL,
    } = data;

    return {
      objectID,
      primaryImageSmall,
      primaryImage,
      title,
      objectDate,
      medium,
      dimensions,
      culture,
      objectURL,
    };
  } catch (err) {
    console.warn(`failed when fetching artwork id: ${id}`, err);
  }
}

function shuffle(arr) {
  for (let i = arr.length; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
}
