import moment from "moment";

export const getCurrentTime = () => {
    const date = new Date();
    return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export const getCurrentDate = () => {
    // const date = new Date();
    // return date.toDateString();
    return moment();
}

export const formatDate = (date) => {
    return date.format('ddd, MMM D');
}