export const featureFlags = {
  ENABLE_DARK_MODE: true,
  ENABLE_NOTIFICATIONS: false,
  ENABLE_ANALYTICS: true,
  ENABLE_BETA_FEATURES: false,
} as const;

export type FeatureFlag = keyof typeof featureFlags;