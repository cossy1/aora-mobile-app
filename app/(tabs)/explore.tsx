import { StyleSheet, Text, View } from 'react-native';

export default function ExploreScreen() {
  return (
    <View className='flex items-center justify-center h-screen'>
      <Text className='text-3xl text-red-600'>Explore Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
