export enum FormType {
    TIPO_1 = 'Tipo1',
    TIPO_2 = 'Tipo2'
}
interface Attachment {
    filename: string;
    content: any;
}

export interface EmailContent {
    from : string;
    to : string;
    subject : string;
    html : string;
    attachment : Attachment[]
}