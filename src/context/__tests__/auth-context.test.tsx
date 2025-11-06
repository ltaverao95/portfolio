import React from "react";
import { render, act, screen } from "@testing-library/react";
import { AuthProvider, useAuth } from "../auth-context";
import { LanguageProvider } from "../language-context";
import { useRouter } from "next/navigation";

process.env.NEXT_PUBLIC_API_BACKEND_URL = "http://localhost:3001";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn().mockReturnValue("/"),
}));

jest.mock("../language-context", () => ({
  useLanguage: () => ({
    translate: (key: string) => key,
  }),
  LanguageProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

const TestComponent = () => {
  const { is_authenticated, is_loading, login, logout } = useAuth();
  return (
    <div>
      <div data-testid="is_authenticated">{is_authenticated.toString()}</div>
      <div data-testid="is_loading">{is_loading.toString()}</div>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("AuthProvider", () => {
  it("should handle logout", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    // Set initial state to authenticated
    localStorage.setItem("auth_token", "test_token");

    render(
      <LanguageProvider>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </LanguageProvider>
    );

    expect(screen.getByTestId("is_authenticated").textContent).toBe("true");

    await act(async () => {
      screen.getByText("Logout").click();
    });

    expect(screen.getByTestId("is_authenticated").textContent).toBe("false");
    expect(push).toHaveBeenCalledWith("routes.login");
  });
});