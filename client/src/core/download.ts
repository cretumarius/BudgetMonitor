import RNFetchBlob, { RNFetchBlobConfig } from 'rn-fetch-blob';
import FileViewer from 'react-native-file-viewer';
import { Platform } from 'react-native';

export async function file(uri: string, extension: string) {
  const { config, fs } = RNFetchBlob;
  let DocumentsDir = Platform.select({
    android: fs.dirs.DownloadDir,
    ios: fs.dirs.DocumentDir,
  });
  const event = new Date().toDateString();
  let options = {
    addAndroidDownloads: {
      useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
      notification: true,
      description: 'Downloading file.',
      path: `${DocumentsDir}/exported-${event}${extension}`,
    },
    path: `${DocumentsDir}/exported-${event}${extension}`,
  } as RNFetchBlobConfig;
  return config(options).fetch('GET', uri);
}
