export enum FormType {
    TIPO_1 = 'Tipo1',
    TIPO_2 = 'Tipo2'
}
export interface Attachment {
    filename: string;
    content: any;
}

export interface EmailContent {
    from : string;
    to : string;
    subject : string;
    html? : string;
    attachment? : Attachment[]
}
export interface FormRequest{
    description: string;
    physic_unit: string;
    equipment: string;
    serial_number: string;
    reference: string;
    observations: string;
    pending_observations: string;
    type: FormType;
    vfn: boolean;
    vft: boolean;
    vnt: boolean;
    ups_dosing: boolean;
    beginning_hour: Date;
    finishing_hour: Date;
    officer : string;
    revisions : string;
}