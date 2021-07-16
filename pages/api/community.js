import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if (request.method === 'POST'){
        const TOKEN = '5c307195ac0f730efdf433d2b175bc';
        const client = new SiteClient(TOKEN);

        const registroCriado = await client.items.create({
            itemType: '972851',
            ...request.body,
        })

        response.json({
            dados: 'Algum dado qualquer',
            registroCriado: registroCriado,
        })

        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    });
}