import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Banner } from '_core';
import { Colors, Common, Mixins, Typography } from '_styles';
import { XButton } from '_atoms';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-community/clipboard';
import * as Animatable from 'react-native-animatable';
import { Divider } from 'react-native-elements';
import { ExportMenu } from '_organisms';
import { ExportOptionsEnum, OcrResponseModel } from '_models';
import { ExportService } from '_apiServices';
import FileViewer from 'react-native-file-viewer';

const exportService = new ExportService();
const ResultScreen = ({ _, route }: any) => {
  const { data } = route.params;
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onCopyToClipboardTap = () => {
    Clipboard.setString(data.text);
    Banner.showSuccess('Text copied to clipboard');
  };

  /*async function createPDF() {
    let options = {
      html: `<strong>${hardcodedText}</strong>`,
      fileName: 'exported',
      directory: 'Documents',
    };

    let file = await RNHTMLtoPDF.convert(options);
    // console.log(file.filePath);
    console.log(file.filePath);
  }*/

  const showFile = (path: string) => {
    FileViewer.open(path)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('Invalid path or deleted file.', error);
      });
  };

  const onUserChoiceCallback = async (choice: ExportOptionsEnum | undefined) => {
    setIsMenuVisible(false);
    if (choice === undefined) {
      return;
    }
    setIsLoading(true);
    switch (choice) {
      case ExportOptionsEnum.PDF: {
        exportService.downloadPdf(data as OcrResponseModel).then(async (res) => await showFile(res.path()));
        break;
      }
      case ExportOptionsEnum.WORD: {
        exportService.downloadWord(data as OcrResponseModel).then(async (res) => await showFile(res.path()));
        break;
      }
    }
  };

  return (
    <>
      <ScrollView style={Common.page}>
        <View style={styles.extractedTextContainer}>
          <View style={styles.extractedTextHeader}>
            <Text style={{ fontFamily: Typography.FONT_FAMILY_REGULAR, color: Colors.BLUE }}>
              {'Numărul de caractere'}
            </Text>
            <Text style={{ fontFamily: Typography.FONT_FAMILY_REGULAR, color: Colors.BLUE }}>
              {'Copiere in clipboard'}
            </Text>
          </View>
          <View style={styles.extractedTextHeader}>
            <Text style={{ fontFamily: Typography.FONT_FAMILY_MEDIUM, color: Colors.BLUE }}>{data.text?.length}</Text>
            <TouchableOpacity onPress={onCopyToClipboardTap}>
              <Animatable.View animation="bounceIn">
                <Icon name="clipboard-multiple-outline" color={Colors.BLUE} size={25} />
              </Animatable.View>
            </TouchableOpacity>
          </View>
          <Divider style={{ marginBottom: 20 }} />
          <Animatable.View animation="zoomIn">
            <Text style={styles.text}>{data.text}</Text>
          </Animatable.View>
        </View>
      </ScrollView>
      <XButton
        styles={{ margin: 30 }}
        title="Export"
        onPressCallback={() => setIsMenuVisible(true)}
        loading={isLoading}
      />
      <ExportMenu isMenuVisible={isMenuVisible} setIsMenuVisible={(value) => onUserChoiceCallback(value)} />
    </>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  extractedTextHeader: {
    marginVertical: 10,
    ...Mixins.flex_design('row', 'space-around', 'center'),
  },
  extractedTextContainer: {
    padding: 20,
    ...Common.card,
  },
  text: { fontSize: Typography.FONT_SIZE_16, fontFamily: Typography.FONT_FAMILY_REGULAR },
});
