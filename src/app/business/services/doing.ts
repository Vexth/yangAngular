import $ from "jquery";

export class InitIalize {

    public initialize(id: string = "#pageSpin"): void {
        $(id).css('display', 'block');
    }

    public endializ(id: string = "#pageSpin"): void {
        $(id).css('display', 'none');
    }
}