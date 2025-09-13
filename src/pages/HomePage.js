import styles from '../theme/styles';
import { useNavigation } from '@react-navigation/native';
import { Button, RefreshControl, ScrollView, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailPage } from './DetailPage';
import { useEffect, useState } from 'react';
const Stack = createNativeStackNavigator();
const artSearchURL =
  'https://collectionapi.metmuseum.org/public/collection/v1/';

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home Page" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailPage} />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const onRefresh = () => {
    console.log('Homepage refresh');

    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  useEffect(() => {
    const loadData = async () => {
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

        //TODO: 2/ Fetch details of 20 objects and save into array object
        // 3/ Save array into state
        // 4/ State update triggers loading cards on page
        // 5/ Make flatlist

        const fetchPromises = artIdArray.map((id) => fetchArtDetails(id));
        const results = await Promise.all(fetchPromises);

        setData(results);
      } catch (error) {
        console.error('Fetch error', error);
      }
    };
    // loadData();
  }, []);

  return (
    <ScrollView
      // style={styles.container}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details Page"
        onPress={() => navigation.navigate('Detail', {})}>
        Button
      </Button>
    </ScrollView>
  );
}

/* async function getArtIds() {
  let url = new URL(artSearchURL + 'objects');
  const queryParams = {
    departmentIds: '6',
  };
  url.search = new URLSearchParams(queryParams).toString();

  fetch(url)
    .then((resp) => {
      if (!resp.ok) throw new Error('No artwork available');
      return resp.json();
    })
    .then((data) => {
      // data: { total: Int, objectIDs: [Int] }
      // TODO: 1/ finish fetching data and randomizing for 20 results
      // 
      let totalObjects = data.objectIDs;
      const shuffled20Objects = shuffle(totalObjects).slice(0, 20);
      return shuffled20Objects;
    })
    .then((ids) => {
      setData(fetchAllArt(ids));
    })
    .catch((err) => {
      console.warn(err.message);
    });
} */

async function fetchArtDetails(id) {
  let url = new URL(artSearchURL + 'objects' + `/${id}`);
  try {
    const resp = await fetch(url);
    if (!resp.ok) throw new Error(`Fetching art with id: ${id} failed`);
    const data = await resp.json();

    const {
      objectID,
      primaryImageSmall,
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
