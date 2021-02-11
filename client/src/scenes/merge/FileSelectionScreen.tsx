import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { AccordionGroup, ExpandButton, File, XButton } from '_atoms';
import { BottomSheetStateModel, FileModel, SourcePickerEnum } from '_models';
import { XBottomSheet } from '_organisms';
import { PickerService } from '_controllerServices';
import { DocumentsPicker } from '_core';
import { AuthContext } from '_contexts';
import { MergeService } from '../../services/api/merge.service';
import FileViewer from 'react-native-file-viewer';

interface FileSet {
  id: number;
  name: string;
  files: FileModel[];
}
const data: FileSet[] = [
  { id: 1, name: 'Imagini', files: [] },
  { id: 2, name: 'PDF-uri', files: [] },
];

const shortid = require('shortid');

const pickerService = new PickerService();
const mergeApiService = new MergeService();

const FileSelectionScreen = () => {
  const { loginState } = useContext(AuthContext);
  const [state, setState] = useState<FileSet[]>(data);

  const [bottomSheetState, setBottomSheetState] = useState<BottomSheetStateModel>({
    isVisible: false,
    fileSetIndx: 0,
  });

  const onFileRemove = (fileSetIndex: number, fileId: string) => {
    const items = [...state];
    const fileSet = items[fileSetIndex];
    const fileToRemove = fileSet?.files.find((x) => x.id === fileId);
    const index = fileSet?.files.indexOf(fileToRemove, 0);
    if (index > -1) {
      fileSet.files.splice(index, 1);
    }
    setState(items);
  };

  function handleUserSelection(userChoice?: SourcePickerEnum) {
    if (userChoice === undefined) {
      setBottomSheetState({ isVisible: false, fileSetIndx: 0 });
      return;
    }
    DocumentsPicker.pick(userChoice, true).then((images) => {
      const items = [...state];
      const fileSet = items[bottomSheetState.fileSetIndx];
      images.forEach((img) =>
        fileSet.files.push({
          id: shortid.generate(),
          name: img.name,
          size: img.size,
          type: img.type,
          uri: img.uri,
        }),
      );
      setState(items);
      setBottomSheetState({ isVisible: false, fileSetIndx: 0 });
    });
  }

  const showFile = (path: string) => {
    FileViewer.open(path)
      .then(() => {})
      .catch((error) => {
        console.log('Invalid path or deleted file.', error);
      });
  };

  const onMergeTap = () => {
    const data = new FormData();
    state.forEach((fileSet) =>
      fileSet.files.forEach((f) =>
        data.append(`files`, {
          uri: f.uri,
          name: f.name,
          type: f.type,
        }),
      ),
    );
    mergeApiService
      .mergeDocuments(data, loginState.token as string)
      .then((resp) => mergeApiService.downloadPdf(resp.data).then((resp) => showFile(resp.path())));
  };

  return (
    <>
      <ScrollView style={{ flexGrow: 1 }}>
        <AccordionGroup>
          {state.map((fileSet, fileSetIndex) => (
            <ExpandButton
              key={fileSetIndex}
              id={fileSetIndex.toString()}
              onAdd={() => setBottomSheetState({ isVisible: true, fileSetIndx: fileSetIndex })}
              title={fileSet.name}
              fileCount={fileSet.files.length}
              maxFileCount={5}
            >
              {fileSet.files.map((file, index) => (
                <File
                  key={index}
                  uri={file.uri}
                  name={file.name}
                  removeCallback={() => onFileRemove(fileSetIndex, file.id)}
                />
              ))}
            </ExpandButton>
          ))}
        </AccordionGroup>
        <XBottomSheet
          visible={bottomSheetState.isVisible}
          options={pickerService.BottomSheetOptions}
          selectionCallback={(userChoice) => handleUserSelection(userChoice)}
        />
        {/*<Text style={styles.infoText}>{translate('Claims.DocumentsPicker.Info')}</Text>*/}
      </ScrollView>
      <XButton styles={{ padding: 20 }} title="Comasează documente" onPressCallback={onMergeTap} />
    </>
  );
};
export default FileSelectionScreen;
