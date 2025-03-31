import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "@/components/search-input";
import EmptyState from "@/components/empty-state";
import { searchPosts } from "@/lib/appwrite";
import { useAppWrite } from "@/lib/useAppWrite";
import VideoCard from "@/components/video-card";
import { useLocalSearchParams } from "expo-router";

export default function SearchScreen() {
  const { query } = useLocalSearchParams();

  const { data: posts, refetch } = useAppWrite(searchPosts(String(query)));

  useEffect(() => {
    refetch();
  }, [query]);

  console.log("posts::::", posts);

  return (
    <SafeAreaView className=" bg-primary h-full">
      <FlatList
        data={posts?.documents ?? []}
        renderItem={({ item }) => <VideoCard video={item} />}
        keyExtractor={(item) => item.$id}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="text-gray-100 font-pmedium text-sm">
              Search Results
            </Text>
            <Text className="text-white font-psemibold text-2xl">{query}</Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery={query as string} />

            </View>

          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos found for this search query"
            subtitle="Be the first person to upload a video"
          />
        )}
      // refreshControl={
      //   <RefreshControl onRefresh={onRefresh} />
      // }
      />
    </SafeAreaView>
  );
}
