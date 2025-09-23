import {View , Text, Image, TouchableOpacity,} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React from 'react';
import * as Progress from 'react-native-progress';
import Colors from '../../constant/Colors';
import { imageAssets } from '../../constant/Option';

export default function CourseProgressCard({ item, width=280}) {
  const GetCompletedChapters=(course)=> {
        const completedChapter = course?.completedChapter?.length;
        const perc = completedChapter/course?.chapters?.length;
        return perc;
    }
     return (
        <View style={{
                    margin: 7,
                    padding: 15,
                    backgroundColor: Colors.WHITE,
                    borderRadius: 15,
                    width: width,
                }}>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        gap: 8,
                    }} >
                              <Image source={imageAssets[item?.banner_image]}
                              style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 8,
                                }}
                              />
                            <View style={{
                                flex: 1,
                            }}
                                >
                                <Text
                                numberOfLines={2}
                                 style = {{
                                    fontSize: 19,
                                    fontFamily: 'outfit-bold',
                                    flexWrap: 'wrap',
                                }}
                                >{item?.courseTitle}</Text>
                                <Text style={{
                                    fontFamily: 'outfit',
                                    fontSize: 15,
                                }}
                                >{item?.chapters?.length} Chapters</Text>
                            </View>
                    </View>
                      <View style={{
                        marginTop: 10,
                      }}
                        >
                        <Progress.Bar progress={GetCompletedChapters(item)} width={width-30} />
                        <Text style={{
                            fontFamily: 'outfit',
                            marginTop: 2,
                        }}>{item?.completedChapter?.length ?? 0} Out of {item.chapters?.length} Chapters Completed</Text>

                      </View>
                </View>
      )
}