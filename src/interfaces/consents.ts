export interface Consent {
  email: string;
  name: string;
  consents: string[];
}

export type ConsentType = "ads" | "newsletter" | "statistics";

export interface ConsentFormErrors extends Omit<Consent, "consents"> {
  consents: string;
}
