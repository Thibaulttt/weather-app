export default function applyTheme(label) {
    switch(label) {
        case "light":
            return "lightTheme.css";
        case "dark":
            return "darkTheme.css";
        default:
            console.warn("unknown theme");
            return "lightTheme.css";
    }
}
