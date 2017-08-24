import * as wjcCore from 'wijmo/wijmo';

export class PageBackList{
    pageNews:number[];
    pageBackContent:any[];
}

export class Wijmo_PageBackList{
    pageNews:number[];
    List:wjcCore.ObservableArray;
}

export class findType_M1V1{
    id: number;
    text: string;
}

export class findTab{
    id: number;
    text: string;
}

export class findCourse{
    course_name: string;
    id: number;
    course_sort: number;
}

//=================================================

export class PageBackContentSSM{
    id:number;
    province:string;
    city:string;
    area:string;
}

export class PageBackContent_M1V1{
    id: number;
    type: number;
    nodeId: number;
    isLp: boolean;
    isHuat: boolean;
    isTiaot: boolean;
    isDatika: boolean;
    isHouqi: boolean;
    multiple: number;
    unit: string;
    remarks: string;
    delFlag: number
}

export class PageBackContent_M2V2{
    id:number;
    indexcode:string;
    indexname:string;
    indexremark:string;
    isdel:number;
    isdelandedit:number;
}

export class PageBackContent_M2V3{
    id:number;
    indexcode:string;
    code:string;
    name:string;
    workid:number;
    worktime:number;
    remark:string;
    isdel:number;
    isdelandedit:number;
    lastworkid:number;
    updatetime:number;
    orderid:number;
}

//=================================================

export class BackNews {
  backNews:string;
}
