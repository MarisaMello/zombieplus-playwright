
const { test, expect } = require('../support')
const { faker } = require('@faker-js/faker')

const { executeSQL } = require('../support/database')


test.beforeAll(async () => {
  await executeSQL(`DELETE from leads`)
})


test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato.'
  await page.popup.haveText(message)

});
test('Não deve cadastrar quando um email já existe', async ({ page, request}) => {

  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

   const newlead = await request.post('http://localhost:3333/leads', {

    data: {
      name: leadName,
      email: leadEmail
    }
    
   })
   // status code retornado é ok
   await expect(newlead.ok()).toBeTruthy

   await page.leads.visit()
   await page.leads.openLeadModal()
   await page.leads.submitLeadForm(leadName , leadEmail)
 
   const message = 'Verificamos que o endereço de e-mail fornecido já consta em nossa lista de espera. Isso significa que você está um passo mais perto de aproveitar nossos serviços.'
   await page.popup.haveText(message)
 
 });
test(' não Deve cadastrar um lead com email incorreto', async ({ page }) => {
  //const landingPage = new LandingPage(page)

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Marisa mello', 'marisa.com')

  await page.leads.alertHaveText('Email incorreto');
});

test(' Não Deve cadastrar um lead sem preencher o nome ', async ({ page }) => {
 // const landingPage = new LandingPage(page)

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', 'marisa@yahoo.com')

  await page.leads.alertHaveText('Campo obrigatório');

});

test(' Não Deve cadastrar um lead sem preencher o e-mail', async ({ page }) => {
  //const landingPage = new LandingPage(page)

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('Marisa mello', '')

  await page.leads.alertHaveText('Campo obrigatório');

});
test(' Não Deve cadastrar um lead sem preencher os campos de nome e e-mail', async ({ page }) => {
  //const landingPage = new LandingPage(page)

  await page.leads.visit()
  await page.leads.openLeadModal()
  await page.leads.submitLeadForm('', '')

  // validar os resultados dos campos com um array
  await page.leads.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);

});

