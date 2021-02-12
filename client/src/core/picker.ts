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

export async function ocrPick(userChoice: SourcePickerEnum) {
  return new Promise((resolve) => {
    switch (userChoice) {
      case SourcePickerEnum.LivePhoto: {
        ImagePicker.openCamera({
          mediaType: 'photo',
          forceJpg: true,
          cropping: true,
          freeStyleCropEnabled: true,
          width: 1200, // Add this
          height: 1500, // Add this
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
            });
          })
          .catch((err) => console.log(err));
        break;
      }
      case SourcePickerEnum.PhotoLibrary: {
        ImagePicker.openPicker({
          mediaType: 'photo',
          forceJpg: true,
          cropping: true,
          freeStyleCropEnabled: true,
          width: 1200, // Add this
          height: 1500, // Add this
        })
          .then((images) => {
            resolve({
              name: Platform.select({
                ios: images.filename,
                android: images.path.substring(images.path.lastIndexOf('/') + 1),
              }),
              size: images.size,
              type: images.mime,
              uri: images.path,
              mime: images.mime,
            });
          })
          .catch((err) => console.log(err));
        break;
      }
      case SourcePickerEnum.Files: {
        loadFiles(true)
          .then((files) => {
            const file = files[0];
            resolve({
              name: file.name,
              size: file.size,
              type: file.type,
              uri: file.uri,
            });
          })
          .catch((err) => console.log(err));
        break;
      }
      default:
        resolve([]);
    }
  });
}

export async function pick(userChoice: SourcePickerEnum) {
  return new Promise((resolve, reject) => {
    switch (userChoice) {
      case SourcePickerEnum.LivePhoto: {
        ImagePicker.openCamera({
          forceJpg: true,
          compressImageMaxWidth: 750,
          compressImageQuality: 1,
          mediaType: 'photo',
        })
          .then((image) => {
            const splitUri = image.path.split('/');
            resolve([
              {
                name: Platform.select({
                  ios: image.filename || splitUri[splitUri.length - 1],
                  android: image.path.substring(image.path.lastIndexOf('/') + 1),
                }),
                size: image.size,
                type: image.mime,
                uri: image.path,
              },
            ]);
          })
          .catch((err) => console.log(err));
        break;
      }
      case SourcePickerEnum.PhotoLibrary: {
        ImagePicker.openPicker({
          multiple: true,
          mediaType: 'photo',
          compressImageMaxWidth: 590,
          compressImageQuality: 1,
        })
          .then((images) => {
            resolve(
              images.map((image) => ({
                name: Platform.select({
                  ios: image.filename,
                  android: image.path.substring(image.path.lastIndexOf('/') + 1),
                }),
                size: image.size,
                type: image.mime,
                uri: image.path,
              })),
            );
          })
          .catch((err) => console.log(err));
        break;
      }
      case SourcePickerEnum.Files: {
        loadFiles(false).then((files) =>
          resolve(
            files.map((file) => ({
              name: file.name,
              size: file.size,
              type: file.type,
              uri: file.uri,
            })),
          ),
        );
        break;
      }
      default:
        resolve([]);
    }
  });
}

async function loadFiles(ocr: boolean) {
  let allowedTypes;
  if (ocr) {
    allowedTypes = DocumentPicker.types.images;
  } else {
    allowedTypes = [DocumentPicker.types.pdf, DocumentPicker.types.images];
  }
  // Pick multiple files
  try {
    const results = await DocumentPicker.pickMultiple({
      type: Platform.select({
        ios: allowedTypes,
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
      throw err;
    } else {
      throw err;
    }
  }
}
