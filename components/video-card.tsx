import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useState } from "react";
import { icons } from "@/constants";
import YoutubePlayer from "react-native-youtube-iframe";
import { getYouTubeVideoID } from "@/lib/helpers";

interface Props {
  video: Record<string, any>;
}

const VideoCard = ({ video }: Props) => {
  const { title, thumbnail, creator, video: videoUri } = video ?? {};
  const [play, setPlay] = useState(false);

  const onStateChange = useCallback((state: string) => {
    if (state === 'paused' || state === "ended") {
      setPlay(false);
    }
  }, []);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center  items-center flex-row flex-1">
          <View className="size-[46px] rounded-lg border border-secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: creator.avatar }}
              className="rounded-lg size-full"
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-gray-100 font-pregular text-xs"
              numberOfLines={1}
            >
              {creator.username}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="size-5" resizeMode="contain" />
        </View>
      </View>

      {play ? (
        <View className="h-60 w-full mt-3">
          <YoutubePlayer
            height={240}
            play={play}
            videoId={getYouTubeVideoID(videoUri)}
            onChangeState={onStateChange}
            webViewStyle={{
              height: 240,
              width: '100%',
              borderRadius: 35,
              backgroundColor: "white",
            }}

          />
        </View>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="size-full mt-3 rounded-xl"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="size-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({});
