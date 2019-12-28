export function dateToHHMM(date) {
    return new Date(Date.parse(date))
            .getHours()
            .toString()
            .padStart(2, "0") +
        ":" +
        new Date(Date.parse(date))
            .getMinutes()
            .toString()
            .padStart(2, "0")
}