import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
} from 'react-native';
export default function ItemsList({serachItem, handlePress}) {
  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handlePress(item)} style={style.service}>
      <View>
        <Text>{item.label}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={serachItem}
      renderItem={renderItem}
      contentContainerStyle={style.flatlist}
    />
  );
}

const style = StyleSheet.create({
  flatlist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
    marginTop: 30,
  },
  service: {
    borderWidth: 2,
    borderColor: 'grey',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
});
