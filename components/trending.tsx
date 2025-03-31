import {
    FlatList,
    Image,
    ImageBackground,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useCallback, useState } from "react";
import * as Animatable from "react-native-animatable";
import { icons } from "@/constants";
import YoutubePlayer from "react-native-youtube-iframe";
import { getYouTubeVideoID } from "@/lib/helpers";

interface ITrendingItemProps {
    activeItem: Record<string, string>;
    item: Record<string, string>;
}

const TrendingItem = ({ activeItem, item }: ITrendingItemProps) => {
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state: string) => {
        if (state === 'paused' || state === "ended") {
            setPlaying(false);
        }
    }, []);

    return (
        <Animatable.View
            className="mr-5"
            animation={activeItem?.$id === item?.$id ? "zoomInUp" : "zoomIn"}
            // animation="zoomInUp"
            duration={500}
        >
            {playing ? (
                <YoutubePlayer
                    height={288}
                    width={288}
                    play={playing}
                    videoId={getYouTubeVideoID(item?.video)}
                    onChangeState={onStateChange}
                    webViewStyle={{
                        height: 288,
                        borderRadius: 35,
                        backgroundColor: "white",
                    }}
                />
            ) : (
                <TouchableOpacity
                    className="relative justify-center items-center"
                    onPress={() => setPlaying(!playing)}
                    activeOpacity={0.7}
                >
                    <ImageBackground
                        className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-black/40 shadow-lg"
                        resizeMode="cover"
                        source={{ uri: item?.thumbnail }}
                    />

                    <Image
                        source={icons.play}
                        className="size-12 absolute"
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
};

const Trending = ({ posts }: { posts: Record<string, any>[] }) => {
    const [activeItem, setActiveItem] = useState(posts[0]);

    return (
        <FlatList
            data={posts}
            keyExtractor={(post: any) => post.$id}
            renderItem={({ item }) => (
                <TrendingItem activeItem={activeItem} item={item} />
            )}
            horizontal
        />
    );
};

export default Trending;
