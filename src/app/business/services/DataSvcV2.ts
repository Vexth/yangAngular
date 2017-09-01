import { Injectable } from '@angular/core';
import * as wjcCore from 'wijmo/wijmo';

'use strict';

@Injectable()

export class DataSvcV2 { getTreeData(): [{}] { return [ 
  { name: 'Adriane Simione', 
  items: [ { 
    name: 'Intelligible Sky', 
      items: [ 
        { name: 'Theories', length: '2:02' }, 
        { name: 'Giant Eyes', length: '3:29' }, 
        { name: 'Jovian Moons', length: '1:02' }, 
        { name: 'Open Minds', length: '2:41' }, 
        { name: 'Spacetronic Eyes', length: '3:41' }
      ] 
    } ] 
  }, 
  { 
    name: 'Amy Winehouse', 
      items: [ 
        { name: 'Back to Black', items: [ 
        { name: 'Addicted', length: '1:34' }, 
        { name: 'He Can Only Hold Her', length: '2:22' }, 
        { name: 'Some Unholy War', length: '2:21' }, 
        { name: 'Wake Up Alone', length: '3:43' }, 
        { name: 'Tears Dry On Their Own', length: '1:25' }
      ] 
    } ] 
  }
]}
}