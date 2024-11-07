
const { test, expect } = require('../support')
const { faker } = require('@faker-js/faker')


test('Deve cadastrar um lead na fila de espera', async ({ page }) => {
  const leadName = faker.person.fullName()
  const leadEmail = faker.internet.email()

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm(leadName, leadEmail)

  const message = 'Agradecemos por compartilhar seus dados conosco. Em breve, nossa equipe entrará em contato!'
  await page.toast.containText(message)

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

   await page.landing.visit()
   await page.landing.openLeadModal()
   await page.landing.submitLeadForm(leadName , leadEmail)
 
   const message = 'O endereço de e-mail fornecido já está registrado em nossa fila de espera.'
   await page.toast.containText(message)
 
 });
test(' não Deve cadastrar um lead com email incorreto', async ({ page }) => {
  //const landingPage = new LandingPage(page)

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Marisa mello', 'marisa.com')

  await page.landing.alertHaveText('Email incorreto');
});

test(' Não Deve cadastrar um lead sem preencher o nome ', async ({ page }) => {
 // const landingPage = new LandingPage(page)

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', 'marisa@yahoo.com')

  await page.landing.alertHaveText('Campo obrigatório');

});

test(' Não Deve cadastrar um lead sem preencher o e-mail', async ({ page }) => {
  //const landingPage = new LandingPage(page)

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('Marisa mello', '')

  await page.landing.alertHaveText('Campo obrigatório');

});
test(' Não Deve cadastrar um lead sem preencher os campos de nome e e-mail', async ({ page }) => {
  //const landingPage = new LandingPage(page)

  await page.landing.visit()
  await page.landing.openLeadModal()
  await page.landing.submitLeadForm('', '')

  // validar os resultados dos campos com um array
  await page.landing.alertHaveText([
    'Campo obrigatório',
    'Campo obrigatório'
  ]);

});

