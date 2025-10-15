import { render, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../auth-context";
import { LanguageProvider } from "../language-context";
import { useRouter } from "next/navigation";

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
  it("should handle login and logout", () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    const { getByTestId, getByText } = render(
      <LanguageProvider>
        <AuthProvider>
          <TestComponent />
        </AuthProvider>
      </LanguageProvider>
    );

    expect(getByTestId("is_authenticated").textContent).toBe("false");

    act(() => {
      getByText("Login").click();
    });

    act(() => {
      getByText("Logout").click();
    });

    expect(getByTestId("is_authenticated").textContent).toBe("false");
    expect(push).toHaveBeenCalledWith("routes.login");
  });
});
