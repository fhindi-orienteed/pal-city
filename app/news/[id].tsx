import BusinessDetails from '@/sections/business/details';
import { useLocalSearchParams } from 'expo-router';

export default function NewsDetailsScreen() {
  const { id } = useLocalSearchParams();

  return (
    <BusinessDetails id={id.toString()} />
  );
}
