import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  gridContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    justifyContent: 'space-between',
  },
  categoryItem: {
    alignItems: 'center',
    width: "25%",
    marginBottom: 12,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 12,
    textAlign: 'center',
  },
  expandButton: {
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 4,
  },
});

export default styles;
