

export default  class ResponsiveUtils {
    static choose = (options) => {
        if (options.mobile && window.innerWidth <= 767) {
            return options.mobile;
        }
        if (options.tablet && window.innerWidth <= 991) {
            return options.tablet;
        }
        if (options.computer && window.innerWidth >= 992 &&
            window.innerWidth < 1200) {
            return options.computer;
        }
        if (options.large && window.innerWidth <= 1919) {
            return options.large;
        }
        if (options.widescreen && window.innerWidth >= 1920) {
            return options.widescreen;
        }
        return options.other;
    }
}