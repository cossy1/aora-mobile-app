import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '@/constants'
import AppButton from './app-button'
import { router } from 'expo-router'

interface Props {
    title: string,
    subtitle: string
}

const EmptyState = ({ title, subtitle }: Props) => {
    return (
        <View className='justify-center items-center px-4'>
            <Image source={images.empty} className='w-[270px] h-[215px]' resizeMode='contain' />

            <Text className='font-psemibold text-xl text-center text-white mt-2'>
                {title}
            </Text>

            <Text className='font-pmedium text-sm text-gray-100'>
                {subtitle}
            </Text>

            <AppButton title='Create Video' containerStyles='my-5 w-full' handlePress={() => router.push('/(tabs)/create')} />
        </View>
    )
}

export default EmptyState

const styles = StyleSheet.create({})