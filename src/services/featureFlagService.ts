// Mock feature flag service - in real app, this would connect to Firebase Remote Config
export const featureFlagService = {
  async getFeatureFlags(): Promise<Record<string, boolean>> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      enablePreferences: true,
      enableAppearance: true,
      enableTaskSearch: true,
    };
  },

  async isFeatureEnabled(feature: string): Promise<boolean> {
    const flags = await this.getFeatureFlags();
    return flags[feature] || false;
  },
};