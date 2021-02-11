import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { SourcePickerEnum } from '_models';
import { Platform } from 'react-native';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '_utils';

export function clean() {
  ImagePicker.clean()
    .then(() => {
      console.log('✅ Removed all tmp images from tmp directory');
    })
    .catch((e) => {
      console.log('Failed to remove all tmp images from tmp directory. Error' + e);
    });
}

export async function pick(userChoice: SourcePickerEnum, allowMultipleSelection?: boolean) {
  return new Promise((resolve, reject) => {
    switch (userChoice) {
      case SourcePickerEnum.LivePhoto: {
        ImagePicker.openCamera({
          mediaType: 'photo',
          forceJpg: true,
          cropping: true,
          compressImageMaxWidth: 750,
          compressImageQuality: 1,
        })
          .then((image) => {
            const splitUri = image.path.split('/');
            resolve({
              name: Platform.select({
                ios: image.filename || splitUri[splitUri.length - 1],
                android: image.path.substring(image.path.lastIndexOf('/') + 1),
              }),
              size: image.size,
              type: image.mime,
              uri: image.path,
              data: image.data,
            });
          })
          .catch((err) => console.log(err));
        break;
      }
      case SourcePickerEnum.PhotoLibrary: {
        ImagePicker.openPicker({
          includeBase64: true,
          mediaType: 'photo',
          width: SCREEN_WIDTH,
          compressImageMaxWidth: 750,
          compressImageQuality: 1,
          multiple: allowMultipleSelection,
        })
          .then((images) => {
            if (Array.isArray(images)) {
              resolve(
                images.map((i) => ({
                  name: Platform.select({
                    ios: i.filename,
                    android: i.path.substring(i.path.lastIndexOf('/') + 1),
                  }),
                  size: i.size,
                  type: i.mime,
                  uri: i.path,
                  data: i.data,
                })),
              );
            } else {
              resolve({
                name: Platform.select({
                  ios: images.filename,
                  android: images.path.substring(images.path.lastIndexOf('/') + 1),
                }),
                size: images.size,
                type: images.mime,
                uri: images.path,
                mime: images.mime,
                data: images.data,
              });
            }
          })
          .catch((err) => console.log(err));
        break;
      }
      case SourcePickerEnum.Files: {
        loadFiles()
          .then((files) =>
            resolve(
              files.map((file) => ({
                name: file.name,
                size: file.size,
                type: file.type,
                uri: file.uri,
              })),
            ),
          )
          .catch((err) => console.log(err));
        break;
      }
      default:
        resolve([]);
    }
  });
}

async function loadFiles() {
  // Pick multiple files
  try {
    const results = await DocumentPicker.pickMultiple({
      type: Platform.select({
        ios: [DocumentPicker.types.pdf, DocumentPicker.types.images],
        android: DocumentPicker.types.pdf,
      }),
      copyTo: 'cachesDirectory',
    });
    results.forEach((f) => (f.uri = f.fileCopyUri));
    return results;
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the picker, exit any dialogs or menus and move on
      console.log('User cancelled the picker, exit any dialogs or menus and move on');
      return [];
    } else {
      throw err;
    }
  }
}
