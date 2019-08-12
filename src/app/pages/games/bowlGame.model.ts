export class BowlGame {
    constructor(
        public id: number,
        public bowlId: number,
        public bowlName: string,
        public teamId1: number,
        public team1Name: string,
        public teamId2: number,
        public team2Name: string,
        public date: Date,
        public channel: string,
        public points: number,
    ) {}
}
