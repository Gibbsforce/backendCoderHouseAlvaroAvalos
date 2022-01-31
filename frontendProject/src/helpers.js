export const isPersistedLocal = stateName => {
    const localSate = localStorage.getItem(stateName)
    return localStorage && JSON.parse(localSate)
}