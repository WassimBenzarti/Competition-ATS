export default function getEmojiByOrder(order) {
    switch (order) {
        case 0:
            return "👑"
        case 1:
            return "😎"
        default:
            return ""
    }
}