import { useState, useEffect } from 'react';
import { featureFlagService } from '../services/featureFlagService';

export const useFeatureFlags = () => {
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeatureFlags();
  }, []);

  const loadFeatureFlags = async () => {
    try {
      const featureFlags = await featureFlagService.getFeatureFlags();
      setFlags(featureFlags);
    } catch (error) {
      console.error('Failed to load feature flags:', error);
    } finally {
      setLoading(false);
    }
  };

  const isFeatureEnabled = (feature: string): boolean => {
    return flags[feature] || false;
  };

  return {
    flags,
    loading,
    isFeatureEnabled,
    refreshFlags: loadFeatureFlags,
  };
};