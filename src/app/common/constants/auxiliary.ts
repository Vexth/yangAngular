import $ from "jquery";
import ConstantsList from './config';

export class Auxiliary {

  public ControlHeight(id: string = "#content"): void {
    $(id).css("min-height", $(window).height() - ConstantsList.pageHeight);
  }

  public emptyMessage(css: string = ".ui-datatable-emptymessage"): void {
    $(css).html('暂无数据');
  }

  public publicList(arr: any[], str: string) {
    let List = [];
    for (let i = 0; i < arr.length; i++) {
      let labelList = { label: '', value: '' };
      labelList.label = arr[i][str];
      labelList.value = arr[i];
      List.push(labelList)
    }
    return List;
  }

}
