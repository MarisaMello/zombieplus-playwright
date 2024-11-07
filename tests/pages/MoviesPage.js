const { expect } = require('@playwright/test');

export class MoviesPage {

    constructor(page) {
        this.page = page
    }

    async isLoggedIn() {

        await this.page.waitForLoadState('networkidle')
        await expect(this.page).toHaveURL(/.*admin/)

        // const logoutLink = this.page.locator('//a[href="/logout"]')
        // await expect(logoutLink).toBeVisible()
    }

    async create(title, overview, company, release_year) {

        await this.page.locator('a[href$="register"]').click()

        //await this.page.locator('#title').fill(title)
        await this.page.getByLabel('Titulo do filme').fill(title)

        // await this.page.locator('#overview'),(overview)
        await this.page.getByLabel('Sinopse').fill(overview)

         
        //clicando para selecionar uma opção
        await this.page.locator('#select_company_id .react-select__indicator').click()

        // opção de seletor pegando a class e o texto
        await this.page.locator('.react-select__option')
            .filter({ hasText: company })
            .click()

         // ano de lençamento
          await this.page.locator('#select_year .react-select__indicator ').click()
         
          await this.page.locator('.react-select__option')
              .filter({ hasText: release_year })
              .click()


       await this.page.getByRole('button', {name: 'cadastrar'}).click()    
  
    }
}