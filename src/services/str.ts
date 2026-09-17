function humanize(name: string) {
    const sname = name.replaceAll("-", " ").replaceAll("_", "");
    return sname.charAt(0).toUpperCase() + sname.slice(1);
}


function humanizeNumber(num: number, trunc = false): string {
    if (num === 0) return '0';
    const divisor = 1024;
    const suffixes = ['', 'k', 'M', 'B', 'T'];
    let suffixIndex = 0;
    let value = num;
    while (value >= divisor && suffixIndex < suffixes.length - 1) {
        value /= divisor;
        suffixIndex++;
    }
    const finalValue = trunc ? Math.trunc(value) : Number(value.toFixed(1));
    const displayValue = (finalValue as number) % 1 === 0 ? (finalValue as number).toString() : finalValue.toString();
    return `${displayValue}${suffixes[suffixIndex]}`;
}

const formatDuration = (ms: number, unitCls?: string) => {
    const seconds = ms / 1000;
    const minutes = seconds / 60;
    if (ms < 1000) {
        const v = Math.round(ms);
        const u = unitCls ? `<span class="${unitCls}">ms</span>` : "ms";
        return `${v}${u}`;
    };
    if (seconds < 60) {
        const v = Math.round(seconds);
        const u = unitCls ? `<span class="${unitCls}">ms</span>` : "s";
        return `${v}${u}`;
    }
    const u1 = unitCls ? `<span class="${unitCls}">mn</span>` : "mn";
    const u2 = unitCls ? `<span class="${unitCls}">s</span>` : "s";
    return `${minutes.toFixed()}${u1} ${Math.round(seconds % 60)}${u2}`;
}

export {
    humanize,
    humanizeNumber,
    formatDuration,
}