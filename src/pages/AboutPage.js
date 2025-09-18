import { Image, Text, View } from 'react-native';
import styles from '../theme/styles';

export function AboutPage() {
  return (
    <View
      style={[
        styles.container,
        { justifyContent: 'flex-start', paddingHorizontal: 16 },
      ]}>
      <Text style={styles.title}>Who is Eric?</Text>

      <View style={styles.card}>
        <Text style={styles.subheading}>Eric's interests:</Text>
        <Text>
          Running, Meditation, Photography, Coding, more Coding, more Running,
          learning about consciousness from Steve(!!??)
        </Text>
      </View>
      <View style={{ height: 24 }}></View>
      <View style={styles.card}>
        <Text style={styles.subheading}>What he looks like:</Text>
        <Image
          source={require('../../assets/IMG_1716_s.jpeg')}
          style={styles.profilePicture}
          alt="A photo of Eric"
        />
      </View>
    </View>
  );
}
