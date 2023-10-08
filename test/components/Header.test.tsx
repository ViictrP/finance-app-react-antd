import '@testing-library/jest-dom';
import '../window.mock';
import { fireEvent, render } from '@testing-library/react';
import { Header } from '../../src/components';
import { AuthUser, useUserSelector } from '../../src/stores/slices/user.slice';
import { useAuth } from '../../src/context/hooks';
import { Provider } from 'react-redux';
import { store } from '../../src/stores/store';
import { ReactNode } from 'react';

jest.mock('../../src/context/hooks', () => ({ useAuth: jest.fn() }));
const mockUseAuth = useAuth as jest.Mock;

jest.mock('../../src/stores/slices/user.slice', () => ({
  useUserSelector: jest.fn(),
}));
const useUserSelectMock = useUserSelector as jest.Mock;

afterEach(() => jest.clearAllMocks());

describe('Header', () => {
  it("should render the header component with user's name and avatar", () => {
    const user: AuthUser = {
      name: 'John Doe',
      photoUrl: 'https://example.com/avatar.jpg',
    };

    mockUseAuth.mockImplementation(() => ({
      logout: jest.fn(),
    }));

    useUserSelectMock.mockImplementation(() => ({
      authUser: user,
    }));

    const { getByAltText, getByText } = render(wrapInProvider(<Header />));

    expect(getByAltText('John Doe')).toBeInTheDocument();
    expect(getByText('John Doe')).toBeInTheDocument();
  });

  it("should log the user out when clicking on the 'sair' button", () => {
    const logout = jest.fn().mockResolvedValue(Promise.resolve({}));

    mockUseAuth.mockImplementation(() => ({
      logout,
    }));

    useUserSelectMock.mockImplementation(() => ({
      authUser: null,
    }));

    const { getByText } = render(wrapInProvider(<Header />));
    fireEvent.click(getByText('sair'));

    expect(logout).toHaveBeenCalled();
  });

  it("should render header without user's name and avatar when user is not logged in", () => {
    mockUseAuth.mockImplementation(() => ({
      logout: jest.fn(),
      user: null,
    }));

    useUserSelectMock.mockImplementation(() => ({
      authUser: null,
    }));

    const { queryByText, queryByAltText } = render(wrapInProvider(<Header />));

    expect(queryByAltText('user-avatar')).not.toBeInTheDocument();
    expect(queryByText('user-name')).not.toBeInTheDocument();
  });

  const wrapInProvider = (child: ReactNode) => (
    <Provider store={store}>{child}</Provider>
  );
});
