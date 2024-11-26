const { test, expect } = require('../support')

const data = require('../support/fixtures/tvshow.json')
const { executeSQL } = require('../support/database')

test.beforeAll(async () => {
    await executeSQL(`DELETE from tvshows`)
})

test('Deve poder cadastrar uma nova serie', async ({ page }) => {
    const tvshow = data.create
    //await executeSQL(`DELETE from movies WHERE title = '${movie.title}';`)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshow.pageShow()
    await page.tvshow.create(tvshow)
    await page.popup.haveText(`A série '${tvshow.title}' foi adicionada ao catálogo.`)
})
test('Deve poder remover um filme', async ({ page, request }) => {

    const tvshow = data.to_remove

    await request.api.postTvshow(tvshow)
    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshow.pageShow()

   await page.tvshow.remove(tvshow.title)
   await page.popup.haveText('Série removida com sucesso.')


})

test('Não deve poder cadastrar quando o título do filme é duplicado', async ({ page, request }) => {
    const tvshow = data.duplicate

    await request.api.postTvshow(tvshow)

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshow.pageShow()
    await page.tvshow.create(tvshow)
    await page.popup.haveText(`O título '${tvshow.title}' já consta em nosso catálogo. Por favor, verifique se há necessidade de atualizações ou correções para este item.`)
})

test('Não deve cadastrar quando os campos obrigatórios não são preenchido', async ({ page }) => {

    await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
    await page.tvshow.pageShow()
    await page.tvshow.goForm()
    await page.tvshow.submit()

    await page.tvshow.alertHaveText([
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório',
        'Campo obrigatório (apenas números)'

    ])
})

// test('Deve realizar busca pelo termo', async ({ page, request }) => {
//     const tvshow = data.search

//     tvshow.data.forEach(async (m) => {
//         await request.api.postTvshow(m)
//     });
//     await page.login.do('admin@zombieplus.com', 'pwd123', 'Admin')
//     await page.tvshow.pageShow()

//     await page.locator('a[href$="tvshows"]').click()
//     await page.tvshow.search(tvshow.input)

//     await page.tvshow.tableHave(tvshow.outputs)

// })
