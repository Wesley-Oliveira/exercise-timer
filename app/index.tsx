import { View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform , Image } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";


export default function Home() {
  const [execTime, setExecTime] = useState("30");
  const [restTime, setRestTime] = useState("15");
  const [rounds, setRounds] = useState("3");

  const router = useRouter();

  const handleStart = () => {
    if (!execTime || !restTime || !rounds) return;
    router.push(`/details?exec=${execTime}&rest=${restTime}&rounds=${rounds}`);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 justify-center items-center bg-zinc-950 px-6"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Image
        source={require("../assets/logo.png")}
        style={{ width: 300, height: 300, resizeMode: "contain" }}
        className="mb-6"
      />

      <Text className="text-3xl font-bold text-yellow-400 mb-6">
        Timer Team Fighter
      </Text>

      <View className="w-full space-y-4">
        <View>
          <Text className="text-white mb-1">Tempo de Execução (segundos)</Text>
          <TextInput
            keyboardType="numeric"
            value={execTime}
            onChangeText={setExecTime}
            className="bg-zinc-800 text-white px-4 py-3 rounded-xl text-lg"
            placeholder="Ex: 30"
            placeholderTextColor="#aaa"
          />
        </View>

        <View>
          <Text className="text-white mb-1">Tempo de Descanso (segundos)</Text>
          <TextInput
            keyboardType="numeric"
            value={restTime}
            onChangeText={setRestTime}
            className="bg-zinc-800 text-white px-4 py-3 rounded-xl text-lg"
            placeholder="Ex: 15"
            placeholderTextColor="#aaa"
          />
        </View>

        <View>
          <Text className="text-white mb-1">Quantidade de Séries</Text>
          <TextInput
            keyboardType="numeric"
            value={rounds}
            onChangeText={setRounds}
            className="bg-zinc-800 text-white px-4 py-3 rounded-xl text-lg"
            placeholder="Ex: 3"
            placeholderTextColor="#aaa"
          />
        </View>

        <Pressable
          onPress={handleStart}
          className="bg-yellow-500 mt-6 py-4 rounded-2xl items-center"
        >
          <Text className="text-black text-lg font-bold">Iniciar</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}