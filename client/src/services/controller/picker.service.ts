import { SourcePickerEnum, BottomSheetOptionsModel } from '_models';

export class PickerService {
  public BottomSheetOptions: BottomSheetOptionsModel[];
  public BottomSheetOptionsForImages: BottomSheetOptionsModel[];

  constructor() {
    this.BottomSheetOptions = [
      {
        optionName: 'Cameră foto',
        optionId: SourcePickerEnum.LivePhoto,
      },
      {
        optionName: 'Galerie foto',
        optionId: SourcePickerEnum.PhotoLibrary,
      },
      {
        optionName: 'Fișiere',
        optionId: SourcePickerEnum.Files,
      },
    ];

    /*this.BottomSheetOptionsForImages = [
      {
        optionName: 'Cameră foto',
        optionId: SourcePickerEnum.LivePhoto,
      },
      {
        optionName: 'Galerie foto',
        optionId: SourcePickerEnum.PhotoLibrary,
      },
    ];*/
  }

  public getSizeInMb = (value: number) => `${(value / Math.pow(1024, 2)).toPrecision(3)} MB`;

  public getUploadProgressInPercentage = (total: number, loaded: number) => (loaded * 100) / total;
}
