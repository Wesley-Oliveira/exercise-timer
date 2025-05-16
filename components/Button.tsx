import { Text, Pressable } from "react-native";

export function Button({ onPress, children }: { onPress: () => void; children: React.ReactNode }) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-blue-600 p-3 rounded w-full items-center"
    >
      <Text className="text-white font-semibold text-lg">{children}</Text>
    </Pressable>
  );
}