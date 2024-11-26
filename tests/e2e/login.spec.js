const {test, expect} = require('../support')


test('Deve logar como administrador' , async ({page}) => {
   await page.login.visit()
   await page.login.submit('admin@zombieplus.com', 'pwd123')
   await page.login.isLoggedIn('Admin')
   
})
test('Não deve logar com senha incorreta' , async ({page}) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', 'pwd1', 'Admin')

    const message = 'Ocorreu um erro ao tentar efetuar o login. Por favor, verifique suas credenciais e tente novamente.'
    await page.popup.haveText(message)
 })
 test('Não deve logar com email incorreto' , async ({page}) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus', 'pwd1')
    await page.login.alertHaveText('Email incorreto')
 })

 test('Não deve logar sem preencher o campo de e-mail' , async ({page}) => {
    await page.login.visit()
    await page.login.submit('', 'pwd1')
    await page.login.alertHaveText('Campo obrigatório')
 })
 test('Não deve logar sem preencher o campo de senha' , async ({page}) => {
    await page.login.visit()
    await page.login.submit('admin@zombieplus.com', '')
    await page.login.alertHaveText('Campo obrigatório')
 })

 test('Não deve logar sem preencher os campos de email e senha' , async ({page}) => {
    await page.login.visit()
    await page.login.submit('', '')
    await page.login.alertHaveText([
        'Campo obrigatório', 
        'Campo obrigatório'
    ])
 })
 
 

