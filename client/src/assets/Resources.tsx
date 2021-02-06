import React from 'react';
import ImageUpload from '_assets/images/image_upload.svg';
import ScanDocument from '_assets/images/scan_document.svg';
import Scanner from '_assets/images/document_scanner.svg';

export const ImageUploadSVG = () => <ImageUpload />;
export const ScanDocumentSVG = (props: any) => <ScanDocument {...props} />;
export const ScannerSVG = (props: any) => <Scanner {...props} />;

export const LoadingSpinnerBig = require('_assets/animations/loading_spinner_big.json');
export const LoadingSpinnerSmall = require('_assets/animations/loading_spinner_small.json');
export const ActivationCompletedSpinner = require('_assets/animations/activation_completed_spinner.json');
export const ActivationFailedSpinner = require('_assets/animations/loading_error.json');
