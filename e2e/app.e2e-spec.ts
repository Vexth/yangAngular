import { YangTestPage } from './app.po';

describe('yang App', () => {
  let page: YangTestPage;

  beforeEach(() => {
    page = new YangTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
