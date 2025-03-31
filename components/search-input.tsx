import {
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import { icons } from "@/constants";
import { router, usePathname } from "expo-router";
import { useState } from "react";

interface Props {
    value?: string;
    handleSearch?: (value: string) => void;
    otherStyles?: string;
}

const SearchInput = ({ initialQuery }: { initialQuery?: string }) => {

    const pathname = usePathname();
    const [query, setQuery] = useState(initialQuery || '');

    const handleOnPress = () => {
        if (!query) {
            return Alert.alert('Please enter a text')
        }

        if (pathname.startsWith('/search')) {
            router.setParams({ query })
        }
        else {
            router.push(`/search/${query}`)
        }

    }

    return (
        <View className="w-full h-16 px-4 space-x-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
            <TextInput
                className="flex-1 text-white font-pregular text-base mt-0.5"
                value={query}
                placeholder="Search for a video topic"
                placeholderTextColor="#CDCDE0"
                onChangeText={e => setQuery(e)}
            />

            <TouchableOpacity onPress={handleOnPress}>
                <Image source={icons.search} resizeMode="contain" className="size-5 " />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;
