/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        colors: {
            "primary-01": "var(--primary-01)",
            "secondary-01": "var(--secondary-01)",
            "secondary-02": "var(--secondary-02)",
        },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
        },
        extend: {
            spacing: {
                '1': '0.1rem',
                '2': '0.5rem',
                '3': '1rem',
                '4': '1.5rem',
                '5': '2.5rem',
            },
            borderRadius: {
                '4xl': '2rem',
            },
            transitionDuration: {
                'default': '215ms',
            }
        }
    },
    plugins: [],
}
