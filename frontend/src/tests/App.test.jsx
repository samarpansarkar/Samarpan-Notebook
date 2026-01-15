import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '@/App';

// Mock the API client to prevent network calls
vi.mock('../api/client', () => {
    return {
        default: {
            get: vi.fn(() => Promise.resolve({ data: [] })),
            post: vi.fn(() => Promise.resolve({ data: {} })),
            interceptors: {
                request: { use: vi.fn() },
                response: { use: vi.fn() }
            },
            create: vi.fn(() => ({}))
        }
    }
});

import { Provider } from 'react-redux';
import { store } from '@/store/store';

describe('App', () => {
    it('renders without crashing', async () => {
        // Wrap with Redux Provider
        const { container } = render(
            <Provider store={store}>
                <App />
            </Provider>
        );
        expect(container).toBeDefined();
    });
});
