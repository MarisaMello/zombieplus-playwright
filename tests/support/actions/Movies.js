const { expect } = require('@playwright/test');

export class Movies {

    constructor(page) {
        this.page = page
    }

    async goForm() {
        await this.page.locator('a[href$="register"]').click()
    }

    async submit() {
        await this.page.getByRole('button', { name: 'cadastrar' }).click()
    }

    async create(movie) {

        await this.goForm()

        //await this.page.locator('#title').fill(title)
        await this.page.getByLabel('Titulo do filme').fill(movie.title)

        // await this.page.locator('#overview'),(overview)
        await this.page.getByLabel('Sinopse').fill(movie.overview)


        //clicando para selecionar uma opção
        await this.page.locator('#select_company_id .react-select__indicator').click()

        // opção de seletor pegando a class e o texto
        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.company })
            .click()

        // ano de lençamento
        await this.page.locator('#select_year .react-select__indicator ').click()

        await this.page.locator('.react-select__option')
            .filter({ hasText: movie.release_year })
            .click()

        await this.page.locator('input[name=cover]').setInputFiles('tests/support/fixtures/' + movie.cover)

        if (movie.featured){
            
        await this.page.locator('.featured .react-switch').click()
        }
        await this.submit()
    }

    async search(target){

        await this.page.getByPlaceholder('Busque pelo nome').fill(target)
        await this.page.click('.actions button')
    }
    
    async tableHave (content){

        const rows = this.page.getByRole('row')
        await expect(rows).toContainText(content)

    }
    async alertHaveText(target) {

        await expect(this.page.locator('.alert')).toHaveText(target);

    }
    async remove(title){
    // xpath para remover um filme especifico - //td[text()='A Noite dos Mortos-Vivos']/..//button
    await this.page.getByRole('row', {name:title}).getByRole('button').click()
    await this.page.click('.confirm-removal')

    }
}