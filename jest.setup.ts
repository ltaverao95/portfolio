import '@testing-library/jest-dom';

jest.mock("lucide-react", () => ({
  Check: () => "Check",
  ChevronDown: () => "ChevronDown",
  ChevronUp: () => "ChevronUp",
  Loader2: () => "Loader2",
}));

jest.mock("./src/lib/http/axios-http-handler", () => ({
    post: jest.fn().mockResolvedValue({}),
}));