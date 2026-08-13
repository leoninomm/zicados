import { GuestsData, PlayersData } from "../navigation/screens/CreatePaymentList";

export const strToDate = (str: string) => {
    const strSplit = str.split('/');

    return new Date(`${strSplit[1]}-${strSplit[0]}-${strSplit[2]}`);
};

const getLastDayOfMonth = (month: number, year: number) => {
    const MONTHS_WITH_31_DAYS = new Set([0, 2, 4, 6, 7, 9, 11]);
    if (month === 1) {
        if (year % 4 === 0) return 29;
        else return 28;
    }

    if (MONTHS_WITH_31_DAYS.has(month)) return 31;
    else return 30;
}

export const getNextSunday = () => {
    const today = new Date();

    const daysTillNextSunday = 7 - today.getDay();
    const thisDay = today.getDate();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();
    const daysInThisMonth = getLastDayOfMonth(thisMonth, thisYear);

    let nextSundayDate = thisDay + daysTillNextSunday;
    let nextSundayMonth = thisMonth;
    let nextSundayYear = thisYear;
    if (nextSundayDate > daysInThisMonth) {
        nextSundayDate = nextSundayDate - daysInThisMonth;
        nextSundayMonth ++;
        if (nextSundayMonth === 0) nextSundayYear ++;
    };

    return new Date(nextSundayYear, nextSundayMonth, nextSundayDate);
};

export const formatCurrency = (value: string) => {
    let num = value.split(' ')[1].replace(',', '');
    num = Number(num).toString();

    if (!num.length) return `R$ 0,00`;
    if (num.length < 2) return `R$ 0,0${num}`;
    if (num.length < 3) return `R$ 0,${num}`;
    
    const integer = num.slice(0, num.length - 2);
    const decimal = num.slice(num.length - 2);

    return `R$ ${integer},${decimal}`;
};

export const addTime = (time: string, max: string) => {
    let value = Number(time.split(':')[0]);
    let maxValue = Number(max.split(':')[0]);
    if (value === maxValue) return time;

    value ++;

    return `${value}:00`;
};

export const subtractTime = (time: string) => {
    let value = Number(time.split(':')[0]);
    if (!value) return time;

    value --;

    return `${value}:00`;
};

export const calculatePricePerSlot = (players: PlayersData, guests: GuestsData, price: string) => {
    let timeSlots: number[] = [];
    Object.values(players).map((player) => {
        const slot = Number(player.timePlayed.split(':')[0]);
        timeSlots.push(slot);
    });
    Object.values(guests).map((guest) => {
        const slot = Number(guest.timePlayed.split(':')[0]);
        timeSlots.push(slot);
    });

    const totalSlots = timeSlots.reduce((acc, slot) => { return acc + slot }, 0);

    const totalPrice = Number(price.split(' ')[1].replace(',', '.'));

    return totalPrice / totalSlots;
};

export const getPricePerPlayer = (players: PlayersData, slotPrice: number) => {
    let pricedPlayers: PlayersData = {};

    Object.values(players).map((player) => {
        const timeSlots = Number(player.timePlayed.split(':')[0]);
        const playerPrice = slotPrice * timeSlots;

        pricedPlayers[player.uid] = {
            ...player,
            amountOwed: playerPrice,
        };
    });

    return pricedPlayers;
};

export const getPricePerGuest = (guests: GuestsData, slotPrice: number) => {
    let pricedGuests: GuestsData = {};

    Object.values(guests).map((guest) => {
        const timeSlots = Number(guest.timePlayed.split(':')[0]);
        const guestPrice = slotPrice * timeSlots;

        pricedGuests[guest.id] = {
            ...guest,
            amountOwed: guestPrice,
        };
    });

    return pricedGuests;
};
