export interface EtiquettePhrase {
  phrase: string;
  meaning: string;
  whenToUse: string;
}

export interface EtiquetteGuideSeed {
  title: string;
  tradition: string;
  setting: string;
  summaryFocus: string;
  wearRequired: string[];
  wearAvoid: string[];
  wearNotes: string;
  bringHelpful: string[];
  bringAvoid: string[];
  bringNotes: string;
  arrivalWindow: string;
  arrivalTimingDetails: string;
  arrivalFlow: string;
  whatHappens: string[];
  whatHappensNotes: string;
  participationDo: string[];
  participationAvoid: string[];
  participationNotes: string;
  commonMistakes: string[];
  phrases: EtiquettePhrase[];
  phraseNotes: string;
  relatedLinks: { label: string; href: string }[];
}
