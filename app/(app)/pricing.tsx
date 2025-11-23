import { View, Text, Platform, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/theme'
import { useAuth } from '@clerk/clerk-expo'

const PricingScreen = () => {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  }

  return (
    <View>
      <Text>PricingScreen</Text>
    </View>
  )
}

export default PricingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    paddingBottom: 80,
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },
  heroSection: {
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 48,
  },
  badgeContainer: {
    marginBottom: 24,
  },
  badge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: "rgba(144, 75, 255, 0.1)",
    borderColor: "rgba(144, 75, 255, 0.3)",
  },
  badgeText: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#904BFF",
  },
  proBadge: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: "rgba(144, 75, 255, 0.15)",
    borderColor: "rgba(144, 75, 255, 0.4)",
  },
  proBadgeText: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#904BFF",
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    marginBottom: 20,
    textAlign: "center",
    letterSpacing: -1.5,
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 20,
    textAlign: "center",
    lineHeight: 32,
    maxWidth: 600,
    fontWeight: "400",
    color: "#666666",
  },
  pricingSection: {
    paddingHorizontal: 24,
    marginBottom: 64,
  },
  sectionTitle: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 32,
    textAlign: "center",
    letterSpacing: -0.5,
    color: Colors.light.text,
  },
  pricingContainer: {
    marginBottom: 24,
  },
  pricingWrapper: {
    borderRadius: 24,
    overflow: "hidden",
  },
  nativeMessage: {
    padding: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 300,
    borderWidth: 1,
    backgroundColor: "#f8fafc",
    borderColor: "#e5e7eb",
    marginHorizontal: 24,
  },
  nativeMessageIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  nativeMessageText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "500",
    lineHeight: 26,
    color: Colors.light.text,
  },
  featuresSection: {
    paddingHorizontal: 24,
    marginBottom: 64,
  },
  featuresTitle: {
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 16,
    textAlign: "center",
    letterSpacing: -0.5,
    color: Colors.light.text,
  },
  featuresSubtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 48,
    lineHeight: 28,
    color: "#666666",
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    justifyContent: "center",
  },
  featureCard: {
    width: Platform.OS === "web" ? 340 : "100%",
    padding: 32,
    borderRadius: 24,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    borderColor: "#e5e7eb",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
      },
    }),
  },
  featureIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "rgba(144, 75, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  featureIcon: {
    fontSize: 32,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: -0.3,
    color: Colors.light.text,
  },
  featureDescription: {
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "400",
    color: "#666666",
  },
  trustBadge: {
    flexDirection: "row",
    alignItems: "center",
    padding: 28,
    borderRadius: 20,
    marginHorizontal: 24,
    marginBottom: 64,
    gap: 20,
    borderWidth: 1,
    backgroundColor: "#f0f9ff",
    borderColor: "#e0f2fe",
  },
  trustIcon: {
    fontSize: 36,
  },
  trustTextContainer: {
    flex: 1,
  },
  trustTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: Colors.light.text,
  },
  trustText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#666666",
  },
  profileSection: {
    paddingHorizontal: 24,
    marginBottom: 64,
  },
  profileWrapper: {
    borderRadius: 24,
    overflow: "hidden",
    ...Platform.select({
      web: {
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
      },
    }),
  },
  proFeaturesSection: {
    paddingHorizontal: 24,
    marginBottom: 48,
  },
  proFeaturesTitle: {
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 24,
    textAlign: "center",
    color: Colors.light.text,
  },
  proBenefitsList: {
    gap: 16,
  },
  proBenefitItem: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    ...Platform.select({
      web: {
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
      },
    }),
  },
  proBenefitText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  supportBadge: {
    flexDirection: "row",
    alignItems: "center",
    padding: 28,
    borderRadius: 20,
    marginHorizontal: 24,
    marginBottom: 28,
    gap: 20,
    borderWidth: 1,
    backgroundColor: "#fef3c7",
    borderColor: "#fde68a",
  },
  supportIcon: {
    fontSize: 36,
  },
  supportTextContainer: {
    flex: 1,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: Colors.light.text,
  },
  supportText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#666666",
  },
  logoutSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    minWidth: 200,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 2px 8px rgba(239, 68, 68, 0.2)",
        cursor: "pointer",
      },
    }),
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.5,
  },
});