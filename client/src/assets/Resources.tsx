import React from 'react';
import ImageUpload from '_assets/images/image_upload.svg';
import ScanDocument from '_assets/images/scan_document.svg';
import Scanner from '_assets/images/document_scanner.svg';
import Merge from '_assets/images/merge.svg';

import FileIcon from '_assets/images/file_gray.svg';
import PlusIcon from '_assets/images/plus.svg';

import TrashIcon from '_assets/images/trash';

import Avatar from '_assets/images/avatar.jpg';

import Biometrics from '_assets/images/biometrics.png';

export const File = (props: any) => <FileIcon {...props} />;
export const Plus = (props: any) => <PlusIcon {...props} />;

export const Trash = (props: any) => <TrashIcon {...props} />;

export const ImageUploadSVG = () => <ImageUpload />;
export const ScanDocumentSVG = (props: any) => <ScanDocument {...props} />;
export const ScannerSVG = (props: any) => <Scanner {...props} />;
export const MergeSVG = (props: any) => <Merge {...props} />;
export const BiometricsImg = Biometrics;

export const Av = Avatar;

export const LoadingSpinnerBig = require('_assets/animations/loading_spinner_big.json');
export const LoadingSpinnerSmall = require('_assets/animations/loading_spinner_small.json');
export const Complete = require('_assets/animations/activation_completed_spinner.json');
export const ActivationFailedSpinner = require('_assets/animations/loading_error.json');
