import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Sidebar from './Sidebar';
import { ThemeProvider } from '../ThemeProvider';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/analytics',
}));

// Mock window.matchMedia which next-themes requires
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe('Sidebar Theme Toggle', () => {
  beforeEach(() => {
    // Reset document.documentElement classes
    document.documentElement.className = '';
    localStorage.clear();
  });

  it('renders the theme toggle button and switches theme on click', async () => {
    render(
      <ThemeProvider>
        <Sidebar />
      </ThemeProvider>
    );

    // Initial state: ThemeProvider is configured with defaultTheme="light"
    // Wait for the component to be mounted (Sidebar has state 'mounted')
    const button = await screen.findByTitle('Toggle Dark Mode');
    expect(button).toBeInTheDocument();

    // Check that initial theme class is applied (defaults to light, class name is "light" or empty since it's the default)
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Click the toggle button to switch to dark mode
    act(() => {
      fireEvent.click(button);
    });

    // Verify document class list was updated to dark
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Click again to switch back to light
    act(() => {
      fireEvent.click(button);
    });

    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });
});
