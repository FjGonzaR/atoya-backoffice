import { Client } from "../entity/Client"
import { Material } from "../entity/Material";
export interface Attachment {
    filename: string;
    content: Buffer;
}

export interface EmailContent {
    from : string;
    to : string;
    subject : string;
    html? : string;
    attachments? : Attachment[]
}
export interface FormRequest{
    description: string;
    physic_unit: string;
    equipment: string;
    serial_number: string;
    reference: string;
    observations: string;
    pending_observations: string;
    vfn: number;
    vft: number;
    vnt: number;
    ups_dosing: boolean;
    beginning_hour: Date;
    finishing_hour: Date;
    officer : string;
    revisions : string;
}

export interface IForm{
    id: string;
    description: string;
    physic_unit: string;
    equipment: string;
    serial_number: string;
    reference: string;
    observations: string;
    pending_observations: string;
    precedents : string;
    type: string;
    vfn: number | string;
    vft: number | string;
    vnt: number | string;
    ups_dosing: boolean | string;
    beginning_hour: Date | string;
    finishing_hour: Date | string;
    officer: string;
    revisions: string;
    revisionsPdf? : string;
    created_at: Date | string;
    client: Client;
    planningOrder: IPlanningOrder;
    materials: Material []
}
interface IPlanningOrder {

    activities: boolean | string;

    responsabilities: boolean | string;

    considerations: boolean | string;

    conclusions: string;

    officer : string;
}