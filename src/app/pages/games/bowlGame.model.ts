import { Bowl } from './bowl.model';
import { Team } from '../teams/team.model';

export class BowlGame {
    constructor(
        public id: number,
        public bowlId: number,
        public bowl: Bowl,
        public teamId1: number,
        public team1: Team,
        public teamId2: number,
        public team2: Team,
        public date: Date,
        public channel: string,
        public points: number,
    ) {}
}
