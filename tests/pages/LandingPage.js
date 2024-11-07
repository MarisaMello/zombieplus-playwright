
const { expect } = require('@playwright/test');

export class LandingPage {

    constructor(page){
        this.page = page
    }

    async visit() {
        await this.page.goto('http://localhost:3000/');
    }
    async openLeadModal() {
        await this.page.getByRole('button', { name: /Aperte o play/ }).click();

        await expect(
            this.page.getByTestId('modal').getByRole('heading')
        ).toHaveText('Fila de espera');
    }
    async submitLeadForm(name, email) {
        await this.page.locator('#name').fill(name);
        await this.page.locator('#email').fill(email);

        await this.page.getByTestId('modal')
        .getByText('Quero entrar na fila!').click();
    }

    async alertHaveText(target){

        await expect(this.page.locator('.alert')).toHaveText(target);

    }

}
//clicar xpath
  //await page.click('//button[text()="Aperte o play... se tiver coragem"]')
  // obter elemento  localizador substring -> /play/
  
  //await page.getByPlaceholder('Seu email principal').fill('marisa@yahoo.com');
 
  // como pegar os dados do toast no console ao executar teste
  // await page.getByText('seus dados conosco').click()
  // const content = await page.content()
  // console.log(content)
   //tempo
  //await page.waitForTimeout(5000)