import { data } from "../consents/ConsentList/data";
import { ConsentsLabels } from "../consents/GiveConsent/config";
import { Consent, ConsentType } from "../interfaces/consents";

export const postConsent = async (newConsent: Consent): Promise<Consent> => {
  const consentsWithLabels = newConsent.consents.map((consent) => {
    const label = ConsentsLabels[consent as ConsentType];
    return label;
  });

  const newConsentWithLabels = { ...newConsent, consents: consentsWithLabels };
  const dataInLocalStorage = localStorage.getItem("consents-data");

  if (!dataInLocalStorage) {
    const updatedItems = [newConsentWithLabels, ...data];
    localStorage.setItem("consents-data", JSON.stringify(updatedItems));
  } else {
    const parsedItems = JSON.parse(dataInLocalStorage);
    const updatedItems = [newConsentWithLabels, ...parsedItems];
    localStorage.setItem("consents-data", JSON.stringify(updatedItems));
  }

  return Promise.resolve(newConsent);
  /*  When calling an api this would change to
   **
   ** const response = await axios.post(API_URL, payload)
   ** const data = response.data
   */
};

export const getConsents = async (): Promise<Consent[]> => {
  const dataInLocalStorage = localStorage.getItem("consents-data");
  if (!dataInLocalStorage) {
    localStorage.setItem("consents-data", JSON.stringify(data));
    return Promise.resolve(data);
  }

  return Promise.resolve(JSON.parse(dataInLocalStorage));
  /*  When calling an api this would change to
   **
   ** const response = await axios.fetch(API_URL)
   ** return response.data;
   */
};
