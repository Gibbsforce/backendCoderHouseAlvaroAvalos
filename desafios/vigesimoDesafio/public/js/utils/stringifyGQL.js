export const stringifyGQL = (js_obj) => {
    if (typeof js_obj !== "object" || Array.isArray(js_obj)){
        return JSON.stringify(js_obj)
    }
    return `{${Object.keys(js_obj).map(key => `${key}:${stringifyGQL(js_obj[key])}`).join(",")}}`
}