import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

export default function App() {
  const [load, setLoad] = useState(false);

  const handleSelectFile = async () => {
    try {
      const file = await DocumentPicker.getDocumentAsync('image/*', true, true);
      if (file && file.type === 'success') {
        console.log('====>', file);

        handleUpload(file);
      }

    } catch (error) {
      console.warn('ERROR SELECT FILE', error);
    }
  }

  const handleUpload = async (file) => {
    setLoad(true);
    try {
      const data = new FormData();
      data.append('file', {
        uri: file.uri,
        type: 'image/jpg',
        name: file.name
      });

      const conversationId = '';
      const date = new Date().getTime();
      const Authorization = '';
      const url = 'http://192.168.0.110:3001/multipart-upload';
      // const url = `http://192.168.0.110:7072/api/upload/file/${conversationId}/${date}`
      const response = await axios.post(
        url,
        data,
        {
          headers: {
            Authorization
          }
        }
      )

      console.log('===>>>', response.data);
    } catch (error) {
      console.warn('ERROR UPLOAD', error);
    }
    setLoad(false);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <TouchableOpacity
        onPress={handleSelectFile}
        style={styles.button}
        disabled={load}
      >
        <Text style={styles.textButton}>ARQUIVO</Text>
      </TouchableOpacity>

      { load && <Text>Aguarde, enviando...</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8
  },
  textButton: {
    fontSize: 20,
    color: '#fff'
  }
});
