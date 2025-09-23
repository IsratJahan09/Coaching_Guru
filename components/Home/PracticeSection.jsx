import { Image, Text, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Colors from "../../constant/Colors";
import { PracticeOptions } from "../../constant/Option";
import { useRouter } from "expo-router";
export default function PracticeSection() {
  const router = useRouter();
  return (
    <View style={{
      marginTop: 10,
      }}>
      <Text style={{
        fontSize: 25,
        fontFamily: "outfit-bold",
      }}>Practice</Text>

      <View>

      <FlatList 
      data={PracticeOptions}
      numColumns={3}
      renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => router.push('/practice/' + item.name)} key={index}
        style={{
          flex:1,
          margin:5,
          aspectRatio: 1,

        }}  
        >
            <Image source={item?.image} style={{
              width: "100%",
              height: "100%",
              borderRadius: 15,
              maxHeight: 160,
            }}  />
            <Text style={{
                position: "absolute",
                padding: 15,
              fontSize: 16,
              fontFamily: "outfit",
              color:Colors.WHITE,
            }}>{item.name}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  </View>

  );
}