export function relativeTime(when) {
    return relativeToTime(when, Date.now())
}

export function relativeToTime(when, relative) {
    let output = (new Date(Date.parse(when + " UTC")).getTime() - relative) / 60000
    if (output > 0)
        output = Math.floor(output)
    else
        output = Math.ceil(output)

    if (isNaN(output)) {
        return "---"
    }

    if (output === -1) {
        // returning 0 for convenience, because -1 can confuse people if the departure is actually right now
        return "0'"
    }

    return (output >= 0 ? "+" : "-") + (output > 60 ? Math.round(output/60)+"h" : output + "'")
}

export function clockTime(when) {
    let hours = new Date(Date.parse(when + " UTC")).getHours()
    let minutes = new Date(Date.parse(when + " UTC")).getMinutes()

    if (isNaN(hours) || isNaN(minutes)) {
        return "─=≡Σ((( つ◕ل͜◕)つ"
    }

    return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
}