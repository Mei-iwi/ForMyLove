export class EventManager {
    constructor(jsonData) {
        const parsedData = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;

        this.events = parsedData.events || [];
    }

    getAllEvents() {
        return this.events;
    }

    getEventById(id) {
        return this.events.find(event => event.id === id);
    }

    getEventsByDayOfWeek(dayOfWeek) {
        return this.events.filter(event => event.dayOfWeek == dayOfWeek);
    }

    getEventsByDate(date) {
        return this.events.filter(event => event.date === date);
    }


}