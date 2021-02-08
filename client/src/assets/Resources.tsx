import React from 'react';
import ImageUpload from '_assets/images/image_upload.svg';
import ScanDocument from '_assets/images/scan_document.svg';
import Scanner from '_assets/images/document_scanner.svg';
import Merge from '_assets/images/merge.svg';

import FileIcon from '_assets/images/file_gray.svg';
import PlusIcon from '_assets/images/plus.svg';

import TrashIcon from '_assets/images/trash';

export const File = (props: any) => <FileIcon {...props} />;
export const Plus = (props: any) => <PlusIcon {...props} />;

export const Trash = (props: any) => <TrashIcon {...props} />;

export const ImageUploadSVG = () => <ImageUpload />;
export const ScanDocumentSVG = (props: any) => <ScanDocument {...props} />;
export const ScannerSVG = (props: any) => <Scanner {...props} />;
export const MergeSVG = (props: any) => <Merge {...props} />;

export const LoadingSpinnerBig = require('_assets/animations/loading_spinner_big.json');
export const LoadingSpinnerSmall = require('_assets/animations/loading_spinner_small.json');
export const ActivationCompletedSpinner = require('_assets/animations/activation_completed_spinner.json');
export const ActivationFailedSpinner = require('_assets/animations/loading_error.json');
