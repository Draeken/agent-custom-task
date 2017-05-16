import { AgentCustomTaskPage } from './app.po';

describe('agent-custom-task App', () => {
  let page: AgentCustomTaskPage;

  beforeEach(() => {
    page = new AgentCustomTaskPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
