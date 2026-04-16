import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', 'Verdana', 'Arial', 'sans-serif'],
            },
            colors: {
                afri: {
                    terra: { DEFAULT: '#C85A1E', dark: '#A8481A', light: '#F9E8DC' },
                    amber: { DEFAULT: '#D4920A', light: '#FEF3D0' },
                    green: { DEFAULT: '#1B7A52', dark: '#155E3F', light: '#E0F2EB' },
                    cream: { DEFAULT: '#FDF6EC', 2: '#FDF0E0' },
                    border: { DEFAULT: '#E8D0B0', 2: '#D4B890' },
                    text: { DEFAULT: '#1C1008', 2: '#7A5535', 3: '#B89070' },
                    error: { DEFAULT: '#C0392B', light: '#FDECEA' },
                    blue: { DEFAULT: '#2563EB', light: '#EEF4FF' },
                    purple: { DEFAULT: '#7C3AED', light: '#F5F0FF' },
                },
            },
            keyframes: {
                blink: {
                    '0%, 80%, 100%': { opacity: '0.25' },
                    '40%': { opacity: '1' },
                },
            },
            animation: {
                blink: 'blink 1.2s ease-in-out infinite',
            },
        },
    },
    plugins: [],
}

export default config