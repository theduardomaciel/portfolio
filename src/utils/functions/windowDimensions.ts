export default function getWindowDimensions() {
    const { innerWidth: width } = window;
    const isScreenWide = width > 1024;
    return {
        width,
        isScreenWide,
    };
}