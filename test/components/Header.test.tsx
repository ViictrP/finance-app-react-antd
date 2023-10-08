import '@testing-library/jest-dom';
import '../window.mock';
import { fireEvent, render } from '@testing-library/react';
import { Header } from '../../src/components';
import { AuthUser } from '../../src/stores/slices/user.slice';
import { useAuth } from '../../src/context/hooks';

jest.mock('../../src/context/hooks', () => ({ useAuth: jest.fn() }));
const mockUseAuth = useAuth as jest.Mock;

afterEach(() => jest.clearAllMocks());

//TODO: Fix this test
describe.skip('Header', () => {
  it("should render the header component with user's name and avatar", () => {
    const user: AuthUser = {
      name: 'John Doe',
      photoUrl: 'https://example.com/avatar.jpg',
    };

    mockUseAuth.mockImplementation(() => ({
      logout: jest.fn(),
      user,
    }));

    const { getByAltText, getByText } = render(<Header />);

    expect(getByAltText('John Doe')).toBeInTheDocument();
    expect(getByText('John Doe')).toBeInTheDocument();
  });

  it("should log the user out when clicking on the 'sair' button", () => {
    const logout = jest.fn().mockResolvedValue(Promise.resolve({}));

    mockUseAuth.mockImplementation(() => ({
      logout,
      user: null,
    }));

    const { getByText } = render(<Header />);
    fireEvent.click(getByText('sair'));

    expect(logout).toHaveBeenCalledWith({
      logoutParams: { returnTo: window.location.origin },
    });
  });

  it("should render header without user's name and avatar when user is not logged in", () => {
    mockUseAuth.mockImplementation(() => ({
      logout: jest.fn(),
      user: null,
    }));

    const { queryByText, queryByAltText } = render(<Header />);

    expect(queryByAltText('user-avatar')).not.toBeInTheDocument();
    expect(queryByText('user-name')).not.toBeInTheDocument();
  });
});
