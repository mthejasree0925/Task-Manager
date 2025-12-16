import { useLocalization } from '../contexts/LocalizationContext';

export const useTranslation = () => {
  const { t, locale, changeLanguage, loading } = useLocalization();
  
  return {
    t,
    locale,
    changeLanguage,
    loading,
  };
};