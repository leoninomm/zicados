export const strToDate = (str: string) => {
    const strSplit = str.split('/');

    return new Date(`${strSplit[1]}-${strSplit[0]}-${strSplit[2]}`);
};