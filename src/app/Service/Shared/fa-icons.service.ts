import { Injectable } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
    faGripVertical,
    faUser,
    faUsers,
    faUserGroup,
    faUserPlus,
    faBook,
    faFile,
    faFolder,
    faFolderOpen,
    faFileLines,
    faFileImport,
    faDoorOpen,
    faDownload,
    faLocationDot,
    faCommentDots,
    faComment,
    faHome,
    faCube,
    faFolderTree,
    faCircleNodes,
    faPersonArrowUpFromLine,
    faUserTie,
    faAddressCard,
    faEnvelope,
    faPhone,
    faBuilding,
    faGlobe,
    faCalendar,
    faMoneyBill,
    faMoneyBillWave,
    faListCheck,
    faDiagramProject,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
@Injectable({
    providedIn: 'root',
})
export class FaIconsService {
    public readonly faTrash: IconDefinition = faTrash;
    public readonly faDiagramProject: IconDefinition = faDiagramProject;
    public readonly faListCheck: IconDefinition = faListCheck;
    public readonly faMoneyBillWave: IconDefinition = faMoneyBillWave;
    public readonly faMoneyBill: IconDefinition = faMoneyBill;
    public readonly faCalendar: IconDefinition = faCalendar;
    public readonly faGlobe: IconDefinition = faGlobe;
    public readonly faBuilding: IconDefinition = faBuilding;
    public readonly faPhone: IconDefinition = faPhone;
    public readonly faGripVertical: IconDefinition = faGripVertical;
    public readonly faUserTie: IconDefinition = faUserTie;
    public readonly faUser: IconDefinition = faUser;
    public readonly faUsers: IconDefinition = faUsers;
    public readonly faUserGroup: IconDefinition = faUserGroup;
    public readonly faUserPlus: IconDefinition = faUserPlus;
    public readonly faBook: IconDefinition = faBook;
    public readonly faFile: IconDefinition = faFile;
    public readonly faFolder: IconDefinition = faFolder;
    public readonly faFolderOpen: IconDefinition = faFolderOpen;
    public readonly faFileLines: IconDefinition = faFileLines;
    public readonly faFileImport: IconDefinition = faFileImport;
    public readonly faDoorOpen: IconDefinition = faDoorOpen;
    public readonly faDownload: IconDefinition = faDownload;
    public readonly faLocationDot: IconDefinition = faLocationDot;
    public readonly faCommentDots: IconDefinition = faCommentDots;
    public readonly faComment: IconDefinition = faComment;
    public readonly faHome: IconDefinition = faHome;
    public readonly faCube: IconDefinition = faCube;
    public readonly faFolderTree: IconDefinition = faFolderTree;
    public readonly faCircleNodes: IconDefinition = faCircleNodes;
    public readonly faPersonArrowUpFromLine: IconDefinition =
        faPersonArrowUpFromLine;
    public readonly faEnvelope: IconDefinition = faEnvelope;
    public readonly faAddressCard: IconDefinition = faAddressCard;

    constructor() {}
}
