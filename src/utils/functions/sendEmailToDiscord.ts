const webHookUrl = "https://discord.com/api/webhooks/1016482281646465145/k_aQVLlr6Mn9I75v1HCdN-KAmBKxsi3FqXYLUUWUhuVZ1tI4ECu_JtS_TXv9ZUusIOu7"

export default async function postEmail(email: string) {
    /* const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Fetch POST Request Example' })
    };
    fetch('https://reqres.in/api/articles', requestOptions)
        .then(response => response.json())
        .then(data => element.innerHTML = data.id ); */
    const content = JSON.stringify({ content: email })
    console.log(content)
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: content,
    };
    try {
        const response = await fetch(webHookUrl, requestOptions)
        if (response) {
            console.log("O e-mail foi enviado com sucesso para o Discord!")
            return true
        } else {
            console.log("Não foi possível enviar o e-mail de contato :(")
            return false
        }
    } catch (error) {
        console.log(error)
        return false;
    }
}