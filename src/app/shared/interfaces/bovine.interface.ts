import {Race} from './enuns/race.enum'
import {Sex} from './enuns/sex.enum'
import {Situation} from './enuns/situation.enum'

export interface Bovine {
    id: string;
    earring: string;
    name: string;
    urlImage: string;
    situation: Situation;
    sex: Sex;
    motherEarring: string;
    fatherEarring: string;
    race: Race;
    dateOfBirth: Date;
    pregnancyDate: Date;
    nextDueDate: Date;
    lastBirthDate: Date
}