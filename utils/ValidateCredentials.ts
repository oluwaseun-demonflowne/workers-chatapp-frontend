export const validateCredentials = async (
  credentials: Record<string, unknown>
) => {
  // Input validation
  if (!credentials?.email) {
    throw new Error("Email is required");
  }
  try {
    return {
      id: "1",
      email: credentials.email as string
    };
  } catch {
    throw new Error("Authentication failed");
  }
};
