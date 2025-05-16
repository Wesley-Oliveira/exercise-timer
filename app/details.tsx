import { View, Text, Pressable } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Details() {
  const { exec, rest, rounds } = useLocalSearchParams<{
    exec: string;
    rest: string;
    rounds: string;
  }>();

  const router = useRouter();

  const execTime = parseInt(exec || "30");
  const restTime = parseInt(rest || "15");
  const totalRounds = parseInt(rounds || "3");

  const [isExercise, setIsExercise] = useState(true);
  const [counter, setCounter] = useState(execTime);
  const [currentRound, setCurrentRound] = useState(1);
  const [isRunning, setIsRunning] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playSound = async (type: "exec" | "rest") => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(
      type === "exec"
        ? require("../assets/sounds/exercise.wav")
        : require("../assets/sounds/rest.wav")
    );
    setSound(newSound);
    await newSound.playAsync();
  };

  useEffect(() => {
    playSound("exec");
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setCounter((prev) => {
        if (prev === 1) {
          playSound(isExercise ? "rest" : "exec");
          if (!isExercise && currentRound >= totalRounds) {
            clearInterval(intervalRef.current!);
            return 0;
          }

          if (isExercise) {
            setIsExercise(false);
            return restTime;
          } else {
            setIsExercise(true);
            setCurrentRound((r) => r + 1);
            return execTime;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [isRunning, isExercise]);

  const toggleRunning = () => setIsRunning((prev) => !prev);

  return (
    <View className="flex-1 items-center justify-center bg-zinc-950 px-6">
      <Text className="text-white text-2xl font-semibold mb-2">
        Série {currentRound} de {totalRounds}
      </Text>

      <Text className="text-5xl font-bold text-white mb-1">
        {isExercise ? "Exercício" : "Descanso"}
      </Text>

      <Text className="text-8xl font-mono text-yellow-400 mb-6">
        {counter}s
      </Text>

      <Pressable
        onPress={toggleRunning}
        className="bg-yellow-500 px-6 py-3 rounded-2xl flex-row items-center justify-center"
      >
        <Ionicons
          name={isRunning ? "pause" : "play"}
          size={24}
          color="#000"
          className="mr-2"
        />
        <Text className="text-black text-lg font-bold">
          {isRunning ? "Pausar" : "Continuar"}
        </Text>
      </Pressable>

      <Pressable
        onPress={() => router.back()}
        className="mt-8 bg-zinc-700 px-4 py-2 rounded-xl"
      >
        <Text className="text-white">Voltar</Text>
      </Pressable>
    </View>
  );
}