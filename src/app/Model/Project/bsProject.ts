import { Business } from '../Business/Business';
import { bsClient } from '../Business/bsClient';
import { bsInvoice } from '../Business/bsInvoice';
import { bsPrChannel } from './bsPrChannel';
import { bsPrDocsCategory } from './bsPrDocsCategory';
import { bsPrDocs } from './bsPrDocs';
import { bsPrKBCategory } from './bsPrKBCategory';
import { bsPrKB } from './bsPrKB';
import { bsPrTask } from './bsPrTask';

export class bsProject {
    public id: number | null;

    public name: string | null;

    public isCompleted: boolean | null;

    public created: Date | null;

    public dueDate: Date | null;

    public business: Business | number | null;

    public client: bsClient | number | null;

    public invoices: bsInvoice[] | number | null;

    public channels: bsPrChannel[] | number | null;

    public docsCategories: bsPrDocsCategory[] | number | null;

    public docs: bsPrDocs[] | number | null;

    public kbCategories: bsPrKBCategory[] | number | null;

    public kbs: bsPrKB[] | number | null;

    public tasks: bsPrTask[] | number | null;

    public bsProject(
        id: number | null,
        name: string | null,
        isCompleted: boolean | null,
        created: Date | null,
        dueDate: Date | null,
        business: Business | number | null,
        client: bsClient | number | null,
        invoices: bsInvoice[] | number | null,
        channels: bsPrChannel[] | number | null,
        docsCategories: bsPrDocsCategory[] | number | null,
        docs: bsPrDocs[] | number | null,
        kbCategories: bsPrKBCategory[] | number | null,
        kbs: bsPrKB[] | number | null,
        tasks: bsPrTask[] | number | null,
    ) {
        if (id) this.id = id;
        if (name) this.name = name;
        if (isCompleted) this.isCompleted = isCompleted;
        if (created) this.created = created;
        if (dueDate) this.dueDate = dueDate;
        if (business) this.business = business;
        if (client) this.client = client;
        if (invoices) this.invoices = invoices;
        if (channels) this.channels = channels;
        if (docsCategories) this.docsCategories = docsCategories;
        if (docs) this.docs = docs;
        if (kbCategories) this.kbCategories = kbCategories;
        if (kbs) this.kbs = kbs;
        if (tasks) this.tasks = tasks;
    }
}
