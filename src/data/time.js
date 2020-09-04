export function relativeTime(when) {
    let output = Math.round((new Date(Date.parse(when + " UTC")).getTime() - Date.now()) / 60000)
    if (isNaN(output)) {
        return "---"
    }
    return output > 60 ? Math.round(output/60)+"h" : output + "'"
}

export function clockTime(when) {
    let hours = new Date(Date.parse(when + " UTC")).getHours()
    let minutes = new Date(Date.parse(when + " UTC")).getMinutes()

    if (isNaN(hours) || isNaN(minutes)) {
        return "─=≡Σ((( つ◕ل͜◕)つ"
    }

    return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
}