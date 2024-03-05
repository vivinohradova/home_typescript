// Фасад для онлайн-платформи управління концертами


class ConcertDataSubsystem {
    saveConcert(concertData: { id: number, name: string, date: string, location: string }): void {
        console.log("Concert data saved:", concertData);
    }

    getConcert(id: number): { id: number, name: string, date: string, location: string } {
        console.log("Concert data retrieved for id:", id);
        return { id: id, name: "Concert", date: "2024-03-27", location: "City" };
    }
}

class ParticipantRegistrationSubsystem {
    registerParticipant(participantData: { id: number, name: string, email: string }): void {
        console.log("Participant registered:", participantData);
    }

    getParticipant(id: number): { id: number, name: string, email: string } {
        console.log("Participant retrieved for id:", id);
        return { id: id, name: "Vikky Vi", email: "vivi@gmail.com" };
    }
}

class ConcertManagementFacade {
    private concertData: ConcertDataSubsystem;
    private registration: ParticipantRegistrationSubsystem;

    constructor() {
        this.concertData =  new ConcertDataSubsystem();
        this.registration = new ParticipantRegistrationSubsystem();
    }

    saveConcert(concertData: { id: number, name: string, date: string, location: string }): void {
        this.concertData.saveConcert(concertData);
    }

    getConcert(id: number): { id: number, name: string, date: string, location: string } {
        return this.concertData.getConcert(id);
    }

    registerParticipant(participantData: { id: number, name: string, email: string }): void {
        this.registration.registerParticipant(participantData);
    }

    getParticipant(id: number): { id: number, name: string, email: string } {
        return this.registration.getParticipant(id);
    }
}

const concertFacade = new ConcertManagementFacade();
concertFacade.saveConcert({ id: 1, name: "Concert", date: "2024-05-27", location: "Kharkiv" });
concertFacade.registerParticipant({ id: 1, name: "Vikky", email: "vivi@gmail.com" });
