export default function getWindowDimensions() {
    const { innerWidth: windowWidth } = window;
    const width = document.documentElement.clientWidth || windowWidth;
    const isScreenWide = width > 1024;
    return {
        width,
        isScreenWide,
    };
}