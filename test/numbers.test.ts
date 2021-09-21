import * as axios from 'axios';

jest.setTimeout(300000)

let numbers_all: number[];

test('Teste resposta da API', () => {

    return axios.default
        .get('http://162.214.193.97:5555/api/v1/numbers')
        .then((res) => {
            numbers_all = res.data.numbers;
            expect(res.status).toEqual(200)
        })
        .catch(function (error) {
            fail(error)
        });
})

test('Ordenação dos Números', () => {
    let correto = true
    let num = -9999;
    numbers_all.forEach((e) => {

        if (e > num) {
            num = e;
        } else {
            correto = false;
        }
    })
    expect(correto).toBeTruthy
})