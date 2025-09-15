import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 16,
    elevation: 5,
    shadowColor: '#111',
    shadowOpacity: 0.15,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
    backgroundColor: '#cedfffff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: '#111',
    marginVertical: 8,
    alignSelf: 'center',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    marginVertical: 16,
    alignSelf: 'center',
  },
  detailsContainer: {
    flex: 1,
    marginTop: 8,
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  detailIcon: {
    marginRight: 8,
  },
  detailText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  fullImage: {
    maxHeight: '100%',
    aspectRatio: 1,
    width: 360,
    marginVertical: 8,
    alignSelf: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default styles;
