// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

// const PlaySoundScreen = () => {
//   const [result, setResult] = React.useState([]);

//   const handleError = () => {
//     if (DocumentPicker.isCancel(err)) {
//       console.warn('cancelled');
//       // User cancelled the picker, exit any dialogs or menus and move on
//     } else if (isInProgress(err)) {
//       console.warn(
//         'multiple pickers were opened, only the last will be considered',
//       );
//     } else {
//       throw err;
//     }
//   };

//   console.log(result);
//   return (
//     <View
//       style={{alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
//

//
//     </View>
//   );
// };

import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';

import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

function PlaySoundScreen() {
  const [files, setFiles] = useState([]);

  const getFileContent = async path => {
    const reader = await RNFS.readDir(path);
    setFiles(reader);
  };

  console.log(files);
  useEffect(() => {
    getFileContent(RNFS.DownloadDirectoryPath); //run the function on the first render.
  }, []);

  const folderPath = RNFS.DocumentDirectoryPath + '/sound';

  const makeDirectory = async folderPath => {
    await RNFS.mkdir(folderPath); //create a new folder on folderPath
  };

  useEffect(() => {
    makeDirectory(folderPath); //execute this function on first mount
    getFileContent(RNFS.DocumentDirectoryPath); //this function was defined in the previous example
  }, []);

  const filePath = RNFS.DocumentDirectoryPath + '/joke.txt'; //absolute path of our file
  const fileContent = "Why do programmers wear glasses? \n They can't C#!";

  const makeFile = async (filePath, content) => {
    try {
      //create a file at filePath. Write the content data to it
      await RNFS.writeFile(filePath, content, 'utf8');
      console.log('written to file');
    } catch (error) {
      //if the function throws an error, log it out.
      console.log(error);
    }
  };

  const [fileData, setFileData] = useState();

  const readFile = async path => {
    const response = await RNFS.readFile(path);
    setFileData(response); //set the value of response to the fileData Hook.
  };
  useEffect(() => {
    readFile(filePath);
  }, []);
  //extra code removed for brevity..
  useEffect(() => {
    makeFile(filePath, fileContent);
    getFileContent(RNFS.DocumentDirectoryPath);
  }, []);
  //this component will render our list item to the UI
  const Item = ({name, isFile}) => {
    return (
      <View>
        <Text style={styles.name}>Name: {name}</Text>
        <Text> {isFile ? 'It is a file' : "It's a folder"}</Text>
      </View>
    );
  };
  const renderItem = ({item, index}) => {
    return (
      <View>
        <Text style={styles.title}>{index}</Text>
        {/* The isFile method indicates whether the scanned content is a file or a folder*/}
        <Item name={item.name} isFile={item.isFile()} />
      </View>
    );
  };

  var audio = new Sound(
    '/data/user/0/com.react_native_demo/files/sound/Heat Waves  Glass animals x HighCloud Cover Full Version (1).mp3',
    Sound.MAIN_BUNDLE,
    error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // if loaded successfully
      console.log(
        'duration in seconds: ' +
          audio.getDuration() +
          'number of channels: ' +
          audio.getNumberOfChannels(),
      );
    },
  );

  return (
    <SafeAreaView>
      <FlatList
        data={files}
        renderItem={renderItem}
        keyExtractor={item => item.name}
      />

      <TouchableOpacity
        onPress={async () => {
          try {
            const fileSelected = await DocumentPicker.pickSingle({
              presentationStyle: 'fullScreen',
              copyTo: 'cachesDirectory',
              type: 'audio/mpeg',
            });
            const destPath = `${RNFS.DocumentDirectoryPath + '/sound'}/${
              fileSelected.name
            }`;
            await RNFS.copyFile(fileSelected.uri, destPath);

            console.log(destPath);
          } catch (e) {
            console.log(e);
          }
        }}>
        <Text>Copy</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={async () => {
          try {
            audio.play(success => {
              if (success) {
                console.log('successfully finished playing');
              } else {
                console.log('playback failed due to audio decoding errors');
              }
            });
          } catch (e) {
            console.log(e);
          }
        }}>
        <Text>Play</Text>
      </TouchableOpacity>

      <Text style={styles.name}>{fileData}</Text>
    </SafeAreaView>
  );
}

export default PlaySoundScreen;

const styles = StyleSheet.create({});
