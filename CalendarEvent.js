export class CalendarEvent {
    constructor(eventData) {
        this.id = eventData.id;
        this.dayOfWeek = eventData.dayOfWeek;
        this.date = eventData.date;
        this.time = eventData.time || "00:00";
    }

    getFullDateTime() {
        return `${this.time} - ${this.dayOfWeek}, ${this.date}`;
    }

    isWeekend() {
        return this.dayOfWeek === 'Chủ nhật' || this.dayOfWeek === 'Thứ bảy';
    }
}