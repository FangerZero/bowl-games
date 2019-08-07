export class Game {
    constructor(
        public id: number,
        public bowlId: number,
        public teamId1: number,
        public teamId2: number,
        public date: Date,
        public channel: string,
        public points: number,
    ) {}
}
